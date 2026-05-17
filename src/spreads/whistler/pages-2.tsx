import { Page } from '../../book/Page';
import { Illustration } from '../../book/Illustration';
import { useWhistlerHover } from './HoverContext';

type Pin = { n: number; x: number; y: number; label: string; alt: string; align: 'left' | 'right' };

const PINS: Pin[] = [
  { n: 1, x: 78, y: 26, label: 'Symphony Bowl',       alt: '(Ski first)', align: 'right' },
  { n: 2, x: 56, y: 47, label: 'Crystal Hut',          alt: '(Lunch)',     align: 'left'  },
  { n: 3, x: 16, y: 36, label: 'Spearhead Traverse',   alt: '',            align: 'right' },
  { n: 4, x: 71, y: 84, label: "Après — Dusty's",     alt: '',            align: 'left'  },
  { n: 5, x: 50, y: 88, label: 'Dinner — Sidecut',     alt: '',            align: 'right' },
  { n: 6, x: 86, y: 92, label: 'Peak 2 Peak ride',     alt: '',            align: 'left'  },
];

export function WhistlerPage5() {
  const { hover, setHover } = useWhistlerHover();

  return (
    <Page side="left" runningHead="Whistler Blackcomb • The Map" folio="5">
      <div className="body-text" style={{ marginTop: 4, marginBottom: 10, textAlign: 'left', fontSize: 13 }}>
        The route in red is the{' '}
        <em style={{ color: 'var(--red)', fontWeight: 600 }}>
          Hit List's <span style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.1em' }}>ski here first</span>
        </em>
        : Excalibur Gondola → Solar Coaster → Symphony Bowl, and back down before anyone else has caught up.
      </div>

      <div className="map-canvas" style={{ flex: 1, position: 'relative' }}>
        <img
          className="map-base"
          src="/assets/whistler/map.jpg"
          alt=""
          draggable={false}
        />
        <svg className="terrain" viewBox="0 0 600 600" preserveAspectRatio="none">
          <text x="120" y="55" fontSize="11" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth=".4" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>BLACKCOMB</text>
          <text x="120" y="72" fontSize="9" fontStyle="italic" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke">2,440 m / 8,000 ft</text>
          <text x="380" y="55" fontSize="11" fontWeight="700" fill="#fefdf9" stroke="#1c1815" strokeWidth=".4" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em' }}>WHISTLER</text>
          <text x="380" y="72" fontSize="9" fontStyle="italic" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke">2,182 m / 7,160 ft</text>

          <path className="map-lift" d="M460 510 L380 90" />
          <path className="map-lift" d="M380 510 L160 70" />
          <path className="map-lift" d="M300 510 L80 160" />
          <path className="map-lift" d="M520 510 L450 130" />
          <path className="map-lift" d="M340 130 L260 150" />
          <path className="map-lift" d="M120 110 L60 270" />

          <path d="M160 70 L380 90" stroke="#fefdf9" strokeWidth="1.4" strokeDasharray="6 4" fill="none" />
          <text x="240" y="62" fontSize="9" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.14em', fontWeight: 700 }}>PEAK 2 PEAK</text>

          <text x="50"  y="200" fontSize="9.5" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em', fontWeight: 700 }}>GLACIER BOWL</text>
          <text x="180" y="240" fontSize="9.5" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em', fontWeight: 700 }}>7TH HEAVEN</text>
          <text x="420" y="160" fontSize="9.5" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em', fontWeight: 700 }}>SOLAR COASTER</text>
          <text x="500" y="240" fontSize="9.5" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em', fontWeight: 700 }}>HARMONY</text>
          <text x="430" y="475" fontSize="9.5" fill="#fefdf9" stroke="#1c1815" strokeWidth=".3" paintOrder="stroke" style={{ fontVariantCaps: 'all-small-caps', letterSpacing: '.12em', fontWeight: 700 }}>EXCALIBUR</text>

          <path
            className="map-route"
            d="M460 530
               C 460 480, 420 360, 380 90
               C 380 90, 340 80, 160 70
               C 160 70, 110 90, 80 160
               C 80 160, 200 320, 280 460
               C 280 460, 360 480, 430 510"
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

        <div className="legend">
          <div className="legend-title">Legend</div>
          <div className="legend-row"><span className="legend-swatch"></span><span>Recommended route</span></div>
          <div className="legend-row"><span className="legend-swatch lift"></span><span>Lifts</span></div>
          <div className="legend-row"><span className="legend-swatch dot"></span><span>Hit List references</span></div>
        </div>
      </div>

      <div className="caption" style={{ marginTop: 10, lineHeight: 1.5 }}>
        Numbered points correspond to <em>The Hit List</em> on the next page.<br />
        The recommended route is for clear-weather mornings; in storm, ski lower.
      </div>
    </Page>
  );
}

type Hit = { n: number; title: string; hint: string; body: string };

const HITS: Hit[] = [
  { n: 1, title: 'First Run',         hint: 'Empty wide-open Symphony Bowl run',
    body: "Symphony Bowl (Whistler). Take 7th Heaven to the top. Stay skier's right and drop in early. Wide open, fast, and empty for exactly twelve minutes." },
  { n: 2, title: 'Lunch On Mountain', hint: 'Crystal Hut lodge in snow',
    body: 'Crystal Hut. Belgian waffles arriving with more whipped cream than waffle, the menu still claiming this is not a dessert. It is the dessert.' },
  { n: 3, title: 'Dinner',            hint: 'Plate of steak + fries + cocktail',
    body: "Sidecut at the Four Seasons. Order the steak, extra fries with mayonnaise, gin on ice. The only steakhouse in town that doesn't apologize for being one." },
  { n: 4, title: 'Après-Ski (Early)', hint: 'Pint of beer in afternoon sun',
    body: "Dusty's: a pint, sun on the face, boots still on. Do not overthink it." },
  { n: 5, title: 'Shop',              hint: 'Brewery hat + shopping bags',
    body: "The Whisttooth Brewing Co. hat. Because you were here, and because it's a very good hat." },
  { n: 6, title: 'The View',          hint: 'Red gondola against mountain at sunset',
    body: 'Ride the Peak 2 Peak at sunset. Look both ways. Remember how big this place is.' },
];

export function WhistlerPage6() {
  const { hover, setHover } = useWhistlerHover();

  return (
    <Page side="right" runningHead="Whistler Blackcomb" folio="6">
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
                src={`/assets/whistler/hit-${h.n}.jpg`}
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
