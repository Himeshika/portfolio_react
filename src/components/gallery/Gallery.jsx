import { useState } from 'react';
import { FiGrid, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { SectionTitle } from '../ui/SectionTitle';
import { MasonryGrid } from './MasonryGrid';
import { RingCarousel } from './RingCarousel';
import { Lightbox } from './Lightbox';
import { galleryItems, galleryCategories } from '../../data/gallery';
import './Gallery.css';

export function Gallery() {
  const [view, setView] = useState('grid'); // 'grid' | 'ring'
  const [activeCat, setActiveCat] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = activeCat === 'All' 
    ? galleryItems 
    : galleryItems.filter(i => i.category === activeCat);

  const handleNavigate = (dir) => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex(i => i.src === lightboxItem.src);
    let newIdx = idx + dir;
    if (newIdx < 0) newIdx = filtered.length - 1;
    if (newIdx >= filtered.length) newIdx = 0;
    setLightboxItem(filtered[newIdx]);
  };

  return (
    <section id="gallery" aria-label="Gallery">
      <div className="container">
        
        <div className="gallery__header">
          <Reveal>
            <SectionTitle eyebrow="Life in Pixels" heading="Moments" />
          </Reveal>

          {/* Controls: toggle + categories */}
          <Reveal delay={0.2} className="gallery__controls">
            
            {/* View toggle */}
            <div className="gallery__view-toggle glass">
              <button 
                className={`gallery__view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button 
                className={`gallery__view-btn ${view === 'ring' ? 'active' : ''}`}
                onClick={() => setView('ring')}
                aria-label="3D Ring view"
              >
                <FiRefreshCw size={18} />
              </button>
              <motion.div 
                className="gallery__view-pill"
                layoutId="view-pill"
                initial={false}
                animate={{ x: view === 'grid' ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </div>

            {/* Categories */}
            {view === 'grid' && (
              <div className="gallery__filters">
                {galleryCategories.map(cat => (
                  <button
                    key={cat}
                    className={`projects__filter ${activeCat === cat ? 'projects__filter--active' : ''}`}
                    onClick={() => setActiveCat(cat)}
                  >
                    {activeCat === cat && (
                      <motion.span className="projects__filter-bg" layoutId="gallery-filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            )}
            
          </Reveal>
        </div>

        {/* Content area */}
        <div className="gallery__content">
          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MasonryGrid items={filtered} onImageClick={setLightboxItem} />
              </motion.div>
            ) : (
              <motion.div key="ring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RingCarousel items={filtered} onImageClick={setLightboxItem} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox 
        item={lightboxItem} 
        items={filtered}
        onClose={() => setLightboxItem(null)} 
        onNavigate={handleNavigate}
      />
    </section>
  );
}
