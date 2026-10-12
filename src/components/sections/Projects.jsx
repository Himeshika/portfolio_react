import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';
import { projects, projectFilters } from '../../data/projects';
import './Projects.css';

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 12;
    const y = -((e.clientY - top) / height - 0.5) * 12;
    setTilt({ x, y });
  };

  return (
    <motion.article
      className="project-card glass"
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ '--card-color': project.color }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className="project-card__inner"
        style={{ transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        {/* Top gradient header */}
        <div className="project-card__header">
          <span className="project-card__icon">{project.icon}</span>
          <div className="project-card__shine" aria-hidden="true" />
        </div>

        {/* Body */}
        <div className="project-card__body">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__subtitle">{project.subtitle}</p>
          <p className="project-card__desc">{project.desc}</p>

          {/* Tech tags */}
          <div className="project-card__tags">
            {project.tech.map(t => (
              <span key={t} className="project-card__tag">{t}</span>
            ))}
          </div>

          {/* Links */}
          <div className="project-card__links">
            {project.github && (
              <a href={project.github} className="project-card__link" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}>
                <FiGithub size={15} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} className="project-card__link project-card__link--live" target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                <FiExternalLink size={15} /> Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" aria-label="Projects">
      <div className="container">
        <Reveal>
          <SectionTitle eyebrow="My Work" heading="Projects" />
        </Reveal>

        {/* Filter chips */}
        <div className="projects__filters" role="group" aria-label="Filter projects">
          {projectFilters.map(f => (
            <button
              key={f}
              className={`projects__filter ${active === f ? 'projects__filter--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {active === f && (
                <motion.span className="projects__filter-bg" layoutId="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
