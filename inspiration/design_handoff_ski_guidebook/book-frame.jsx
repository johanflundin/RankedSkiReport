/* Book frame: spread layout, page-turn animation, illustration component. */
/* eslint-disable */

const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   Illustration — <img src="assets/..."> with clean dashed
   placeholder when the file isn't there yet. No drag-drop.
   ============================================================ */
function Illustration({ src, hint, className = '', style }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className={`illo ${className}`} style={style}>
      {!errored && (
        <img
          src={src}
          alt=""
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      )}
      {(!loaded || errored) && (
        <div className="illo-placeholder">
          {hint && <div className="illo-hint">{hint}</div>}
          <div className="illo-path">{src}</div>
        </div>
      )}
    </div>
  );
}
window.Illustration = Illustration;

/* ============================================================
   SpreadFader — simple cross-fade with a gentle horizontal nudge.
   Renders the OLD spread on top, fading out and sliding slightly
   in the direction of travel, while the NEW spread sits beneath.
   ============================================================ */
function SpreadFader({ flipKey, direction, oldSpread }) {
  if (!direction || flipKey === 0 || !oldSpread) return null;
  return (
    <div key={`f-${flipKey}`} className={`spread-fade ${direction}`} aria-hidden="true">
      {oldSpread}
    </div>
  );
}
window.SpreadFader = SpreadFader;

/* ============================================================
   Page — single page wrapper with optional running head and folio.
   ============================================================ */
function Page({ side, runningHead, folio, folioPos = 'top', fullBleed, children, style }) {
  return (
    <div className={`page ${side}`} style={style}>
      {runningHead && (
        <div className={`running-head ${side}`}>
          <span className="rh-text">{runningHead}</span>
          {folio != null && folioPos === 'top' && <span className="rh-folio">{folio}</span>}
        </div>
      )}
      {!runningHead && folio != null && folioPos === 'top' && (
        <div className={`folio folio-top ${side}`}>{folio}</div>
      )}
      <div className={`page-inner ${fullBleed ? 'page-full-bleed' : ''}`}>
        {children}
      </div>
      {folio != null && folioPos === 'bottom' && <div className={`folio folio-bottom ${side}`}>{folio}</div>}
    </div>
  );
}
window.Page = Page;

/* ============================================================
   BookSpread — renders the two pages of a spread, no animation
   of its own (the PageFlipper handles that on top).
   ============================================================ */
function BookSpread({ left, right }) {
  return (
    <div className="book">
      <div className="spread">
        {left}
        {right}
      </div>
    </div>
  );
}
window.BookSpread = BookSpread;
