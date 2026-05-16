# Ranked.

A father's letter to his daughter, framed as a ski guide. Twenty resorts. No apologies.

## Structure

```
ranked-book/
├── index.html              # Homepage / chapter list
├── style.css               # Design system (cream bg, crimson accent, Crimson Pro + Playfair Display)
├── chapters/
│   ├── whistler.html
│   ├── aspen.html
│   └── …                   # 03–20 as drafted
├── assets/
│   └── images/
│       ├── whistler/
│       │   ├── hero.jpg
│       │   ├── village.jpg
│       │   ├── sofia-deck.jpg
│       │   ├── trail-map.jpg
│       │   └── fauna/      # 5 character illustrations
│       └── aspen/
│           └── …
└── README.md
```

## Deploy

This is a static site. Vercel auto-deploys on push.

1. Push to your GitHub repo (`main` branch).
2. Vercel watches it; new build triggers on every push.
3. Live URL stays the same.

For local preview, any static file server works:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve

# Then open http://localhost:8000
```

## Workflow per chapter

1. **Voice memo** the seven prompts → transcribe (Whisper / Otter).
2. **Draft text** with Claude → paste into a new `chapters/<resort>.html` (copy an existing one as the template).
3. **Generate image briefs** with Claude — one per visual slot, ~18 per chapter.
4. **Run briefs through AI image pipeline** → save outputs to `assets/images/<resort>/`.
5. **Replace placeholder divs** in the chapter HTML with `<img>` tags pointing to the new files. Image slot conventions:
   - `hero.jpg` — page hero (full bleed, 4:3)
   - `village.jpg` / spot illustration after body paragraph 2 (16:9)
   - `sofia-deck.jpg` / portrait inset after body paragraph 4 (16:9)
   - `trail-map.jpg` — full trail map (4:3)
   - `fauna/01-name.jpg` through `fauna/05-name.jpg` — square character illustrations
6. **Update `index.html`** — flip the chapter row from `draft` to active, fill in word count.
7. **Commit + push** → Vercel deploys.

## Design system

Colors (CSS variables in `style.css`):

- `--bg`: `#F5F0E6` (cream)
- `--ink`: `#1F1F1F` (deep black)
- `--crimson`: `#8B2D2A` (accent)
- `--soft`: `#5A5A5A` (caption gray)
- `--rule`: `#C8C2B6` (divider lines)

Type:

- **Body**: Crimson Pro, 19px / 1.65, transitional serif
- **Display**: Playfair Display, weighted serif for titles
- **UI**: Inter, for nav and labels

Layout:

- Max content width: 720px (reading) / 920px (index)
- Mobile breakpoint: 600px
- Generous vertical rhythm

## Chapter HTML structure (canonical order)

Every chapter follows the same skeleton. When drafting a new one, copy `whistler.html` and replace section by section:

1. `<header class="site-header">` — site nav
2. `.chapter-breadcrumb` — region + entry number
3. `.chapter-title` — resort name (line break with `<br>` for two-word names)
4. `.chapter-location` — country / state
5. `.chapter-hero-image` + `.image-caption`
6. `.chapter-verdict` — the brutal-honest one-liner
7. `.info-box` — 8 stats grid
8. `.chapter-visited` — daughter-frame visit line
9. `.chapter-body` — 4 paragraphs, with inset images after #2 and #4
10. `Field Guide` — 5 archetypes
11. `Spotted` — 4 one-time observations (must not overlap with Field Guide)
12. `The Map` — full trail map with red route + numbered callouts
13. `The Hit List` — 8 items, numbered ones correspond to map callouts
14. `.kicker` — closing verdict to Sofia ("I hope you keep [verb]")
15. `.chapter-footer` — prev / next navigation

## Editorial rules

- **Tone**: dad-to-daughter throughout, surfacing at key moments (visited line, body anecdotes about Sofia, closing kicker)
- **Field Guide = recurring types. Spotted = one-time moments. They cannot overlap.**
- **Every chapter closes with one imperative tied to what that resort rewards.** Climbing for Whistler. Walking for Aspen. The pattern is part of the book's architecture.
- **Quotes inside Field Guide and Spotted are observations, not real attributions** — never put fictional words in the mouths of real people.

## Image briefs

Stored per chapter in a separate file (or as HTML comments in the chapter file itself). Each brief includes:

- Subject (what's depicted)
- Mood / tone
- Palette
- Composition reference
- Aspect ratio
- Style note: watercolor + ink, consistent across all 20 chapters

Reference the locked Whistler PDF for the visual house style.
