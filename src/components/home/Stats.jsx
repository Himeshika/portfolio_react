import { useEffect, useRef } from 'react';
import './Stats.css';

function countUp(el, target, duration = 1800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

export function Stats({ stats }) {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const i = Number(entry.target.dataset.index);
          countUp(entry.target, stats[i].value);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [stats]);

  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div key={i} className="stats__item">
          <div className="stats__num-row">
            <span
              className="stats__value"
              ref={el => { refs.current[i] = el; }}
              data-index={i}
            >
              0
            </span>
            <span className="stats__suffix">{s.suffix}</span>
          </div>
          <span className="stats__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
