# Handoff: Twenty Mountains — A Father's Field Guide

## Overview

An editorial-style digital book that presents a father's ski-resort guide to his daughter. Twenty resorts (one fully built, Whistler Blackcomb), each laid out as a six-page entry spread across three two-page "spreads" with watercolor illustrations, essay text, a field guide of "local fauna," a hand-drawn mountain map, and a "Hit List" of recommended runs / meals / stops.

The reading experience is a real two-page book: square pages bound at a center gutter, simple cross-fade page-turn animation, keyboard / on-screen navigation, sidebar table of contents.

## About the Design Files

**The files in this bundle are design references created in HTML.** They are prototypes that demonstrate intended look and behavior — they are NOT production code to copy verbatim. The shipped CSS uses unprefixed CSS custom properties, raw inline styles in React via Babel-in-browser, and a hand-rolled scaling stage — none of which are how you would build this in production.

The task for the implementer is to **recreate these designs in the target codebase using its existing patterns** — its component library, design tokens, styling system (Tailwind, CSS modules, styled-components, etc.), and routing. If the project has no front-end environment yet, pick the most appropriate framework for the use case and implement the designs there.

## Fidelity

**High-fidelity.** Final typography, colors, spacing, illustrations sizing, animation timings are all decided. Build pixel-perfect using the target codebase's component primitives. The watercolor illustrations themselves are placeholders — final images need to be commissioned / dropped in separately at the same dimensions.

## Architecture

The book renders as a list of "spreads." A spread is two pages side-by-side. The full book is:

```
Spread 0:   TOC cover (left)         + TOC list (right)
Spread 1+:  per-resort, 3 spreads each (6 pages):
  Spread A: full-bleed photo page    + title page with stats
  Spread B: essay continued + portrait + field-guide of locals
  Spread C: hand-drawn map           + hit list
```

A linear `globalIdx` walks the entire book. Prev/Next advance by ±1; clicking a TOC entry jumps to that resort's first spread.

## Page Geometry

- Page: **800px × 800px** (square) in design coordinates
- Spread: **1600px × 800px** (2:1 landscape)
- Page padding: **52px** on all sides
- The whole spread is wrapped in a stage that `transform: scale()`s it to fit the viewport, with a 80px viewport gutter

## Screens / Views

### Table of Contents (Spread 0)

**Left page — TOC cover**
- Eyebrow: `A FATHER'S FIELD GUIDE` (red small-caps, .3em letter-spacing)
- Title: **"Twenty Mountains."** EB Garamond 76px, weight 800, line-height .92, letter-spacing -.02em
- A 280px-tall watercolor placeholder
- Italic deck: "A field guide to the ski resorts you and I have skied together, in the order we skied them, written down before either of us forgets."
- Bottom-left author block: red small-caps "BY: YOUR FATHER", italic mute "For you, who will outski me by ten"

**Right page — TOC list**
- "The Twenty" title 24px serif bold
- Two-column list of 20 resort entries:
  - Number (red, lining-nums, 11px, bold)
  - Resort name (13.5px serif, weight 500)
  - Location underneath in italic 10.5px mute
  - Page number on the right
  - Dotted hairline underneath each row
- Whistler Blackcomb (entry 06) is `is-featured`: red bold name
- Forthcoming entries (everything except entry 6) at opacity .5

### Resort entry — Page 1 (full bleed photo)

- Full-bleed watercolor (father standing in orange jacket, daughter horizontal in snow)
- Caption block at left:46px / bottom:70px, max-width 220px, ink color directly on watercolor (no box / border / blur):
  - "The aftermath." — italic bold 15px
  - "Father vertical, / daughter horizontal, / dignity asymmetric." — italic 13px ink-soft
  - "Blackcomb, / March 2026." — italic 11.5px mute
- Folio "1" in snow-white at bottom-right with subtle text-shadow

### Resort entry — Page 2 (title)

Stack from top:
1. Eyebrow: `NORTH AMERICA • ENTRY 6 OF 20` (red small-caps, .24em letter-spacing, 11px). Dot separator is red opacity .6.
2. Title `Whistler` / `Blackcomb` — two lines, EB Garamond bold 72px, line-height .94, letter-spacing -.02em, ink color (`#1c1815`)
3. Subloc: `BRITISH COLUMBIA, CANADA` — red small-caps 12.5px, .22em letter-spacing, weight 600
4. Italic deck 17px ink-soft: "The Costco of ski resorts: enormous, comprehensive, and you will lose your group within the first hour."
5. **Gondola illustration** positioned absolute: right 28px, top 44px, **260×260px**, transparent background — overlaps with the title area on the right
6. **Stat grid** (see Stat Grid spec below)
7. Red italic note 12.5px weight 600: "Visited March 2026, when you were five and didn't yet know how to be afraid."
8. Hr (1px rule color)
9. Body paragraph, justified, 15px / 1.55, hyphens auto: the "Whistler is the resort named when someone…" paragraph
10. Right-aligned italic red "continued ▸" at bottom

Folio "2" at top-right in red weight 700.

### Resort entry — Page 3 (essay + portrait)

- Running head bar at top: `WHISTLER BLACKCOMB` red small-caps, hairline-red underneath, folio "3" right-aligned on same row
- 14px spacer
- Body text 15px / 1.55 justified: two long paragraphs (Blackcomb Glacier story + Spearhead Traverse story)
- Portrait illustration with `flex: 1` so it fills remaining vertical space (min-height 240px) — full width
- Italic caption 12px mute: "You, mid-mountain. The outfit was non-negotiable."

### Resort entry — Page 4 (field guide)

Two columns, 1.05fr : 0.95fr, separated by a 1px rule with 24px padding-left on the right column.

**Left column — The Local Fauna**
- Black small-caps eyebrow `FIELD GUIDE TO`
- Red small-caps title `The Local Fauna` (30px, weight 700, all-small-caps, .05em letter-spacing)
- Red-dot hairline divider
- 5 fauna items in a vertical flex with 20px gap. Each item: 80px circular portrait + name & description. Name is red small-caps 13px weight 700. Description is 13px serif / 1.45.

**Right column — Spotted, Overheard, or Otherwise Witnessed**
- Black small-caps eyebrow (two lines: "SPOTTED, OVERHEARD, OR / OTHERWISE WITNESSED")
- Red-dot hairline divider
- 4 witness items in a vertical flex with 18px gap. Each item: 42×42 boxed icon (emoji or small illustration) + 12.5px serif / 1.5 text.

### Resort entry — Page 5 (the map)

- Running head `WHISTLER BLACKCOMB • THE MAP` + folio 5
- Italic intro line 13px: "The route in red is the *Hit List's* ski-here-first…"
- A hand-drawn watercolor mountain map taking the rest of the page (built as SVG in the prototype, replace with watercolor JPG in production):
  - Two mountain silhouettes labeled BLACKCOMB (2,440 m) and WHISTLER (2,182 m)
  - Six numbered red circular pins (22px diameter, red `#b5302a`, white text, drop-shadow). Pin numbers correspond to the Hit List entries.
  - Pin labels in small-caps with optional italic sub-label
  - Red recommended-route line (2px, red, no fill, rounded line-joins)
  - Gray dashed lift lines (1px, ink-mute, 3-3 dash array)
  - Conifer silhouettes scattered across the lower mountain
  - Whistler Village rendered as small huts at the base
  - Legend box bottom-right with paper background, ruled border, 10.5px serif
- Italic caption at bottom: "Numbered points correspond to *The Hit List* on the next page. / The recommended route is for clear-weather mornings; in storm, ski lower."

Hover state: hovering a pin highlights its corresponding hit-list row across pages (shared context).

### Resort entry — Page 6 (the hit list)

- Running head `WHISTLER BLACKCOMB` + folio 6
- Burst icon (small SVG of red rays/lines emanating upward, 60×24px, red)
- Centered title `THE HIT LIST` (46px, weight 700, all-small-caps, .03em letter-spacing)
- 6 hit-list rows in a vertical flex with 18px gap:
  - Grid 100px : 1fr, 20px gap
  - Thumbnail: **100×84px**, paper-edge background, 1px rule border, contains the illustration
  - **Number badge** absolute at top:-8 left:-8, 28px circle, red bg, white text, 14px bold
  - Title: red small-caps 13.5px weight 700, .14em letter-spacing
  - Body: 13px serif / 1.45
- Distant mountain silhouette at the bottom (subtle gray SVG, opacity .4)

Hover state: hovering a row highlights the corresponding pin on the map (shared context).

## Interactions & Behavior

### Navigation
- **Prev/Next arrows** on either side of the stage (outside the scaled book, fixed position)
- **Keyboard**: `ArrowRight` = next, `ArrowLeft` = previous, `Escape` = back to TOC
- **Sidebar entries** click → jump to that resort's first spread
- **TOC entries** click → jump to that resort's first spread
- **Spread indicator dots** (only shown for entry views) click → jump within the current entry

### Page-turn animation
A clean **cross-fade with a horizontal nudge**:
- Forward: old spread fades out and translates -22px while new spread is revealed underneath
- Backward: old spread fades out and translates +22px
- Duration: **420ms**, easing `cubic-bezier(.4, 0, .2, 1)`
- The new spread is rendered "under" the old one — there is no flash of empty paper

### Hover state (Whistler entry, pages 5 & 6)
- A `WhistlerHoverCtx` React context tracks the currently-hovered point (1-6)
- Both the map pins on page 5 and the hit-list rows on page 6 read from it
- Hovering either side adds `.highlight` class to the corresponding element on the other page

### Mouse parallax
The desk backdrop has three layers of distant mountain ridges that translate slightly with the mouse position (subtle, 18-48px range) for depth.

### Snow flakes
40 small white dots fall slowly across the backdrop, infinite loop, varied size/duration/drift. Decorative.

## State Management

```
globalIdx: number          // 0..order.length-1, which spread is showing
flipping: {                // null when idle; set during a transition
  fromIdx, toIdx,
  direction: 'forward' | 'backward',
  key: timestamp
} | null
scale: number              // auto-fit scale for the stage
mouseX, mouseY: 0..1       // normalized cursor position
WhistlerHoverCtx.hover: 1..6 | null   // shared map/hit-list highlight
```

The `order` array is precomputed from the `RESORTS` data: `[{kind:'toc'}, {kind:'entry', resortIdx:i, spreadIdx:0..2}, ...]`. Only non-forthcoming resorts contribute spreads.

## Design Tokens

### Colors
```
--ink:        #1c1815       /* primary text */
--ink-soft:   #3a342e       /* secondary text */
--ink-mute:   #6e6660       /* captions, metadata */
--paper:      #faf5e9       /* page background */
--paper-edge: #ebe1cf       /* placeholder/illo background */
--paper-fold: #c9bca0       /* darker page edge */
--rule:       #c9bfac       /* hairline color */
--red:        #b5302a       /* accent: eyebrows, folio, links */
--red-deep:   #8b231e       /* bookmark ribbon */
--desk:       #ece4d0       /* outer linen backdrop */
--desk-2:     #d8cdb4
--desk-hi:    #f3ecdb
--snow:       #f6f4ef       /* light-on-dark text */
```

### Typography
- Primary serif: **EB Garamond** (Google Fonts; weights 400/500/600/700/800, italics 400-700)
- Backup serif stack: `"Source Serif 4", Caslon, Georgia, serif`
- Sans-serif (sidebar/UI only): **Inter Tight** (Google; 400/500/600/700)
- All body text uses `font-feature-settings: "onum" 1, "kern" 1, "liga" 1` for old-style numerals + ligatures
- Body text uses `text-align: justify` with `hyphens: auto` and `text-wrap: pretty`

Typographic scale (matches the spread mock):
- Title XL (resort name): **72px** / .94 / -.02em / weight 700
- Title L (Hit List): **46px** / 1.0 / -.01em / weight 700, all-small-caps
- Title M: **30px** / 1.05 / -.005em / weight 700
- Display body / deck (italic): **17px** / 1.45
- Body: **15px** / 1.55, justified, hyphens auto
- Captions: **12px** / 1.4, italic, ink-mute
- Eyebrow (small-caps): 11px / .24em letter-spacing
- Running head: 10.5px / .22em / red

### Spacing
- Page padding: 52px
- Hr margins: 12-14px
- Stat-cell padding: 14px 8px

### Stat Grid (Page 2)
Two adjacent grids that share the outer hairline so they read as one band:
- **Row 1**: `grid-template-columns: repeat(4, 1fr)` — Blackcomb / Whistler / Vertical / 36 Lifts
- **Row 2**: `grid-template-columns: repeat(5, 1fr)` — Epic / Vail / All Abilities / YVR / Nov–May

Each cell:
- `display: flex; flex-direction: column; align-items: center; text-align: center`
- 7px gap, 14px 8px padding
- **Icon** 34×34px above (custom-drawn inline SVG, 1.4px stroke, white fills)
- **Label**: small-caps 12px weight 700, .16em letter-spacing
- **Value**: italic 11px mute, lining-nums; the "/" inside is dimmed via `<span class="slash">`

Cells are separated by 1px hairlines that don't reach the top or bottom (top:20% / bottom:20%), and the band has a 1px hairline at top and bottom.

### Border radius
- Fauna portrait: 50% (full circle)
- Hit thumb / witness icon: 0 (sharp rectangle, with 1px rule border)
- Map pin: 50%

### Shadows
- Book sits on linen desk:
  - `drop-shadow(0 22px 36px rgba(60,40,20,.30))`
  - `drop-shadow(0 6px 10px rgba(60,40,20,.22))`
  - `drop-shadow(0 1px 0 rgba(60,40,20,.18))`
- Map pins: `0 2px 6px rgba(0,0,0,.4)`; on hover `0 4px 12px rgba(181,48,42,.6)` plus scale(1.25)
- Hit-list number badge: `0 2px 4px rgba(0,0,0,.2)`

## Assets

The prototype uses placeholder slots for all watercolor illustrations — production-ready commissioned watercolor JPGs go in `assets/whistler/`:

| Slot | Path | Description |
|---|---|---|
| Cover | `assets/cover.jpg` | TOC cover — a mountain, or the two of you on skis |
| Page 1 | `assets/whistler/p1-opening.jpg` | Full-bleed: father in orange jacket standing, daughter fallen flat in snow, alpine slope behind, other skiers in distance |
| Page 2 | `assets/whistler/p2-gondola.jpg` | A single red Peak 2 Peak gondola cabin on a cable, descending past dark conifers |
| Page 3 | `assets/whistler/p3-portrait.jpg` | Daughter mid-mountain in pink jacket, distant skiers and conifers behind a wood-rail fence |
| Page 4 | `assets/whistler/fauna-weekender.jpg` | SUV with ski stickers |
| Page 4 | `assets/whistler/fauna-lifty.jpg` | Young man, goggles, beanie |
| Page 4 | `assets/whistler/fauna-heir.jpg` | Older gent, fur hat |
| Page 4 | `assets/whistler/fauna-touring.jpg` | Couple in Arc'teryx with pulks |
| Page 4 | `assets/whistler/fauna-exec.jpg` | Man in suit with coffee |
| Page 5 | (SVG in prototype) | Hand-drawn mountain map — production should commission a single watercolor JPG to replace the SVG terrain entirely; pins/labels/route stay as DOM overlays for hover interactions |
| Page 6 | `assets/whistler/hit-1.jpg` to `hit-6.jpg` | Small thumbnails: empty Symphony Bowl run, Crystal Hut lodge, steak plate, pint of beer, brewery hat + bags, red gondola at sunset |

Icons used in stat grid + witness items are inline SVGs in the prototype — can be replaced with the codebase's icon system (Lucide, Heroicons, custom).

## Files in this Bundle

Prototype files included for reference:

- `index.html` — entry point, font imports, script tags
- `styles.css` — all CSS, organized by section comments
- `app.jsx` — main App component, sidebar, stage, backdrop, navigation logic
- `book-frame.jsx` — `<Page>`, `<BookSpread>`, `<SpreadFader>`, `<Illustration>` primitives
- `whistler-pages-1.jsx` — Whistler entry pages 1-4 (opening / title / essay / field guide)
- `whistler-pages-2.jsx` — Whistler entry pages 5-6 (map / hit list) + shared hover context
- `toc.jsx` — table of contents pages (TocLeftPage, TocRightPage)
- `shell-entry.jsx` — placeholder shell for the 19 forthcoming resorts
- `data.js` — the RESORTS array (twenty entries, slug/name/location/forthcoming flag)

These are not for direct copying; they're a working reference for layout proportions, content, and interaction details. Build the same designs using the target codebase's component library.

## Implementation Notes

- The cross-fade animation is the simplest possible page-turn — feel free to upgrade it in production (e.g. a subtler curl, or keep it minimal). The original 3D-paper-flip was explicitly rejected in favor of the current clean fade.
- The Whistler hover-shared-state between page 5 and page 6 is the only nontrivial cross-page state; everything else is per-page.
- Body text uses `text-wrap: pretty` — falls back gracefully on older browsers.
- The 800×800 square page proportion is intentional; do not change it without revisiting all six page layouts.
- The book is single-language (English), LTR. The fauna copy and essay text are personal/satirical in tone and contain proper nouns (Whistler, Squamish, Slovaks, Sidecut, etc.) — preserve these exactly.
