import { useEffect, useState } from 'react';
import './ScrollProgress.css';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="scroll-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
      <div className="scroll-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
