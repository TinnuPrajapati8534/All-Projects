import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';
import { MapPin, Navigation } from 'lucide-react';

function VenueCard({ venue, index }) {
  const { currentTheme, t, d } = useWedding();

  return (
    <motion.div
      className="rounded-2xl p-6 backdrop-blur-lg shadow-xl relative overflow-hidden"
      style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: currentTheme.accent + '20' }}>
          <MapPin className="w-5 h-5" style={{ color: currentTheme.accent }} />
        </div>
        <div>
          <h4 className="font-display text-lg font-bold" style={{ color: currentTheme.accent }}>
            {t(venue.key)}
          </h4>
          <p className="font-body text-sm mt-1" style={{ color: currentTheme.text }}>
            {d(venue.address, venue.addressHi)}
          </p>
        </div>
      </div>
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm tracking-wider transition-all hover:scale-105"
        style={{ backgroundColor: currentTheme.accent + '15', color: currentTheme.accent }}
      >
        <Navigation className="w-4 h-4" />
        {t('openInMap')}
      </a>
    </motion.div>
  );
}

export default function FooterSection() {
  const { currentTheme, t, d, data } = useWedding();

  return (
    <footer className="py-16 md:py-24 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold" style={{ color: currentTheme.text }}>
          {t('footerTitle')}
        </h2>
        <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: currentTheme.accent }} />
      </motion.div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.venues.map((venue, i) => (
          <VenueCard key={venue.key} venue={venue} index={i} />
        ))}
      </div>
      
      {/* Copyright */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-xs tracking-wider" style={{ color: currentTheme.muted }}>
          {d(data.groom.name, data.groom.nameHi)} {t('weds')} {d(data.bride.name, data.bride.nameHi)} • 2026
        </p>
        <p className="font-body text-xs mt-1 opacity-40" style={{ color: currentTheme.muted }}>
          Made with ♥
        </p>
      </motion.div>
    </footer>
  );
}