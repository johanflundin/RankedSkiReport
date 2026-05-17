import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { Backdrop } from './ui/Backdrop';
import { Sidebar } from './ui/Sidebar';
import { BookSpread } from './book/BookSpread';
import { SpreadFader } from './book/SpreadFader';
import { TocLeftPage, TocRightPage } from './spreads/Toc';
import { getShellSpreads } from './spreads/Shell';
import { WhistlerProvider, getWhistlerSpreads } from './spreads/whistler';
import { RESORTS } from './data/resorts';
import type { Resort, SpreadEntry } from './data/types';

const SPREADS_PER_ENTRY = 3;
const FLIP_MS = 420;

type Flipping = {
  fromIdx: number;
  toIdx: number;
  direction: 'forward' | 'backward';
  key: number;
} | null;

function buildSpreadOrder(resorts: Resort[]): SpreadEntry[] {
  const order: SpreadEntry[] = [{ kind: 'toc' }];
  resorts.forEach((r, i) => {
    if (!r.forthcoming) {
      for (let s = 0; s < SPREADS_PER_ENTRY; s++) {
        order.push({ kind: 'entry', resortIdx: i, spreadIdx: s as 0 | 1 | 2 });
      }
    }
  });
  return order;
}

export function App() {
  const resorts = RESORTS;
  const order = useMemo(() => buildSpreadOrder(resorts), [resorts]);

  const [globalIdx, setGlobalIdx] = useState(0);
  const [flipping, setFlipping] = useState<Flipping>(null);
  const flipBusy = useRef(false);

  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);

  const current = order[globalIdx];
  const isToc = current.kind === 'toc';
  const currentResort = isToc ? null : resorts[current.resortIdx];

  /* Auto-scale */
  useEffect(() => {
    function fit() {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const designW = 800 * 2;
      const designH = 800;
      const pad = 80;
      const s = Math.min((r.width - pad) / designW, (r.height - pad) / designH, 1);
      setScale(s);
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  /* Mouse parallax */
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Forward ref to jumpToResort for use inside getSpreadParts */
  const jumpToResortRef = useRef<(idx: number) => void>(() => {});

  /* Build {left, right, Provider} React nodes for any global index. */
  const getSpreadParts = useCallback(
    (idx: number): { left: ReactNode; right: ReactNode; provider: ComponentType<{ children: ReactNode }> | null } | null => {
      const o = order[idx];
      if (!o) return null;
      if (o.kind === 'toc') {
        return {
          left: <TocLeftPage />,
          right: <TocRightPage onSelect={(i: number) => jumpToResortRef.current(i)} />,
          provider: null,
        };
      }
      const r = resorts[o.resortIdx];
      if (r.full && r.slug === 'whistler') {
        const sp = getWhistlerSpreads()[o.spreadIdx];
        return { left: sp.left, right: sp.right, provider: WhistlerProvider };
      }
      const sp = getShellSpreads(r, o.resortIdx + 1)[o.spreadIdx];
      return { left: sp.left, right: sp.right, provider: null };
    },
    [order, resorts],
  );

  /* Navigation */
  const flipTo = useCallback(
    (newGlobal: number, dir: 'forward' | 'backward') => {
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
    },
    [order.length, globalIdx],
  );

  const next = useCallback(() => flipTo(globalIdx + 1, 'forward'), [globalIdx, flipTo]);
  const prev = useCallback(() => flipTo(globalIdx - 1, 'backward'), [globalIdx, flipTo]);

  const jumpToResort = useCallback(
    (resortIdx: number) => {
      const target = order.findIndex(
        o => o.kind === 'entry' && o.resortIdx === resortIdx && o.spreadIdx === 0,
      );
      if (target < 0) return;
      flipTo(target, target > globalIdx ? 'forward' : 'backward');
    },
    [order, globalIdx, flipTo],
  );
  jumpToResortRef.current = jumpToResort;

  const jumpToToc = useCallback(() => flipTo(0, 'backward'), [flipTo]);

  const jumpToSpreadInEntry = useCallback(
    (spreadIdx: 0 | 1 | 2) => {
      if (isToc || current.kind !== 'entry') return;
      const target = order.findIndex(
        o => o.kind === 'entry' && o.resortIdx === current.resortIdx && o.spreadIdx === spreadIdx,
      );
      if (target < 0 || target === globalIdx) return;
      flipTo(target, target > globalIdx ? 'forward' : 'backward');
    },
    [order, isToc, current, globalIdx, flipTo],
  );

  /* Keyboard */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') jumpToToc();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, jumpToToc]);

  const newParts = getSpreadParts(globalIdx)!;
  const wrapInProvider = (Provider: ComponentType<{ children: ReactNode }> | null, node: ReactNode) =>
    Provider ? <Provider>{node}</Provider> : node;

  const newSpreadEl = wrapInProvider(
    newParts.provider,
    <BookSpread left={newParts.left} right={newParts.right} />,
  );

  let oldSpreadEl: ReactNode = null;
  if (flipping) {
    const oldParts = getSpreadParts(flipping.fromIdx);
    if (oldParts) {
      oldSpreadEl = wrapInProvider(
        oldParts.provider,
        <BookSpread left={oldParts.left} right={oldParts.right} />,
      );
    }
  }

  const view: 'toc' | 'entry' = isToc ? 'toc' : 'entry';
  const currentIdx = isToc || current.kind !== 'entry' ? -1 : current.resortIdx;

  return (
    <>
      <Backdrop mouseX={mouseX} mouseY={mouseY} />
      <div className="app">
        <Sidebar
          resorts={resorts}
          view={view}
          currentIdx={currentIdx}
          onPickToc={jumpToToc}
          onPick={jumpToResort}
        />

        <div className="stage" ref={stageRef}>
          <div className="crumb">
            <button onClick={jumpToToc}>Contents</button>
            {view === 'entry' && currentResort && current.kind === 'entry' && (
              <>
                <span className="sep">◆</span>
                <span>{currentResort.name}</span>
                <span className="sep">◆</span>
                <span>Spread {current.spreadIdx + 1} of 3</span>
              </>
            )}
          </div>

          <button
            className="nav-btn nav-prev"
            onClick={prev}
            disabled={globalIdx === 0}
            title="Previous page"
          >
            ◂
          </button>
          <button
            className="nav-btn nav-next"
            onClick={next}
            disabled={globalIdx >= order.length - 1}
            title="Next page"
          >
            ▸
          </button>

          {view === 'entry' && current.kind === 'entry' && (
            <div className="spread-indicator">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`dot ${i === current.spreadIdx ? 'active' : ''}`}
                  onClick={() => jumpToSpreadInEntry(i as 0 | 1 | 2)}
                />
              ))}
            </div>
          )}

          <div className="stage-inner" style={{ transform: `scale(${scale})` }}>
            <div className="book-shell">
              {newSpreadEl}
              <SpreadFader
                flipKey={flipping ? flipping.key : 0}
                direction={flipping ? flipping.direction : null}
                oldSpread={oldSpreadEl}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
