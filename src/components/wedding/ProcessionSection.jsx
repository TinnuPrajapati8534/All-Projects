import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

const PROCESSION_IMG = 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/1402cf61b_generated_image.png';

export default function ProcessionSection() {
  const { currentTheme } = useWedding();

  return (
    <section className="relative py-0 overflow-hidden">

      {/* ── Animated Procession Image Strip ── */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">

        {/* The procession image scrolls left endlessly */}
        <motion.div
          className="absolute top-0 left-0 h-full flex"
          style={{ width: '200%' }}
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <img
            src={PROCESSION_IMG}
            alt="Royal Mughal Wedding Procession"
            className="h-full w-1/2 object-cover object-center flex-shrink-0"
            style={{ minWidth: '50%' }}
          />
          <img
            src={PROCESSION_IMG}
            alt="Royal Mughal Wedding Procession"
            className="h-full w-1/2 object-cover object-center flex-shrink-0"
            style={{ minWidth: '50%' }}
          />
        </motion.div>

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${currentTheme.bg}, transparent)` }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${currentTheme.bg}, transparent)` }}
        />

        {/* Left vignette */}
        <div
          className="absolute top-0 left-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${currentTheme.bg}, transparent)` }}
        />

        {/* Right vignette */}
        <div
          className="absolute top-0 right-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${currentTheme.bg}, transparent)` }}
        />

        {/* Golden overlay tint */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `${currentTheme.accent}15`, mixBlendMode: 'multiply' }}
        />


      </div>
    </section>
  );
}