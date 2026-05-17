import type { ReactNode } from 'react';
import { WhistlerPage1, WhistlerPage2, WhistlerPage3, WhistlerPage4 } from './pages-1';
import { WhistlerPage5, WhistlerPage6 } from './pages-2';

export { WhistlerProvider } from './HoverContext';

export function getWhistlerSpreads(): Array<{ left: ReactNode; right: ReactNode }> {
  return [
    { left: <WhistlerPage1 />, right: <WhistlerPage2 /> },
    { left: <WhistlerPage3 />, right: <WhistlerPage4 /> },
    { left: <WhistlerPage5 />, right: <WhistlerPage6 /> },
  ];
}
