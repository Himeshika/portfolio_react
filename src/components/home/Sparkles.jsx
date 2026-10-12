import { useMemo } from 'react';
import './Sparkles.css';

const COLORS = ['#FF6FB5', '#C4A6FF', '#7DD3FC', '#F43F7A', '#B5179E'];

export function Sparkles({ count = 30 }) {
  const sparkles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x:     Math.random() * 100,
      size:  Math.random() * 6 + 3,
      delay: Math.random() * 6,
      dur:   Math.random() * 4 + 4,
      color: COLORS[i % COLORS.length],
    }))
  ), [count]);

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map(s => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left:            `${s.x}%`,
            width:           `${s.size}px`,
            height:          `${s.size}px`,
            background:      s.color,
            animationDelay:  `${s.delay}s`,
            animationDuration:`${s.dur}s`,
            boxShadow:       `0 0 ${s.size * 2}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}
