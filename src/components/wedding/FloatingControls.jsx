import { motion } from 'framer-motion';
import { ArrowUp, Music, VolumeX, Palette, Languages } from 'lucide-react';
import { useWedding } from '../../context/useWedding';

export default function FloatingControls() {
  const { cycleTheme, toggleLang, lang, musicPlaying, setMusicPlaying, currentTheme } = useWedding();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const btnStyle = {
    backgroundColor: currentTheme.cardBg,
    border: `1px solid ${currentTheme.cardBorder}`,
    color: currentTheme.accent,
  };

  return (
    <motion.div
      className="fixed right-4 bottom-6 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <button
        onClick={toggleLang}
        className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
        style={btnStyle}
        title={lang === 'en' ? 'हिंदी' : 'English'}
      >
        <Languages className="w-5 h-5" />
      </button>
      <button
        onClick={cycleTheme}
        className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
        style={btnStyle}
        title="Change Theme"
      >
        <Palette className="w-5 h-5" />
      </button>
      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
        style={btnStyle}
        title="Toggle Music"
      >
        {musicPlaying ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
      <button
        onClick={scrollToTop}
        className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
        style={btnStyle}
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </motion.div>
  );
}