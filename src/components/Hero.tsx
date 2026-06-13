import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Hls from 'hls.js';
import Navbar from './Navbar';

const roles = ['Full Stack Developer', 'Backend Engineer', 'Problem Solver', 'Tech Enthusiast'];
const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [seeWorksHovered, setSeeWorksHovered] = useState(false);
  const [reachOutHovered, setReachOutHovered] = useState(false);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    }
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Eyebrow */}
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-body">
          SOFTWARE ENGINEER
        </span>

        {/* Name */}
        <h1 className="name-reveal text-5xl md:text-7xl lg:text-8xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Poorna Manohar
        </h1>

        {/* Role line */}
        <p className="blur-in text-sm md:text-base text-muted font-body mb-4">
          A{' '}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>{' '}
          based in Hyderabad.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-lg mb-12 font-body leading-relaxed">
          Building scalable full-stack applications with React, Node.js & modern web technologies.
          Passionate about crafting seamless digital experiences.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          {/* See Projects */}
          <div className="relative">
            <span
              className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${seeWorksHovered ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ inset: '-2px' }}
            />
            <button
              className={`relative rounded-full text-sm px-7 py-3.5 font-body transition-all duration-300 hover:scale-105 ${seeWorksHovered
                  ? 'bg-bg text-text-primary'
                  : 'bg-text-primary text-bg'
                }`}
              onMouseEnter={() => setSeeWorksHovered(true)}
              onMouseLeave={() => setSeeWorksHovered(false)}
              onClick={() => {
                const works = document.getElementById('projects');
                if (works) works.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Projects
            </button>
          </div>

          {/* Reach out */}
          <div className="relative">
            <span
              className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${reachOutHovered ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ inset: '-2px' }}
            />
            <button
              className={`relative rounded-full text-sm px-7 py-3.5 font-body transition-all duration-300 hover:scale-105 ${reachOutHovered
                  ? 'border-transparent bg-bg text-text-primary'
                  : 'border-2 border-stroke bg-bg text-text-primary'
                }`}
              onMouseEnter={() => setReachOutHovered(true)}
              onMouseLeave={() => setReachOutHovered(false)}
              onClick={() => {
                const contact = document.getElementById('contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-3 accent-gradient animate-scroll-down absolute" />
        </div>
      </div>
    </section>
  );
}
