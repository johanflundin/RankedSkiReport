/* Main app — sidebar nav, stage with auto-scale, page-flip across the
   entire book (TOC + 20 entries × 3 spreads each), parallax backdrop. */
/* eslint-disable */

const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM, useCallback: useCb } = React;

const SPREADS_PER_ENTRY = 3;
const FLIP_MS = 420;

/* ============================================================
   Backdrop — parallax mountain ridges + falling snow
   ============================================================ */
function Backdrop({ mouseX, mouseY }) {
  const tx1 = (mouseX - 0.5) * 18,  ty1 = (mouseY - 0.5) * 4;
  const tx2 = (mouseX - 0.5) * 32,  ty2 = (mouseY - 0.5) * 6;
  const tx3 = (mouseX - 0.5) * 48,  ty3 = (mouseY - 0.5) * 8;
  return (
    <div className="backdrop">
      <div className="stars" />
      <div className="ridge ridge-1" style={{ transform: `translate(${tx1}px, ${ty1}px)` }}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0 280 L60 200 L120 220 L200 140 L260 180 L340 120 L420 170 L500 110 L580 160 L660 100 L740 150 L820 130 L900 170 L980 140 L1060 190 L1140 160 L1200 200 L1200 280 Z" fill="#1f2c40" />
        </svg>
      </div>
      <div className="ridge ridge-2" style={{ transform: `translate(${tx2}px, ${ty2}px)` }}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0 280 L80 240 L160 180 L240 220 L320 160 L400 200 L480 140 L560 180 L640 130 L720 170 L800 145 L880 185 L960 160 L1040 200 L1120 170 L1200 210 L1200 280 Z" fill="#162033" />
        </svg>
      </div>
      <div className="ridge ridge-3" style={{ transform: `translate(${tx3}px, ${ty3}px)` }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0 200 L120 160 L240 180 L360 140 L480 170 L600 130 L720 165 L840 150 L960 175 L1080 155 L1200 180 L1200 200 Z" fill="#0a1120" />
        </svg>
      </div>
      <div className="snow-layer">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = (i * 53) % 100;
          const dur = 8 + (i % 9) * 2.4;
          const delay = -((i * 0.7) % dur);
          const size = 1.5 + (i % 4) * 0.9;
          const drift = ((i % 5) - 2) * 25;
          const opacity = 0.35 + (i % 6) * 0.08;
          return (
            <div key={i} className="snow-flake"
                 style={{ left: `${left}%`, width: size, height: size,
                          animationDuration: `${dur}s`, animationDelay: `${delay}s`,
                          '--drift': `${drift}px`, '--o': opacity, opacity }} />
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Sidebar
   ============================================================ */
function Sidebar({ resorts, view, currentIdx, onPickToc, onPick }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">Twenty<br/>Mountains</div>
      <div className="sidebar-sub">A father's field guide</div>

      <div className="sidebar-eyebrow" onClick={onPickToc} style={{ cursor: 'pointer' }}>Contents</div>
      <ul className="sidebar-list">
        <li className={`sidebar-item ${view === 'toc' ? 'active' : ''}`} onClick={onPickToc}>
          <span className="num">↖</span>
          <span><span className="name">Table of contents</span></span>
        </li>
      </ul>

      <div className="sidebar-eyebrow">The Twenty</div>
      <ul className="sidebar-list">
        {resorts.map((r, i) => (
          <li key={r.slug}
              className={`sidebar-item ${view === 'entry' && currentIdx === i ? 'active' : ''} ${r.forthcoming ? 'forthcoming' : ''}`}
              onClick={() => !r.forthcoming && onPick(i)}>
            <span className="num">{String(i+1).padStart(2,'0')}</span>
            <span>
              <span className="name">{r.name}</span>
              <span className="loc">{r.location}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        Click any entry to open the book.<br/>
        Use ← → keys or the side arrows to turn pages.
      </div>
    </nav>
  );
}

/* ============================================================
   Walk the book linearly — TOC is "spread -1", each non-forthcoming
   entry contributes 3 spreads. Convert (view, idx, spread) ↔ globalIdx
   and step through it.
   ============================================================ */
function buildSpreadOrder(resorts) {
  // returns array of { kind: 'toc' | 'entry', resortIdx?, spreadIdx? }
  const order = [{ kind: 'toc' }];
  resorts.forEach((r, i) => {
    if (!r.forthcoming) {
      for (let s = 0; s < SPREADS_PER_ENTRY; s++) {
        order.push({ kind: 'entry', resortIdx: i, spreadIdx: s });
      }
    }
  });
  return order;
}

/* ============================================================
   App
   ============================================================ */
function App() {
  const resorts = window.RESORTS;
  const order = useM(() => buildSpreadOrder(resorts), [resorts]);

  // start at the TOC (global = 0)
  const [globalIdx, setGlobalIdx] = useS(0);

  // animation: track from→to and direction; null when not flipping
  const [flipping, setFlipping] = useS(null);
  const flipBusy = useR(false);

  const [scale, setScale] = useS(1);
  const stageRef = useR(null);
  const [mouseX, setMouseX] = useS(0.5);
  const [mouseY, setMouseY] = useS(0.5);

  const current = order[globalIdx];
  const isToc = current.kind === 'toc';
  const currentResort = isToc ? null : resorts[current.resortIdx];

  /* Auto-scale */
  useE(() => {
    function fit() {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const designW = 800 * 2, designH = 800, pad = 80;
      const s = Math.min((r.width - pad) / designW, (r.height - pad) / designH, 1);
      setScale(s);
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  /* Mouse parallax */
  useE(() => {
    function onMove(e) {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Build {left, right} React nodes for any global index. */
  const getSpreadParts = useCb((idx) => {
    const o = order[idx];
    if (!o) return null;
    if (o.kind === 'toc') {
      return {
        left: <TocLeftPage onSelect={jumpToResortRef.current} />,
        right: <TocRightPage onSelect={jumpToResortRef.current} />,
        provider: null,
      };
    }
    const r = resorts[o.resortIdx];
    if (r.full && r.slug === 'whistler') {
      const sp = window.getWhistlerSpreads()[o.spreadIdx];
      return { left: sp.left, right: sp.right, provider: WhistlerProvider };
    }
    const sp = window.getShellSpreads(r, o.resortIdx + 1)[o.spreadIdx];
    return { left: sp.left, right: sp.right, provider: null };
  }, [order, resorts]);

  // forward declare jumpToResort so getSpreadParts can reference it via ref
  const jumpToResortRef = useR(() => {});

  /* Navigation */
  const flipTo = useCb((newGlobal, dir) => {
    if (flipBusy.current) return;
    if (newGlobal < 0 || newGlobal >= order.length) return;
    if (newGlobal === globalIdx) return;
    flipBusy.current = true;
    setFlipping({ fromIdx: globalIdx, toIdx: newGlobal, direction: dir, key: Date.now() });
    setGlobalIdx(newGlobal);
    setTimeout(() => {
      flipBusy.current = false;
      setFlipping(null);
    }, FLIP_MS);
  }, [order.length, globalIdx]);

  const next = useCb(() => flipTo(globalIdx + 1, 'forward'),  [globalIdx, flipTo]);
  const prev = useCb(() => flipTo(globalIdx - 1, 'backward'), [globalIdx, flipTo]);

  /* Jump directly to a resort (sidebar / TOC click). Animate as forward or backward. */
  const jumpToResort = useCb((resortIdx) => {
    const target = order.findIndex(o => o.kind === 'entry' && o.resortIdx === resortIdx && o.spreadIdx === 0);
    if (target < 0) return;
    flipTo(target, target > globalIdx ? 'forward' : 'backward');
  }, [order, globalIdx, flipTo]);
  jumpToResortRef.current = jumpToResort;

  const jumpToToc = useCb(() => flipTo(0, 'backward'), [flipTo]);

  /* Jump to a specific spread within the current entry (dots) */
  const jumpToSpreadInEntry = useCb((spreadIdx) => {
    if (isToc) return;
    const target = order.findIndex(o => o.kind === 'entry' && o.resortIdx === current.resortIdx && o.spreadIdx === spreadIdx);
    if (target < 0 || target === globalIdx) return;
    flipTo(target, target > globalIdx ? 'forward' : 'backward');
  }, [order, isToc, current, globalIdx, flipTo]);

  /* Keyboard */
  useE(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') jumpToToc();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, jumpToToc]);

  /* Compose the visible (new) spread; during a transition, render the
     OLD spread on top in a fading layer so we cross-fade cleanly. */
  const newParts = getSpreadParts(globalIdx);
  const wrapInProvider = (Provider, node) => Provider ? <Provider>{node}</Provider> : node;

  const newSpreadEl = wrapInProvider(newParts.provider,
    <BookSpread left={newParts.left} right={newParts.right} />
  );

  let oldSpreadEl = null;
  if (flipping) {
    const oldParts = getSpreadParts(flipping.fromIdx);
    oldSpreadEl = wrapInProvider(oldParts.provider,
      <BookSpread left={oldParts.left} right={oldParts.right} />
    );
  }

  // breadcrumb
  const view = isToc ? 'toc' : 'entry';
  const currentIdx = isToc ? -1 : current.resortIdx;

  return (
    <>
      <Backdrop mouseX={mouseX} mouseY={mouseY} />
      <div className="app">
        <Sidebar resorts={resorts} view={view} currentIdx={currentIdx}
                 onPickToc={jumpToToc} onPick={jumpToResort} />

        <div className="stage" ref={stageRef}>
          <div className="crumb">
            <button onClick={jumpToToc}>Contents</button>
            {view === 'entry' && (
              <>
                <span className="sep">◆</span>
                <span>{currentResort.name}</span>
                <span className="sep">◆</span>
                <span>Spread {current.spreadIdx + 1} of 3</span>
              </>
            )}
          </div>

          <button className="nav-btn nav-prev"
                  onClick={prev}
                  disabled={globalIdx === 0}
                  title="Previous page">◂</button>
          <button className="nav-btn nav-next"
                  onClick={next}
                  disabled={globalIdx >= order.length - 1}
                  title="Next page">▸</button>

          {view === 'entry' && (
            <div className="spread-indicator">
              {[0,1,2].map(i => (
                <div key={i}
                     className={`dot ${i === current.spreadIdx ? 'active' : ''}`}
                     onClick={() => jumpToSpreadInEntry(i)} />
              ))}
            </div>
          )}

          <div className="stage-inner" style={{ transform: `scale(${scale})` }}>
            <div className="book-shell">
              {newSpreadEl}
              <SpreadFader
                flipKey={flipping ? flipping.key : 0}
                direction={flipping ? flipping.direction : null}
                oldSpread={oldSpreadEl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
