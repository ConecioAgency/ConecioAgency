import React from 'react';

interface SectionTitleProps {
  badge: string;
  children: React.ReactNode;
  gradient?: string; // ex: 'from-indigo-500 via-purple-500 to-pink-500'
  className?: string;
}

const SectionTitle = ({ badge, children, gradient = 'from-indigo-500 via-purple-500 to-pink-500', className = '' }: SectionTitleProps) => (
  <div className={`mb-10 text-center ${className}`}>
    <span className="inline-block bg-blue-50 dark:bg-gray-800 px-6 py-1 rounded-xl font-bold text-base tracking-widest mb-2 animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{badge.toUpperCase()}</span>
    </span>
    <h2 className={`heading heading-lg mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{children}</h2>
    <div className={`mx-auto h-1 w-32 rounded-full bg-gradient-to-r ${gradient} shadow-md`} />
  </div>
);

export default SectionTitle; 