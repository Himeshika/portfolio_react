import './Marquee.css';

const SKILLS_STRIP = [
  '☕ Java', '🗄️ SQL', '🌐 HTML5', '🎨 CSS3', '🟡 JavaScript',
  '🔀 Git', '🐧 Linux', '🗃️ MySQL', '📦 Hibernate', '🐘 PostgreSQL',
  '🖥️ JavaFX', '⚡ Clean Code', '💡 Problem Solving', '🎯 Detail-oriented',
];

export function Marquee() {
  const items = [...SKILLS_STRIP, ...SKILLS_STRIP]; // doubled for seamless loop

  return (
    <div className="marquee-wrapper" aria-label="Skills strip">
      <div className="marquee__fade marquee__fade--left" aria-hidden="true" />
      <div className="marquee__fade marquee__fade--right" aria-hidden="true" />
      <div className="marquee">
        <div className="marquee__track">
          {items.map((s, i) => (
            <span key={i} className="marquee__item">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
