import { Illustration } from '../book/Illustration';

type Props = { onOpen: () => void };

export function ClosedBook({ onOpen }: Props) {
  return (
    <div
      className="closed-book"
      role="button"
      tabIndex={0}
      aria-label="Open the book"
      onClick={onOpen}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="closed-book-spine" aria-hidden="true" />
      <div className="closed-book-cover">
        <div className="toc-cover-eyebrow">A Father's Field Guide</div>
        <h1 className="toc-title">Ranked.</h1>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 34,
            lineHeight: 1,
            letterSpacing: '-.005em',
            marginTop: 6,
            paddingLeft: 4,
            color: 'var(--ink-soft)',
          }}
        >
          Twenty mountains.
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="toc-illo">
            <Illustration
              src="/assets/cover.jpg"
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
    </div>
  );
}
