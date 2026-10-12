import { createContext, useContext, useState, useCallback } from 'react';

const LoaderCtx = createContext(null);

export function useLoader() {
  const ctx = useContext(LoaderCtx);
  if (!ctx) throw new Error('useLoader must be inside LoaderProvider');
  return ctx;
}

/**
 * Tracks whether the HN loader has finished.
 * done = true immediately on return visits (sessionStorage guard).
 * setDone is called by Loader.jsx when the exit animation completes.
 */
export function LoaderProvider({ children }) {
  const alreadyPlayed =
    typeof window !== 'undefined' &&
    !new URLSearchParams(window.location.search).has('loader') &&
    sessionStorage.getItem('hn-played') === '1';

  const [done, setDone] = useState(alreadyPlayed);

  const markDone = useCallback(() => {
    sessionStorage.setItem('hn-played', '1');
    setDone(true);
  }, []);

  return (
    <LoaderCtx.Provider value={{ done, markDone }}>
      {children}
    </LoaderCtx.Provider>
  );
}
