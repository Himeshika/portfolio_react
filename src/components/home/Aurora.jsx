import { useEffect } from 'react';
import './Aurora.css';

export function Aurora() {
  useEffect(() => {
    // Pause CSS animations when tab is hidden (saves GPU/CPU)
    const el = document.querySelector('.aurora');
    if (!el) return;
    const onVisibility = () => {
      el.style.animationPlayState = document.hidden ? 'paused' : 'running';
      Array.from(el.children).forEach(child => {
        child.style.animationPlayState = document.hidden ? 'paused' : 'running';
      });
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Lite mode: hide aurora entirely
  const isLite = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('lite');
  if (isLite) return null;

  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__blob aurora__blob--4" />
    </div>
  );
}
