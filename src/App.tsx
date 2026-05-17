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
import { ClosedBook } from './spreads/ClosedBook';
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

type ViewParts =
  | { kind: 'closed'; node: ReactNode }
  | {
      kind: 'spread';
      left: ReactNode;
      right: ReactNode;
      provider: ComponentType<{ children: ReactNode }> | null;
    };

function buildSpreadOrder(resorts: Resort[]): SpreadEntry[] {
  const order: SpreadEntry[] = [{ kind: 'closed' }, { kind: 'toc' }];
  resorts.forEach((r, i) => {
    if (!r.forthcoming) {
      for (let s = 0; s < SPREADS_PER_ENTRY; s++) {
        order.push({ kind: 'entry', resortIdx: i, spreadIdx: s as 0 | 1 | 2 });
      }
    }
  });
  return order;
}

const TOC_GLOBAL_IDX = 1;

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
  const isClosed = current.kind === 'closed';
  const isEntry = current.kind === 'entry';
  const currentResort = isEntry ? resorts[current.resortIdx] : null;

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
  const nextRef = useRef<() => void>(() => {});

  const getSpreadParts = useCallback(
    (idx: number): ViewParts | null => {
      const o = order[idx];
      if (!o) return null;
      if (o.kind === 'closed') {
        return {
          kind: 'closed',
          node: <ClosedBook onOpen={() => nextRef.current()} />,
        };
      }
      if (o.kind === 'toc') {
        return {
          kind: 'spread',
          left: <TocLeftPage />,
          right: <TocRightPage onSelect={(i: number) => jumpToResortRef.current(i)} />,
          provider: null,
        };
      }
      const r = resorts[o.resortIdx];
      if (r.full && r.slug === 'whistler') {
        const sp = getWhistlerSpreads()[o.spreadIdx];
        return { kind: 'spread', left: sp.left, right: sp.right, provider: WhistlerProvider };
      }
      const sp = getShellSpreads(r, o.resortIdx + 1)[o.spreadIdx];
      return { kind: 'spread', left: sp.left, right: sp.right, provider: null };
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
  nextRef.current = next;

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

  const jumpToToc = useCallback(
    () => flipTo(TOC_GLOBAL_IDX, TOC_GLOBAL_IDX > globalIdx ? 'forward' : 'backward'),
    [flipTo, globalIdx],
  );

  const jumpToSpreadInEntry = useCallback(
    (spreadIdx: 0 | 1 | 2) => {
      if (!isEntry || current.kind !== 'entry') return;
      const target = order.findIndex(
        o => o.kind === 'entry' && o.resortIdx === current.resortIdx && o.spreadIdx === spreadIdx,
      );
      if (target < 0 || target === globalIdx) return;
      flipTo(target, target > globalIdx ? 'forward' : 'backward');
    },
    [order, isEntry, current, globalIdx, flipTo],
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

  const renderContent = (parts: ViewParts): ReactNode => {
    if (parts.kind === 'closed') return parts.node;
    return <BookSpread left={parts.left} right={parts.right} />;
  };
  const wrapInProvider = (
    Provider: ComponentType<{ children: ReactNode }> | null,
    node: ReactNode,
  ) => (Provider ? <Provider>{node}</Provider> : node);

  const newParts = getSpreadParts(globalIdx)!;
  const newProvider = newParts.kind === 'spread' ? newParts.provider : null;
  const newSpreadEl = wrapInProvider(newProvider, renderContent(newParts));

  let oldSpreadEl: ReactNode = null;
  if (flipping) {
    const oldParts = getSpreadParts(flipping.fromIdx);
    if (oldParts) {
      const oldProvider = oldParts.kind === 'spread' ? oldParts.provider : null;
      oldSpreadEl = wrapInProvider(oldProvider, renderContent(oldParts));
    }
  }

  const view: 'closed' | 'toc' | 'entry' = isClosed ? 'closed' : isEntry ? 'entry' : 'toc';
  const sidebarView: 'toc' | 'entry' = isEntry ? 'entry' : 'toc';
  const currentIdx = isEntry && current.kind === 'entry' ? current.resortIdx : -1;
  const bookShellClass = isClosed ? 'book-shell book-shell-closed' : 'book-shell';

  return (
    <>
      <Backdrop mouseX={mouseX} mouseY={mouseY} />
      <div className="app">
        <Sidebar
          resorts={resorts}
          view={sidebarView}
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
            <div className={bookShellClass}>
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
