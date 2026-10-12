import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { bio, education, languages, softSkills, lookingFor } from '../data/about';
import { site } from '../data/siteConfig';

// Default portrait uses heroImg. To use a distinct photo, drop it at src/assets/about.jpg (or .png) and import it here.
import heroImg from '../assets/hero.png';
const aboutImg = heroImg;


import './About.css';

function LanguageRow({ name, level, dots }) {
  return (
    <div className="lang-row">
      <span className="lang-row__name">{name}</span>
      <span className="lang-row__level">{level}</span>
      <div className="lang-row__dots" aria-label={`${level} — ${dots} of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`lang-dot ${i < dots ? 'lang-dot--filled' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export function About() {
  useDocumentTitle('About');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  return (
    <div ref={pageRef} className="page about-page">
      <header className="page-header container">
        <span className="page-eyebrow">03 / About</span>
        <h1 data-enter="title" className="page-title">{site.shortName}</h1>
      </header>

      <div className="container about-page__body">

        {/* ── Hero row: photo + bio side-by-side ── */}
        <div className="about-page__hero-row" data-enter="fade">
          {aboutImg && (
            <div className="about-photo-wrap">
              <div className="about-photo__ring"   aria-hidden="true" />
              <div className="about-photo__glow"   aria-hidden="true" />
              <img
                src={aboutImg}
                alt={`${site.name} — portrait`}
                className="about-photo"
                width="320"
                height="380"
                loading="lazy"
              />
            </div>
          )}

          {/* Bio */}
          <section className="about-page__bio">
            {bio.map((p, i) => <p key={i}>{p}</p>)}
            <p className="about-page__looking-for">
              <strong>Looking for:</strong> {lookingFor}
            </p>
          </section>
        </div>

        {/* Education */}
        <section className="about-page__section" data-enter="fade">
          <h2 className="about-page__section-title">Education</h2>
          {education.map((edu) => (
            <div key={edu.institution} className="edu-card">
              <span className="edu-card__icon">{edu.icon}</span>
              <div>
                <div className="edu-card__degree">{edu.degree}</div>
                <div className="edu-card__institution">{edu.institution} · {edu.country}</div>
                <div className="edu-card__period">{edu.period}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Languages */}
        <section className="about-page__section" data-enter="fade">
          <h2 className="about-page__section-title">Languages</h2>
          <div className="lang-list">
            {languages.map((l) => <LanguageRow key={l.name} {...l} />)}
          </div>
        </section>

        {/* Soft skills */}
        <section className="about-page__section" data-enter="fade">
          <h2 className="about-page__section-title">Soft Skills</h2>
          <div className="soft-skills">
            {softSkills.map(s => (
              <span key={s} className="soft-chip">{s}</span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
