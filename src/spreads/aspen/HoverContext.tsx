import { createContext, useContext, useState, type ReactNode } from 'react';

type Ctx = {
  hover: number | null;
  setHover: (n: number | null) => void;
};

export const AspenHoverCtx = createContext<Ctx>({
  hover: null,
  setHover: () => {},
});

export function AspenProvider({ children }: { children: ReactNode }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <AspenHoverCtx.Provider value={{ hover, setHover }}>
      {children}
    </AspenHoverCtx.Provider>
  );
}

export function useAspenHover() {
  return useContext(AspenHoverCtx);
}
