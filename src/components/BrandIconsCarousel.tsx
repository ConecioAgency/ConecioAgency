import React, { useRef, useEffect } from 'react';

const icons = [
  'blogging.png',
  'ui.png',
  'seo.png',
  'podcast.png',
  'intelligence.png',
  'landing-page.png',
  'shopping-online.png',
  'digital-marketing.png',
  'internet-of-things.png',
];

interface BrandIconsCarouselProps {
  small?: boolean;
}

export default function BrandIconsCarousel({ small = false }: BrandIconsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll infini
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    let running = true;
    const speed = 0.7;

    // Clone icons for infinite effect
    if (el && el.children.length === icons.length) {
      for (let i = 0; i < icons.length; i++) {
        el.appendChild(el.children[i].cloneNode(true));
      }
    }

    function animate() {
      if (!running || !el) return;
      pos += speed;
      if (el && pos >= el.scrollWidth / 2) pos = 0;
      if (el) el.scrollLeft = pos;
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  // Style compact si small
  const iconSize = small ? 36 : 44;
  const minWH = small ? 48 : 56;
  const padding = small ? '0.7rem 1.2rem' : '1.1rem 2.2rem';
  const gap = small ? '1.1rem' : '1.7rem';
  const borderRadius = '2.5rem';

  return (
    <div
      className="w-full flex justify-center my-4"
      style={{
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Wrapper dégradé + glow */}
      <div
        style={{
          background: 'linear-gradient(90deg, #a855f7, #38bdf8, #f472b6, #a855f7)',
          borderRadius,
          boxShadow: '0 0 32px 0 #a855f7aa',
          padding: '3px',
          maxWidth: '600px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Conteneur interne avec fond sombre et overflow-hidden */}
        <div
          ref={scrollRef}
          className="flex items-center overflow-hidden w-full"
          style={{
            background: '#23232b',
            borderRadius,
            width: '100%',
            padding,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="flex items-center w-full" style={{ gap }}>
            {icons.concat(icons).map((icon, idx) => (
              <div key={icon+idx} className="flex-shrink-0 flex flex-col items-center justify-center" style={{minWidth: minWH, minHeight: minWH}}>
                <img
                  src={`/images/icons/carouselle/${icon}`}
                  alt={icon.replace('.png', '')}
                  className="drop-shadow-xl"
                  style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 