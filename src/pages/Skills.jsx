import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { skillGroups } from '../data/skills';
import './Skills.css';

export function Skills() {
  useDocumentTitle('Skills');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  return (
    <div ref={pageRef} className="page skills-page">
      <header className="page-header container">
        <span className="page-eyebrow">02 / Skills</span>
        <h1 data-enter="title" className="page-title">Tools of the trade</h1>
        <p data-enter="fade" className="page-intro">
          From Java backends to React frontends — the tools I reach for.
        </p>
      </header>

      <section className="container skills-page__grid">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="skill-card"
            data-enter="fade"
            style={{ '--card-accent': group.color }}
          >
            <div className="skill-card__header">
              <span className="skill-card__index">{group.index}</span>
              <h2 className="skill-card__label" style={{ color: group.color }}>
                {group.label}
              </h2>
            </div>
            <div className="skill-card__items">
              {group.skills.map(({ name, Icon, color }) => (
                <div key={name} className="skill-item" title={name}>
                  <Icon size={20} style={{ color }} aria-hidden="true" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
