import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedTitle = ({ children, className = '', as = 'h2' }: AnimatedTitleProps) => {
  const MotionTag = (motion as any)[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}; 