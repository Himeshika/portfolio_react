import { createContext, useContext, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { prefetch } from '../routes';

const TransitionCtx = createContext(null);

export function useTransition() {
  const ctx = useContext(TransitionCtx);
  if (!ctx) throw new Error('useTransition must be used inside TransitionProvider');
  return ctx;
}

function isLiteMode() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has('lite')) return true;
  const nav = navigator;
  return (
    nav.hardwareConcurrency <= 4 ||
    nav.deviceMemory <= 4 ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function TransitionProvider({ children, overlayRef, labelRef, panelsRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const busy     = useRef(false);
  const lite     = useRef(isLiteMode());

  /** Play cover (panels sweep in). Returns a promise that resolves when cover is fully in. */
  const playCover = useCallback(() => {
    return new Promise((resolve) => {
      const panels  = panelsRef?.current ?? [];
      const overlay = overlayRef?.current ?? null;

      if (lite.current) {
        gsap.to(overlay, { opacity: 1, duration: 0.15, onComplete: resolve });
        return;
      }

      const tl = gsap.timeline({ onComplete: resolve });
      tl.set(panels, { yPercent: 100 })
        .to(panels, { yPercent: 0, duration: 0.3, ease: 'power3.inOut', stagger: 0.05 });
    });
  }, [overlayRef, panelsRef]);

  /** Play reveal (panels sweep out). onStart fires at 40% so page enter can overlap. */
  const playReveal = useCallback((onStart) => {
    return new Promise((resolve) => {
      const panels  = panelsRef?.current ?? [];
      const overlay = overlayRef?.current ?? null;

      if (lite.current) {
        onStart?.();
        gsap.to(overlay, { opacity: 0, duration: 0.15, onComplete: resolve });
        return;
      }

      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(panels, {
        yPercent: -100,
        duration: 0.35,
        ease: 'power3.inOut',
        stagger: 0.05,
        onStart() {
          // fire at 40% of reveal so page enter overlaps
          setTimeout(() => onStart?.(), 0.35 * 0.4 * 1000);
        },
      });
    });
  }, [overlayRef, panelsRef]);

  const go = useCallback(async (path) => {
    if (busy.current || path === location.pathname) return;
    busy.current = true;

    // Mark timing for dev
    performance.mark?.('nav-click');

    // 1. Cover & chunk load in parallel
    await Promise.all([
      playCover(),
      prefetch(path),
    ]);

    // 2. Navigate synchronously so new page is in DOM before reveal
    flushSync(() => navigate(path));
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach(st => st.kill());

    // 3. Unlock input immediately — cover is done
    busy.current = false;

    // 4. Reveal (page enter starts at 40% into it)
    await playReveal(() => document.dispatchEvent(new CustomEvent('page:enter')));

    // Measure total nav time
    if (performance.mark && performance.measure) {
      performance.measure('nav-total', 'nav-click');
      const m = performance.getEntriesByName('nav-total').at(-1);
      if (m) console.debug(`[nav] ${path} — ${Math.round(m.duration)}ms`);
    }
  }, [navigate, location.pathname, playCover, playReveal]);

  // Called by Layout's useLayoutEffect after pathname changes to animate reveal
  const reveal = useCallback((pageName, onDone) => {
    if (lite.current) {
      onDone?.();
      ScrollTrigger.refresh();
      return;
    }

    // On initial load (no cover was played), just make sure panels are off-screen
    const panels = panelsRef?.current ?? [];
    gsap.set(panels, { yPercent: -100 });
    onDone?.();
    // Debounced refresh so ScrollTrigger re-measures after font/image load
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, [panelsRef, lite]);

  return (
    <TransitionCtx.Provider value={{ go, reveal }}>
      {children}
    </TransitionCtx.Provider>
  );
}
