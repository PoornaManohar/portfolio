import { motion } from 'framer-motion';

interface TimelineEntry {
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string[];
  tags?: string[];
}

const timeline: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Systems Engineer',
    organization: 'Tata Consultancy Services (TCS)',
    period: '2026 – Present',
    description: [
      'Trained in enterprise application development using Java, SQL, and backend technologies',
      'Gaining exposure to real-time project environments and agile methodologies',
      'Applying best practices in coding, debugging, and version control',
      'Working with structured project workflows and enterprise-level tools',
    ],
    tags: ['Java', 'SQL', 'Agile', 'Enterprise'],
  },
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    organization: "Vignan's Institute of Information Technology",
    period: '2020 – 2024',
    description: [
      'Core studies in data structures, algorithms, DBMS, and software engineering',
      'Built multiple full-stack projects during coursework',
    ],
    tags: ['DSA', 'DBMS', 'OOP', 'Full Stack'],
  },
  {
    type: 'education',
    title: 'Intermediate — MPC',
    organization: 'Tirumala Jr. College',
    period: '2018 – 2020',
    description: [
      'Mathematics, Physics, and Chemistry',
      'Developed strong analytical and problem-solving foundations',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
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
              Experience & Education
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
            My <span className="font-display italic">journey</span>
          </h2>
          <p className="text-sm text-muted font-body max-w-md">
            A timeline of my professional experience and academic background.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-stroke" />

          <div className="space-y-8">
            {timeline.map((entry, index) => (
              <motion.div
                key={index}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: '-50px' }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full border-2 border-stroke bg-bg">
                  <div
                    className={`absolute inset-0.5 rounded-full ${
                      entry.type === 'work' ? 'accent-gradient' : 'bg-muted/50'
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="p-6 rounded-2xl bg-surface/30 border border-stroke hover:bg-surface/60 transition-all duration-300 group">
                  {/* Type badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-body px-2.5 py-1 rounded-full border ${
                        entry.type === 'work'
                          ? 'text-[#89AACC] border-[#89AACC]/30 bg-[#89AACC]/5'
                          : 'text-muted border-stroke bg-surface/50'
                      }`}
                    >
                      {entry.type === 'work' ? '💼 Work' : '🎓 Education'}
                    </span>
                    <span className="text-xs text-muted font-body">{entry.period}</span>
                  </div>

                  {/* Title & Org */}
                  <h3 className="text-base md:text-lg text-text-primary font-body font-medium mb-1 group-hover:text-white transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-muted font-body mb-4">{entry.organization}</p>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {entry.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted/80 font-body">
                        <span className="text-stroke mt-1.5 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  {entry.tags && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-bg border border-stroke text-muted font-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
