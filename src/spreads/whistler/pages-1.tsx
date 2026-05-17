import type { ReactNode } from 'react';
import { Page } from '../../book/Page';
import { Illustration } from '../../book/Illustration';
import {
  IconMountainSingle,
  IconMountainDouble,
  IconVertical,
  IconGondola,
  IconEpic,
  IconScript,
  IconAbilities,
  IconPlane,
  IconSun,
} from './icons';

const StatCell = ({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) => (
  <div className="stat-cell">
    <div className="stat-icon">{icon}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

export function WhistlerPage1() {
  return (
    <Page side="left" fullBleed>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Illustration
          src="/assets/whistler/p1-opening.jpg"
          hint="Full-bleed watercolor: father standing in orange jacket, daughter fallen flat in the snow, alpine slope behind, other skiers in distance."
          style={{ position: 'absolute', inset: 0, border: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            left: '46px',
            bottom: '70px',
            maxWidth: '220px',
            color: 'var(--ink)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: '15px',
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            The aftermath.
          </div>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: '13px',
              lineHeight: 1.45,
              color: 'var(--ink-soft)',
            }}
          >
            Father vertical,<br />daughter horizontal,<br />dignity asymmetric.
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 11.5,
              fontStyle: 'italic',
              color: 'var(--ink-mute)',
              lineHeight: 1.35,
            }}
          >
            Blackcomb,<br />March 2026.
          </div>
        </div>
        <div
          className="folio folio-bottom right"
          style={{ color: 'var(--snow)', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}
        >
          1
        </div>
      </div>
    </Page>
  );
}

export function WhistlerPage2() {
  return (
    <Page side="right" folio="2">
      <div className="eyebrow">
        North America<span className="dot">•</span>Entry 6 of 20
      </div>
      <h1 className="title-xl">
        Whistler<br />Blackcomb
      </h1>
      <div className="subloc">British Columbia, Canada</div>

      <p className="deck">
        The Costco of ski resorts: enormous, comprehensive,<br />
        and you will lose your group within the first hour.
      </p>

      <div style={{ position: 'absolute', right: 28, top: 44, width: 260, height: 260 }}>
        <Illustration
          src="/assets/whistler/p2-gondola.jpg"
          hint="Watercolor: a single red Peak 2 Peak gondola cabin on a cable, descending past dark conifers."
          style={{ width: '100%', height: '100%', border: 0, background: 'transparent' }}
        />
      </div>

      <div className="info-box-overlay" style={{ marginTop: 22 }}>
        <div className="stat-grid stat-grid-4">
          <StatCell icon={<IconMountainSingle />} label="Blackcomb" value={<>2,440 m <span className="slash">/</span> 8,000 ft</>} />
          <StatCell icon={<IconMountainDouble />} label="Whistler"  value={<>2,182 m <span className="slash">/</span> 7,160 ft</>} />
          <StatCell icon={<IconVertical />}        label="Vertical"  value={<>1,609 m <span className="slash">/</span> 5,280 ft</>} />
          <StatCell icon={<IconGondola />}         label="36 Lifts"  value="mostly modern" />
        </div>
        <div className="stat-grid stat-grid-5">
          <StatCell icon={<IconEpic />}      label="Epic"          value="Epic Pass" />
          <StatCell icon={<IconScript />}    label="Vail"          value="Vail-owned" />
          <StatCell icon={<IconAbilities />} label="All abilities" value="beginner to expert" />
          <StatCell icon={<IconPlane />}     label="YVR"           value="+ 2 hr transfer" />
          <StatCell icon={<IconSun />}       label="Nov – May"     value="season window" />
        </div>
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
        <p style={{ textAlign: 'right', fontStyle: 'italic', color: 'var(--red)' }}>
          continued ▸
        </p>
      </div>
    </Page>
  );
}

export function WhistlerPage3() {
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
        src="/assets/whistler/p3-portrait.jpg"
        hint="Watercolor portrait of the daughter mid-mountain in pink jacket, distant skiers and conifers behind a wood-rail fence."
        style={{ marginTop: 20, width: '100%', flex: 1, minHeight: 240 }}
      />
      <div className="caption" style={{ marginTop: 10 }}>
        You, mid-mountain. The outfit was non-negotiable.
      </div>
    </Page>
  );
}

function FaunaItem({ slug, name, hint, children }: { slug: string; name: string; hint: string; children: ReactNode }) {
  return (
    <div className="fauna-item">
      <Illustration
        src={`/assets/whistler/fauna-${slug}.jpg`}
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

function WitnessItem({ slug, text }: { slug: string; text: ReactNode }) {
  return (
    <div className="witness-item">
      <Illustration
        src={`/assets/whistler/spotted-${slug}.jpg`}
        hint=" "
        className="illo-circle"
        style={{ width: 42, height: 42 }}
      />
      <div className="witness-text">{text}</div>
    </div>
  );
}

export function WhistlerPage4() {
  return (
    <Page side="right" runningHead="Whistler Blackcomb" folio="4">
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, marginTop: 16, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 10 }}>Field Guide To</div>
          <h2
            className="title-m"
            style={{ marginTop: 6, color: 'var(--red)', fontVariantCaps: 'all-small-caps', letterSpacing: '.05em' }}
          >
            The Local Fauna
          </h2>
          <div className="hr-dot"></div>

          <div className="fauna-list">
            <FaunaItem slug="weekender" hint="SUV with ski stickers" name="The Vancouver Weekender">
              Drives a Pathfinder with three season-pass stickers. Has been here 47 times.
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
            Spotted, Overheard, or<br />Otherwise Witnessed
          </div>
          <div className="hr-dot" style={{ marginTop: 12 }}></div>

          <div className="witness-list">
            <WitnessItem slug="tibia" text="Two locals bragging about lift-line cuts at 7th Heaven; found ten minutes later sitting next to a rock with what was almost certainly a fractured tibia. The mountain has its own justice system." />
            <WitnessItem slug="overloaded" text="A father at the Excalibur queue carrying his crying son's skis, his crying son's poles, his crying son's boots, and the crying son. Six minutes from the lodge." />
            <WitnessItem slug="pizza" text={<>A man teaching his wife to ski using only the phrase <em>"pizza, French fry, pizza, French fry"</em> for forty-five uninterrupted minutes.</>} />
            <WitnessItem slug="waffle" text={<>A snowboarder in the Crystal Hut line, in complete earnest, complaining that the waffle was "too sweet."</>} />
          </div>
        </div>
      </div>
    </Page>
  );
}
