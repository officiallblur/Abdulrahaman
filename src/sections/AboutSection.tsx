import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { Download } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const aboutText =
    "I'm Abdulrahman Lawal, a passionate Software Engineer with 5+ years of experience in web and mobile development using React.js, React Native, Flutter, TypeScript, Node.js, and PHP/MySQL, having worked with Barnksforte Technologies, Techminds Academy, and ITF Nigeria. I love transforming ideas into visually stunning and functional applications.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* 4 Decorative Corner 3D Images */}
      {/* Top-left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Abstract Object"
            className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Icon"
            className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
            draggable={false}
          />
        </FadeIn>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full mb-10 sm:mb-14 md:mb-16">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Character-by-character animated paragraph */}
        <div className="w-full max-w-[620px] mx-auto px-4">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        {/* Education & Role Pill */}
        <FadeIn delay={0.2} y={20} className="mt-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/80">
            <span>Software Engineer &amp; ICT Engineer</span>
            <span className="opacity-40">•</span>
            <span>B.Eng. ICT (Airforce Institute of Technology)</span>
          </div>
        </FadeIn>

        {/* Contact & Download CV Buttons */}
        <FadeIn
          delay={0.3}
          y={20}
          className="mt-12 sm:mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <ContactButton />
          <a
            href="/Abdulrahman-Lawal-CV.pdf"
            download="Abdulrahman-Lawal-CV.pdf"
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 inline-flex items-center gap-2.5 hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer select-none no-underline"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
