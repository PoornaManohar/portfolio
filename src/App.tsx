import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/SelectedWorks';
import Experience from './components/Experience';
import Stats from './components/Stats';
import Contact from './components/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="bg-bg text-text-primary font-body">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Stats />
          <Contact />
        </main>
      )}
    </>
  );
}
