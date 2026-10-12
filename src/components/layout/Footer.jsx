import { TransitionLink } from './TransitionLink';
import { site } from '../../data/siteConfig';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} <span className="gradient-text">{site.name}</span>. Crafted with care.
        </p>

        <nav className="footer__links" aria-label="Footer navigation">
          {[
            { to: '/',        label: 'Home' },
            { to: '/projects',label: 'Projects' },
            { to: '/about',   label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <TransitionLink key={to} to={to} className="footer__nav-link">
              {label}
            </TransitionLink>
          ))}
        </nav>

        <div className="footer__socials">
          <a href={`mailto:${site.email}`} aria-label="Email" className="footer__social-link" data-cursor="link">
            <FiMail size={18} />
          </a>
          {site.socials.github && (
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social-link" data-cursor="link">
              <FiGithub size={18} />
            </a>
          )}
          {site.socials.linkedin && (
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link" data-cursor="link">
              <FiLinkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
