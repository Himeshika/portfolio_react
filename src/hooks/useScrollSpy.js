import { useEffect, useState } from 'react';

export function useScrollSpy(ids = [], offset = 80) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: `-${offset}px 0px -40% 0px`, threshold: [0, 0.1, 0.5, 1] }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
