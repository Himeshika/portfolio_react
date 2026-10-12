import { useRef, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TransitionProvider, useTransition } from '../../context/TransitionContext';
import { LoaderProvider } from '../../context/LoaderContext';
import { Cursor } from './Cursor';
import { Navbar } from './Navbar';
import { Loader } from './Loader';
import { TransitionOverlay } from './TransitionOverlay';
import { Footer } from './Footer';
import { Aurora } from '../home/Aurora';
import { useLenis } from '../../hooks/useLenis';
import { useTheme } from '../../hooks/useTheme';

/**
 * Inner layout has access to TransitionContext (so reveal can be called after pathname changes).
 */
function LayoutInner({ overlayRef, labelRef, panelsRef }) {
  const { reveal } = useTransition();
  const location   = useLocation();
  const { theme, toggle } = useTheme();
  useLenis();

  useLayoutEffect(() => {
    reveal(document.title, () => {});
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Loader always mounts above everything — never removed by navigation */}
      <Loader />

      <Cursor />
      <Aurora />
      <Navbar theme={theme} onThemeToggle={toggle} />

      <TransitionOverlay overlayRef={overlayRef} labelRef={labelRef} panelsRef={panelsRef} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export function Layout() {
  const overlayRef = useRef(null);
  const labelRef   = useRef(null);
  const panelsRef  = useRef([]);

  return (
    <LoaderProvider>
      <TransitionProvider overlayRef={overlayRef} labelRef={labelRef} panelsRef={panelsRef}>
        <LayoutInner overlayRef={overlayRef} labelRef={labelRef} panelsRef={panelsRef} />
      </TransitionProvider>
    </LoaderProvider>
  );
}
