import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

function FamilyCard({ title, personName, father, mother, side }) {
  const { currentTheme } = useWedding();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="relative w-full max-w-sm"
      initial={{ opacity: 0, x: side === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        style={{ rotateX, rotateY, perspective: 1200 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.03 }}
        className="relative rounded-2xl p-8 md:p-10 backdrop-blur-lg shadow-2xl overflow-hidden preserve-3d cursor-default"
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Background */}
        <div 
          className="absolute inset-0 rounded-2xl" 
          style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}` }} 
        />
        
        {/* Ornament corner */}
        <div 
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
          style={{ backgroundColor: currentTheme.accent }}
        />
        <div 
          className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-10"
          style={{ backgroundColor: currentTheme.accent }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <p 
            className="text-xs uppercase tracking-[0.25em] mb-4 font-body"
            style={{ color: currentTheme.muted }}
          >
            {title}
          </p>
          <h3 
            className="font-display text-3xl md:text-4xl font-bold mb-6"
            style={{ color: currentTheme.accent }}
          >
            {personName}
          </h3>
          <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: currentTheme.accent + '40' }} />
          <div className="space-y-2">
            <p className="text-sm font-body" style={{ color: currentTheme.text }}>
              <span className="opacity-60">S/o </span>{father}
            </p>
            <p className="text-sm font-body" style={{ color: currentTheme.text }}>
              <span className="opacity-60">& </span>{mother}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FamilyCards() {
  const { t, d, data } = useWedding();
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <FamilyCard
          title={t('groomLabel')}
          personName={d(data.groom.name, data.groom.nameHi)}
          father={d(data.groomFather.name, data.groomFather.nameHi)}
          mother={d(data.groomMother.name, data.groomMother.nameHi)}
          side="left"
        />
        <FamilyCard
          title={t('brideLabel')}
          personName={d(data.bride.name, data.bride.nameHi)}
          father={d(data.brideFather.name, data.brideFather.nameHi)}
          mother={d(data.brideMother.name, data.brideMother.nameHi)}
          side="right"
        />
      </div>
    </section>
  );
}