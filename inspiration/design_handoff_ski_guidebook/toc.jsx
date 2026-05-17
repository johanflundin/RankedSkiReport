/* Table of contents — landing spread.
   Split into two independent <Page> components so the page-flipper
   can render either half as its front or back face. */
/* eslint-disable */

function TocLeftPage({ onSelect }) {
  return (
    <Page side="left">
      <div className="toc-cover-inner">
        <div className="toc-cover-eyebrow">A Father's Field Guide</div>
        <h1 className="toc-title">Twenty<br/><em>Mountains</em>.</h1>
        <div style={{ marginTop: 16 }}>
          <div className="toc-illo">
            <Illustration
              src="assets/cover.jpg"
              hint="Cover watercolor — a mountain, or the two of you on skis"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <p className="toc-deck">
          A field guide to the ski resorts you and I have skied together,
          in the order we skied them, written down before either of us forgets.
        </p>
        <div className="toc-author">
          <div><span className="by">By</span> Your Father</div>
          <div className="for">For you, who will outski me by ten.</div>
        </div>
      </div>
    </Page>
  );
}

function TocRightPage({ onSelect }) {
  const resorts = window.RESORTS;
  return (
    <Page side="right">
      <div className="toc-list-inner">
        <div className="eyebrow" style={{ color: 'var(--red)' }}>Contents</div>
        <h2 className="toc-list-title" style={{ marginTop: 6 }}>The Twenty</h2>
        <div className="toc-list-sub">In order of visit, not preference.</div>

        <ul className="toc-list">
          {resorts.map((r, i) => (
            <li key={r.slug}
                className={`toc-entry ${r.forthcoming ? 'forthcoming' : ''} ${r.full ? 'is-featured' : ''}`}
                onClick={() => !r.forthcoming && onSelect && onSelect(i)}>
              <span className="toc-entry-num">{String(i+1).padStart(2,'0')}</span>
              <span className="toc-entry-name">
                {r.name}
                <span className="where">{r.location} · {r.visited}</span>
              </span>
              <span className="toc-entry-page">{r.forthcoming ? '—' : (i * 6 + 1)}</span>
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

window.TocLeftPage = TocLeftPage;
window.TocRightPage = TocRightPage;

/* The TOC component, used by App. Renders both halves into a BookSpread. */
function TOC({ onSelect }) {
  return (
    <BookSpread
      left={<TocLeftPage onSelect={onSelect} />}
      right={<TocRightPage onSelect={onSelect} />}
    />
  );
}
window.TOC = TOC;
