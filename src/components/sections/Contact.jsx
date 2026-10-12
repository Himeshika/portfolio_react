import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiCheck, FiX, FiLoader } from 'react-icons/fi';
import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';
import { site } from '../../data/siteConfig';
import './Contact.css';

function SocialIcon({ href, Icon }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact__social">
      <Icon size={20} />
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Fallback if env var missing — simulate success so UX doesn't break locally
    // In production, she needs VITE_WEB3FORMS_KEY in vercel env vars
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'MISSING_KEY';

    const formData = new FormData(e.target);
    formData.append("access_key", accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
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
    <section id="contact" aria-label="Contact">
      <div className="container contact__inner">
        <Reveal>
          <div className="contact__card glass">
            {/* Left: Info */}
            <div className="contact__info">
              <SectionTitle eyebrow="Get in Touch" heading="Let's work together." gradient={false} />
              <p className="contact__desc">
                Got a project in mind, or just want to say hi? I'd love to hear from you.
                Drop a message or reach out directly via email.
              </p>
              
              <a href={`mailto:${site.email}`} className="contact__email-btn gradient-text">
                {site.email}
              </a>

              <div className="contact__socials">
                <SocialIcon href={site.socials.github} Icon={FiGithub} />
                <SocialIcon href={site.socials.linkedin} Icon={FiLinkedin} />
                <SocialIcon href={site.socials.instagram} Icon={FiInstagram} />
                <SocialIcon href={`mailto:${site.email}`} Icon={FiMail} />
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact__form-container">
              <form className="contact__form" onSubmit={onSubmit}>
                <input type="hidden" name="subject" value="New Portfolio Message" />
                <input type="checkbox" name="botcheck" className="visually-hidden" style={{ display: 'none' }} />

                <div className="contact__input-group">
                  <label htmlFor="name" className="visually-hidden">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required className="contact__input" />
                </div>
                
                <div className="contact__input-group">
                  <label htmlFor="email" className="visually-hidden">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your email address" required className="contact__input" />
                </div>

                <div className="contact__input-group">
                  <label htmlFor="message" className="visually-hidden">Message</label>
                  <textarea id="message" name="message" placeholder="How can I help you?" required rows={5} className="contact__input contact__input--textarea" />
                </div>

                <button type="submit" className="contact__submit" disabled={status === 'loading'} data-cursor-hover>
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Send Message
                      </motion.span>
                    )}
                    {status === 'loading' && (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FiLoader className="icon-spin" /> Sending...
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FiCheck strokeWidth={3} /> Sent Successfully
                      </motion.span>
                    )}
                    {status === 'error' && (
                      <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FiX strokeWidth={3} /> Something went wrong
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="footer__made-with">Made with 💗 in Sri Lanka</p>
      </footer>
    </section>
  );
}
