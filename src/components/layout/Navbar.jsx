import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { TransitionLink } from './TransitionLink';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
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
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location = useLocation();
  const pillRef  = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // GSAP active pill — move to the active link
  useGSAP(() => {
    if (!pillRef.current) return;
    const activeIdx = NAV_ITEMS.findIndex(i => {
      if (i.to === '/') return location.pathname === '/';
      return location.pathname.startsWith(i.to);
    });
    if (activeIdx === -1) { gsap.set(pillRef.current, { opacity: 0 }); return; }
    const linkEl = linksRef.current[activeIdx];
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

  // Mobile menu animation
  useGSAP(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (mobileOpen) {
      gsap.fromTo(menu, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(menu, { opacity: 0, y: -12, duration: 0.2, ease: 'power2.in' });
    }
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <nav className="navbar__inner container" aria-label="Main navigation">
          <TransitionLink to="/" className="navbar__logo" aria-label="Back to home">
            <span className="navbar__logo-text">HN</span>
          </TransitionLink>

          {/* Desktop links */}
          <div className="navbar__links-wrap" role="list">
            {/* Sliding pill indicator */}
            <span ref={pillRef} className="navbar__pill" aria-hidden="true" />
            {NAV_ITEMS.map((item, i) => (
              <TransitionLink
                key={item.to}
                to={item.to}
                ref={el => { linksRef.current[i] = el; }}
                className={`navbar__link ${
                  (item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to))
                    ? 'navbar__link--active' : ''
                }`}
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

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.to}>
              <TransitionLink
                to={item.to}
                className={`mobile-menu__link ${
                  (item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to))
                    ? 'mobile-menu__link--active' : ''
                }`}
                data-cursor="link"
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
