import type { CSSProperties, ReactNode } from 'react';

type Props = {
  side: 'left' | 'right';
  runningHead?: string;
  folio?: ReactNode;
  folioPos?: 'top' | 'bottom';
  fullBleed?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

export function Page({
  side,
  runningHead,
  folio,
  folioPos = 'top',
  fullBleed,
  children,
  style,
}: Props) {
  return (
    <div className={`page ${side}`} style={style}>
      {runningHead && (
        <div className={`running-head ${side}`}>
          <span className="rh-text">{runningHead}</span>
          {folio != null && folioPos === 'top' && (
            <span className="rh-folio">{folio}</span>
          )}
        </div>
      )}
      {!runningHead && folio != null && folioPos === 'top' && (
        <div className={`folio folio-top ${side}`}>{folio}</div>
      )}
      <div className={`page-inner ${fullBleed ? 'page-full-bleed' : ''}`}>
        {children}
      </div>
      {folio != null && folioPos === 'bottom' && (
        <div className={`folio folio-bottom ${side}`}>{folio}</div>
      )}
    </div>
  );
}
