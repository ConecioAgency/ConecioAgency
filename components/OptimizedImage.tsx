import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extraire le nom de base de l'image
  const getImagePath = (path: string) => {
    const ext = path.split('.').pop();
    const baseName = path.split('/').pop()?.split('.')[0];
    return `/images/optimized/${baseName}-${width || 1920}.webp`;
  };

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      <Image
        src={error ? src : getImagePath(src)}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        priority={priority}
        sizes={sizes}
        quality={80}
      />
    </div>
  );
} 