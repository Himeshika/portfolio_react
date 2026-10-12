import { useRef } from 'react';
import './MasonryGrid.css';

function GalleryItem({ item, index, onImageClick }) {
  // Subtle rotation for organic scrapbook feel
  const rot = useRef((index % 2 === 0 ? 1 : -1) * 1.2).current;

  return (
    <div
      className="masonry__item"
      style={{ '--rot': `${rot}deg` }}
      onClick={() => onImageClick(item)}
      data-cursor="view"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onImageClick(item);
      }}
    >
      <div className="masonry__frame">
        <img
          src={item.src}
          alt={item.alt || 'Gallery image'}
          loading="lazy"
          decoding="async"
          className="masonry__img"
        />
        {item.alt && (
          <div className="masonry__caption-layer">
            <span>{item.alt}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function MasonryGrid({ items, onImageClick }) {
  return (
    <div className="masonry">
      {items.map((item, i) => (
        <GalleryItem key={item.src} item={item} index={i} onImageClick={onImageClick} />
      ))}
    </div>
  );
}
