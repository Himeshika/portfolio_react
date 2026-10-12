import { useEffect, useRef, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { gsap } from '../../lib/gsap';
import { TransitionLink } from '../layout/TransitionLink';
import { PhotoArch } from './PhotoArch';
import { Sparkles } from './Sparkles';
import { Stats } from './Stats';
import { useLoader } from '../../context/LoaderContext';
import './Hero.css';


function RoleRotator({ roles }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(id);
  }, [roles]);

  return (
    <div className="hero__role-rotator" aria-live="polite" aria-label={`Current role: ${roles[idx]}`}>
      <span key={idx} className="hero__role">
        {roles[idx]}
      </span>
    </div>
  );
}

function SocialIcon({ href, Icon, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      className="hero__social"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
    >
      <Icon size={18} />
    </a>
  );
}

export function Hero({ site }) {
  const { done } = useLoader();
  const leftRef = useRef(null);
  const charsRef = useRef([]);

  const nameParts = site.name.split(' ');

  useEffect(() => {
    if (!done) return; // wait for loader exit before animating
    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      chars,
      { opacity: 0, y: '110%' },
      {
        opacity: 1,
        y: '0%',
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.015,
        delay: 0.1,
      }
    );
  }, [done]);

  let charCount = 0;

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <Sparkles count={16} />

      <div className="container hero__inner">
        {/* LEFT */}
        <div className="hero__left" ref={leftRef}>
          {/* Availability chip */}
          <div className="hero__chip glass" data-enter="fade">
            <span className="hero__chip-dot" aria-hidden="true" />
            {site.eyebrowChip || 'Open to internships & opportunities'}
          </div>

          {/* Greeting */}
          <p className="hero__greeting" data-enter="fade">Hi, I&apos;m</p>

          {/* Name with Fraunces accent */}
          <h1 className="hero__name" aria-label={site.name}>
            {nameParts.map((word, wi) => (
              <span key={wi} className={`hero__name-word ${wi === 1 ? 'hero__name-word--accent' : ''}`}>
                {word.split('').map((char, ci) => {
                  const idx = charCount++;
                  return (
                    <span
                      key={ci}
                      className="hero__char"
                      ref={(el) => {
                        charsRef.current[idx] = el;
                      }}
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Role rotator */}
          <RoleRotator roles={site.roles} />

          {/* Tagline */}
          <p className="hero__tagline" data-enter="fade">
            {site.tagline}
          </p>

          {/* CTAs */}
          <div className="hero__ctas" data-enter="fade">
            <TransitionLink
              to="/projects"
              className="btn btn--primary hero__btn"
              data-cursor="link"
            >
              View my work →
            </TransitionLink>

            <TransitionLink
              to="/contact"
              className="btn btn--outline hero__btn"
              data-cursor="link"
            >
              Let&apos;s talk
            </TransitionLink>
          </div>

          {/* Socials */}
          <div className="hero__socials" data-enter="fade">
            <SocialIcon href={site.socials.github} Icon={FiGithub} label="GitHub profile" />
            <SocialIcon href={site.socials.linkedin} Icon={FiLinkedin} label="LinkedIn profile" />
            <SocialIcon href={`mailto:${site.email}`} Icon={FiMail} label="Send email" />
          </div>

          {/* Stats */}
          <Stats stats={site.stats} />
        </div>

        {/* RIGHT */}
        <div className="hero__right" data-enter="fade">
          <PhotoArch />
        </div>
      </div>
    </section>
  );
}
