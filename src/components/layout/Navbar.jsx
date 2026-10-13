import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { TransitionLink } from './TransitionLink';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { site } from '../../data/siteConfig';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/',         label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills' },
  { to: '/about',    label: 'About' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/contact',  label: 'Contact' },
];

export function Navbar({ theme, onThemeToggle }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location     = useLocation();
  const pillRef      = useRef(null);
  const linksWrapRef = useRef(null);  // ref on wrapper div — query children for pill
  const menuRef      = useRef(null);

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Scroll lock while menu open
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobileOpen]);

  // Esc key closes menu
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus first mobile menu link when opened
  useEffect(() => {
    if (mobileOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }
  }, [mobileOpen]);

  // GSAP active pill — read link positions from DOM (no ref on TransitionLink)
  useGSAP(() => {
    if (!pillRef.current || !linksWrapRef.current) return;
    const activeIdx = NAV_ITEMS.findIndex(i => {
      if (i.to === '/') return location.pathname === '/';
      return location.pathname.startsWith(i.to);
    });
    if (activeIdx === -1) { gsap.set(pillRef.current, { opacity: 0 }); return; }
    // Query the anchor children of the links wrapper (skip the pill span)
    const linkEls = Array.from(linksWrapRef.current.querySelectorAll('a.navbar__link'));
    const linkEl = linkEls[activeIdx];
    if (!linkEl) return;
    const { offsetLeft, offsetWidth } = linkEl;
    gsap.to(pillRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, [location.pathname]);

  // GSAP stagger for mobile menu links
  useGSAP(() => {
    if (!menuRef.current) return;
    const links = Array.from(menuRef.current.querySelectorAll('a.mobile-menu__link'));
    if (!links.length) return;
    if (mobileOpen) {
      gsap.fromTo(links,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out', stagger: 0.06, delay: 0.1 }
      );
    } else {
      gsap.set(links, { opacity: 0, x: 0 });
    }
  }, [mobileOpen]);

  const isActive = (item) =>
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <nav className="navbar__inner container" aria-label="Main navigation">
          <TransitionLink to="/" className="navbar__logo" aria-label="Back to home">
            <span className="navbar__logo-text">HN</span>
          </TransitionLink>

          {/* Desktop links */}
          <div ref={linksWrapRef} className="navbar__links-wrap" role="list">
            {/* Sliding pill indicator */}
            <span ref={pillRef} className="navbar__pill" aria-hidden="true" />
            {NAV_ITEMS.map((item) => (
              <TransitionLink
                key={item.to}
                to={item.to}
                className={`navbar__link ${isActive(item) ? 'navbar__link--active' : ''}`}
                role="listitem"
                data-cursor="link"
              >
                {item.label}
              </TransitionLink>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__theme-btn"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              data-cursor="link"
            >
              {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            </button>
            <button
              className="navbar__mobile-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              data-cursor="link"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu — fullscreen overlay */}
      <div
        ref={menuRef}
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop tap to close */}
        <div
          className="mobile-menu__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <ul role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <TransitionLink
                to={item.to}
                className={`mobile-menu__link ${isActive(item) ? 'mobile-menu__link--active' : ''}`}
                data-cursor="link"
                tabIndex={mobileOpen ? 0 : -1}
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* Footer: theme toggle + CV download */}
        <div className="mobile-menu__footer">
          <button
            className="navbar__theme-btn"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            tabIndex={mobileOpen ? 0 : -1}
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </span>
          </button>

          {site.showCvDownload && site.cvPath && (
            <a
              href={site.cvPath}
              download="Himeshika_Nethmini_CV.pdf"
              className="mobile-menu__cv-btn"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <FiDownload size={16} />
              <span>Download CV</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
