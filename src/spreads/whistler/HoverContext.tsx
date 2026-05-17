import { createContext, useContext, useState, type ReactNode } from 'react';

type Ctx = {
  hover: number | null;
  setHover: (n: number | null) => void;
};

export const WhistlerHoverCtx = createContext<Ctx>({
  hover: null,
  setHover: () => {},
});

export function WhistlerProvider({ children }: { children: ReactNode }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <WhistlerHoverCtx.Provider value={{ hover, setHover }}>
      {children}
    </WhistlerHoverCtx.Provider>
  );
}

export function useWhistlerHover() {
  return useContext(WhistlerHoverCtx);
}
