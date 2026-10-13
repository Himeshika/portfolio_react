import { useRef } from 'react';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import heroImg from '../../assets/hero.jpg';
import './PhotoArch.css';

const ORBIT_CHIPS = [
  { label: 'Java',   icon: '☕', angle: 0   },
  { label: 'React',  icon: '⚛️', angle: 72  },
  { label: 'SQL',    icon: '🗄️', angle: 144 },
  { label: 'JS',     icon: '🟡', angle: 216 },
  { label: 'Git',    icon: '🔀', angle: 288 },
];

export function PhotoArch({ isMobile }) {
  // Disable parallax on touch devices
  const parallaxRef = useMouseParallax(isMobile ? 0 : 8);

  // Show fewer chips on mobile to prevent overflow
  const visibleChips = isMobile ? ORBIT_CHIPS.slice(0, 3) : ORBIT_CHIPS;

  return (
    <div className="photo-arch-wrapper">
      {/* Conic gradient ring */}
      <div className="photo-arch__ring" aria-hidden="true" />

      {/* Glow blob behind photo */}
      <div className="photo-arch__glow" aria-hidden="true" />

      {/* Photo with parallax (disabled on touch) */}
      <div ref={isMobile ? null : parallaxRef} className="photo-arch__tilt" style={{ perspective: 800 }}>
        <div className="photo-arch">
          <img
            src={heroImg}
            alt="Himeshika Nethmini — developer portrait"
            className="photo-arch__img"
            width="340"
            height="400"
          />
        </div>
      </div>

      {/* Orbit chips */}
      <div className="orbit" aria-hidden="true">
        {visibleChips.map((chip) => (
          <div
            key={chip.label}
            className="orbit__chip"
            style={{ '--angle': `${chip.angle}deg` }}
          >
            <span>{chip.icon}</span>
            <span className="orbit__chip-label">{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Floating badges — hidden on mobile via CSS */}
      <div className="float-badge float-badge--1">✨ Clean UI</div>
      <div className="float-badge float-badge--2">☕ Java Dev</div>
      <div className="float-badge float-badge--3">💗 Detail-lover</div>
    </div>
  );
}
