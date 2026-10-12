import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Run page-enter animation after transition reveal.
 * @param {React.RefObject} scopeRef - The container ref to scope all tweens.
 */
export function usePageEnter(scopeRef) {
  useGSAP(() => {
    if (!scopeRef.current) return;

    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isLite = new URLSearchParams(window.location.search).has('lite') ||
      navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

    const ctx = gsap.context(() => {
      // Title words: rise from below — fast stagger, total ≤ 0.45s
      const titleEl = scopeRef.current.querySelector('[data-enter="title"]');
      if (titleEl) {
        const text  = titleEl.textContent;
        const words = text.split(' ');
        titleEl.innerHTML = words
          .map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`)
          .join(' ');
        gsap.fromTo(
          titleEl.querySelectorAll('.word'),
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: isLite ? 0.25 : 0.4,
            ease: 'power3.out',
            stagger: 0.015,
            delay: 0.05,
          }
        );
      }

      // Fade-in blocks — limit to first 30 to avoid heavy batch animations
      const fadeEls = Array.from(
        scopeRef.current.querySelectorAll('[data-enter="fade"]')
      ).slice(0, 30);

      gsap.fromTo(
        fadeEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isLite ? 0.2 : 0.45,
          ease: 'power2.out',
          stagger: 0.04,
          delay: 0.1,
        }
      );

      // Below-fold: ScrollTrigger.batch, once only
      const batchEls = scopeRef.current.querySelectorAll('[data-scroll="fade"]');
      if (batchEls.length) {
        ScrollTrigger.batch(batchEls, {
          once: true,
          onEnter: (els) => {
            gsap.fromTo(els,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04 }
            );
          },
        });
        // Single debounced refresh
        setTimeout(() => ScrollTrigger.refresh(), 250);
      }
    }, scopeRef);

    return () => ctx.revert();
  }, { scope: scopeRef });
}
