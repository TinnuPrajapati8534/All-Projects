import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import FloatingParticles from '../components/wedding/FloatingParticles';
import FloatingLanterns from '../components/wedding/FloatingLanterns';
import FloatingControls from '../components/wedding/FloatingControls';
import HeroSection from '../components/wedding/HeroSection';
import SectionDivider from '../components/wedding/SectionDivider';
import FamilyCards from '../components/wedding/FamilyCards';
import EventCards from '../components/wedding/EventCards';
import BaaratCard from '../components/wedding/BaaratCard';
import HostCard from '../components/wedding/HostCard';
import CountdownTimer from '../components/wedding/CountdownTimer';
import PhotoGallery from '../components/wedding/PhotoGallery';
import CulturalCards from '../components/wedding/CulturalCards';
import FooterSection from '../components/wedding/FooterSection';
import DownloadButton from '../components/wedding/DownloadButton';
import ProcessionSection from '../components/wedding/ProcessionSection';

export default function WeddingInvitation() {
  const { currentTheme } = useWedding();

  return (
    <div
      className="min-h-screen relative overflow-x-hidden transition-colors duration-1000"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Theme background image + gradient overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme.name}
          className="fixed inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${currentTheme.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundAttachment: 'fixed',
            opacity: 0.2,
          }}
        />
      </AnimatePresence>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: currentTheme.gradient,
          opacity: 0.78,
        }}
      />
      <FloatingParticles count={20} />
      <FloatingLanterns count={8} />
      <FloatingControls />

      <HeroSection />
      <ProcessionSection />
      <SectionDivider />
      <FamilyCards />
      <SectionDivider />
      <EventCards />
      <SectionDivider />
      <BaaratCard />
      <SectionDivider />
      <HostCard />
      <SectionDivider />
      <CountdownTimer />
      <SectionDivider />
      <PhotoGallery />
      <SectionDivider />
      <CulturalCards />
      <SectionDivider />
      <DownloadButton />
      <SectionDivider />
      <FooterSection />
    </div>
  );
}
