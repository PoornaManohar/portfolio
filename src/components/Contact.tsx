import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Hls from 'hls.js';

const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const marqueeText = 'BUILDING THE FUTURE • ';
const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/poorna-manohar/' },
  { name: 'GitHub', href: 'https://github.com/PoornaManohar' },
  { name: 'Email', href: 'mailto:poornamanohar754@gmail.com' },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [emailHovered, setEmailHovered] = useState(false);

  // HLS video (flipped)
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

  // GSAP Marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video (flipped vertically) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
        />
        {/* Heavy overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10 mx-4"
              >
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16 md:mb-20 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-4">
            Let's work{' '}
            <span className="font-display italic">together</span>
          </h2>
          <p className="text-sm text-muted font-body max-w-md mx-auto mb-8">
            Looking for a driven software engineer? Let's connect and build something great.
          </p>

          {/* Email button */}
          <div className="relative inline-flex">
            <span
              className={`absolute rounded-full accent-gradient transition-opacity duration-300 ${
                emailHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ inset: '-2px' }}
            />
            <a
              href="mailto:poornamanohar754@gmail.com"
              className="relative rounded-full text-sm px-8 py-4 bg-surface text-text-primary font-body border border-stroke hover:border-transparent transition-all duration-300 flex items-center gap-2 hover:scale-105"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              poornamanohar754@gmail.com <span>↗</span>
            </a>
          </div>

          {/* Phone */}
          <p className="text-xs text-muted font-body mt-4">
            Or call: +91 6301232334
          </p>
        </div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-stroke pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-text-primary transition-colors font-body uppercase tracking-[0.15em]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs text-muted font-body">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted/50 font-body">
              © 2026 Poorna Manohar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
