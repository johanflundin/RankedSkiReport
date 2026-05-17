import type { CSSProperties } from 'react';

type Props = { mouseX: number; mouseY: number };

export function Backdrop({ mouseX, mouseY }: Props) {
  const tx1 = (mouseX - 0.5) * 18,  ty1 = (mouseY - 0.5) * 4;
  const tx2 = (mouseX - 0.5) * 32,  ty2 = (mouseY - 0.5) * 6;
  const tx3 = (mouseX - 0.5) * 48,  ty3 = (mouseY - 0.5) * 8;
  return (
    <div className="backdrop">
      <div className="ridge ridge-1" style={{ transform: `translate(${tx1}px, ${ty1}px)` }}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0 280 L60 200 L120 220 L200 140 L260 180 L340 120 L420 170 L500 110 L580 160 L660 100 L740 150 L820 130 L900 170 L980 140 L1060 190 L1140 160 L1200 200 L1200 280 Z" fill="#1f2c40" />
        </svg>
      </div>
      <div className="ridge ridge-2" style={{ transform: `translate(${tx2}px, ${ty2}px)` }}>
        <svg viewBox="0 0 1200 280" preserveAspectRatio="none">
          <path d="M0 280 L80 240 L160 180 L240 220 L320 160 L400 200 L480 140 L560 180 L640 130 L720 170 L800 145 L880 185 L960 160 L1040 200 L1120 170 L1200 210 L1200 280 Z" fill="#162033" />
        </svg>
      </div>
      <div className="ridge ridge-3" style={{ transform: `translate(${tx3}px, ${ty3}px)` }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0 200 L120 160 L240 180 L360 140 L480 170 L600 130 L720 165 L840 150 L960 175 L1080 155 L1200 180 L1200 200 Z" fill="#0a1120" />
        </svg>
      </div>
      <div className="snow-layer">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = (i * 53) % 100;
          const dur = 8 + (i % 9) * 2.4;
          const delay = -((i * 0.7) % dur);
          const size = 1.5 + (i % 4) * 0.9;
          const drift = ((i % 5) - 2) * 25;
          const opacity = 0.35 + (i % 6) * 0.08;
          return (
            <div
              key={i}
              className="snow-flake"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                ['--drift' as string]: `${drift}px`,
                ['--o' as string]: opacity,
                opacity,
              } as CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}
