import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../../context/useWedding';

const GALLERY_IMAGES = [
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/5a165c7ac_generated_252e73b6.png', alt: 'Lord Ram & Sita' },
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/809218e63_generated_7a2bde2d.png', alt: 'Lord Shiva & Parvati' },
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/08cfb8753_generated_493cad86.png', alt: 'Radha & Krishna' },
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/b0d632d47_generated_45f4ef25.png', alt: 'Marigold Flowers' },
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/5a165c7ac_generated_252e73b6.png', alt: 'Lord Ram & Sita' },
  { src: 'https://media.base44.com/images/public/69e728a316848fbeaf7925e8/809218e63_generated_7a2bde2d.png', alt: 'Lord Shiva & Parvati' },
];

export default function PhotoGallery() {
  const { currentTheme, t } = useWedding();
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <motion.div
        className="text-center mb-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold" style={{ color: currentTheme.text }}>
          {t('divineGallery')}
        </h2>
        <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: currentTheme.accent }} />
      </motion.div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden px-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {GALLERY_IMAGES.concat(GALLERY_IMAGES).map((img, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-64 md:w-80 h-44 md:h-56 rounded-2xl overflow-hidden shadow-xl relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
            >
              <p className="text-white text-sm font-body">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}