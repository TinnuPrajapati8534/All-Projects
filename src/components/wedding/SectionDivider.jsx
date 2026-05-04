import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

export default function SectionDivider() {
  const { currentTheme } = useWedding();
  return (
    <motion.div 
      className="flex items-center justify-center py-8 gap-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="h-px w-16 md:w-24" style={{ backgroundColor: currentTheme.accent + '40' }} />
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: currentTheme.accent }} />
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
      <div className="h-px w-16 md:w-24" style={{ backgroundColor: currentTheme.accent + '40' }} />
    </motion.div>
  );
}