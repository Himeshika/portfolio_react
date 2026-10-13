import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import './styles/global.css';
import './styles/responsive.css';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { routeLoaders } from './routes';

// Lazy-load all non-Home pages.
// Pages use named exports, so we re-map them as default for React.lazy.
const Projects      = lazy(() => routeLoaders['/projects']().then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Skills        = lazy(() => routeLoaders['/skills']().then(m  => ({ default: m.Skills })));
const About         = lazy(() => routeLoaders['/about']().then(m   => ({ default: m.About })));
const Gallery       = lazy(() => routeLoaders['/gallery']().then(m => ({ default: m.Gallery })));
const Contact       = lazy(() => routeLoaders['/contact']().then(m => ({ default: m.Contact })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,              element: <Home /> },
      { path: 'projects',         element: <Suspense fallback={null}><Projects /></Suspense> },
      { path: 'projects/:slug',   element: <Suspense fallback={null}><ProjectDetail /></Suspense> },
      { path: 'skills',           element: <Suspense fallback={null}><Skills /></Suspense> },
      { path: 'about',            element: <Suspense fallback={null}><About /></Suspense> },
      { path: 'gallery',          element: <Suspense fallback={null}><Gallery /></Suspense> },
      { path: 'contact',          element: <Suspense fallback={null}><Contact /></Suspense> },
      { path: '*',                element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// After Home is interactive, prefetch all other chunks during idle time.
// Gallery images are NOT prefetched (too heavy).
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => {
    Object.entries(routeLoaders).forEach(([path, load]) => {
      if (path !== '/gallery') load();
    });
  });
} else {
  setTimeout(() => {
    Object.entries(routeLoaders).forEach(([path, load]) => {
      if (path !== '/gallery') load();
    });
  }, 2000);
}
