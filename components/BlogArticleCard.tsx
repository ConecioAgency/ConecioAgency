import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BlogArticleCardProps {
  article: {
    image: string;
    title: string;
    summary: string;
    slug: string;
  };
  delay?: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay, type: 'spring', stiffness: 80 },
  }),
};

export default function BlogArticleCard({ article, delay = 0 }: BlogArticleCardProps) {
  return (
    <div className="blog-card-uiverse relative flex flex-col rounded-3xl overflow-hidden w-full">
      {/* Halo animé et contenu de la carte */}
      <div className="relative flex flex-col flex-1 w-full h-full z-10 p-4">
      {/* Image de couverture */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
          <Image 
            src={article.image || '/images/blog/default.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
      </div>
      {/* Titre */}
        <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
        {article.title}
      </h3>
      {/* Extrait */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
        {article.summary}
      </p>
      {/* Bouton */}
      <Link href={`/blog/${article.slug}`} className="mt-auto">
          <button
            className="btn-card mx-auto mt-auto bg-gradient-to-r from-primary-light to-secondary-light text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all"
        >
          Lire l'article
          <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          </button>
      </Link>
      </div>
      <style jsx>{`
        .blog-card-uiverse {
          background: #07182E;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          z-index: 0;
        }
        .blog-card-uiverse::before {
          content: '';
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
          width: 100px;
          height: 130%;
          background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
          animation: rotBGimg 3s linear infinite;
          z-index: 1;
          transition: none;
        }
        .blog-card-uiverse::after {
          content: '';
          position: absolute;
          inset: 5px;
          background: #07182E;
          border-radius: 15px;
          z-index: 2;
        }
        @keyframes rotBGimg {
          from { transform: rotate(0deg);}
          to { transform: rotate(360deg);}
        }
        .blog-card-uiverse > *:not(style) {
          position: relative;
          z-index: 3;
        }
      `}</style>
    </div>
  );
} 