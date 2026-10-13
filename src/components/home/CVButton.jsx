import { useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { gsap } from '../../lib/gsap';
import { site } from '../../data/siteConfig';

const SPARKLE_COLORS = ['#F43F7A', '#8B5CF6', '#7DD3FC', '#FF6FB5', '#B5179E', '#C4A6FF'];

export function CVButton() {
  const btnRef = useRef(null);
  const [label, setLabel] = useState('Download CV');
  const [animating, setAnimating] = useState(false);

  if (!site.showCvDownload || !site.cvPath) return null;

  function handleClick() {
    if (animating) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Label morph
    setLabel('Downloading ✓');
    setAnimating(true);
    setTimeout(() => {
      setLabel('Download CV');
      setAnimating(false);
    }, 1800);

    if (reduceMotion) return;

    // Sparkle burst
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    SPARKLE_COLORS.forEach((color, i) => {
      const el = document.createElement('div');
      el.className = 'cv-sparkle';
      el.style.cssText = `
        position: fixed;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        z-index: 9997;
        left: ${cx}px;
        top: ${cy}px;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(el);

      const angle = (i / SPARKLE_COLORS.length) * 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 40 + Math.random() * 30;
      gsap.to(el, {
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    });
  }

  return (
    <a
      ref={btnRef}
      href={site.cvPath}
      download="Himeshika_Nethmini_CV.pdf"
      className="cv-btn"
      data-cursor="link"
      onClick={handleClick}
    >
      <FiDownload size={16} color="var(--rose)" />
      <span>{label}</span>
    </a>
  );
}
