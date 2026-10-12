import { useState, useRef, useEffect } from 'react';
import './RingCarousel.css';

export function RingCarousel({ items, onImageClick }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const prevRot = useRef(0);
  const wrapperRef = useRef(null);

  const radius = Math.max(300, (items.length * 200) / (2 * Math.PI));
  const angleStep = 360 / items.length;

  // Auto slow spin when idle
  useEffect(() => {
    if (isDragging) return;
    const id = setInterval(() => {
      setRotation((r) => r - 0.2);
    }, 50);
    return () => clearInterval(id);
  }, [isDragging]);

  const onDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0].clientX || 0;
    prevRot.current = rotation;
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches?.[0].clientX || 0;
    const dx = x - dragStartX.current;
    setRotation(prevRot.current + dx * 0.2);
  };

  const onDragEnd = () => setIsDragging(false);

  return (
    <div className="ring-carousel-wrapper">
      <div
        className="ring-carousel-stage"
        ref={wrapperRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        data-cursor="drag"
      >
        <div
          className="ring-carousel"
          style={{ transform: `translateZ(${-radius}px) rotateY(${rotation}deg)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.src}
              className="ring-carousel__item"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              }}
              onClick={() => {
                if (!isDragging) onImageClick(item);
              }}
            >
              <div className="ring-carousel__frame">
                <img src={item.src} alt={item.alt || 'Gallery photo'} draggable="false" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
