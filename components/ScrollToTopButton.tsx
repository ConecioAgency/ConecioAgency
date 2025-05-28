import { useEffect, useState } from 'react';

const RADIUS = 49;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setShow(scrollTop > 400);
      setProgress(percent);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-transparent group"
      aria-label="Retour en haut"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="progress-wrap active-progress opacity-1 w-14 h-14 flex items-center justify-center">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
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
            style={{ transition: 'stroke-dashoffset 300ms linear' }}
          />
        </svg>
        <span className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-900/80 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M12 17V7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 12l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
};

export default ScrollToTopButton; 