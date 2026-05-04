import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';
import { Flower2, Music2, Sparkles, PartyPopper, Heart, Crown } from 'lucide-react';

const EVENT_ICONS = {
  haldi: Flower2,
  mehndi: Sparkles,
  ladiesSangeet: Music2,
  lagan: Heart,
  baarat: Crown,
  reception: PartyPopper,
};

function EventCard({ event, index }) {
  const { currentTheme, t, d } = useWedding();
  const [flipped, setFlipped] = useState(false);
  const Icon = EVENT_ICONS[event.key] || Sparkles;

  return (
    <motion.div
      className="perspective-1000 w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        className="relative w-full h-52 md:h-56 cursor-pointer preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={() => setFlipped(!flipped)}
        whileHover={{ scale: 1.03 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl backface-hidden flex flex-col items-center justify-center p-6 backdrop-blur-lg shadow-xl"
          style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: currentTheme.accent + '20' }}>
            <Icon className="w-7 h-7" style={{ color: currentTheme.accent }} />
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold" style={{ color: currentTheme.text }}>
            {t(event.key)}
          </h3>
          <p className="text-xs mt-3 uppercase tracking-widest" style={{ color: currentTheme.muted }}>
            Tap to view details
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 backdrop-blur-lg shadow-xl"
          style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.accent}40` }}
        >
          <h3 className="font-display text-lg font-bold mb-3" style={{ color: currentTheme.accent }}>
            {t(event.key)}
          </h3>
          <div className="space-y-2 text-center">
            <p className="text-sm font-body" style={{ color: currentTheme.text }}>
              📅 {d(event.date, event.dateHi)}
            </p>
            <p className="text-sm font-body" style={{ color: currentTheme.text }}>
              🕐 {event.time}
            </p>
            <p className="text-sm font-body" style={{ color: currentTheme.text }}>
              📍 {d(event.venue, event.venueHi)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EventCards() {
  const { currentTheme, t, data } = useWedding();
  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold" style={{ color: currentTheme.text }}>
          {t('weddingEvents')}
        </h2>
        <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: currentTheme.accent }} />
      </motion.div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.events.map((event, i) => (
          <EventCard key={event.key} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}