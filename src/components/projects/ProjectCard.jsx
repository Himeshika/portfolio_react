import { useState, useRef } from 'react';
import { TransitionLink } from '../layout/TransitionLink';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import './ProjectCard.css';

export function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 8;
    const y = -((e.clientY - top) / height - 0.5) * 8;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const primaryGithub = project.github && project.github.length > 0 ? project.github[0] : null;

  return (
    <article
      ref={cardRef}
      className="project-card"
      data-enter="fade"
      style={{
        '--card-accent': project.color || 'var(--rose)',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__header">
        <span className="project-card__type">{project.type}</span>
        <span className="project-card__year">{project.year}</span>
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">
          <TransitionLink to={`/projects/${project.slug}`} data-cursor="view">
            {project.title}
          </TransitionLink>
        </h3>
        <p className="project-card__subtitle">{project.subtitle}</p>

        <div className="project-card__tags">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="project-card__tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="project-card__footer">
        <TransitionLink
          to={`/projects/${project.slug}`}
          className="project-card__link project-card__link--view"
          data-cursor="view"
        >
          <span>Explore case</span>
          <FiArrowUpRight size={16} />
        </TransitionLink>

        {primaryGithub && (
          <a
            href={`https://github.com/Himeshika/${primaryGithub.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--github"
            aria-label={`${project.title} GitHub`}
            data-cursor="link"
          >
            <FiGithub size={16} />
            <span>{primaryGithub.label}</span>
          </a>
        )}
      </div>
    </article>
  );
}
