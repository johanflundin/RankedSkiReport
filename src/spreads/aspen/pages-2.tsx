import { Page } from '../../book/Page';
import { Illustration } from '../../book/Illustration';
import { useAspenHover } from './HoverContext';

type Pin = { n: number; x: number; y: number; label: string; alt: string; align: 'left' | 'right' };

const PINS: Pin[] = [
  { n: 1, x: 82, y: 24, label: 'Highland Bowl',       alt: '(Ski first)', align: 'right' },
  { n: 2, x: 74, y: 48, label: 'Cloud Nine',          alt: '(Lunch)',     align: 'left'  },
  { n: 3, x: 8,  y: 70, label: 'Pine Creek Cookhouse', alt: '(Dinner)',   align: 'right' },
  { n: 4, x: 62, y: 86, label: 'J-Bar — Hotel Jerome', alt: '',           align: 'left'  },
  { n: 5, x: 22, y: 28, label: 'Big Burn — Snowmass', alt: '(Dawn skin)', align: 'right' },
  { n: 6, x: 48, y: 92, label: 'Kemo Sabe',           alt: '(The trap)',  align: 'right' },
];

export function AspenPage5() {
  const { hover, setHover } = useAspenHover();

  return (
    <Page side="left" runningHead="Aspen • The Map" folio="5">
      <div className="body-text" style={{ marginTop: 4, marginBottom: 10, textAlign: 'left', fontSize: 13 }}>
        Aspen is a town with four ski mountains. Snowmass is the family mountain. Ajax is
        the in-town one with no green runs and a Louis Vuitton store at the base. Buttermilk
        hosts the X Games and is otherwise forgotten. Highlands has{' '}
        <em style={{ color: 'var(--red)', fontWeight: 600 }}>
          The Bowl <span style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.1em' }}>(ski first)</span>
        </em>{' '}— a forty-five-minute bootpack that humbles everyone who reaches it.
      </div>

      <div className="map-canvas" style={{ flex: 1, position: 'relative' }}>
        <img
          className="map-base"
          src="/assets/aspen/map.jpg"
          alt=""
          draggable={false}
        />
        <svg className="terrain" viewBox="0 0 600 600" preserveAspectRatio="none">
          <text x="80"  y="120" fontSize="12" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth="2.2" paintOrder="stroke" strokeLinejoin="round" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>SNOWMASS</text>
          <text x="80"  y="138" fontSize="9.5" fontStyle="italic" fill="#fefdf9" stroke="#1c1815" strokeWidth="1.6" paintOrder="stroke" strokeLinejoin="round">3,813 m / 12,510 ft</text>

          <text x="260" y="120" fontSize="11" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth="2.0" paintOrder="stroke" strokeLinejoin="round" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>BUTTERMILK</text>

          <text x="380" y="120" fontSize="12" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth="2.2" paintOrder="stroke" strokeLinejoin="round" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>HIGHLANDS</text>
          <text x="380" y="138" fontSize="9.5" fontStyle="italic" fill="#fefdf9" stroke="#1c1815" strokeWidth="1.6" paintOrder="stroke" strokeLinejoin="round">3,777 m / 12,392 ft</text>

          <text x="490" y="120" fontSize="12" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth="2.2" paintOrder="stroke" strokeLinejoin="round" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>AJAX</text>
          <text x="490" y="138" fontSize="9.5" fontStyle="italic" fill="#fefdf9" stroke="#1c1815" strokeWidth="1.6" paintOrder="stroke" strokeLinejoin="round">3,418 m / 11,212 ft</text>

          <path className="map-lift" d="M120 500 L120 160" />
          <path className="map-lift" d="M180 500 L180 200" />
          <path className="map-lift" d="M260 500 L260 180" />
          <path className="map-lift" d="M380 500 L380 160" />
          <path className="map-lift" d="M460 500 L420 200" />
          <path className="map-lift" d="M520 500 L520 180" />

          <text x="305" y="520" fontSize="10" fill="#fefdf9" stroke="#1c1815" strokeWidth="1.8" paintOrder="stroke" strokeLinejoin="round" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.14em', fontWeight: 700 }}>ASPEN VILLAGE</text>

          <path
            className="map-route"
            d="M490 540
               C 490 480, 470 360, 460 180
               C 460 160, 470 130, 490 130
               C 490 130, 500 145, 510 160"
          />
        </svg>

        <div className="map-pins-layer">
          {PINS.map(p => (
            <div
              key={p.n}
              className={`map-pin ${hover === p.n ? 'highlight' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setHover(p.n)}
              onMouseLeave={() => setHover(null)}
            >
              {p.n}
            </div>
          ))}
          {PINS.map(p => (
            <div
              key={`l-${p.n}`}
              className="map-label"
              style={{
                left: p.align === 'right' ? `calc(${p.x}% + 16px)` : `calc(${p.x}% - 16px)`,
                top: `calc(${p.y}% + 4px)`,
                transform: p.align === 'right' ? 'none' : 'translateX(-100%)',
                textAlign: p.align,
              }}
            >
              {p.label}
              {p.alt && <span className="alt">{p.alt}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="caption" style={{ marginTop: 10, lineHeight: 1.5 }}>
        Numbered points correspond to <em>The Hit List</em> on the next page.<br />
        The red route is the Highland Bowl bootpack — clear-weather only.
      </div>
    </Page>
  );
}

type Hit = { n: number; title: string; hint: string; body: string };

const HITS: Hit[] = [
  { n: 1, title: 'First Run',          hint: 'Skier dropping into the Highland Bowl after the bootpack ridge',
    body: "On a powder day: the Headwall off the High Alpine lift at Snowmass — snow so deep I genuinely wanted a snorkel. Clear day: Highland Bowl, after the bootpack you didn't think you'd survive." },
  { n: 2, title: 'Lunch On Mountain',  hint: 'Cloud Nine deck with champagne, dancing crowd at altitude',
    body: 'Cloud Nine at Highlands — champagne-spraying lunch where someone in a hat costs the catering bill. Or the Alpin Room (proper food, no nonsense) if you want to actually ski after.' },
  { n: 3, title: 'Dinner',             hint: 'Wood cabin restaurant lit at night, sleigh tracks in snow leading in',
    body: 'Pine Creek Cookhouse — reachable in winter only by sleigh. Exactly the kind of evening Aspen invented. The horse takes you out; you find out about yourself on the way back.' },
  { n: 4, title: 'Après-Ski',          hint: 'Dim historic bar interior — silver-mining-era J-Bar at Hotel Jerome',
    body: "The J-Bar at Hotel Jerome — historic, dim, where the silver miners actually drank. Or the St. Regis bar: celebrities posing early evening, Latin American crowd takes over by midnight." },
  { n: 5, title: 'Local Secret',       hint: 'Skinning skier at dawn climbing a quiet groomed run, no lifts running',
    body: 'Skin uphill from Snowmass Village to Big Burn at dawn. Properly cruel start. Completely empty. By the time the gondola opens you have had a workout, a view, and the mountain to yourself.' },
  { n: 6, title: 'The Trap',           hint: 'Shopping-bag pile inside a Western boutique, cowboy hats stacked on a counter',
    body: 'Spending the entire day at Kemo Sabe, then a four-hour lunch, then "we\'ll ski tomorrow." Aspen does this to people. Do not let it.' },
];

export function AspenPage6() {
  const { hover, setHover } = useAspenHover();

  return (
    <Page side="right" runningHead="Aspen" folio="6">
      <div style={{ textAlign: 'center', marginTop: 8, position: 'relative' }}>
        <svg
          viewBox="0 0 60 24"
          style={{ width: 60, height: 24, color: 'var(--red)' }}
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M30 22 L30 6" />
          <path d="M30 6 L18 14 M30 6 L42 14 M30 4 L24 12 M30 4 L36 12" />
        </svg>
        <h2 className="title-l" style={{ fontSize: 42, marginTop: 2, fontVariantCaps: 'all-small-caps', letterSpacing: '.03em' }}>
          The Hit List
        </h2>
      </div>

      <div className="hit-list">
        {HITS.map(h => (
          <div
            key={h.n}
            className={`hit-row ${hover === h.n ? 'highlight' : ''}`}
            onMouseEnter={() => setHover(h.n)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="hit-thumb">
              <span className="hit-num">{h.n}</span>
              <Illustration
                src={`/assets/aspen/hit-${h.n}.jpg`}
                hint={h.hint}
                className="illo-thumb-empty"
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <div>
              <div className="hit-title">{h.title}</div>
              <div className="hit-desc">{h.body}</div>
            </div>
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 400 40"
        style={{ width: '100%', height: 32, marginTop: 'auto', color: 'var(--ink-mute)' }}
        fill="currentColor"
        opacity=".4"
      >
        <path d="M0 40 L40 22 L70 30 L110 14 L150 26 L180 18 L210 30 L240 12 L280 26 L320 20 L360 30 L400 22 L400 40 Z" />
      </svg>
    </Page>
  );
}
