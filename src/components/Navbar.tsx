import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string, target: string) => {
    setActiveLink(label);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav links */}
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.label, link.target)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-body ${
                activeLink === link.label
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Say hi button */}
        <div className="relative">
          <button
            className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary font-body transition-all duration-200 overflow-visible"
            onMouseEnter={() => setHoveredSayHi(true)}
            onMouseLeave={() => setHoveredSayHi(false)}
            onClick={() => {
              const contact = document.getElementById('contact');
              if (contact) contact.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* Gradient border on hover */}
            <span
              className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
                hoveredSayHi ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ inset: '-2px' }}
            />
            <span className="relative flex items-center gap-1 bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 -mx-3 sm:-mx-4 -my-1.5 sm:-my-2">
              Say hi <span className="text-sm">↗</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
