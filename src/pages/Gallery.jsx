import { useState, useRef } from 'react';
import { FiGrid, FiRefreshCw } from 'react-icons/fi';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { usePageEnter } from '../hooks/usePageEnter';
import { MasonryGrid } from '../components/gallery/MasonryGrid';
import { RingCarousel } from '../components/gallery/RingCarousel';
import { Lightbox } from '../components/gallery/Lightbox';
import { galleryItems, galleryCategories } from '../data/gallery';
import './Gallery.css';

export function Gallery() {
  useDocumentTitle('Gallery');
  const pageRef = useRef(null);
  usePageEnter(pageRef);

  // Default to Grid on mobile; Ring carousel is not touch-friendly
  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? 'grid'
      : 'grid' // always grid by default, ring is opt-in
  );
  const [activeCat, setActiveCat] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = activeCat === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCat);

  const handleNavigate = (dir) => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.src === lightboxItem.src);
    let newIdx = idx + dir;
    if (newIdx < 0) newIdx = filtered.length - 1;
    if (newIdx >= filtered.length) newIdx = 0;
    setLightboxItem(filtered[newIdx]);
  };

  return (
    <div ref={pageRef} className="page gallery-page">
      <header className="page-header container">
        <span className="page-eyebrow">05 / Gallery</span>
        <h1 data-enter="title" className="page-title">Life & Moments</h1>
        <p data-enter="fade" className="page-intro">
          Captures, memories, and glimpses behind the screen.
        </p>
      </header>

      <div className="container gallery-page__controls" data-enter="fade">
        {/* View toggle */}
        <div className="gallery__view-toggle">
          <button
            className={`gallery__view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
            data-cursor="link"
          >
            <FiGrid size={18} />
            <span>Grid</span>
          </button>
          <button
            className={`gallery__view-btn ${view === 'ring' ? 'active' : ''}`}
            onClick={() => setView('ring')}
            aria-label="3D Ring view"
            data-cursor="link"
          >
            <FiRefreshCw size={18} />
            <span>3D Ring</span>
          </button>
        </div>

        {/* Categories (Grid view) */}
        {view === 'grid' && (
          <div className="gallery__filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCat === cat ? 'filter-chip--active' : ''}`}
                onClick={() => setActiveCat(cat)}
                data-cursor="link"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content area */}
      <section className="container gallery-page__content" data-enter="fade">
        {view === 'grid' ? (
          <MasonryGrid items={filtered} onImageClick={setLightboxItem} />
        ) : (
          <RingCarousel items={filtered} onImageClick={setLightboxItem} />
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        items={filtered}
        onClose={() => setLightboxItem(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
