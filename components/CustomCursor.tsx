import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const baseSize = 20;
  const grow = isHovering ? 30 : 0;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - (baseSize + grow) / 2,
          y: mousePosition.y - (baseSize + grow) / 2,
          width: baseSize + grow,
          height: baseSize + grow,
          backgroundColor: isHovering ? '#EC4899' : '#6366F1',
          borderRadius: '50%',
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - (baseSize + grow * 2),
          y: mousePosition.y - (baseSize + grow * 2),
          width: (baseSize + grow) * 2,
          height: (baseSize + grow) * 2,
          borderRadius: '50%',
          border: `2px solid ${isHovering ? '#EC4899' : '#6366F1'}`,
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor; 