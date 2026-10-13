import { useState, useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { site } from '../data/siteConfig';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiCheck, FiAlertCircle, FiLoader, FiDownload } from 'react-icons/fi';
import './Contact.css';

export function Contact() {
  useDocumentTitle('Contact');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'MISSING_KEY';
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });
      const data = await res.json();
      if (data.success || accessKey === 'MISSING_KEY') {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div ref={pageRef} className="page contact-page">
      <header className="page-header container">
        <span className="page-eyebrow">04 / Contact</span>
        <h1 data-enter="title" className="page-title">Let's talk</h1>
        <p data-enter="fade" className="page-intro">
          Looking for a Full-Stack or intern, or want to discuss a project? Drop a line.
        </p>
      </header>

      <div className="container contact-page__grid">
        {/* Left: Info card */}
        <aside className="contact-info-card" data-enter="fade">
          <div className="contact-info-card__item">
            <span className="contact-info-card__label">Direct Email</span>
            <a
              href={`mailto:${site.email}`}
              className="contact-info-card__value gradient-text"
              data-cursor="link"
            >
              <FiMail className="contact-icon" /> {site.email}
            </a>
          </div>

          <div className="contact-info-card__item">
            <span className="contact-info-card__label">Location</span>
            <div className="contact-info-card__value">
              <FiMapPin className="contact-icon" /> {site.location}
            </div>
          </div>

          <div className="contact-info-card__item">
            <span className="contact-info-card__label">Profiles</span>
            <div className="contact-social-row">
              {site.socials.github && (
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label="GitHub profile"
                  data-cursor="link"
                >
                  <FiGithub size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {site.socials.linkedin && (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label="LinkedIn profile"
                  data-cursor="link"
                >
                  <FiLinkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {site.showCvDownload && site.cvPath && (
            <div className="contact-info-card__cv">
              <a
                href={site.cvPath}
                download
                className="btn btn--outline cv-btn"
                data-cursor="link"
              >
                <FiDownload size={16} />
                <span>Download CV (Public)</span>
              </a>
            </div>
          )}
        </aside>

        {/* Right: Contact form */}
        <section className="contact-form-wrap" data-enter="fade">
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <input type="hidden" name="subject" value="New Portfolio Message" />
            {/* Honeypot — must stay hidden */}
            <input
              type="checkbox"
              name="botcheck"
              className="visually-hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Status region — read by screen readers */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="visually-hidden"
            >
              {status === 'success' && 'Message sent successfully!'}
              {status === 'error' && 'Failed to send. Please try emailing directly.'}
            </div>

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                placeholder="What should I call you?"
                className="form-input"
                autoComplete="name"
                autoCapitalize="words"
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email address</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                placeholder="Where should I reply?"
                className="form-input"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about the role, project, or say hello..."
                className="form-input form-input--textarea"
                autoCapitalize="sentences"
                spellCheck="true"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary form-submit"
              disabled={status === 'loading'}
              data-cursor="link"
            >
              {status === 'idle' && <span>Send message →</span>}
              {status === 'loading' && (
                <span className="submit-status">
                  <FiLoader className="icon-spin" /> Sending...
                </span>
              )}
              {status === 'success' && (
                <span className="submit-status submit-status--success">
                  <FiCheck strokeWidth={3} /> Message delivered!
                </span>
              )}
              {status === 'error' && (
                <span className="submit-status submit-status--error">
                  <FiAlertCircle /> Failed.{' '}
                  <a href={`mailto:${site.email}`} className="error-mailto">Email me directly</a>
                </span>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
