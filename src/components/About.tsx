import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              About Me
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-10">
            A bit about <span className="font-display italic">myself</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — Bio */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-base md:text-lg text-text-primary/90 font-body leading-relaxed mb-6">
              I'm an early-career software engineer with hands-on experience in building 
              real-world, user-facing applications. I'm passionate about full-stack product 
              development and eager to contribute to product-driven engineering teams.
            </p>
            <p className="text-sm md:text-base text-muted font-body leading-relaxed mb-6">
              Proficient in JavaScript and full-stack development using React, Node.js, Express, 
              and databases. I have a strong understanding of designing and developing scalable 
              RESTful APIs and deploying applications to production.
            </p>
            <p className="text-sm md:text-base text-muted font-body leading-relaxed">
              Currently working as a Systems Engineer at Tata Consultancy Services (TCS), where 
              I'm gaining exposure to enterprise-level application development and agile 
              methodologies while sharpening my skills in Java, SQL, and backend technologies.
            </p>
          </motion.div>

          {/* Right — Quick Info Cards */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Info cards */}
            {[
              { label: 'Location', value: 'Hyderabad, India', icon: '📍' },
              { label: 'Email', value: 'poornamanohar754@gmail.com', icon: '✉️' },
              { label: 'Phone', value: '+91 6301232334', icon: '📱' },
              { label: 'Currently at', value: 'TCS — Systems Engineer', icon: '💼' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface/50 border border-stroke hover:bg-surface transition-colors duration-300 group"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-muted font-body uppercase tracking-[0.15em]">
                    {item.label}
                  </p>
                  <p className="text-sm text-text-primary font-body group-hover:text-white transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
