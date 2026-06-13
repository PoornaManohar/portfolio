import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  image: string;
  title: string;
}

const items: ExplorationItem[] = [
  { image: '/images/exploration-1.png', title: 'Abstract Forms' },
  { image: '/images/exploration-2.png', title: 'Light Trails' },
  { image: '/images/exploration-3.png', title: 'Geometric Play' },
  { image: '/images/exploration-4.png', title: 'Fluid Marble' },
  { image: '/images/exploration-5.png', title: 'Digital Terrain' },
  { image: '/images/exploration-6.png', title: 'Macro Worlds' },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [dribbbleHovered, setDribbbleHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          scroller: undefined,
        });
      }

      // Parallax column 1 - moves up
      if (col1Ref.current) {
        const cards1 = col1Ref.current.querySelectorAll('.exploration-card');
        cards1.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 100 + i * 50, rotation: -2 + i * 1.5 },
            {
              y: -100 - i * 50,
              rotation: 2 - i * 1.5,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }

      // Parallax column 2 - moves down
      if (col2Ref.current) {
        const cards2 = col2Ref.current.querySelectorAll('.exploration-card');
        cards2.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: -100 - i * 50, rotation: 2 - i * 1.5 },
            {
              y: 100 + i * 50,
              rotation: -2 + i * 1.5,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3, 6);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
        {/* Layer 1: Pinned center content */}
        <div
          ref={contentRef}
          className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Explorations
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
            Visual <span className="font-display italic">playground</span>
          </h2>

          <p className="text-sm text-muted font-body max-w-md mb-8">
            Experimental work, side projects, and visual explorations outside client work.
          </p>

          {/* Dribbble button */}
          <div className="relative">
            <span
              className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
                dribbbleHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ inset: '-2px' }}
            />
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-full text-sm px-6 py-3 bg-surface text-text-primary font-body border border-stroke hover:border-transparent transition-all duration-300 flex items-center gap-2"
              onMouseEnter={() => setDribbbleHovered(true)}
              onMouseLeave={() => setDribbbleHovered(false)}
            >
              View on Dribbble <span>↗</span>
            </a>
          </div>
        </div>

        {/* Layer 2: Parallax columns */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto h-full px-6 md:px-16">
            <div className="grid grid-cols-2 gap-12 md:gap-40 h-full items-center">
              {/* Column 1 */}
              <div ref={col1Ref} className="flex flex-col gap-8 items-end">
                {leftItems.map((item, i) => (
                  <div
                    key={i}
                    className="exploration-card aspect-square max-w-[320px] w-full rounded-2xl overflow-hidden border border-stroke bg-surface cursor-pointer pointer-events-auto hover:border-muted transition-colors duration-300"
                    onClick={() => setLightbox(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div ref={col2Ref} className="flex flex-col gap-8 items-start">
                {rightItems.map((item, i) => (
                  <div
                    key={i}
                    className="exploration-card aspect-square max-w-[320px] w-full rounded-2xl overflow-hidden border border-stroke bg-surface cursor-pointer pointer-events-auto hover:border-muted transition-colors duration-300"
                    onClick={() => setLightbox(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Exploration"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
