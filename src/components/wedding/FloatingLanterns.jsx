import { useEffect, useRef, useMemo } from 'react';
import { useWedding } from '../../context/useWedding';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// SVG Lantern shape
function LanternSVG({ color, glowColor, size = 40 }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 40 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
    >
      {/* Top cap */}
      <rect x="14" y="0" width="12" height="4" rx="2" fill={color} opacity="0.9" />
      {/* String */}
      <line x1="20" y1="4" x2="20" y2="10" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Main lantern body */}
      <ellipse cx="20" cy="20" rx="14" ry="6" fill={color} opacity="0.85" />
      <rect x="6" y="20" width="28" height="22" rx="4" fill={color} opacity="0.7" />
      {/* Vertical ribs */}
      <line x1="13" y1="20" x2="13" y2="42" stroke={glowColor} strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="20" x2="20" y2="42" stroke={glowColor} strokeWidth="1" opacity="0.5" />
      <line x1="27" y1="20" x2="27" y2="42" stroke={glowColor} strokeWidth="1" opacity="0.5" />
      {/* Bottom ellipse */}
      <ellipse cx="20" cy="42" rx="14" ry="6" fill={color} opacity="0.85" />
      {/* Inner glow */}
      <ellipse cx="20" cy="31" rx="10" ry="12" fill={glowColor} opacity="0.3" />
      {/* Bottom cap */}
      <rect x="14" y="47" width="12" height="4" rx="2" fill={color} opacity="0.9" />
      {/* Bottom tassel */}
      <line x1="20" y1="51" x2="20" y2="58" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="20" cy="59" rx="3" ry="2" fill={color} opacity="0.7" />
    </svg>
  );
}

export default function FloatingLanterns({ count = 8 }) {
  const { currentTheme } = useWedding();
  const containerRef = useRef(null);
  const frameRef = useRef(null);

  const lanterns = useMemo(() => {
    const themeColors = {
      ivory: [
        { color: '#D4AF37', glow: '#FFE066' },
        { color: '#B38B3F', glow: '#F0C050' },
        { color: '#E8A020', glow: '#FFD060' },
      ],
      emerald: [
        { color: '#D4AF37', glow: '#FFE066' },
        { color: '#90EE90', glow: '#ADFF2F' },
        { color: '#E8A020', glow: '#FFD060' },
      ],
      midnight: [
        { color: '#C084FC', glow: '#E0AAFF' },
        { color: '#818CF8', glow: '#C7D2FE' },
        { color: '#F0ABFC', glow: '#FAE8FF' },
      ],
    };
    const palette = themeColors[currentTheme.name === 'Golden Ivory' ? 'ivory' : currentTheme.name === 'Emerald Sanctum' ? 'emerald' : 'midnight'];

    const themeSeed = currentTheme.name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

    return Array.from({ length: count }, (_, i) => {
      const col = palette[i % palette.length];
      const r1 = seededRandom(themeSeed + i * 17 + 1);
      const r2 = seededRandom(themeSeed + i * 17 + 2);
      const r3 = seededRandom(themeSeed + i * 17 + 3);
      const r4 = seededRandom(themeSeed + i * 17 + 4);
      const r5 = seededRandom(themeSeed + i * 17 + 5);
      const r6 = seededRandom(themeSeed + i * 17 + 6);
      const r7 = seededRandom(themeSeed + i * 17 + 7);
      const r8 = seededRandom(themeSeed + i * 17 + 8);
      return {
        id: i,
        left: 5 + (i / count) * 88 + (r1 * 6 - 3),
        baseY: 10 + r2 * 80,
        speed: 0.04 + r3 * 0.06,
        sway: (r4 - 0.5) * 40,
        swaySpeed: 0.5 + r5,
        size: 28 + r6 * 20,
        color: col.color,
        glow: col.glow,
        opacity: 0.55 + r7 * 0.35,
        phase: r8 * Math.PI * 2,
      };
    });
  }, [count, currentTheme.name]);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('[data-lantern]');
    if (!els) return;

    const tick = (time) => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      els.forEach((el, i) => {
        const l = lanterns[i];
        if (!l) return;

        // Move upward as user scrolls down
        // Y position: starts at baseY% of viewport, floats UP as scroll increases
        const yPercent = l.baseY - (scrollY / maxScroll) * 90;
        // Wrap around — when it goes above 0, reset to bottom
        const wrappedY = ((yPercent % 100) + 100) % 100;

        // Gentle horizontal sway using time
        const swayX = Math.sin(time * 0.001 * l.swaySpeed + l.phase) * l.sway;

        el.style.transform = `translate(${swayX}px, 0)`;
        el.style.top = `${wrappedY}%`;
        el.style.opacity = wrappedY < 5 || wrappedY > 95 ? 0 : l.opacity;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [lanterns]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {lanterns.map((l) => (
        <div
          key={l.id}
          data-lantern="true"
          className="absolute transition-opacity duration-500"
          style={{
            left: `${l.left}%`,
            top: `${l.baseY}%`,
            opacity: l.opacity,
            willChange: 'transform, top, opacity',
          }}
        >
          <LanternSVG color={l.color} glowColor={l.glow} size={l.size} />
        </div>
      ))}
    </div>
  );
}
