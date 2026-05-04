import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';
import { Phone, User } from 'lucide-react';

export default function HostCard() {
  const { currentTheme, t, d, data } = useWedding();

  return (
    <section className="py-16 px-4">
      <motion.div
        className="max-w-md mx-auto rounded-2xl p-8 backdrop-blur-lg shadow-xl relative overflow-hidden"
        style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="font-display text-2xl font-bold text-center mb-6" style={{ color: currentTheme.accent }}>
          {t('hostDetails')}
        </h3>
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: currentTheme.accent + '20' }}>
            <User className="w-6 h-6" style={{ color: currentTheme.accent }} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold" style={{ color: currentTheme.text }}>
              {d(data.host.name, data.host.nameHi)}
            </p>
          </div>
        </div>
        <a
          href={`tel:${data.host.phone}`}
          className="flex items-center justify-center gap-2 mt-4 py-3 rounded-xl font-body text-sm tracking-wider transition-all hover:scale-105"
          style={{ backgroundColor: currentTheme.accent + '15', color: currentTheme.accent }}
        >
          <Phone className="w-4 h-4" />
          {data.host.phone}
        </a>
      </motion.div>
    </section>
  );
}