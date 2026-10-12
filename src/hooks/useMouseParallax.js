import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useMouseParallax(factor = 0.05) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power2.out' });
    const rXTo = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power2.out' });
    const rYTo = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power2.out' });

    const onMove = (e) => {
      const { left, top, width, height } = document.documentElement.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      xTo(dx * factor);
      yTo(dy * factor);
      rXTo(-dy * 0.008);
      rYTo(dx * 0.008);
    };

    const onLeave = () => { xTo(0); yTo(0); rXTo(0); rYTo(0); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { x: 0, y: 0, rotationX: 0, rotationY: 0 });
    };
  }, [factor]);

  return ref;
}
