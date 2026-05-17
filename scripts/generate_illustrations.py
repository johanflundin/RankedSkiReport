#!/usr/bin/env python3
"""Generate chapter illustrations via OpenAI gpt-image-1.

Usage:
  python3 scripts/generate_illustrations.py <chapter> [--dry-run] [--only SLOT] [--missing]
                                                     [--style-pdf PATH] [--style-pages 1,2]
                                                     [--quality {low,medium,high}]
                                                     [--concurrency N]
"""
from __future__ import annotations

import argparse
import base64
import io
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

try:
    from dotenv import load_dotenv
    load_dotenv(REPO_ROOT / ".env.local")
    load_dotenv(REPO_ROOT / ".env")
except ImportError:
    pass

try:
    import fitz
except ImportError:
    sys.exit("PyMuPDF missing. Run: pip install -r scripts/requirements.txt")

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow missing. Run: pip install -r scripts/requirements.txt")

try:
    import numpy as np
except ImportError:
    sys.exit("numpy missing. Run: pip install -r scripts/requirements.txt")

try:
    from openai import OpenAI
    from openai import BadRequestError, RateLimitError, APIError
except ImportError:
    sys.exit("openai missing. Run: pip install -r scripts/requirements.txt")


DEFAULT_STYLE_PDF = REPO_ROOT / "inspiration" / "ranked-style-reference.pdf"

# rough cost ($/image) for gpt-image-1 — used only for the heads-up estimate
COST = {"low": 0.011, "medium": 0.042, "high": 0.167}


@dataclass
class Slot:
    filename: str
    aspect: str
    prompt: str
    source_photo: str | None = None
    cream_background: bool = False

    @property
    def stem(self) -> str:
        return self.filename.rsplit(".", 1)[0]


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def normalize_to_page_color(jpeg_path: Path, target_hex: str, sample: int = 24) -> None:
    """Globally color-shift an image so its corner background matches target_hex.
    Samples corners (median to ignore outliers), computes delta to target,
    applies uniformly. Preserves watercolor texture variation in the background.
    """
    img = Image.open(jpeg_path).convert("RGB")
    arr = np.array(img, dtype=np.int16)
    h, w = arr.shape[:2]
    s = min(sample, h // 4, w // 4)
    corners = np.concatenate([
        arr[:s, :s].reshape(-1, 3),
        arr[:s, w - s:].reshape(-1, 3),
        arr[h - s:, :s].reshape(-1, 3),
        arr[h - s:, w - s:].reshape(-1, 3),
    ])
    current_bg = np.median(corners, axis=0)
    target_rgb = np.array(hex_to_rgb(target_hex), dtype=np.int16)
    delta = target_rgb - current_bg
    shifted = np.clip(arr + delta, 0, 255).astype(np.uint8)
    Image.fromarray(shifted).save(jpeg_path, "JPEG", quality=90, optimize=True)


def load_source_photo(repo_relative: str) -> bytes:
    """Load a source photo, auto-rotate via EXIF, return PNG bytes."""
    path = REPO_ROOT / repo_relative
    if not path.exists():
        sys.exit(f"source_photo not found: {path}")
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)
    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="PNG")
    return buf.getvalue()


def load_brief(chapter: str) -> dict:
    path = REPO_ROOT / "briefs" / chapter / "illustrations.json"
    if not path.exists():
        sys.exit(f"brief not found: {path}")
    return json.loads(path.read_text())


def render_style_refs(pdf_path: Path, pages: list[int]) -> list[bytes]:
    """Rasterize selected PDF pages to PNG bytes for use as reference images."""
    if not pdf_path.exists():
        sys.exit(f"style PDF not found: {pdf_path}")
    doc = fitz.open(pdf_path)
    out: list[bytes] = []
    for p in pages:
        idx = p - 1
        if idx < 0 or idx >= doc.page_count:
            print(f"  warn: PDF page {p} out of range (1..{doc.page_count}), skipping")
            continue
        # 2x zoom for sharper reference
        pix = doc[idx].get_pixmap(matrix=fitz.Matrix(2, 2))
        out.append(pix.tobytes("png"))
    doc.close()
    if not out:
        sys.exit("no usable style reference pages were rendered")
    return out


def build_prompt(style_prefix: str, slot_prompt: str) -> str:
    return (
        f"{style_prefix}\n\n"
        f"Match the painting style, palette, and texture of the attached reference images exactly.\n\n"
        f"Subject: {slot_prompt}"
    )


def already_exists(out_dir: Path, slot: Slot) -> bool:
    return (out_dir / slot.filename).exists()


def save_jpeg(png_bytes: bytes, dest: Path) -> None:
    img = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=90, optimize=True)


def write_meta(meta_path: Path, payload: dict) -> None:
    meta_path.write_text(json.dumps(payload, indent=2))


def generate_one(
    client: OpenAI,
    slot: Slot,
    full_prompt: str,
    size: str,
    quality: str,
    style_refs_png: list[bytes],
    out_dir: Path,
    page_color: str | None,
) -> tuple[Slot, str]:
    """Returns (slot, status). status is 'ok' or an error string."""
    dest = out_dir / slot.filename
    meta = out_dir / f"{slot.stem}.meta.json"
    err = out_dir / f"{slot.stem}.error.txt"
    if err.exists():
        err.unlink()

    # OpenAI SDK accepts file-like objects with a name attribute
    image_files = []
    for i, raw in enumerate(style_refs_png):
        bio = io.BytesIO(raw)
        bio.name = f"style-ref-{i}.png"
        image_files.append(bio)

    attempt = 0
    last_exc: Exception | None = None
    while attempt < 3:
        attempt += 1
        try:
            resp = client.images.edit(
                model="gpt-image-1",
                image=image_files,
                prompt=full_prompt,
                size=size,
                quality=quality,
                n=1,
            )
            b64 = resp.data[0].b64_json
            png_bytes = base64.b64decode(b64)
            save_jpeg(png_bytes, dest)
            if slot.cream_background and page_color:
                normalize_to_page_color(dest, page_color)
            write_meta(
                meta,
                {
                    "slot": slot.filename,
                    "aspect": slot.aspect,
                    "size": size,
                    "quality": quality,
                    "model": "gpt-image-1",
                    "prompt": full_prompt,
                    "generated_at": datetime.now(timezone.utc).isoformat(),
                    "attempt": attempt,
                },
            )
            return slot, "ok"
        except RateLimitError as e:
            last_exc = e
            wait = 2 ** attempt
            print(f"  {slot.filename}: rate-limited, sleeping {wait}s")
            time.sleep(wait)
            for bio in image_files:
                bio.seek(0)
        except (APIError, BadRequestError) as e:
            last_exc = e
            break

    err.write_text(f"after {attempt} attempts: {last_exc!r}\nprompt:\n{full_prompt}\n")
    return slot, f"failed: {last_exc!r}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("chapter")
    parser.add_argument("--dry-run", action="store_true",
                        help="print resolved prompts; no API calls")
    parser.add_argument("--only", metavar="SLOT",
                        help="generate only this filename (e.g. fauna-lifty.jpg)")
    parser.add_argument("--missing", action="store_true",
                        help="skip slots whose output JPEG already exists")
    parser.add_argument("--style-pdf", default=str(DEFAULT_STYLE_PDF),
                        help=f"PDF to render as reference (default: {DEFAULT_STYLE_PDF})")
    parser.add_argument("--style-pages", default="1,2",
                        help="comma-separated 1-indexed pages from the PDF (default: 1,2)")
    parser.add_argument("--quality", choices=["low", "medium", "high"], default="medium")
    parser.add_argument("--concurrency", type=int, default=3)
    parser.add_argument("--normalize", action="store_true",
                        help="post-process: re-normalize existing JPEGs for slots with cream_background, no generation")
    args = parser.parse_args()

    brief = load_brief(args.chapter)
    out_dir = REPO_ROOT / brief["output_dir"]
    out_dir.mkdir(parents=True, exist_ok=True)

    size_defaults = brief["size_defaults"]
    style_prefix = brief["style_prefix"]
    page_color = brief.get("page_color")
    slots = [Slot(**s) for s in brief["slots"]]

    if args.only:
        slots = [s for s in slots if s.filename == args.only]
        if not slots:
            sys.exit(f"--only: no slot named {args.only}")

    if args.normalize:
        if not page_color:
            sys.exit("--normalize: brief is missing top-level 'page_color' (e.g. \"#faf5e9\")")
        targets = [s for s in slots if s.cream_background and already_exists(out_dir, s)]
        print(f"--normalize: shifting {len(targets)} image(s) to background {page_color}")
        for s in targets:
            normalize_to_page_color(out_dir / s.filename, page_color)
            print(f"  ✓ {s.filename}")
        return 0

    if args.missing:
        before = len(slots)
        slots = [s for s in slots if not already_exists(out_dir, s)]
        print(f"--missing: {before - len(slots)} already on disk, {len(slots)} to generate")

    if not slots:
        print("nothing to do")
        return 0

    if args.dry_run:
        print(f"DRY RUN — {len(slots)} slots for chapter '{args.chapter}'")
        print(f"style PDF: {args.style_pdf} (pages {args.style_pages})")
        print(f"output dir: {out_dir.relative_to(REPO_ROOT)}")
        print()
        for s in slots:
            size = size_defaults[s.aspect]
            print(f"--- {s.filename}  ({s.aspect} → {size}) ---")
            print(build_prompt(style_prefix, s.prompt))
            print()
        est = sum(1 for _ in slots) * COST[args.quality]
        print(f"estimated cost @ {args.quality} quality: ${est:.2f}")
        return 0

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY not set (export it or put it in .env.local)")

    pages = [int(p) for p in args.style_pages.split(",")]
    print(f"rendering style refs from {args.style_pdf} (pages {pages})…")
    style_refs = render_style_refs(Path(args.style_pdf), pages)
    print(f"  {len(style_refs)} reference page(s) ready")

    client = OpenAI(api_key=api_key)
    print(f"\ngenerating {len(slots)} image(s) @ {args.quality} quality "
          f"(est ${len(slots) * COST[args.quality]:.2f}, concurrency={args.concurrency})")

    successes, failures = [], []
    futures = {}
    with ThreadPoolExecutor(max_workers=args.concurrency) as pool:
        for s in slots:
            size = size_defaults[s.aspect]
            full_prompt = build_prompt(style_prefix, s.prompt)
            refs_copy = list(style_refs)
            if s.source_photo:
                refs_copy.append(load_source_photo(s.source_photo))
            futures[pool.submit(
                generate_one, client, s, full_prompt, size, args.quality, refs_copy, out_dir, page_color
            )] = s

        for fut in as_completed(futures):
            slot, status = fut.result()
            marker = "✓" if status == "ok" else "✗"
            print(f"  {marker} {slot.filename}: {status}")
            (successes if status == "ok" else failures).append(slot.filename)

    print(f"\ndone — {len(successes)} ok, {len(failures)} failed")
    if failures:
        print("failures (see .error.txt next to each):")
        for f in failures:
            print(f"  - {f}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
