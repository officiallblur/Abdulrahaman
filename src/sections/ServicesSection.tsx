import React from 'react';
import FadeIn from '../components/FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  skills: string[];
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

const coreSkills = [
  'React',
  'React Native',
  'Flutter',
  'TypeScript',
  'Node.js',
  'JavaScript',
  'HTML5',
  'CSS3 / Tailwind CSS',
  'PHP / MySQL',
  'Git & GitHub',
  'REST APIs',
  'Quality Assurance (QA)',
];

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: 'Frontend & Mobile Development',
    description:
      'Building responsive web interfaces and cross-platform mobile applications using React.js, React Native, Flutter, TypeScript, and Tailwind CSS.',
    skills: ['React', 'React Native', 'Flutter', 'TypeScript', 'Tailwind CSS'],
  },
  {
    number: '02',
    name: 'Fullstack Web Engineering',
    description:
      'Developing end-to-end web platforms and dynamic backend architectures using Node.js, PHP, MySQL, authentication systems, and RESTful APIs.',
    skills: ['Node.js', 'PHP', 'MySQL', 'REST APIs'],
  },
  {
    number: '03',
    name: 'Quality Assurance (QA)',
    description:
      'Comprehensive software quality assurance, UI testing, debugging, and cross-browser validation to ensure reliable, bug-free production releases.',
    skills: ['QA Testing', 'Debugging', 'Performance', 'Reliability'],
  },
  {
    number: '04',
    name: 'UI/UX & Interactive Web Design',
    description:
      'Transforming ideas into visually stunning, conversion-focused digital experiences with fluid Framer Motion animations and clean typography.',
    skills: ['Framer Motion', 'Responsive UI', 'Modern CSS', 'UX Flow'],
  },
  {
    number: '05',
    name: 'Technical Mentorship & Training',
    description:
      'Designing fullstack development curricula, teaching HTML, CSS, JavaScript, and PHP, and mentoring aspiring developers through real-world projects.',
    skills: ['Curriculum Design', 'Code Review', 'Mentorship', 'Workshops'],
  },
];

const experienceData: ExperienceItem[] = [
  {
    role: 'Frontend Developer & QA Specialist',
    company: 'Barnksforte Technologies',
    period: 'Mar 2025 – Present',
    description:
      'Developed responsive and scalable user interfaces using React.js, TypeScript, and modern frontend tools, while driving Quality Assurance (QA) testing across web applications.',
  },
  {
    role: 'Fullstack Developer (Instructor)',
    company: 'Techminds Academy',
    period: 'Jan 2024 – Feb 2025',
    description:
      'Taught HTML, CSS, JavaScript, and PHP to aspiring developers, developed curriculum and learning materials for fullstack development, and mentored students through projects and career development.',
  },
  {
    role: 'IT & Networking Trainee',
    company: 'Industrial Training Fund (ITF)',
    period: 'Sep 2022 – Mar 2023',
    description:
      'Performed computer hardware maintenance and troubleshooting, gained hands-on expertise in networking fundamentals and configurations, and participated in real-world IT infrastructure projects.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative z-0 bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-10 sm:mb-14">
          <h2
            className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills &amp; Services
          </h2>
        </FadeIn>

        {/* Core Skill Pills from Portfolio */}
        <FadeIn delay={0.1} y={20} className="w-full mb-16 sm:mb-20 md:mb-24">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {coreSkills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 rounded-full border border-[#0C0C0C]/20 bg-[#0C0C0C]/[0.04] text-[#0C0C0C] font-medium uppercase tracking-wider text-xs sm:text-sm hover:bg-[#0C0C0C] hover:text-white transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Services List */}
        <div className="w-full flex flex-col">
          {servicesData.map((service, i) => (
            <FadeIn
              key={service.number}
              delay={i * 0.1}
              y={30}
              className="w-full border-t border-[rgba(12,12,12,0.15)] last:border-b py-8 sm:py-10 md:py-12"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 md:gap-14 w-full">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none select-none min-w-[120px] sm:min-w-[160px] md:min-w-[200px]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description + Skill Tags stacked vertically */}
                <div className="flex flex-col justify-center flex-1 gap-2 sm:gap-3">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-70"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.skills.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C]/70 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Experience Timeline Section */}
        <div id="experience" className="w-full pt-24 sm:pt-28 md:pt-36 pb-8">
          <FadeIn delay={0} y={40} className="w-full text-center mb-14 sm:mb-20">
            <h2
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center select-none"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
            >
              Experience
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {experienceData.map((exp, idx) => (
              <FadeIn
                key={exp.company}
                delay={idx * 0.15}
                y={30}
                className="rounded-[32px] border-2 border-[#0C0C0C]/15 bg-[#0C0C0C]/[0.02] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0C0C0C] transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#0C0C0C] text-white">
                      {exp.period}
                    </span>
                    <span className="text-2xl font-black text-[#0C0C0C]/20">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#0C0C0C] leading-snug mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium uppercase tracking-wider text-[#B600A8] mb-4">
                    {exp.company}
                  </p>
                  <p className="text-sm sm:text-base font-light text-[#0C0C0C]/75 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
