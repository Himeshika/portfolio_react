import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { TransitionLink } from '../components/layout/TransitionLink';
import { projects } from '../data/projects';
import { FiGithub } from 'react-icons/fi';
import './ProjectDetail.css';

function TechChip({ label }) {
  return <span className="tech-chip">{label}</span>;
}

export function ProjectDetail() {
  const { slug } = useParams();
  const project  = projects.find(p => p.slug === slug);
  const pageRef  = useRef(null);
  useDocumentTitle(project?.title ?? '404');
  usePageEnter(pageRef);

  if (!project || project.legacy) {
    return (
      <div className="page container not-found-inline">
        <h1>Project not found</h1>
        <TransitionLink to="/projects">← Back to projects</TransitionLink>
      </div>
    );
  }

  const allProjects    = projects.filter(p => !p.legacy);
  const currentIdx     = allProjects.findIndex(p => p.slug === slug);
  const nextProject    = allProjects[(currentIdx + 1) % allProjects.length];

  return (
    <div ref={pageRef} className="page project-detail">
      {/* Hero */}
      <div className="project-detail__hero container">
        <TransitionLink to="/projects" className="project-detail__back" data-enter="fade">
          ← All projects
        </TransitionLink>
        <span className="page-eyebrow" style={{ color: project.color }} data-enter="fade">{project.type} · {project.year}</span>
        <h1 data-enter="title" className="project-detail__title">{project.title}</h1>
        <p className="project-detail__subtitle" data-enter="fade">{project.subtitle}</p>

        {/* Tech chips */}
        <div className="project-detail__tech" data-enter="fade">
          {project.tech.map(t => <TechChip key={t} label={t} />)}
        </div>

        {/* GitHub links */}
        {project.github?.length > 0 && (
          <div className="project-detail__links" data-enter="fade">
            {project.github.map(({ label, repo }) =>
              repo ? (
                <a
                  key={label}
                  href={`https://github.com/Himeshika/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  data-cursor="link"
                >
                  <SiGithub size={16} /> {label}
                </a>
              ) : null
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary" data-cursor="link">
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* What I built */}
      <section className="project-detail__body container">
        <h2 className="project-detail__section-heading">What I built</h2>
        <ul className="project-detail__bullets">
          {project.bullets.map((b, i) => (
            <li key={i} data-enter="fade">{b}</li>
          ))}
        </ul>
      </section>

      {/* Next project */}
      {nextProject && (
        <div className="project-detail__next">
          <div className="container project-detail__next-inner">
            <span className="page-eyebrow">Up next</span>
            <TransitionLink to={`/projects/${nextProject.slug}`} className="project-detail__next-link" data-cursor="link">
              <span className="project-detail__next-title">{nextProject.title}</span>
              <span className="project-detail__next-arrow" aria-hidden="true">→</span>
            </TransitionLink>
          </div>
        </div>
      )}
    </div>
  );
}
