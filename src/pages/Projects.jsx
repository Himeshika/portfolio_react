import { useRef, useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { TransitionLink } from '../components/layout/TransitionLink';
import { projects, projectFilters } from '../data/projects';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import './Projects.css';

function FloatingPreview({ project, visible, posRef }) {
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current || !posRef.current) return;
    const { x, y } = posRef.current;
    gsap.to(cardRef.current, {
      x: x + 24,
      y: y - 60,
      duration: 0.15,
      ease: 'power2.out',
    });
  }, [visible]);

  if (!project) return null;
  return (
    <div
      ref={cardRef}
      className={`preview-card ${visible ? 'preview-card--visible' : ''}`}
      aria-hidden="true"
      style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}55)`, borderColor: project.color + '44' }}
    >
      <div className="preview-card__title" style={{ color: project.color }}>{project.title}</div>
      <div className="preview-card__sub">{project.subtitle}</div>
      <div className="preview-card__tech">
        {project.tech.slice(0, 3).map(t => <span key={t} className="tech-chip">{t}</span>)}
      </div>
    </div>
  );
}

export function Projects() {
  useDocumentTitle('Projects');
  const pageRef    = useRef(null);
  const posRef     = useRef({ x: 0, y: 0 });
  const [filter,   setFilter]   = useState('All');
  const [hovered,  setHovered]  = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  usePageEnter(pageRef);

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(filter));

  const handleMouseMove = (e) => {
    posRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div ref={pageRef} className="page projects-page" onMouseMove={handleMouseMove}>
      {/* Editorial header */}
      <header className="page-header container">
        <span className="page-eyebrow">01 / Projects</span>
        <h1 data-enter="title" className="page-title">What I've built</h1>
        <p data-enter="fade" className="page-intro">
          Full-stack apps, Java desktop tools and web experiments — all built solo or as part of a team.
        </p>
      </header>

      {/* Filter chips */}
      <div className="container projects-page__filters" data-enter="fade">
        {projectFilters.map(f => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'filter-chip--active' : ''}`}
            onClick={() => setFilter(f)}
            data-cursor="link"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project rows */}
      <section className="container projects-page__list">
        {filtered.map((project, i) => (
          project.legacy ? (
            <div key={project.slug} className="project-row project-row--legacy" data-enter="fade">
              <span className="project-row__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="project-row__title">{project.title}</span>
              <span className="project-row__tech">{project.tech.join(' · ')}</span>
              <span className="project-row__year">{project.year}</span>
            </div>
          ) : (
            <TransitionLink
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="project-row"
              data-cursor="view"
              onMouseEnter={() => { setHovered(project); setPreviewVisible(true); }}
              onMouseLeave={() => setPreviewVisible(false)}
            >
              <span className="project-row__num" style={{ color: project.color }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="project-row__title">{project.title}</span>
              <span className="project-row__type-badge">{project.type}</span>
              <span className="project-row__tech">{project.tech.slice(0, 3).join(' · ')}</span>
              <span className="project-row__year">{project.year}</span>
              <span className="project-row__arrow" aria-hidden="true">→</span>
            </TransitionLink>
          )
        ))}
      </section>

      {/* Floating preview (desktop only) */}
      <FloatingPreview project={hovered} visible={previewVisible} posRef={posRef} />
    </div>
  );
}
