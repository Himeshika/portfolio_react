import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { TransitionLink } from '../components/layout/TransitionLink';
import { featuredProjects } from '../data/projects';
import { site } from '../data/siteConfig';
import './Home.css';

// Sub-components
import { Hero } from '../components/home/Hero';
import { Marquee } from '../components/home/Marquee';
import { ProjectCard } from '../components/projects/ProjectCard';

export function Home() {
  useDocumentTitle('');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  return (
    <div ref={pageRef} className="home">
      {/* Hero */}
      <Hero site={site} />

      {/* Skills marquee */}
      <Marquee />

      {/* Selected work */}
      <section className="home__projects container">
        <header className="home__projects-header">
          <span className="eyebrow">Selected Work</span>
          <h2 data-enter="title" className="home__projects-title">Built with craft</h2>
        </header>

        <div className="home__projects-grid">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="home__projects-cta" data-enter="fade">
          <TransitionLink to="/projects" className="btn btn--outline" data-cursor="link">
            View all projects →
          </TransitionLink>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band" data-enter="fade">
        <div className="container cta-band__inner">
          <h2 className="cta-band__heading">
            Let's build something <span className="gradient-text">meaningful</span>
          </h2>
          <p className="cta-band__sub">Open to Full-Stack & Software Engineering internship opportunities.</p>
          <TransitionLink to="/contact" className="btn btn--primary" data-cursor="link">
            Get in touch
          </TransitionLink>
        </div>
      </section>
    </div>
  );
}
