import { useEffect, useState, useCallback, memo } from 'react';

const RADIUS = 49;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Composant SVG optimisé
const ProgressCircle = memo(({ progress }: { progress: number }) => (
  <svg 
    className="progress-circle svg-content" 
    width="100%" 
    height="100%" 
    viewBox="-1 -1 102 102" 
    style={{ 
      contain: 'layout style paint',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    }}
  >
    <path
      d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
      fill="none"
      stroke="#fff"
      strokeOpacity="0.2"
      strokeWidth="3"
    />
    <path
      d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
      fill="none"
      stroke="#fff"
      strokeWidth="3.5"
      strokeDasharray={CIRCUMFERENCE}
      strokeDashoffset={CIRCUMFERENCE - progress * CIRCUMFERENCE}
      style={{ 
        transition: 'stroke-dashoffset 300ms linear',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    />
  </svg>
));

ProgressCircle.displayName = 'ProgressCircle';

// Composant icône optimisé
const ArrowIcon = memo(() => (
  <svg 
    className="w-6 h-6 text-white" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    viewBox="0 0 24 24" 
    style={{ 
      contain: 'layout style paint',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    }}
  >
    <path d="M12 17V7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 12l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

ArrowIcon.displayName = 'ArrowIcon';

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setShow(scrollTop > 400);
    setProgress(percent);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-transparent group"
      aria-label="Retour en haut"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <div 
        className="progress-wrap active-progress opacity-1 w-14 h-14 flex items-center justify-center" 
        style={{ 
          contain: 'layout style paint',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <ProgressCircle progress={progress} />
        <span 
          className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 shadow-lg" 
          style={{ 
            contain: 'layout style paint',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >
          <ArrowIcon />
        </span>
      </div>
    </button>
  );
};

export default memo(ScrollToTopButton); 