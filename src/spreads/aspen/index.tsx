import type { ReactNode } from 'react';
import { AspenPage1, AspenPage2, AspenPage3, AspenPage4 } from './pages-1';
import { AspenPage5, AspenPage6 } from './pages-2';

export { AspenProvider } from './HoverContext';

export function getAspenSpreads(): Array<{ left: ReactNode; right: ReactNode }> {
  return [
    { left: <AspenPage1 />, right: <AspenPage2 /> },
    { left: <AspenPage3 />, right: <AspenPage4 /> },
    { left: <AspenPage5 />, right: <AspenPage6 /> },
  ];
}
