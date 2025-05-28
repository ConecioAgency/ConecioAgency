import React from 'react';

interface ReadMoreButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  href?: string;
  variant?: 'dark' | 'light';
}

const ReadMoreButton: React.FC<ReadMoreButtonProps> = ({
  text = 'Lire la suite',
  onClick,
  className = '',
  href,
  variant = 'dark',
}) => {
  const btnClass = `btn-main btn-main--${variant} group flex items-center gap-2 font-medium ${className}`.trim();
  const svgColor = variant === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const content = (
    <>
      <span className="flex items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 126 75"
          className={`book w-7 h-7 ${svgColor}`}
        >
          <rect strokeWidth="3" stroke="#fff" rx="7.5" height="70" width="121" y="2.5" x="2.5"></rect>
          <line strokeWidth="3" stroke="#fff" y2="75" x2="63.5" x1="63.5"></line>
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M25 20H50"></path>
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M101 20H76"></path>
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M16 30L50 30"></path>
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M110 30L76 30"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 65 75"
          className="book-page w-7 h-7 absolute left-0 top-0"
        >
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M40 20H15"></path>
          <path strokeLinecap="round" strokeWidth="4" stroke="#fff" d="M49 30L15 30"></path>
          <path strokeWidth="3" stroke="#fff" d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"></path>
        </svg>
      </span>
      <span>{text}</span>
      <span className="arrow">→</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={btnClass} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }
  return (
    <button className={btnClass} onClick={onClick} type="button">
      {content}
    </button>
  );
};

export default ReadMoreButton; 