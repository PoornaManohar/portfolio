import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  value: string;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView || !countRef.current) return;

    const target = parseInt(value);
    const duration = 2000;
    const startTime = performance.now();
    const delayMs = delay * 1000;

    const timer = setTimeout(() => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime - delayMs;
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        if (countRef.current) {
          countRef.current.textContent = String(current);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary mb-3">
        <span ref={countRef}>0</span>
        <span className="text-muted">{suffix}</span>
      </div>
      <p className="text-sm text-muted font-body uppercase tracking-[0.2em]">
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: '2', suffix: '+', label: 'Projects Deployed' },
  { value: '5', suffix: '+', label: 'Technologies Mastered' },
  { value: '1', suffix: '+', label: 'Years Experience' },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
