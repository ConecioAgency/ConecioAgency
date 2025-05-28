import React from 'react';

interface GooeyButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const GooeyButton: React.FC<GooeyButtonProps> = ({ children, href, className = '' }) => {
  const buttonContent = (
    <button className={`c-button c-button--gooey ${className}`.trim()}>
      <span className="c-button__text">{children}</span>
      <div className="c-button__blobs">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
  );

  if (href) {
    return (
      <a href={href} style={{ position: 'relative', display: 'inline-block' }}>
        {buttonContent}
      </a>
    );
  }
  return buttonContent;
};

export default GooeyButton; 