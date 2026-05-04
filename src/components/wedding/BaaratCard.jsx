import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';
import { Clock, MapPin, Building } from 'lucide-react';

export default function BaaratCard() {
  const { currentTheme, t, d, data } = useWedding();

  const items = [
    { icon: Clock, label: t('baaratTiming'), value: d(data.baarat.timing, data.baarat.timingHi) },
    { icon: MapPin, label: t('destination'), value: d(data.baarat.destination, data.baarat.destinationHi) },
    { icon: Building, label: t('venue'), value: d(data.baarat.venue, data.baarat.venueHi) },
  ];

  return (
    <section className="py-16 px-4">
      <motion.div
        className="max-w-lg mx-auto rounded-2xl p-8 md:p-10 backdrop-blur-lg shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.accent}, transparent)` }} />
        
        <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: currentTheme.accent }}>
          {t('baaratDetails')}
        </h3>
        
        <div className="space-y-6">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: currentTheme.accent + '20' }}>
                <Icon className="w-5 h-5" style={{ color: currentTheme.accent }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-body" style={{ color: currentTheme.muted }}>{label}</p>
                <p className="font-body text-base mt-0.5" style={{ color: currentTheme.text }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}