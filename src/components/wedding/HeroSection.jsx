import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

const GANESHA_IMG = 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/790661803_generated_b24a596f.png';
const BG_IMAGE = 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/7ce40c1d1_generated_image.png';

export default function HeroSection() {
  const { currentTheme, t, d, data } = useWedding();
  const bgRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.45;
        bgRef.current.style.transform = `translateY(${offset}px) scale(1.15)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme-based overlay configs
  const overlayConfig = {
    'Golden Ivory':  'linear-gradient(to bottom, rgba(45,30,10,0.45) 0%, rgba(30,18,5,0.65) 60%, rgba(252,249,242,0.92) 100%)',
    'Emerald Sanctum': 'linear-gradient(to bottom, rgba(2,20,12,0.55) 0%, rgba(4,28,18,0.72) 60%, rgba(6,44,33,0.95) 100%)',
    'Midnight Royal': 'linear-gradient(to bottom, rgba(5,8,20,0.55) 0%, rgba(8,12,30,0.72) 60%, rgba(15,23,42,0.95) 100%)',
  };
  const overlay = overlayConfig[currentTheme.name] || overlayConfig['Golden Ivory'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16">

      {/* ── Parallax Background Image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={BG_IMAGE}
          alt="Hawa Mahal Wedding"
          style={{
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            objectPosition: 'center center',
            willChange: 'transform',
          }}
        />
        {/* Theme-tinted gradient overlay for readability */}
        <div className="absolute inset-0" style={{ background: overlay }} />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: `linear-gradient(to bottom, transparent, ${currentTheme.bg})` }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
      </div>

      {/* Radial glow */}
      <motion.div
        className="absolute z-0"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${currentTheme.glow}, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ganesha Image */}
      <motion.div
        className="relative z-10 mb-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img
          src={GANESHA_IMG}
          alt="Lord Ganesha"
          className="w-28 h-28 md:w-36 md:h-36 object-contain animate-divine-glow"
        />
      </motion.div>

      {/* Shri Ganeshay Namah */}
      <motion.p
        className="font-hindi text-lg md:text-xl tracking-widest z-10 mb-2"
        style={{ color: currentTheme.accent }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {t('shriGaneshay')}
      </motion.p>

      {/* Shlok 1 */}
      <motion.p
        className="font-hindi text-sm md:text-base text-center max-w-lg z-10 mb-8 opacity-70 italic px-4"
        style={{ color: currentTheme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {t('shlok1')}
      </motion.p>

      {/* Grandparents */}
      <motion.div
        className="z-10 text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <p className="text-xs md:text-sm tracking-wider uppercase mb-2" style={{ color: currentTheme.muted }}>
          {t('grandparentsLabel')}
        </p>
        <p className="font-display text-base md:text-lg" style={{ color: currentTheme.text }}>
          {d(data.dada.name, data.dada.nameHi)} & {d(data.dadi.name, data.dadi.nameHi)}
        </p>
      </motion.div>

      {/* Names */}
      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
      >
        <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold leading-tight">
          <span className="text-shimmer">{d(data.groom.name, data.groom.nameHi)}</span>
          <span className="block text-2xl md:text-4xl font-light my-2" style={{ color: currentTheme.accent }}>
            {t('weds')}
          </span>
          <span className="text-shimmer">{d(data.bride.name, data.bride.nameHi)}</span>
        </h1>
      </motion.div>

      {/* Shlok 2 */}
      <motion.p
        className="font-hindi text-sm md:text-base text-center max-w-lg z-10 mt-8 opacity-60 italic px-4"
        style={{ color: currentTheme.text }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        {t('shlok2')}
      </motion.p>

      {/* Save the Date */}
      <motion.div
        className="z-10 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.3em]" style={{ color: currentTheme.muted }}>
          {t('saveTheDate')}
        </p>
        <p className="font-display text-xl md:text-2xl mt-1" style={{ color: currentTheme.accent }}>
          15 June 2026
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: currentTheme.accent + '60' }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
