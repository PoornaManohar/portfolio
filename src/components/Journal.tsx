import { useState } from 'react';
import { motion } from 'framer-motion';

interface JournalEntry {
  title: string;
  readTime: string;
  date: string;
  image: string;
}

const entries: JournalEntry[] = [
  {
    title: 'The Art of Minimal Design in Modern Interfaces',
    readTime: '5 min read',
    date: 'Mar 2026',
    image: '/images/journal-thumb.png',
  },
  {
    title: 'Building Performant Animations with GSAP & React',
    readTime: '8 min read',
    date: 'Feb 2026',
    image: '/images/journal-thumb.png',
  },
  {
    title: 'Why Typography Matters More Than You Think',
    readTime: '4 min read',
    date: 'Jan 2026',
    image: '/images/journal-thumb.png',
  },
  {
    title: 'From Concept to Launch: A Design Sprint Framework',
    readTime: '6 min read',
    date: 'Dec 2025',
    image: '/images/journal-thumb.png',
  },
];

export default function Journal() {
  const [viewAllHovered, setViewAllHovered] = useState(false);

  return (
    <section className="bg-bg py-16 md:py-24">
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
              Journal
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
                Recent{' '}
                <span className="font-display italic">thoughts</span>
              </h2>
              <p className="text-sm text-muted font-body max-w-md">
                Insights and reflections on design, development, and the creative process.
              </p>
            </div>

            {/* View all button - desktop */}
            <div className="relative hidden md:inline-flex">
              <span
                className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
                  viewAllHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ inset: '-2px' }}
              />
              <button
                className="relative rounded-full text-sm px-6 py-3 bg-surface text-text-primary font-body border border-stroke hover:border-transparent transition-all duration-300 flex items-center gap-2"
                onMouseEnter={() => setViewAllHovered(true)}
                onMouseLeave={() => setViewAllHovered(false)}
              >
                View all <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <a
                href="#"
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base text-text-primary font-body font-medium group-hover:text-white transition-colors truncate">
                    {entry.title}
                  </h3>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-muted font-body">
                    {entry.readTime}
                  </span>
                  <span className="text-xs text-muted font-body hidden sm:inline">
                    {entry.date}
                  </span>
                  <span className="text-muted group-hover:text-text-primary transition-colors">
                    →
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
