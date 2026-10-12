import { useRef } from 'react';

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${className}`}
      data-enter="fade"
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
