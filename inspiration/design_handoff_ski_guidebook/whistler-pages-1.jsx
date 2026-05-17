/* Whistler Blackcomb — pages 1-4 */
/* eslint-disable */

/* ============================================================
   Stat icons — small inline SVGs for the title-page strip
   ============================================================ */
const WIcon = ({ children, viewBox = "0 0 48 48" }) => (
  <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const IconMountainSingle = () => (
  <WIcon>
    <path d="M4 40 L18 14 L26 26 L32 18 L44 40 Z" fill="#fff" />
    <path d="M14 22 L18 14 L22 22" />
    <path d="M28 22 L32 18 L36 24" />
    <path d="M4 40 L44 40" />
  </WIcon>
);
const IconMountainDouble = () => (
  <WIcon>
    <path d="M4 40 L14 22 L20 30 L24 24 L30 32 L36 22 L44 40 Z" fill="#fff" />
    <path d="M10 28 L14 22 L18 28" />
    <path d="M32 28 L36 22 L40 28" />
    <path d="M4 40 L44 40" />
  </WIcon>
);
const IconVertical = () => (
  <WIcon>
    <path d="M24 8 L24 40" />
    <path d="M18 14 L24 8 L30 14" />
    <path d="M18 34 L24 40 L30 34" />
    <path d="M10 8 L10 40" strokeDasharray="2 3" />
    <path d="M38 8 L38 40" strokeDasharray="2 3" />
  </WIcon>
);
const IconGondola = () => (
  <WIcon>
    <path d="M4 10 L44 22" />
    <circle cx="14" cy="14" r="1.2" fill="currentColor" />
    <circle cx="34" cy="20" r="1.2" fill="currentColor" />
    <rect x="20" y="22" width="14" height="14" rx="2" fill="#fff" />
    <path d="M27 22 L27 18" />
    <path d="M22 28 L32 28" />
    <path d="M22 32 L32 32" />
  </WIcon>
);
const IconEpic = () => (
  <WIcon>
    <rect x="6" y="14" width="36" height="20" rx="3" fill="#fff" />
    <path d="M6 22 L42 22" strokeDasharray="1 2" opacity=".7" />
    <text x="24" y="30" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none" style={{fontFamily:'serif', fontWeight: 800, letterSpacing: '.12em'}}>EPIC</text>
  </WIcon>
);
const IconScript = () => (
  <WIcon viewBox="0 0 48 48">
    <text x="24" y="32" fontSize="22" textAnchor="middle" fill="currentColor" stroke="none" style={{fontFamily:'"EB Garamond", serif', fontStyle:'italic', fontWeight: 600}}>Vail</text>
  </WIcon>
);
const IconAbilities = () => (
  <WIcon>
    <circle cx="10" cy="15" r="2.4" fill="#fff" />
    <path d="M10 17.4 L10 26 M7 21 L13 21 M8 32 L10 26 L12 32" />
    <circle cx="24" cy="13" r="3" fill="#fff" />
    <path d="M24 16 L24 27 M20 21 L28 21 M21 34 L24 27 L27 34" />
    <circle cx="38" cy="11" r="3.6" fill="#fff" />
    <path d="M38 14.6 L38 28 M33 20 L43 20 M34 36 L38 28 L42 36" />
  </WIcon>
);
const IconPlane = () => (
  <WIcon>
    <path d="M6 28 L22 24 L38 8 L42 12 L26 28 L30 42 L26 44 L18 30 L8 34 L6 30 L18 26 Z" fill="#fff" />
  </WIcon>
);
const IconSun = () => (
  <WIcon>
    <circle cx="24" cy="24" r="7" fill="#fff" />
    <path d="M24 10 L24 6 M24 42 L24 38 M10 24 L6 24 M42 24 L38 24 M14 14 L11 11 M37 37 L34 34 M14 34 L11 37 M37 11 L34 14" />
  </WIcon>
);

const StatCell = ({ icon, label, value }) => (
  <div className="stat-cell">
    <div className="stat-icon">{icon}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

/* ============================================================
   Page 1 — opening illustration spread
   ============================================================ */
function WhistlerPage1() {
  return (
    <Page side="left" fullBleed>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Illustration
          src="assets/whistler/p1-opening.jpg"
          hint="Full-bleed watercolor: father standing in orange jacket, daughter fallen flat in the snow, alpine slope behind, other skiers in distance."
          style={{ position: 'absolute', inset: 0, border: 0 }}
        />
        <div style={{
          position: 'absolute',
          left: '46px', bottom: '70px',
          maxWidth: '220px',
          color: 'var(--ink)',
        }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '15px',
            lineHeight: 1.2,
            marginBottom: 6,
          }}>The aftermath.</div>
          <div style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: '13px',
            lineHeight: 1.45,
            color: 'var(--ink-soft)',
          }}>Father vertical,<br/>daughter horizontal,<br/>dignity asymmetric.</div>
          <div style={{
            marginTop: 12,
            fontSize: 11.5,
            fontStyle: 'italic',
            color: 'var(--ink-mute)',
            lineHeight: 1.35,
          }}>Blackcomb,<br/>March 2026.</div>
        </div>
        <div className="folio folio-bottom right" style={{ color: 'var(--snow)', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>1</div>
      </div>
    </Page>
  );
}

/* ============================================================
   Page 2 — title page with stat grid
   ============================================================ */
function WhistlerPage2() {
  return (
    <Page side="right" folio="2">
      <div className="eyebrow">North America<span className="dot">•</span>Entry 6 of 20</div>
      <h1 className="title-xl">Whistler<br/>Blackcomb</h1>
      <div className="subloc">British Columbia, Canada</div>

      <p className="deck">
        The Costco of ski resorts: enormous, comprehensive,<br/>
        and you will lose your group within the first hour.
      </p>

      <div style={{ position: 'absolute', right: 28, top: 44, width: 260, height: 260 }}>
        <Illustration
          src="assets/whistler/p2-gondola.jpg"
          hint="Watercolor: a single red Peak 2 Peak gondola cabin on a cable, descending past dark conifers."
          style={{ width: '100%', height: '100%', border: 0, background: 'transparent' }}
        />
      </div>

      <div className="stat-grid stat-grid-4" style={{ marginTop: 22 }}>
        <StatCell icon={<IconMountainSingle/>} label="Blackcomb" value={<>2,440 m <span className="slash">/</span> 8,000 ft</>} />
        <StatCell icon={<IconMountainDouble/>} label="Whistler" value={<>2,182 m <span className="slash">/</span> 7,160 ft</>} />
        <StatCell icon={<IconVertical/>} label="Vertical" value={<>1,609 m <span className="slash">/</span> 5,280 ft</>} />
        <StatCell icon={<IconGondola/>} label="36 Lifts" value="mostly modern" />
      </div>
      <div className="stat-grid stat-grid-5">
        <StatCell icon={<IconEpic/>} label="Epic" value="Epic Pass" />
        <StatCell icon={<IconScript/>} label="Vail" value="Vail-owned" />
        <StatCell icon={<IconAbilities/>} label="All abilities" value="beginner to expert" />
        <StatCell icon={<IconPlane/>} label="YVR" value="+ 2 hr transfer" />
        <StatCell icon={<IconSun/>} label="Nov – May" value="season window" />
      </div>

      <div style={{ marginTop: 14, fontStyle: 'italic', color: 'var(--red)', fontWeight: 600, fontSize: 12.5 }}>
        Visited March 2026, when you were five and didn't yet know how to be afraid.
      </div>

      <div className="hr"></div>

      <div className="body-text" style={{ flex: 1 }}>
        <p>
          Whistler is the resort named when someone who doesn't ski asks where they should
          ski. It is, technically, the biggest in North America — a stat that means a lot
          to ESPN broadcasters and very little to a man trying to find his wife after three
          lift transfers and a glacier traverse. The actual selling point is that it can
          absorb anyone: a father-in-law who skis once a year, a kindergartener who has just
          graduated from the magic carpet, a Norwegian touring couple planning to sleep
          overnight in a backcountry cabin so they can ski back the next day.
          We overheard them. They were serious.
        </p>
        <p style={{ textAlign: 'right', fontStyle: 'italic', color: 'var(--red)', marginTop: 'auto' }}>
          continued ▸
        </p>
      </div>
    </Page>
  );
}

/* ============================================================
   Page 3 — essay continued + portrait
   ============================================================ */
function WhistlerPage3() {
  return (
    <Page side="left" runningHead="Whistler Blackcomb" folio="3">
      <div style={{ height: 14 }} />
      <div className="body-text" style={{ marginTop: 18 }}>
        <p>
          The moment I'll always remember from this trip: I convinced you to ski the Blackcomb
          Glacier with me. Your mother declined, on grounds of sanity. We rode three lifts
          to the top — Excalibur, then Solar Coaster, then 7th Heaven — and traversed onto
          the cornice. I went first, immediately ate it, and lost a ski tumbling down the slope.
          From above, your mother visibly considered our marriage. You watched all of this
          calmly, then jumped in without hesitation, skied down to me, and shouted up the
          slope: "Don't worry, Mommy! If I can do it, you can do it!" A second mother nearby
          asked, completely seriously, if she could borrow you for confidence. You won't
          remember any of this. That's why I'm writing it down.
        </p>
        <p>
          A few days later your mother flew back to California for work, leaving you with the
          au pair and me with — for the first time in years — a full ski day to myself. I
          skinned up Blackcomb. Halfway up I fell on a patch of ice, my ski released, and I
          self-arrested with my poles like a man who'd watched the YouTube video about it the
          previous evening. At the summit I met two Slovaks living in Squamish, both on skis
          older than you, who invited me to drop into the Spearhead Traverse with them. New
          terrain, no plan, two strangers I'd known for thirty minutes, an old-school
          commitment to the kind of skiing where the route is mostly improvised. I came back
          six hours later with frozen sandwich crumbs in my pocket and the strong sense I'd
          done something I shouldn't have been allowed to. I'll tell you about the Slovaks
          when you're older.
        </p>
      </div>

      <Illustration
        src="assets/whistler/p3-portrait.jpg"
        hint="Watercolor portrait of the daughter mid-mountain in pink jacket, distant skiers and conifers behind a wood-rail fence."
        style={{ marginTop: 20, width: '100%', flex: 1, minHeight: 240 }}
      />
      <div className="caption" style={{ marginTop: 10 }}>
        You, mid-mountain. The outfit was non-negotiable.
      </div>
    </Page>
  );
}

/* ============================================================
   Page 4 — Field Guide: Local Fauna + Witnessed
   ============================================================ */
function FaunaItem({ slug, name, hint, children }) {
  return (
    <div className="fauna-item">
      <Illustration
        src={`assets/whistler/fauna-${slug}.jpg`}
        hint={hint}
        className="illo-circle"
        style={{ width: 80, height: 80 }}
      />
      <div>
        <div className="fauna-name">{name}</div>
        <div className="fauna-desc">{children}</div>
      </div>
    </div>
  );
}

function WitnessItem({ icon, text }) {
  return (
    <div className="witness-item">
      <div className="witness-icon" style={{ fontSize: 18 }}>{icon}</div>
      <div className="witness-text">{text}</div>
    </div>
  );
}

function WhistlerPage4() {
  return (
    <Page side="right" runningHead="Whistler Blackcomb" folio="4">
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, marginTop: 16, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 10 }}>Field Guide To</div>
          <h2 className="title-m" style={{ marginTop: 6, color: 'var(--red)', fontVariantCaps: 'all-small-caps', letterSpacing: '.05em' }}>
            The Local Fauna
          </h2>
          <div className="hr-dot"></div>

          <div className="fauna-list">
            <FaunaItem slug="weekender" hint="SUV with ski stickers" name="The Vancouver Weekender">
              Drives a Pathfinder with three season-pass stickers, fixes been here 47 times.
              Will tell you about a "secret" run at Symphony Bowl that everyone already knows.
            </FaunaItem>
            <FaunaItem slug="lifty" hint="young man, goggles, beanie" name="The Aussie Lifty (Jack)">
              One of a dozen Jacks here on a working-holiday visa. Will high-five your kid.
              Will outski you on his lunch break.
            </FaunaItem>
            <FaunaItem slug="heir" hint="older gent, fur hat" name="The Time-Share Heir">
              Grandparents bought a unit in 1989 for $80K. Now worth $1.2M. Cannot ski; will
              not admit this. Refers to the unit as "ours" with no further explanation.
            </FaunaItem>
            <FaunaItem slug="touring" hint="couple in Arc'teryx with pulks" name="The Touring Couple in Arc'teryx">
              Going to overnight in a backcountry hut. Will tell you about it whether you
              ask or not. Pulks. Pulks!
            </FaunaItem>
            <FaunaItem slug="exec" hint="man in suit + coffee" name="The Vail Resorts Executive">
              Skis once a year, in a complimentary suite. Cannot explain the lift system.
              Publishes a press release about "guest experience" while the Excalibur queue
              stretches to the parking lot.
            </FaunaItem>
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 24 }}>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 9.5 }}>
            Spotted, Overheard, or<br/>Otherwise Witnessed
          </div>
          <div className="hr-dot" style={{ marginTop: 12 }}></div>

          <div className="witness-list">
            <WitnessItem icon="🩹" text="Two locals bragging about lift-line cuts at 7th Heaven; found ten minutes later sitting next to a rock with what was almost certainly a fractured tibia. The mountain has its own justice system." />
            <WitnessItem icon="⛷" text="A father at the Excalibur queue carrying his crying son's skis, his crying son's poles, his crying son's boots, and the crying son. Six minutes from the lodge." />
            <WitnessItem icon="🍕" text='A man teaching his wife to ski using only the phrase "pizza, French fry, pizza, French fry" for forty-five uninterrupted minutes.' />
            <WitnessItem icon="🧇" text='A snowboarder in the Crystal Hut line, in complete earnest, complaining that the waffle was "too sweet."' />
          </div>
        </div>
      </div>
    </Page>
  );
}

window.WhistlerPage1 = WhistlerPage1;
window.WhistlerPage2 = WhistlerPage2;
window.WhistlerPage3 = WhistlerPage3;
window.WhistlerPage4 = WhistlerPage4;
