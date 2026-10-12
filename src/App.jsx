import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { useTheme } from './hooks/useTheme';
import { site } from './data/siteConfig';

import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Cursor } from './components/layout/Cursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Aurora } from './components/home/Aurora';

import { Hero } from './components/home/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';
import { Gallery } from './components/gallery/Gallery';
import { Contact } from './components/sections/Contact';

function App() {
  useLenis();
  const { theme, toggle } = useTheme();
  
  // Preloader logic
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Skip if prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Preloader visible={loading} />
      
      {!loading && (
        <>
          <Cursor />
          <ScrollProgress />
          <Navbar theme={theme} onThemeToggle={toggle} />
          
          <main>
            {/* The Aurora persists behind all sections, fixed. */}
            <Aurora />

            <Hero site={site} onSectionClick={scrollTo} />
            <Projects />
            <Skills />
            <About />
            <Gallery />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

export default App;
