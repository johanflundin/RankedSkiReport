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
          padding: '90px 70px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: '-.02em',
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          Ranked.
        </h1>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1,
            letterSpacing: '-.005em',
            marginTop: 10,
            color: 'var(--ink-soft)',
          }}
        >
          Twenty mountains.
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            background: 'var(--red)',
            borderRadius: '50%',
            margin: '64px 0',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 15,
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
            maxWidth: '24em',
          }}
        >
          For you,<br />
          who will outski me by ten.
        </div>
      </div>
    </Page>
  );
}

export function TocRightPage({ onSelect }: { onSelect?: SelectFn }) {
  return (
    <Page side="right">
      <div className="toc-list-inner">
        <div className="eyebrow" style={{ color: 'var(--red)' }}>A Letter to My Daughter</div>

        <div
          style={{
            fontSize: 12.5,
            lineHeight: 1.5,
            color: 'var(--ink)',
            textAlign: 'justify',
            hyphens: 'auto',
            marginTop: 14,
          }}
        >
          <p style={{ margin: '0 0 .7em' }}>
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

        <div className="hr-dot" style={{ marginTop: 18, marginBottom: 12 }}></div>

        <h2 className="toc-list-title" style={{ fontSize: 20 }}>The Twenty</h2>
        <div className="toc-list-sub">In order of visit, not preference.</div>

        <ul className="toc-list">
          {RESORTS.map((r, i) => (
            <li
              key={r.slug}
              className={`toc-entry ${r.forthcoming ? 'forthcoming' : ''} ${r.full ? 'is-featured' : ''}`}
              onClick={() => !r.forthcoming && onSelect && onSelect(i)}
              style={{ padding: '4px 0' }}
            >
              <span className="toc-entry-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="toc-entry-name">
                {r.name}
                <span className="where">{r.location}</span>
              </span>
              <span className="toc-entry-page">{r.forthcoming ? '—' : i * 6 + 1}</span>
            </li>
          ))}
        </ul>

        <div className="toc-footnote" style={{ marginTop: 10 }}>
          Featured in red is the fully-written entry. Click any entry to open.
        </div>
      </div>
    </Page>
  );
}
