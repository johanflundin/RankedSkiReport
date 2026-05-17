/* Shell entry — generic 6-page template for the 19 non-Whistler resorts. */
/* eslint-disable */

function ShellPage1({ resort }) {
  return (
    <Page side="left" folio="1" fullBleed>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Illustration
          src={`assets/${resort.slug}/p1-opening.jpg`}
          hint="Full-bleed opening watercolor"
          style={{ position: 'absolute', inset: 0, border: 0 }}
        />
        <div className="folio left" style={{ color: 'var(--snow)', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>1</div>
        {resort.forthcoming && (
          <div className="shell-stamp" style={{ background: 'rgba(245,239,228,.92)' }}>Entry forthcoming</div>
        )}
      </div>
    </Page>
  );
}

function ShellPage2({ resort, entryNumber }) {
  return (
    <Page side="right" folio="2">
      <div className="eyebrow">{resort.region}<span className="dot">•</span>Entry {entryNumber} of 20</div>
      <h1 className="title-xl" style={{ marginTop: 14 }}>{resort.name}</h1>
      <div className="subloc">{resort.location}</div>

      <p className="deck">
        [One-line characterization of this resort goes here — what it is, in a single sentence.]
      </p>

      <div style={{ position: 'absolute', right: 36, top: 56, width: 200, height: 200 }}>
        <Illustration
          src={`assets/${resort.slug}/p2-illo.jpg`}
          hint="Signature illustration"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div style={{
        marginTop: 100, padding: '20px 0',
        borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
        fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic',
      }}>
        <div>[Stat strip goes here — elevation, vertical, lifts, pass, etc.]</div>
        <div style={{ textAlign: 'right' }}>[Practical details — flight, season, pass]</div>
      </div>

      <div style={{ marginTop: 18, fontStyle: 'italic', color: 'var(--red)', fontWeight: 600, fontSize: 13 }}>
        Visited {resort.visited}, when you were {resort.age}.
      </div>

      <div className="hr"></div>

      <div className="body-text" style={{ flex: 1 }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p style={{ textAlign: 'right', fontStyle: 'italic', color: 'var(--red)', marginTop: 'auto' }}>continued ▸</p>
      </div>
    </Page>
  );
}

function ShellPage3({ resort }) {
  return (
    <Page side="left" runningHead={resort.name} folio="3">
      <div className="body-text" style={{ marginTop: 18 }}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      </div>
      <Illustration
        src={`assets/${resort.slug}/p3-portrait.jpg`}
        hint="Portrait / scene illustration"
        style={{ marginTop: 16, width: '100%', height: 300 }}
      />
      <div className="caption" style={{ marginTop: 10 }}>[Caption — short, image-grounding sentence.]</div>
    </Page>
  );
}

function ShellPage4({ resort }) {
  return (
    <Page side="right" runningHead={resort.name} folio="4">
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, marginTop: 16, height: '100%' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 10 }}>Field Guide To</div>
          <h2 className="title-m" style={{ marginTop: 6, color: 'var(--red)', fontVariantCaps: 'all-small-caps', letterSpacing: '.05em' }}>The Local Fauna</h2>
          <div className="hr-dot"></div>
          <div className="fauna-list">
            {[1,2,3,4,5].map(i => (
              <div className="fauna-item" key={i}>
                <Illustration
                  src={`assets/${resort.slug}/fauna-${i}.jpg`}
                  hint=" "
                  className="illo-circle"
                  style={{ width: 70, height: 70 }}
                />
                <div>
                  <div className="fauna-name">[Character Name {i}]</div>
                  <div className="fauna-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Distinguishing trait. Diagnostic behavior.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 24 }}>
          <div className="eyebrow" style={{ color: 'var(--ink)', fontSize: 9.5 }}>Spotted, Overheard, or<br/>Otherwise Witnessed</div>
          <div className="hr-dot" style={{ marginTop: 12 }}></div>
          <div className="witness-list">
            {['🗻','⛷','🍷','🧦'].map((icon, i) => (
              <div className="witness-item" key={i}>
                <div className="witness-icon" style={{ fontSize: 18 }}>{icon}</div>
                <div className="witness-text">Lorem ipsum dolor sit amet. Witnessed moment placeholder text describing a small, specific scene observed on the mountain.</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

function ShellPage5({ resort }) {
  return (
    <Page side="left" runningHead={`${resort.name} • The Map`} folio="5">
      <div className="body-text" style={{ marginTop: 4, marginBottom: 10, fontSize: 13 }}>
        [The recommended route description goes here — one or two sentences.]
      </div>
      <Illustration
        src={`assets/${resort.slug}/map.jpg`}
        hint="Trail map illustration"
        style={{ flex: 1, width: '100%' }}
      />
      <div className="caption" style={{ marginTop: 10 }}>
        Numbered points correspond to <em>The Hit List</em> on the next page.
      </div>
    </Page>
  );
}

function ShellPage6({ resort }) {
  const titles = ['First Run','Lunch On Mountain','Dinner','Après-Ski','Shop','The View'];
  return (
    <Page side="right" runningHead={resort.name} folio="6">
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <svg viewBox="0 0 60 24" style={{ width: 60, height: 24, color: 'var(--red)' }} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M30 22 L30 6" />
          <path d="M30 6 L18 14 M30 6 L42 14 M30 4 L24 12 M30 4 L36 12" />
        </svg>
        <h2 className="title-l" style={{ fontSize: 42, marginTop: 2, fontVariantCaps:'all-small-caps', letterSpacing:'.03em' }}>The Hit List</h2>
      </div>
      <div className="hit-list">
        {titles.map((t, i) => (
          <div key={i} className="hit-row">
            <div className="hit-thumb">
              <span className="hit-num">{i+1}</span>
              <Illustration
                src={`assets/${resort.slug}/hit-${i+1}.jpg`}
                hint=" "
                className="illo-thumb-empty"
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <div>
              <div className="hit-title">{t}</div>
              <div className="hit-desc">Lorem ipsum dolor sit amet. The thing to do, where to do it, and why.</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

window.getShellSpreads = (resort, entryNumber) => [
  { left: <ShellPage1 resort={resort} />,                    right: <ShellPage2 resort={resort} entryNumber={entryNumber} /> },
  { left: <ShellPage3 resort={resort} />,                    right: <ShellPage4 resort={resort} /> },
  { left: <ShellPage5 resort={resort} />,                    right: <ShellPage6 resort={resort} /> },
];
