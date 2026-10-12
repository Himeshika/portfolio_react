import { useRef } from 'react';

const PALETTE = ['#F43F7A', '#B5179E', '#8B5CF6'];
const PANEL_LABELS = {
  '/':          'Home',
  '/projects':  'Projects',
  '/skills':    'Skills',
  '/about':     'About',
  '/gallery':   'Gallery',
  '/contact':   'Contact',
};

export function TransitionOverlay({ overlayRef, labelRef, panelsRef }) {
  return (
    <div ref={overlayRef} className="t-overlay" aria-hidden="true">
      {PALETTE.map((color, i) => (
        <div
          key={i}
          ref={el => { if (el) panelsRef.current[i] = el; }}
          className="t-overlay__panel"
          style={{ background: color }}
        />
      ))}
      <span ref={labelRef} className="t-overlay__label">
        {/* Label text is set by TransitionContext when navigating */}
      </span>
    </div>
  );
}
