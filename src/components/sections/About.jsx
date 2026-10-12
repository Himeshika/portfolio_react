import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';
import { bio, timeline, funFacts } from '../../data/about';
import heroImg from '../../assets/hero.png';
import './About.css';

export function About() {
  return (
    <section id="about" aria-label="About Me">
      <div className="container about__inner">
        {/* Left: Photo Graphic */}
        <Reveal className="about__left">
          <div className="about__photo-wrapper">
            <div className="about__photo-frame about__photo-frame--back" aria-hidden="true" />
            <div className="about__photo-frame about__photo-frame--img">
              <img src={heroImg} alt="Himeshika Nethmini" className="about__img" loading="lazy" />
            </div>
            
            <div className="about__badge glass">
              <span className="about__badge-icon">💻</span>
              <div className="about__badge-text">
                <span className="about__badge-title">Full-Stack</span>
                <span className="about__badge-subtitle">Dev</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: Content */}
        <div className="about__right">
          <Reveal>
            <SectionTitle eyebrow="Behind the Code" heading="About Me" />
            
            <div className="about__bio">
              {bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="about__timeline-wrapper">
            <h3 className="about__subheading">Journey</h3>
            <ul className="about__timeline" role="list">
              {timeline.map((item, i) => (
                <li key={i} className="about__timeline-item">
                  <div className="about__timeline-dot">{item.icon}</div>
                  <div className="about__timeline-content">
                    <span className="about__timeline-year gradient-text">{item.year}</span>
                    <span className="about__timeline-label">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4} className="about__funfacts-wrapper">
            <h3 className="about__subheading">Fun Facts</h3>
            <div className="about__funfacts">
              {funFacts.map((fact, i) => (
                <div key={i} className="about__funfact glass">
                  <span>{fact.emoji}</span>
                  <span>{fact.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
