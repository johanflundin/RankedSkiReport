import type { ReactNode } from 'react';
import { Page } from '../../book/Page';
import { Illustration } from '../../book/Illustration';
import {
  IconMountainSingle,
  IconMountainDouble,
  IconMountainTriple,
  IconGondola,
  IconIkon,
  IconAlterra,
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

export function AspenPage1() {
  return (
    <Page side="left" fullBleed>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Illustration
          src="/assets/aspen/p1-opening.jpg"
          hint="Full-bleed watercolor: five-year-old daughter on a horse-drawn sleigh in heavy snowfall, driving the reins along a Colorado dirt road, dark conifers behind."
          style={{ position: 'absolute', inset: 0, border: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            left: '46px',
            bottom: '70px',
            maxWidth: '230px',
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
            Five years old, driving.
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
            Snowfall, a Colorado<br />dirt road. The horse knew<br />the way. We did not.
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
            Castle Creek Valley,<br />December 2024.
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

export function AspenPage2() {
  return (
    <Page side="right" folio="2">
      <div className="eyebrow">
        North America<span className="dot">•</span>Entry 3 of 20
      </div>
      <h1 className="title-xl">Aspen</h1>
      <div className="subloc">Colorado, USA</div>

      <p className="deck">
        Three things at Aspen are world-class.<br />
        Skiing isn't one of them.
      </p>

      <div style={{ position: 'absolute', right: 28, top: 44, width: 260, height: 260 }}>
        <Illustration
          src="/assets/aspen/p2-signature.jpg"
          hint="Watercolor: the Maroon Bells in winter — twin rust-red rock peaks dusted with snow, reflected in a frozen alpine lake, conifers in the foreground."
          style={{ width: '100%', height: '100%', border: 0, background: 'transparent' }}
        />
      </div>

      <div className="info-box-overlay" style={{ marginTop: 22 }}>
        <div className="stat-grid stat-grid-4">
          <StatCell icon={<IconMountainSingle />} label="Aspen Mtn" value={<>3,418 m <span className="slash">/</span> 11,212 ft</>} />
          <StatCell icon={<IconMountainTriple />} label="Snowmass"  value={<>3,813 m <span className="slash">/</span> 12,510 ft</>} />
          <StatCell icon={<IconMountainDouble />} label="Highlands" value={<>3,777 m <span className="slash">/</span> 12,392 ft</>} />
          <StatCell icon={<IconGondola />}        label="42 Lifts"  value="across 4 mountains" />
        </div>
        <div className="stat-grid stat-grid-5">
          <StatCell icon={<IconIkon />}      label="Ikon"           value="Ikon Pass" />
          <StatCell icon={<IconAlterra />}   label="Alterra"        value="Alterra-owned" />
          <StatCell icon={<IconAbilities />} label="All abilities"  value="beginner to expert" />
          <StatCell icon={<IconPlane />}     label="ASE"            value={<>direct <span className="slash">/</span> DEN + 4 hr</>} />
          <StatCell icon={<IconSun />}       label="Nov – Apr"      value="reliable" />
        </div>
      </div>

      <div style={{ marginTop: 14, fontStyle: 'italic', color: 'var(--red)', fontWeight: 600, fontSize: 12.5 }}>
        Visited March 2020, when you were three months old, and December 2024, when you learned to ski under candy duress.
      </div>

      <div className="hr"></div>

      <div className="body-text" style={{ flex: 1 }}>
        <p>
          Aspen is the resort that comes up when someone wants you to know they have money.
          Not necessarily their money — their access to money, their proximity to money,
          their willingness to spend money on a sandwich. The skiing is fine. The skiing has
          always been fine. The skiing is in fact the fourth thing about Aspen, behind the
          food, the shopping, and the people, and pretty much everyone there will agree with
          you about that if you catch them at the right moment in their second espresso martini.
        </p>
        <p style={{ textAlign: 'right', fontStyle: 'italic', color: 'var(--red)' }}>
          continued ▸
        </p>
      </div>
    </Page>
  );
}

export function AspenPage3() {
  return (
    <Page side="left" runningHead="Aspen" folio="3">
      <div style={{ height: 14 }} />
      <div className="body-text" style={{ marginTop: 18 }}>
        <p>
          On our first trip you were three months old. I bolted skis to the bottom of your
          stroller and pushed you from Snowmass Village up to Sam's Knob every morning while
          your mother and I traded shifts on the actual mountain. You slept through all of
          it. You also slept through your first chairlift ride, which I'll always feel
          slightly cheated about. On our second trip, four years later, you had developed
          strong opinions about cold things, resistance training, and the combined effect of
          helmet, goggles, mittens, and a parent shouting <em>"pizza, pizza!"</em> at you —
          which was not as motivating as we'd hoped. The solution turned out to be candy.
          One Sour Patch Kid for every successful turn. Two for a full pizza wedge to a stop.
          Three for not crying at the lift. By the end of the second day you were skiing
          green runs at Snowmass, fully addicted, charting your own descent in inches between
          candy stations. We will not be discussing the long-term lessons here.
        </p>
        <p>
          The other moment from that trip wasn't on the mountain. We took a horse-drawn
          sleigh out the Castle Creek valley to the Pine Creek Cookhouse, a wood-cabin
          restaurant reachable in winter only by sleigh, snowmobile, or cross-country ski.
          The driver handed you the reins about halfway in. You drove a horse for the first
          time at age five, in a snowfall, in the Colorado mountains, with complete focus
          while the rest of us pretended not to be terrified. The horse knew the way. We
          did not.
        </p>
      </div>

      <Illustration
        src="/assets/aspen/p3-portrait.jpg"
        hint="Watercolor portrait: the daughter at the Snowmass kids' lesson area, helmet/goggles/mittens, mid-pizza-wedge, a Sour Patch Kid clutched in one mitten."
        style={{ marginTop: 20, width: '100%', flex: 1, minHeight: 240 }}
      />
      <div className="caption" style={{ marginTop: 10 }}>
        You, on the bunny slope. The candy was the difference.
      </div>
    </Page>
  );
}

function FaunaItem({ slug, name, hint, children }: { slug: string; name: string; hint: string; children: ReactNode }) {
  return (
    <div className="fauna-item">
      <Illustration
        src={`/assets/aspen/fauna-${slug}.jpg`}
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

function WitnessItem({ slug, title, children }: { slug: string; title: string; children: ReactNode }) {
  return (
    <div className="witness-item">
      <Illustration
        src={`/assets/aspen/spotted-${slug}.jpg`}
        hint=" "
        className="illo-circle"
        style={{ width: 80, height: 80 }}
      />
      <div>
        <div className="witness-name">{title}</div>
        <div className="witness-desc">{children}</div>
      </div>
    </div>
  );
}

export function AspenPage4() {
  return (
    <Page side="right" runningHead="Aspen" folio="4">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 16, height: '100%' }}>
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
            <FaunaItem slug="husband-hunter" hint="Glamorous woman in fur-trimmed coat at evening" name="The Husband Hunter">
              Vacationing in pursuit of a different kind of dependent. From Miami or Munich,
              unclear. Was once on The Bachelor or knew someone who was. Will appear at
              Caribou Club, Casa Tua, Kemo Sabe — and apparently nowhere in daylight.
            </FaunaItem>
            <FaunaItem slug="influencer" hint="Young woman in one-piece ski suit posing with tripod" name="The Influencer Who Doesn't Ski">
              Owns the gear but has never used it. Will set up a tripod at the base of Ajax
              to film herself walking past the gondola in a one-piece. Has 184K followers.
              They will all see the snow. None of them will see her ski.
            </FaunaItem>
            <FaunaItem slug="netjets-dad" hint="Middle-aged man on a phone call, ski boots on, distracted" name="The NetJets Dad">
              Flew in Saturday morning, flying out Sunday night. Has three kids in lessons
              he won't watch. Has a sales call at 8 AM Monday. Talks about Aspen the way
              other people talk about the gym.
            </FaunaItem>
            <FaunaItem slug="old-money" hint="Older couple in unbranded fleece, understated" name="The Financial Elite">
              Old money. Recognizable by what they're not wearing (logos), what they're not
              driving (anything with a key fob), and where they're staying (their own
              house). Will never say what they actually do. Will mention they've been here
              every Christmas since 1987.
            </FaunaItem>
            <FaunaItem slug="founder" hint="Man in unlogo'd fleece vest, animated mid-conversation" name="The Founder Who Just Sold">
              Sold a company last year. Will tell you the multiple if you ask, and also if
              you don't. Wears a fleece vest with no logo (he removed it). At Cloud Nine,
              will ask serious questions about wine pairings. Currently "investing the
              proceeds."
            </FaunaItem>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 10 }}>Spotted, Overheard, or Otherwise Witnessed</div>
          <h2
            className="title-m"
            style={{ marginTop: 6, color: 'var(--red)', fontVariantCaps: 'all-small-caps', letterSpacing: '.05em' }}
          >
            The Sightings
          </h2>
          <div className="hr-dot"></div>

          <div className="witness-list">
            <WitnessItem slug="argentine" title="The Three-Month Residents">
              At the St. Regis bar at 1 AM: an Argentine family of seven taking up two banquettes, ordering only Don Julio. They were not on vacation. They lived here three months a year.
            </WitnessItem>
            <WitnessItem slug="hat" title="The Forty-Five-Minute Hat">
              A man at Kemo Sabe spending forty-five minutes choosing between two nearly identical cowboy hats. His wife sat on a bench outside, scrolling, having long since chosen hers.
            </WitnessItem>
            <WitnessItem slug="veuve" title="$400 of Foam">
              A man at Cloud Nine, in complete earnest, spraying a $400 bottle of Veuve Clicquot at his wife and three of her friends at 1 PM. They were laughing. The waiter was not.
            </WitnessItem>
            <WitnessItem slug="buddy" title="Buddy">
              A father at the bottom of the Snowmass kids' lesson area, to his sobbing five-year-old: <em>"Buddy. I paid for this. I paid a lot for this."</em>
            </WitnessItem>
          </div>
        </div>
      </div>
    </Page>
  );
}
