import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { pointer } from '../../lib/pointer';
import './Cursor.css';

export function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.documentElement.classList.add('has-cursor');

    const dot  = dotRef.current;
    const ring = ringRef.current;

    // ── Dot: direct DOM transform, zero added latency ──
    const onMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    addEventListener('pointermove', onMove, { passive: true });

    // ── Ring: lerp via gsap ticker, frame-rate independent ──
    let rx = pointer.x;
    let ry = pointer.y;
    const FACTOR = 0.35;

    const tick = (_, dt) => {
      // dt in ms; normalise to 16.67ms baseline so factor is fps-independent
      const k = 1 - Math.pow(1 - FACTOR, dt / 16.67);
      rx += (pointer.x - rx) * k;
      ry += (pointer.y - ry) * k;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    };
    gsap.ticker.add(tick);

    // ── Hover states via event delegation ──
    const onOver = (e) => {
      ring.dataset.state = e.target.closest('[data-cursor]')?.dataset.cursor ?? '';
    };
    document.addEventListener('pointerover', onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-cursor');
      removeEventListener('pointermove', onMove);
      gsap.ticker.remove(tick);
      document.removeEventListener('pointerover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor__dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor__ring" aria-hidden="true">
        <span className="cursor__ring-inner" />
      </div>
    </>
  );
}
