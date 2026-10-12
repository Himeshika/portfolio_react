import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import './Preloader.css';

export function Preloader({ visible, onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.fromTo(
        '.preloader__text',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      )
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
          delay: 0.4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <svg
          className="preloader__svg"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10 L10 70 M10 40 L45 40 M45 10 L45 70"
            stroke="url(#grad-preloader)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M65 10 L65 70 L105 10 L105 70"
            stroke="url(#grad-preloader)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="grad-preloader" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F7A" />
              <stop offset="50%" stopColor="#B5179E" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <p className="preloader__text">himeshika nethmini</p>
      </div>
    </div>
  );
}
