/* Whistler Blackcomb — pages 5 & 6 (map + hit list), context wrapper, spreads */
/* eslint-disable */

const { useState: useStateW2, createContext: createCtxW, useContext: useCtxW } = React;

/* Shared hover state between map pins and hit-list rows */
const WhistlerHoverCtx = createCtxW({ hover: null, setHover: () => {} });

function WhistlerProvider({ children }) {
  const [hover, setHover] = useStateW2(null);
  return (
    <WhistlerHoverCtx.Provider value={{ hover, setHover }}>
      {children}
    </WhistlerHoverCtx.Provider>
  );
}

/* ============================================================
   Page 5 — The Map
   ============================================================ */
const PINS = [
  { n: 1, x: 78,  y: 26, label: 'Symphony Bowl', alt: '(Ski first)',  align: 'right' },
  { n: 2, x: 56,  y: 47, label: 'Crystal Hut',   alt: '(Lunch)',      align: 'left'  },
  { n: 3, x: 16,  y: 36, label: 'Spearhead Traverse', alt: '',        align: 'right' },
  { n: 4, x: 71,  y: 84, label: 'Après — Dusty\'s',    alt: '',       align: 'left'  },
  { n: 5, x: 50,  y: 88, label: 'Dinner — Sidecut', alt: '',          align: 'right' },
  { n: 6, x: 86,  y: 92, label: 'Peak 2 Peak ride', alt: '',          align: 'left'  },
];

function WhistlerPage5() {
  const { hover, setHover } = useCtxW(WhistlerHoverCtx);

  return (
    <Page side="left" runningHead="Whistler Blackcomb • The Map" folio="5">
      <div className="body-text" style={{ marginTop: 4, marginBottom: 10, textAlign: 'left', fontSize: 13 }}>
        The route in red is the <em style={{ color: 'var(--red)', fontWeight: 600 }}>Hit List's <span style={{ fontVariantCaps:'all-small-caps', letterSpacing:'.1em'}}>ski here first</span></em>: Excalibur Gondola → Solar Coaster → Symphony Bowl, and back down before anyone else has caught up.
      </div>

      <div className="map-canvas" style={{ flex: 1, position: 'relative' }}>
        <svg className="terrain" viewBox="0 0 600 600" preserveAspectRatio="none">
          <rect x="0" y="0" width="600" height="280" fill="#f0eadd" />
          <path d="M0 280 L40 200 L80 160 L120 110 L160 70 L200 130 L220 90 L260 150 L300 180 L340 130 L380 90 L410 60 L450 130 L490 170 L530 210 L570 240 L600 280 Z"
                fill="#e6dccc" stroke="#9a8e76" strokeWidth="1" />
          <path d="M0 320 L60 270 L110 240 L150 210 L200 240 L260 220 L300 250 L340 220 L400 250 L450 230 L500 260 L550 290 L600 310 L600 360 L0 360 Z"
                fill="#d9cdb8" stroke="#8a7e65" strokeWidth="1" opacity=".85" />
          <path d="M0 360 L60 350 L120 360 L200 350 L280 360 L360 350 L440 360 L520 350 L600 360 L600 440 L0 440 Z"
                fill="#cfc2a8" />
          <path d="M0 440 L600 440 L600 600 L0 600 Z" fill="#c4b698" />

          <text x="120" y="55" fontSize="11" fontWeight="700" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em'}}>BLACKCOMB</text>
          <text x="120" y="72" fontSize="9" fontStyle="italic" fill="#6e6660">2,440 m / 8,000 ft</text>
          <text x="380" y="55" fontSize="11" fontWeight="700" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em'}}>WHISTLER</text>
          <text x="380" y="72" fontSize="9" fontStyle="italic" fill="#6e6660">2,182 m / 7,160 ft</text>

          <path className="map-lift" d="M460 510 L380 90" />
          <path className="map-lift" d="M380 510 L160 70" />
          <path className="map-lift" d="M300 510 L80 160" />
          <path className="map-lift" d="M520 510 L450 130" />
          <path className="map-lift" d="M340 130 L260 150" />
          <path className="map-lift" d="M120 110 L60 270" />

          <path d="M160 70 L380 90" stroke="#8a7e65" strokeWidth="1.2" strokeDasharray="6 4" fill="none" />
          <text x="240" y="62" fontSize="9" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.14em', fontWeight:700}}>PEAK 2 PEAK</text>

          <text x="50" y="200" fontSize="9.5" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em', fontWeight:700}}>GLACIER BOWL</text>
          <text x="180" y="240" fontSize="9.5" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em', fontWeight:700}}>7TH HEAVEN</text>
          <text x="420" y="160" fontSize="9.5" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em', fontWeight:700}}>SOLAR COASTER</text>
          <text x="500" y="240" fontSize="9.5" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em', fontWeight:700}}>HARMONY</text>
          <text x="430" y="475" fontSize="9.5" fill="#1c1815" style={{fontVariantCaps:'all-small-caps', letterSpacing:'.12em', fontWeight:700}}>EXCALIBUR</text>

          <path className="map-route"
            d="M460 530
               C 460 480, 420 360, 380 90
               C 380 90, 340 80, 160 70
               C 160 70, 110 90, 80 160
               C 80 160, 200 320, 280 460
               C 280 460, 360 480, 430 510"
          />

          {Array.from({length: 28}).map((_, i) => {
            const x = (i * 23) % 600 + 10;
            const y = 380 + ((i * 7) % 60);
            return (
              <g key={i} transform={`translate(${x} ${y})`} opacity=".75">
                <path d="M 0 6 L -4 0 L 0 -6 L 4 0 Z" fill="#5b6a3f" />
              </g>
            );
          })}

          <g transform="translate(220 470)">
            <rect x="0" y="40" width="160" height="60" fill="#b8a583" />
            <polygon points="0,40 30,20 60,40" fill="#7a5638" />
            <polygon points="40,40 70,12 100,40" fill="#7a5638" />
            <polygon points="80,40 110,18 140,40" fill="#7a5638" />
            <polygon points="120,40 150,22 170,40" fill="#7a5638" />
            <polygon points="90,20 100,0 110,20" fill="#8a4a3a" />
            <rect x="95" y="20" width="10" height="20" fill="#b8a583" />
            <text x="80" y="115" fontSize="10" fill="#1c1815" fontStyle="italic">Whistler Village</text>
          </g>
        </svg>

        <div className="map-pins-layer">
          {PINS.map(p => (
            <div key={p.n}
                 className={`map-pin ${hover === p.n ? 'highlight' : ''}`}
                 style={{ left: `${p.x}%`, top: `${p.y}%` }}
                 onMouseEnter={() => setHover(p.n)}
                 onMouseLeave={() => setHover(null)}>
              {p.n}
            </div>
          ))}
          {PINS.map(p => (
            <div key={`l-${p.n}`} className="map-label"
                 style={{
                   left: p.align === 'right' ? `calc(${p.x}% + 16px)` : `calc(${p.x}% - 16px)`,
                   top: `calc(${p.y}% + 4px)`,
                   transform: p.align === 'right' ? 'none' : 'translateX(-100%)',
                   textAlign: p.align,
                 }}>
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
        Numbered points correspond to <em>The Hit List</em> on the next page.<br/>
        The recommended route is for clear-weather mornings; in storm, ski lower.
      </div>
    </Page>
  );
}

/* ============================================================
   Page 6 — The Hit List
   ============================================================ */
const HITS = [
  { n: 1, title: 'First Run',          hint: 'Empty wide-open Symphony Bowl run',
    body: 'Symphony Bowl (Whistler). Take 7th Heaven to the top. Stay skier\'s right and drop in early. Wide open, fast, and empty for exactly twelve minutes.' },
  { n: 2, title: 'Lunch On Mountain',  hint: 'Crystal Hut lodge in snow',
    body: 'Crystal Hut. Belgian waffles arriving with more whipped cream than waffle, the menu still claiming this is not a dessert. It is the dessert.' },
  { n: 3, title: 'Dinner',             hint: 'Plate of steak + fries + cocktail',
    body: 'Sidecut at the Four Seasons. Order the steak, extra fries with mayonnaise, gin on ice. The only steakhouse in town that doesn\'t apologize for being one.' },
  { n: 4, title: 'Après-Ski (Early)',  hint: 'Pint of beer in afternoon sun',
    body: 'Dusty\'s: a pint, sun on the face, boots still on. Do not overthink it.' },
  { n: 5, title: 'Shop',               hint: 'Brewery hat + shopping bags',
    body: 'The Whisttooth Brewing Co. hat. Because you were here, and because it\'s a very good hat.' },
  { n: 6, title: 'The View',           hint: 'Red gondola against mountain at sunset',
    body: 'Ride the Peak 2 Peak at sunset. Look both ways. Remember how big this place is.' },
];

function WhistlerPage6() {
  const { hover, setHover } = useCtxW(WhistlerHoverCtx);

  return (
    <Page side="right" runningHead="Whistler Blackcomb" folio="6">
      <div style={{ textAlign: 'center', marginTop: 8, position: 'relative' }}>
        <svg viewBox="0 0 60 24" style={{ width: 60, height: 24, color: 'var(--red)' }} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M30 22 L30 6" />
          <path d="M30 6 L18 14 M30 6 L42 14 M30 4 L24 12 M30 4 L36 12" />
        </svg>
        <h2 className="title-l" style={{ fontSize: 42, marginTop: 2, fontVariantCaps:'all-small-caps', letterSpacing:'.03em' }}>The Hit List</h2>
      </div>

      <div className="hit-list">
        {HITS.map(h => (
          <div key={h.n}
               className={`hit-row ${hover === h.n ? 'highlight' : ''}`}
               onMouseEnter={() => setHover(h.n)}
               onMouseLeave={() => setHover(null)}>
            <div className="hit-thumb">
              <span className="hit-num">{h.n}</span>
              <Illustration
                src={`assets/whistler/hit-${h.n}.jpg`}
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

      <svg viewBox="0 0 400 40" style={{ width: '100%', height: 32, marginTop: 'auto', color: 'var(--ink-mute)' }} fill="currentColor" opacity=".4">
        <path d="M0 40 L40 22 L70 30 L110 14 L150 26 L180 18 L210 30 L240 12 L280 26 L320 20 L360 30 L400 22 L400 40 Z" />
      </svg>
    </Page>
  );
}

/* ============================================================
   Spreads (an array of {left, right}) consumed by the App.
   ============================================================ */
window.WhistlerProvider = WhistlerProvider;
window.getWhistlerSpreads = () => [
  { left: <WhistlerPage1 />, right: <WhistlerPage2 /> },
  { left: <WhistlerPage3 />, right: <WhistlerPage4 /> },
  { left: <WhistlerPage5 />, right: <WhistlerPage6 /> },
];
