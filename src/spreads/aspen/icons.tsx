import type { ReactNode } from 'react';

const W = ({ children, viewBox = '0 0 48 48' }: { children: ReactNode; viewBox?: string }) => (
  <svg
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const IconMountainSingle = () => (
  <W>
    <path d="M4 40 L18 14 L26 26 L32 18 L44 40 Z" fill="#fff" />
    <path d="M14 22 L18 14 L22 22" />
    <path d="M28 22 L32 18 L36 24" />
    <path d="M4 40 L44 40" />
  </W>
);

export const IconMountainDouble = () => (
  <W>
    <path d="M4 40 L14 22 L20 30 L24 24 L30 32 L36 22 L44 40 Z" fill="#fff" />
    <path d="M10 28 L14 22 L18 28" />
    <path d="M32 28 L36 22 L40 28" />
    <path d="M4 40 L44 40" />
  </W>
);

export const IconMountainTriple = () => (
  <W>
    <path d="M4 40 L10 26 L16 32 L22 18 L28 30 L34 22 L40 34 L44 40 Z" fill="#fff" />
    <path d="M7 32 L10 26 L13 32" />
    <path d="M18 24 L22 18 L26 24" />
    <path d="M31 28 L34 22 L37 28" />
    <path d="M4 40 L44 40" />
  </W>
);

export const IconGondola = () => (
  <W>
    <path d="M4 10 L44 22" />
    <circle cx="14" cy="14" r="1.2" fill="currentColor" />
    <circle cx="34" cy="20" r="1.2" fill="currentColor" />
    <rect x="20" y="22" width="14" height="14" rx="2" fill="#fff" />
    <path d="M27 22 L27 18" />
    <path d="M22 28 L32 28" />
    <path d="M22 32 L32 32" />
  </W>
);

export const IconIkon = () => (
  <W>
    <rect x="6" y="14" width="36" height="20" rx="3" fill="#fff" />
    <path d="M6 22 L42 22" strokeDasharray="1 2" opacity=".7" />
    <text
      x="24"
      y="30"
      fontSize="8"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      style={{ fontFamily: 'serif', fontWeight: 800, letterSpacing: '.12em' }}
    >
      IKON
    </text>
  </W>
);

export const IconAlterra = () => (
  <W>
    <text
      x="24"
      y="32"
      fontSize="14"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontWeight: 600 }}
    >
      Alterra
    </text>
  </W>
);

export const IconAbilities = () => (
  <W>
    <circle cx="10" cy="15" r="2.4" fill="#fff" />
    <path d="M10 17.4 L10 26 M7 21 L13 21 M8 32 L10 26 L12 32" />
    <circle cx="24" cy="13" r="3" fill="#fff" />
    <path d="M24 16 L24 27 M20 21 L28 21 M21 34 L24 27 L27 34" />
    <circle cx="38" cy="11" r="3.6" fill="#fff" />
    <path d="M38 14.6 L38 28 M33 20 L43 20 M34 36 L38 28 L42 36" />
  </W>
);

export const IconPlane = () => (
  <W>
    <path d="M6 28 L22 24 L38 8 L42 12 L26 28 L30 42 L26 44 L18 30 L8 34 L6 30 L18 26 Z" fill="#fff" />
  </W>
);

export const IconSun = () => (
  <W>
    <circle cx="24" cy="24" r="7" fill="#fff" />
    <path d="M24 10 L24 6 M24 42 L24 38 M10 24 L6 24 M42 24 L38 24 M14 14 L11 11 M37 37 L34 34 M14 34 L11 37 M37 11 L34 14" />
  </W>
);
