import React from 'react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import FooterSection from './sections/FooterSection';

export const App: React.FC = () => {
  return (
    <div
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-[#B600A8] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Projects Section */}
      <ProjectsSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};

export default App;
