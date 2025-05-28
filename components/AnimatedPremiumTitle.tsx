import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface AnimatedPremiumTitleProps {
  children: React.ReactNode;
  intro?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedPremiumTitle({
  children,
  intro,
  className = '',
  as = 'h2',
}: AnimatedPremiumTitleProps) {
  const controls = useAnimation();
  const Tag = (motion as any)[as] as typeof motion.div;

  useEffect(() => {
    console.log('AnimatedPremiumTitle mounted');
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 80,
        damping: 8
      }
    });
  }, [controls]);

  return (
    <div className={`w-full text-center mb-10 ${className}`}>
      <Tag
        initial={{ opacity: 0, y: 200, scale: 0.5, rotate: -45 }}
        animate={controls}
        className="heading heading-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow-xl"
        style={{ position: 'relative' }}
      >
        {children}
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="block h-1 mt-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          style={{ transformOrigin: 'left' }}
        />
      </Tag>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
          className="body max-w-2xl mx-auto mt-4 text-gray-700 dark:text-gray-300"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
} 