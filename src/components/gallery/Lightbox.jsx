import { useEffect, useRef } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { gsap } from '../../lib/gsap';
import './Lightbox.css';

// Minimal touch-swipe hook
function useTouchSwipe(containerRef, { onLeft, onRight, threshold = 50 }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Only fire if horizontal swipe dominates
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        dx < 0 ? onLeft() : onRight();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef, onLeft, onRight, threshold]);
}

export function Lightbox({ item, items, onClose, onNavigate }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  // Touch swipe — next/prev
  useTouchSwipe(containerRef, {
    onLeft:  () => item && onNavigate(1),
    onRight: () => item && onNavigate(-1),
  });

  // Animate in when item becomes active
  useEffect(() => {
    if (!item || !containerRef.current || !contentRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    );

    gsap.fromTo(
      contentRef.current,
      { scale: 0.92, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
    );
  }, [item?.src]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.src === item.src);

  return (
    <div
      ref={containerRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop overlay */}
      <div className="lightbox__backdrop" onClick={onClose} aria-hidden="true" />

      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
        data-cursor="link"
      >
        <FiX size={26} />
      </button>

      {/* Controls */}
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
        aria-label="Previous image"
        data-cursor="link"
      >
        <FiChevronLeft size={36} />
      </button>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
        aria-label="Next image"
        data-cursor="link"
      >
        <FiChevronRight size={36} />
      </button>

      <div className="lightbox__counter">
        {currentIndex >= 0 ? currentIndex + 1 : 1} / {items.length}
      </div>

      <div
        ref={contentRef}
        className="lightbox__content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt || 'Gallery photo'}
          className="lightbox__img"
          draggable="false"
          decoding="async"
        />
        {item.alt && <div className="lightbox__caption">{item.alt}</div>}
      </div>
    </div>
  );
}
