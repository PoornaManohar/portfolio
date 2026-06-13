import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: { name: string; icon: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', icon: '⚡' },
      { name: 'Java', icon: '☕' },
      { name: 'C++', icon: '⚙️' },
      { name: 'TypeScript', icon: '🔷' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '✨' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '🚀' },
      { name: 'REST APIs', icon: '🔗' },
      { name: 'JWT Auth', icon: '🔐' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MySQL', icon: '🐬' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git & GitHub', icon: '🔀' },
      { name: 'Postman', icon: '📮' },
      { name: 'Vercel', icon: '▲' },
      { name: 'VS Code', icon: '💻' },
    ],
  },
];

export default function TechStack() {
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
              Tech Stack
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
            Technologies I{' '}
            <span className="font-display italic">work with</span>
          </h2>
          <p className="text-sm text-muted font-body max-w-md">
            My core toolkit for building modern, scalable web applications.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="p-6 rounded-3xl bg-surface/30 border border-stroke hover:bg-surface/60 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: categoryIndex * 0.1,
              }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <h3 className="text-xs text-muted uppercase tracking-[0.2em] font-body mb-5">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-bg border border-stroke text-sm text-text-primary font-body hover:border-muted transition-colors duration-300 cursor-default"
                  >
                    <span className="text-xs">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
