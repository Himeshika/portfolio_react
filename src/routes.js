/**
 * Single source of truth for lazy-loadable route chunks.
 * Used by main.jsx (React.lazy) and TransitionLink (prefetch on hover).
 */
export const routeLoaders = {
  '/projects': () => import('./pages/Projects'),
  '/skills':   () => import('./pages/Skills'),
  '/about':    () => import('./pages/About'),
  '/gallery':  () => import('./pages/Gallery'),
  '/contact':  () => import('./pages/Contact'),
};

/**
 * Kick off a dynamic import for a given pathname.
 * Safe to call multiple times — browser caches the chunk.
 */
export const prefetch = (path) =>
  routeLoaders['/' + path.replace(/^\//, '').split('/')[0]]?.();
