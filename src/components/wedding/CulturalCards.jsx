import { motion } from "framer-motion";
import { useWedding } from "../../context/useWedding";
import { Award, Users, Handshake, Baby } from "lucide-react";

const CARD_ICONS = {
  swagatkarta: Award,
  nanihalPaksh: Users,
  jawaiPaksh: Handshake,
  balManuhaar: Baby,
};

function CulturalCard({ card, index }) {
  const { currentTheme, t, d } = useWedding();

  const Icon = CARD_ICONS[card.key] ?? Award;

  return (
    <motion.div
      className="rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-xl relative overflow-hidden group"
      style={{
        backgroundColor: currentTheme.cardBg,
        border: `1px solid ${currentTheme.cardBorder}`,
      }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ boxShadow: `inset 0 0 40px ${currentTheme.glow}` }}
      />

      <div className="relative z-10 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: currentTheme.accent + "20" }}
        >
          <Icon className="w-6 h-6" style={{ color: currentTheme.accent }} />
        </div>

        <h3
          className="font-display text-lg md:text-xl font-bold mb-3"
          style={{ color: currentTheme.accent }}
        >
          {t(card.key)}
        </h3>

        <div className="space-y-1">
          {(d(card.names, card.namesHi) || []).map((name, i) => (
            <p key={i} className="font-body text-sm" style={{ color: currentTheme.text }}>
              {name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CulturalCards() {
  const { currentTheme, t, data } = useWedding();

  return (
    <section className="py-16 md:py-24 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className="font-display text-3xl md:text-5xl font-bold"
          style={{ color: currentTheme.text }}
        >
          {t("culturalHonors")}
        </h2>

        <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: currentTheme.accent }} />
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.culturalCards.map((card, i) => (
          <CulturalCard key={card.key} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
