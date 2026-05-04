import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

function CountdownDigit({ value, label }) {
  const { currentTheme } = useWedding();
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-20 md:w-24 md:h-28 rounded-xl flex items-center justify-center backdrop-blur-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="font-display text-3xl md:text-5xl font-bold"
            style={{ color: currentTheme.accent }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-xs md:text-sm mt-2 uppercase tracking-wider font-body" style={{ color: currentTheme.muted }}>
        {label}
      </p>
    </div>
  );
}

export default function CountdownTimer() {
  const { currentTheme, t, data } = useWedding();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(data.weddingDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data.weddingDate]);

  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl md:text-4xl font-bold" style={{ color: currentTheme.text }}>
          {t('countdown')}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-3" style={{ backgroundColor: currentTheme.accent }} />
      </motion.div>
      <motion.div
        className="flex items-center justify-center gap-3 md:gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <CountdownDigit value={time.days} label={t('days')} />
        <span className="font-display text-2xl md:text-4xl font-bold" style={{ color: currentTheme.accent }}>:</span>
        <CountdownDigit value={time.hours} label={t('hours')} />
        <span className="font-display text-2xl md:text-4xl font-bold" style={{ color: currentTheme.accent }}>:</span>
        <CountdownDigit value={time.minutes} label={t('minutes')} />
        <span className="font-display text-2xl md:text-4xl font-bold" style={{ color: currentTheme.accent }}>:</span>
        <CountdownDigit value={time.seconds} label={t('seconds')} />
      </motion.div>
    </section>
  );
}