import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingParticles({ count = 25 }) {
  const { currentTheme } = useWedding();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r1 = seededRandom(i * 11 + 1);
        const r2 = seededRandom(i * 11 + 2);
        const r3 = seededRandom(i * 11 + 3);
        const r4 = seededRandom(i * 11 + 4);
        const r5 = seededRandom(i * 11 + 5);

        return {
          id: i,
          left: `${r1 * 100}%`,
          size: r2 * 4 + 1,
          duration: r3 * 15 + 10,
          delay: r4 * 8,
          opacity: r5 * 0.4 + 0.1,
        };
      }),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: currentTheme.accent,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, p.opacity, 0],
            x: [0, Math.sin(p.id) * 60],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
