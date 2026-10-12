import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    // Sync Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Allow Loader to pause/resume scroll
    const onStop  = () => lenis.stop();
    const onStart = () => lenis.start();
    document.addEventListener('lenis:stop',  onStop);
    document.addEventListener('lenis:start', onStart);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      document.removeEventListener('lenis:stop',  onStop);
      document.removeEventListener('lenis:start', onStart);
    };
  }, []);

  return lenisRef;
}
