import type { Resort } from '../data/types';

type Props = {
  resorts: Resort[];
  view: 'toc' | 'entry';
  currentIdx: number;
  onPickToc: () => void;
  onPick: (idx: number) => void;
};

export function Sidebar({ resorts, view, currentIdx, onPickToc, onPick }: Props) {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">Twenty<br />Mountains</div>
      <div className="sidebar-sub">A father's field guide</div>

      <div className="sidebar-eyebrow" onClick={onPickToc} style={{ cursor: 'pointer' }}>
        Contents
      </div>
      <ul className="sidebar-list">
        <li
          className={`sidebar-item ${view === 'toc' ? 'active' : ''}`}
          onClick={onPickToc}
        >
          <span className="num">↖</span>
          <span><span className="name">Table of contents</span></span>
        </li>
      </ul>

      <div className="sidebar-eyebrow">The Twenty</div>
      <ul className="sidebar-list">
        {resorts.map((r, i) => (
          <li
            key={r.slug}
            className={`sidebar-item ${view === 'entry' && currentIdx === i ? 'active' : ''} ${r.forthcoming ? 'forthcoming' : ''}`}
            onClick={() => !r.forthcoming && onPick(i)}
          >
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="name">{r.name}</span>
              <span className="loc">{r.location}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        Click any entry to open the book.<br />
        Use ← → keys or the side arrows to turn pages.
      </div>
    </nav>
  );
}
