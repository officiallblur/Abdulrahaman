import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

interface ProjectItem {
  number: string;
  name: string;
  category: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: ProjectItem[] = [
  {
    number: '01',
    name: 'Vidara',
    category: 'React Native • Flutter • Mobile App',
    description:
      'A sleek mobile media player and movie discovery app featuring local device video import, offline playback, trailers, cast profiles, and custom watchlists.',
    liveUrl: 'https://github.com/officiallblur',
    githubUrl: 'https://github.com/officiallblur',
    col1Img1: '/vidara-player.jpg',
    col1Img2: '/vidara-library.jpg',
    col2Img: '/vidara-home.jpg',
  },
  {
    number: '02',
    name: 'Funbox Movie Website',
    category: 'React • JS • Movie API',
    description:
      'A movie information and exploring platform with comprehensive film discovery, search, trailers, cast biographies, and details built using React, CSS, JavaScript, and APIs.',
    liveUrl: 'https://funbox-blue.vercel.app',
    githubUrl: 'https://github.com/officiallblur/funbox.',
    col1Img1: '/funbox-movie.jpg',
    col1Img2: '/funbox-actor.jpg',
    col2Img: '/funbox-home.jpg',
  },
  {
    number: '03',
    name: 'Saylo',
    category: 'React Native • Flutter • Real-Time Chat',
    description:
      'A modern real-time messaging and social connection mobile app featuring instant chats, stories, QR profile sharing, privacy controls, and dark mode.',
    liveUrl: 'https://github.com/officiallblur',
    githubUrl: 'https://github.com/officiallblur',
    col1Img1: '/saylo-chats.jpg',
    col1Img2: '/saylo-profile.jpg',
    col2Img: '/saylo-welcome.jpg',
  },
];

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[88vh] flex items-start justify-center sticky top-20 md:top-28 w-full"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/15 pb-4 sm:pb-5">
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-[240px]">
            {/* Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 75px)' }}
            >
              {project.number}
            </span>

            {/* Name + Category + Description */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="font-bold uppercase tracking-wider text-[#D7E2EA] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  {project.name}
                </h3>
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/80 font-medium px-3 py-1 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/5">
                  {project.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/65 font-light max-w-xl line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>

          {/* Action Buttons: GitHub + Live Project */}
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source on GitHub"
              className="rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              GitHub
            </a>
            <LiveProjectButton href={project.liveUrl} label="Live Demo" />
          </div>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full pt-4 sm:pt-6">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6">
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161616]"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161616]"
              style={{ height: 'clamp(150px, 20vw, 310px)' }}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 tall live screenshot image */}
          <div className="w-full md:w-[60%] flex">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 'clamp(286px, 36.5vw, 544px)' }}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161616] block group relative"
            >
              <img
                src={project.col2Img}
                alt={`${project.name} screenshot`}
                loading="lazy"
                className="w-full h-full object-cover object-top rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading: "Project" */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="relative w-full flex flex-col gap-10 pb-16">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
              totalCards={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
