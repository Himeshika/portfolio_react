import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — Himeshika Nethmini` : 'Himeshika Nethmini | Software Engineering';
    return () => { document.title = prev; };
  }, [title]);
}
