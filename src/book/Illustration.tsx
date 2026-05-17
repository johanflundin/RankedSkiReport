import { useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  src: string;
  hint?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Illustration({ src, hint, className = '', style }: Props) {
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
