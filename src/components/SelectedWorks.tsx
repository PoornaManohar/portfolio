import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  bullets: string[];
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  span: string;
  aspect: string;
}

const projects: Project[] = [
  {
    title: 'StayScape',
    description: 'Full Stack Hotel Booking & Management Platform',
    bullets: [
      'Built a full-stack hotel booking system with separate user and owner interfaces',
      'Implemented responsive booking flow for browsing properties, checking availability, and booking hotels',
      'Developed an owner dashboard to manage property listings and customer bookings',
      'Designed MongoDB schemas for users, hotels, and bookings',
      'Implemented secure authentication using JWT for user sessions',
      'Deployed on Vercel with full frontend–backend integration',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'JWT', 'MongoDB'],
    image: '/images/stayscape.png',
    liveUrl: 'https://stay-scape-bice.vercel.app/',
    span: 'md:col-span-7',
    aspect: 'aspect-[4/3] md:aspect-[16/10]',
  },
  {
    title: 'Realtime Chat App',
    description: 'Full Stack Real-Time Communication Platform',
    bullets: [
      'Developed instant user-to-user communication with WebSockets',
      'Implemented low-latency messaging for real-time interaction',
      'Built backend services with Node.js and Express.js for socket events',
      'Managed real-time socket connections and event handling efficiently',
      'Integrated MongoDB for storing user data and chat history',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets'],
    image: '/images/chat-app.png',
    githubUrl: 'https://github.com/PoornaManohar/Real-time-chat-application',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3] md:aspect-[16/10]',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={project.span}>
      <motion.div
        className={`relative ${project.aspect} rounded-3xl overflow-hidden bg-surface border border-stroke group cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index * 0.15,
        }}
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Background image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Halftone overlay */}
        <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply" />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-bg/80 backdrop-blur-lg transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Title pill */}
          <div className="relative rounded-full p-[2px] gradient-border-animated mb-4">
            <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2">
              <span className="text-sm text-black font-body font-medium">
                {project.title}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted font-body mb-4 max-w-xs">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-1 rounded-full border border-stroke text-text-primary/80 font-body bg-surface/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-4 py-2 rounded-full bg-text-primary text-bg font-body hover:scale-105 transition-transform inline-flex items-center gap-1"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-4 py-2 rounded-full border border-stroke text-text-primary font-body hover:bg-surface transition-colors inline-flex items-center gap-1"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Project info below card (always visible) */}
      <div className="mt-4 px-1">
        <h3 className="text-base md:text-lg text-text-primary font-body font-medium">
          {project.title}
        </h3>
        <p className="text-xs text-muted font-body mt-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full border border-stroke text-muted font-body"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-stroke text-muted font-body">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Projects
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
                Featured{' '}
                <span className="font-display italic">projects</span>
              </h2>
              <p className="text-sm text-muted font-body max-w-md">
                Full-stack applications I've built from concept to deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
