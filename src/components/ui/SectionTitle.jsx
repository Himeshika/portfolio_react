import './SectionTitle.css';

export function SectionTitle({ eyebrow, heading, gradient = true, centered = false }) {
  return (
    <div className={`section-title ${centered ? 'section-title--centered' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`section-title__heading ${gradient ? 'section-title__heading--gradient' : ''}`}>
        {heading}
      </h2>
      <div className="section-title__line" aria-hidden="true" />
    </div>
  );
}
