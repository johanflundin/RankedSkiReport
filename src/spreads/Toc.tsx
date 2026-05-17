import { Page } from '../book/Page';
import { RESORTS } from '../data/resorts';

type SelectFn = (resortIdx: number) => void;

export function TocLeftPage() {
  return (
    <Page side="left">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '70px 60px 60px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="eyebrow" style={{ color: 'var(--red)' }}>A Letter to My Daughter</div>

        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
            letterSpacing: '-.02em',
            color: 'var(--ink)',
            margin: '14px 0 0',
          }}
        >
          Ranked.
        </h1>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1,
            letterSpacing: '-.005em',
            marginTop: 8,
            color: 'var(--ink-soft)',
          }}
        >
          Twenty mountains.
        </div>

        <div className="hr-dot" style={{ marginTop: 24, marginBottom: 18 }}></div>

        <div
          style={{
            fontSize: 13.5,
            lineHeight: 1.55,
            color: 'var(--ink)',
            textAlign: 'justify',
            hyphens: 'auto',
          }}
        >
          <p style={{ margin: '0 0 .8em' }}>
            This book started as a letter to Sofia. She was three months old when
            we first put skis on the bottom of her stroller and pushed her up
            Sam's Knob in Snowmass. By the time she was five she was driving a
            horse through the snow in the Castle Creek valley, eating Sour Patch
            Kids between turns, and shouting tactical encouragement to her mother
            from cornices her mother had reasonably refused to ski. She won't
            remember any of it. That's why I'm writing it down.
          </p>
          <p style={{ margin: 0 }}>
            The book is opinionated and the verdicts are honest. Resorts are
            ranked the way a friend would actually rank them — what they're good
            at, what they're not, who's there, what to order, what to skip, what
            to remember. Twenty entries. Some you've heard of. Some you haven't.
            All of them honest.
          </p>
        </div>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: 18,
            fontStyle: 'italic',
            fontSize: 13,
            color: 'var(--ink-mute)',
            textAlign: 'right',
          }}
        >
          For you, who will outski me by ten.
        </div>
      </div>
    </Page>
  );
}

export function TocRightPage({ onSelect }: { onSelect?: SelectFn }) {
  return (
    <Page side="right">
      <div className="toc-list-inner">
        <div className="eyebrow" style={{ color: 'var(--red)' }}>Contents</div>
        <h2 className="toc-list-title" style={{ marginTop: 6 }}>The Twenty</h2>
        <div className="toc-list-sub">In order of visit, not preference.</div>

        <ul className="toc-list">
          {RESORTS.map((r, i) => (
            <li
              key={r.slug}
              className={`toc-entry ${r.forthcoming ? 'forthcoming' : ''} ${r.full ? 'is-featured' : ''}`}
              onClick={() => !r.forthcoming && onSelect && onSelect(i)}
            >
              <span className="toc-entry-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="toc-entry-name">
                {r.name}
                <span className="where">{r.location} · {r.visited}</span>
              </span>
              <span className="toc-entry-page">{r.forthcoming ? '—' : i * 6 + 1}</span>
            </li>
          ))}
        </ul>

        <div className="toc-footnote">
          Featured in red is the fully-written entry. Click any entry to open.
        </div>
      </div>
    </Page>
  );
}
