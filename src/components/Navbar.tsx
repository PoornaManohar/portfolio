import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'About', target: 'about' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [hoveredSayHi, setHoveredSayHi] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (label: string, target: string) => {
    setActiveLink(label);
    setMobileOpen(false);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
            scrolled ? 'shadow-md shadow-black/10' : ''
          }`}
        >
          {/* Logo */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0 group"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={() => handleNavClick('Home', 'hero')}
            style={{
              background: logoHovered
                ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
                : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
              padding: '2px',
              transition: 'transform 0.2s ease',
              transform: logoHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <span className="flex items-center justify-center w-full h-full rounded-full bg-bg font-display italic text-[13px] text-text-primary">
              PM
            </span>
          </button>

          {/* Divider — desktop only */}
          <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

          {/* Nav links — desktop only */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.label, link.target)}
                className={`text-sm rounded-full px-4 py-2 transition-all duration-200 font-body ${
                  activeLink === link.label
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Divider — desktop only */}
          <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

          {/* Say hi button — desktop only */}
          <div className="relative hidden md:block">
            <button
              className="relative text-sm rounded-full px-4 py-2 text-text-primary font-body transition-all duration-200 overflow-visible"
              onMouseEnter={() => setHoveredSayHi(true)}
              onMouseLeave={() => setHoveredSayHi(false)}
              onClick={() => {
                const contact = document.getElementById('contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span
                className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
                  hoveredSayHi ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ inset: '-2px' }}
              />
              <span className="relative flex items-center gap-1 bg-surface rounded-full backdrop-blur-md px-4 py-2 -mx-4 -my-2">
                Say hi <span className="text-sm">↗</span>
              </span>
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 ml-1 rounded-full hover:bg-stroke/30 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-4 h-[1.5px] bg-text-primary mb-[4px] origin-center"
              animate={mobileOpen ? { rotate: 45, y: 2.75 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-4 h-[1.5px] bg-text-primary origin-center"
              animate={mobileOpen ? { rotate: -45, y: -2.75 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleNavClick(link.label, link.target)}
                  className={`text-2xl font-body px-8 py-3 rounded-full transition-all duration-200 ${
                    activeLink === link.label
                      ? 'text-text-primary bg-stroke/30'
                      : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Say hi — mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                onClick={() => {
                  setMobileOpen(false);
                  const contact = document.getElementById('contact');
                  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 text-lg font-body px-8 py-3 rounded-full border border-stroke text-text-primary hover:bg-stroke/30 transition-all duration-200 flex items-center gap-2"
              >
                Say hi <span>↗</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
