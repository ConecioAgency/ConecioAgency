import React from 'react';

interface LearnMoreButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ children, onClick, className = '' }) => (
  <button className={`learn-more ${className}`.trim()} onClick={onClick}>
    <span aria-hidden="true" className="circle">
      <span className="icon arrow"></span>
    </span>
    <span className="button-text">{children}</span>
  </button>
);

export default LearnMoreButton; 