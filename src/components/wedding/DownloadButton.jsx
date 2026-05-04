import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';
import { Download, Loader2 } from 'lucide-react';

export default function DownloadButton() {
  const { currentTheme, t } = useWedding();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    // Create a simple invitation text file as fallback
    const content = `
    ╔══════════════════════════════════╗
    ║    श्री गणेशाय नमः              ║
    ║                                  ║
    ║     Arjun  &  Diya               ║
    ║     अर्जुन  एवं  दिया             ║
    ║                                  ║
    ║  Wedding: 15 June 2026           ║
    ║  Venue: Royal Garden, Jaipur     ║
    ║                                  ║
    ║  You are cordially invited!      ║
    ╚══════════════════════════════════╝
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Wedding-Invitation-Arjun-Diya.txt';
    a.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <section className="py-12 px-4 flex justify-center">
      <motion.button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm uppercase tracking-[0.2em] shadow-xl transition-all hover:scale-105"
        style={{
          backgroundColor: currentTheme.accent,
          color: currentTheme.bg,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ boxShadow: `0 0 30px ${currentTheme.glow}` }}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        {t('downloadCard')}
      </motion.button>
    </section>
  );
}