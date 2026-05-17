---
# Identity
slug: SLUG_HERE
name: "Resort Name"
location: "State/Region, Country"
region: "North America"          # or Europe / Asia
visited: "Mon YYYY"
age: "the age in words at time of visit"
entry_number: 0                  # 1..20 (matches order in src/data/resorts.ts)

# Title-page copy
deck: "One-sentence verdict (≤ ~150 chars) — the line under the title."
visit_note: "Visited Mon YYYY, when you were AGE and …"

# Page 1 caption (over the full-bleed opening illustration)
page1_caption_title: "The signature moment."
page1_caption_body: "Three or four short lines describing what happened, broken with <br/> in the rendered TSX."
page1_caption_date:  "Place, Mon YYYY."

# Page 3 caption (under the portrait illustration)
page3_caption: "One sentence — image-grounding."

# Page 5 map intro + caption
map_intro: "One sentence describing the red route the map illustrates."
map_caption: "Numbered points correspond to The Hit List on the next page."

# Stat strip (page 2)
stats_row1:                       # exactly 4 cells
  - { label: "Peak A",     value: "0,000 m / 0,000 ft", icon: mountain-single }
  - { label: "Peak B",     value: "0,000 m / 0,000 ft", icon: mountain-double }
  - { label: "Vertical",   value: "0,000 m / 0,000 ft", icon: vertical }
  - { label: "N Lifts",    value: "short caption",      icon: gondola }
stats_row2:                       # exactly 5 cells
  - { label: "Pass",       value: "short caption",      icon: epic }
  - { label: "Owner",      value: "short caption",      icon: script }
  - { label: "Abilities",  value: "short caption",      icon: abilities }
  - { label: "Airport",    value: "+ N hr transfer",    icon: plane }
  - { label: "Season",     value: "Mon – Mon",          icon: sun }

# Page 5 map pins (1..6) — match the 6 hit-list items
map_pins:
  - { n: 1, x: 78, y: 26, label: "Pin label", alt: "(Ski first)", align: right }
  - { n: 2, x: 56, y: 47, label: "Pin label", alt: "(Lunch)",     align: left  }
  - { n: 3, x: 16, y: 36, label: "Pin label", alt: "",            align: right }
  - { n: 4, x: 71, y: 84, label: "Pin label", alt: "",            align: left  }
  - { n: 5, x: 50, y: 88, label: "Pin label", alt: "",            align: right }
  - { n: 6, x: 86, y: 92, label: "Pin label", alt: "",            align: left  }

# Page 6 hit list (6 items, numbered)
hit_list:
  - { n: 1, title: "First Run",          body: "Where + how + why." }
  - { n: 2, title: "Lunch On Mountain",  body: "Place + dish + the joke." }
  - { n: 3, title: "Dinner",             body: "Place + dish + cocktail + the verdict." }
  - { n: 4, title: "Après-Ski",          body: "Place + scene + one tactical line." }
  - { n: 5, title: "Shop",               body: "What to buy + why." }
  - { n: 6, title: "The View",           body: "What to do + when + what to remember." }
---

## Essay — page 2 (one paragraph, ~110–150 words)

[The opening paragraph that frames the resort. Anchor in a specific concrete
detail, then widen to the verdict. Ends mid-thought so "continued ▸" makes
sense.]

## Essay — page 3 (two paragraphs, ~300–400 words combined)

[First paragraph — the signature memory of the trip. Specific, sensory,
include dialogue if you have it. End with a line that makes the reason
you're writing the book unmistakable.]

[Second paragraph — a second story that says something different. Often the
quiet one: a moment alone, an unexpected encounter, a thing you almost
didn't do. End with a forward-looking line.]

## Fauna (5 character entries)

### The Type-Name-In-Title-Case
One- or two-sentence diagnostic description. What they drive / wear / say /
ski. Be specific and gently mean.

### The Second Type
Description...

### The Third Type
Description...

### The Fourth Type
Description...

### The Fifth Type
Description...

## Witnessed (4 short items)

- 🩹 A specific moment — particular enough that it had to have happened.
- ⛷ Another moment — usually with one quote in italics.
- 🍕 A third moment — short, declarative, ends with the punchline.
- 🧇 A fourth — the editorial verdict in passing.
