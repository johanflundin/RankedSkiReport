import type { ReactNode } from 'react';

type Props = {
  flipKey: number;
  direction: 'forward' | 'backward' | null;
  oldSpread: ReactNode;
};

export function SpreadFader({ flipKey, direction, oldSpread }: Props) {
  if (!direction || flipKey === 0 || !oldSpread) return null;
  return (
    <div key={`f-${flipKey}`} className={`spread-fade ${direction}`} aria-hidden="true">
      {oldSpread}
    </div>
  );
}
