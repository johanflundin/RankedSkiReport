import type { ReactNode } from 'react';

type Props = { left: ReactNode; right: ReactNode };

export function BookSpread({ left, right }: Props) {
  return (
    <div className="book">
      <div className="spread">
        {left}
        {right}
      </div>
    </div>
  );
}
