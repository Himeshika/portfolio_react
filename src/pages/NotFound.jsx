import { useRef } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { TransitionLink } from '../components/layout/TransitionLink';
import './NotFound.css';

export function NotFound() {
  useDocumentTitle('404 — Page Not Found');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  return (
    <div ref={pageRef} className="page not-found-page container">
      <div className="not-found-card" data-enter="fade">
        <span className="not-found-code gradient-text">404</span>
        <h1 data-enter="title" className="not-found-title">Lost in space</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has moved to another galaxy.
        </p>
        <div className="not-found-action">
          <TransitionLink to="/" className="btn btn--primary" data-cursor="link">
            ← Return to Home
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
