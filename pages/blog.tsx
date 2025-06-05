import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import { blogArticles } from '../data/blogArticles';
import BlogArticleCard from '../components/BlogArticleCard';
import GooeyButton from '../components/GooeyButton';
import { H1, H2, Body1, Overline } from '../components/Typography';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import AnimatedBubblesBackground from '../components/AnimatedBubblesBackground';
import SectionTitle from '../components/SectionTitle';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// Types pour le tri
type SortOption = 'date' | 'popularity' | 'title';
type SortOrder = 'asc' | 'desc';

// Composant pour afficher la date côté client sans erreur d'hydratation
function BlogDate({ date, format = 'monthYear' }: { date: string, format?: 'monthYear' | 'dayMonthYear' }) {
  const [formatted, setFormatted] = useState('');
  useEffect(() => {
    if (format === 'dayMonthYear') {
      setFormatted(new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }));
    } else {
      setFormatted(new Date(date).toLocaleString('fr-FR', { month: 'long', year: 'numeric' }));
    }
  }, [date, format]);
  if (!formatted) return null;
  return <span suppressHydrationWarning>{formatted}</span>;
}

export default function Blog() {
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  useEffect(() => { setMounted(true); }, []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [minViews, setMinViews] = useState<number>(0);
  const maxViews = useMemo(() => Math.max(...blogArticles.map(a => a.views || 0)), []);
  
  // Structure des catégories et sous-catégories
  const categoryStructure = {
    'Marketing Digital': ['SEO', 'Social Media', 'Content Marketing'],
    'Technologie': ['IA', 'Web3', 'Blockchain'],
    'Business': ['Stratégie', 'Analytics', 'Growth Hacking'],
    'Design': ['UI/UX', 'Branding', 'Motion Design']
  };

  // Extraire toutes les catégories principales
  const mainCategories = ['all', ...Object.keys(categoryStructure)];
  
  // Obtenir les sous-catégories pour la catégorie sélectionnée
  const subCategories = selectedCategory === 'all' ? [] : categoryStructure[selectedCategory as keyof typeof categoryStructure] || [];

  // Compter les articles par catégorie
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: blogArticles.length };
    mainCategories.forEach(category => {
      if (category !== 'all') {
        counts[category] = blogArticles.filter(article => 
          article.tags.some(tag => categoryStructure[category as keyof typeof categoryStructure]?.includes(tag))
        ).length;
      }
    });
    return counts;
  }, [mainCategories]);

  // Multi-sélection catégories/tags
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extraire tous les tags uniques
  const allTags = useMemo(() => Array.from(new Set(blogArticles.flatMap(a => a.tags))), []);

  // Favoris (localStorage)
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const fav = localStorage.getItem('blogFavorites');
    if (fav) setFavorites(JSON.parse(fav));
  }, []);
  useEffect(() => {
    localStorage.setItem('blogFavorites', JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (slug: string) => {
    setFavorites(favorites.includes(slug)
      ? favorites.filter(f => f !== slug)
      : [...favorites, slug]);
  };
  // Stats globales
  const totalArticles = blogArticles.length;
  const totalViews = blogArticles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalReading = blogArticles.reduce((acc, a) => acc + getReadingTime(a.content), 0);
  // Filtre favoris
  const [showFavorites, setShowFavorites] = useState(false);

  // Liste des auteurs uniques
  const allAuthors = useMemo(() => Array.from(new Set(blogArticles.map(a => a.author))), []);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  // Filtres temps de lecture
  const [readingFilter, setReadingFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  // Trending (top 3 vues)
  const trendingSlugs = useMemo(() => [...blogArticles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3).map(a => a.slug), []);

  // Nouvelle logique de filtrage multi-sélection
  const filteredArticles = useMemo(() => {
    let filtered = blogArticles;
    // Multi-catégories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.some(cat => article.tags.some(tag => categoryStructure[cat as keyof typeof categoryStructure]?.includes(tag)))
      );
    }
    // Multi-tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }
    // Filtrage par sous-catégorie
    if (selectedSubCategory) {
      filtered = filtered.filter(article => article.tags.includes(selectedSubCategory));
    }
    // Filtrage par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    // Filtrage par date
    if (dateFrom) {
      filtered = filtered.filter(article => new Date(article.date) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(article => new Date(article.date) <= new Date(dateTo));
    }
    // Filtrage par nombre de vues
    if (minViews > 0) {
      filtered = filtered.filter(article => (article.views || 0) >= minViews);
    }
    // Filtrage favoris
    if (showFavorites) {
      filtered = filtered.filter(article => favorites.includes(article.slug));
    }
    if (selectedAuthor) {
      filtered = filtered.filter(article => article.author === selectedAuthor);
    }
    if (readingFilter !== 'all') {
      filtered = filtered.filter(article => {
        const min = getReadingTime(article.content);
        if (readingFilter === 'short') return min <= 3;
        if (readingFilter === 'medium') return min > 3 && min <= 7;
        if (readingFilter === 'long') return min > 7;
        return true;
      });
    }
    // Tri des articles
    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'popularity':
          comparison = (b.views || 0) - (a.views || 0);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });
  }, [selectedCategories, selectedTags, selectedSubCategory, searchQuery, sortBy, sortOrder, dateFrom, dateTo, minViews, showFavorites, favorites, selectedAuthor, readingFilter]);

  // Filtres actifs (corrigé linter)
  type ActiveFilter = { label: string; onRemove: () => void };
  const activeFilters: ActiveFilter[] = [
    ...selectedCategories.map(cat => ({ label: cat, onRemove: () => setSelectedCategories(selectedCategories.filter(c => c !== cat)) })),
    ...selectedTags.map(tag => ({ label: tag, onRemove: () => setSelectedTags(selectedTags.filter(t => t !== tag)) })),
    selectedSubCategory ? { label: selectedSubCategory, onRemove: () => setSelectedSubCategory(null) } : null,
    searchQuery ? { label: `Recherche: "${searchQuery}"`, onRemove: () => setSearchQuery('') } : null,
    dateFrom ? { label: `Après ${new Date(dateFrom).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`, onRemove: () => setDateFrom('') } : null,
    dateTo ? { label: `Avant ${new Date(dateTo).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`, onRemove: () => setDateTo('') } : null,
    minViews > 0 ? { label: `≥ ${minViews} vues`, onRemove: () => setMinViews(0) } : null
  ].filter((f): f is ActiveFilter => f !== null);

  // Barre de stats globales
  const stats = [
    { label: 'Articles', value: totalArticles, icon: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
    ) },
    { label: 'Vues', value: totalViews, icon: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    ) },
    { label: 'Lecture', value: `${totalReading} min`, icon: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
    ) },
  ];

  // Calcul du temps de lecture estimé (moyenne 200 mots/min)
  function getReadingTime(content: string) {
    const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }

  // Toggle grille/liste (mémorisé)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => typeof window !== 'undefined' && localStorage.getItem('blogViewMode') ? (localStorage.getItem('blogViewMode') as 'grid' | 'list') : 'grid');
  useEffect(() => { localStorage.setItem('blogViewMode', viewMode); }, [viewMode]);

  // Infinite scroll
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visibleCount >= filteredArticles.length) return;
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleCount((c) => Math.min(c + 6, filteredArticles.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredArticles.length, visibleCount]);
  useEffect(() => { setVisibleCount(9); }, [viewMode, selectedCategories, selectedTags, selectedSubCategory, searchQuery, sortBy, sortOrder, dateFrom, dateTo, minViews, showFavorites, favorites]);

  // Retour en haut
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fonctions de partage multi-réseaux
  const shareLinks = (slug: string) => {
    const url = typeof window !== 'undefined' ? window.location.origin + '/blog/' + slug : '';
    return [
      {
        label: 'LinkedIn',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7a1 1 0 00-1 1v3a1 1 0 001 1h3v7a1 1 0 001 1h3a1 1 0 001-1v-7h2.586a1 1 0 00.707-1.707l-7-7A1 1 0 0012 2z" /></svg>
        ),
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      },
      {
        label: 'Twitter',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.9 3.54 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0024 4.59a9.1 9.1 0 01-2.6.71z" /></svg>
        ),
        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      },
      {
        label: 'Facebook',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
        ),
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      },
      {
        label: 'WhatsApp',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.19c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.456-4.438 9.891-9.893 9.891m8.413-18.304A11.815 11.815 0 0012.05 0C5.495 0 .06 5.436.057 12.092c0 2.137.56 4.223 1.623 6.067L0 24l6.063-1.594a11.888 11.888 0 005.94 1.523h.005c6.554 0 11.89-5.435 11.893-12.09a11.82 11.82 0 00-3.48-8.413"/></svg>
        ),
        url: `https://wa.me/?text=${encodeURIComponent(url)}`
      },
      {
        label: 'Email',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
        ),
        url: `mailto:?subject=Je%20veux%20partager%20cet%20article&body=${encodeURIComponent(url)}`
      }
    ];
  };

  // Ajout de l'état pour le hover partage
  const [shareHover, setShareHover] = useState<string | null>(null);

  // Ajout état pour réduire/agrandir la barre de filtres
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  if (!mounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-gray-900">
        <div className="spinner">
          <div className="spinner1"></div>
        </div>
        <style jsx global>{`
          .spinner {
            background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
            width: 100px;
            height: 100px;
            animation: spinning82341 1.7s linear infinite;
            text-align: center;
            border-radius: 50px;
            filter: blur(1px);
            box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
          }
          .spinner1 {
            background-color: rgb(36, 36, 36);
            width: 100px;
            height: 100px;
            border-radius: 50px;
            filter: blur(10px);
          }
          @keyframes spinning82341 {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Blog Digital Marketing | Conecio</title>
        <meta name="description" content="Découvrez nos articles premium sur le digital marketing, le SEO, l'IA, les tendances et les meilleures pratiques pour booster votre business en 2025." />
        <meta name="keywords" content="blog digital marketing, SEO, IA, tendances digitales, marketing automation, content marketing, social media marketing" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.conecio.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog Digital Marketing | Conecio" />
        <meta property="og:description" content="Découvrez nos articles premium sur le digital marketing, le SEO, l'IA, les tendances et les meilleures pratiques pour booster votre business en 2025." />
        <meta property="og:image" content="https://www.conecio.com/images/icons/carouselle/blogging.png" />
        <meta property="og:image:alt" content="Blog Digital Marketing Conecio" />
        <meta property="og:url" content="https://www.conecio.com/blog" />
        <meta property="og:site_name" content="Conecio" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Digital Marketing | Conecio" />
        <meta name="twitter:description" content="Découvrez nos articles premium sur le digital marketing, le SEO, l'IA, les tendances et les meilleures pratiques pour booster votre business en 2025." />
        <meta name="twitter:image" content="https://www.conecio.com/images/icons/carouselle/blogging.png" />
        <meta name="twitter:site" content="@conecio" />
        <meta name="twitter:creator" content="@conecio" />
        
        {/* Autres meta tags */}
        <meta name="author" content="Conecio" />
        <meta name="language" content="fr" />
        <meta name="revisit-after" content="7 days" />
        <meta name="generator" content="Next.js" />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Digital Marketing Conecio",
            "description": "Blog sur le digital marketing, le SEO, l'IA et les tendances digitales",
            "url": "https://www.conecio.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Conecio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.conecio.com/images/logo/conecio_logo.png"
              }
            },
            "blogPost": blogArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.summary,
              "image": article.image,
              "datePublished": article.date,
              "dateModified": article.date,
              "author": {
                "@type": "Person",
                "name": article.author
              },
              "url": `https://www.conecio.com/blog/${article.slug}`
            }))
          })}
        </script>
      </Head>
      <main className="flex-1">
        {/* Header compact et simple du blog */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-14 md:py-20">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center max-w-2xl">
            <span className="inline-block bg-blue-50 dark:bg-gray-800 px-6 py-1 rounded-xl font-bold text-base tracking-widest mb-4 animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">BLOG</span>
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8"
            >
              Digital Marketing & Innovation
            </motion.h1>
            <p className="text-gray-500 dark:text-gray-300 text-base md:text-lg max-w-xl text-center mb-6">Conseils, tendances, astuces et analyses pour propulser votre stratégie digitale en 2025.</p>
            <form onSubmit={e => { e.preventDefault(); }} className="w-full max-w-md mx-auto flex items-center gap-2">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 font-[Inter] text-sm"
              />
              <button type="submit" className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Reste du contenu */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Nouvelle barre de filtres glassmorphism sticky */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className={`mb-8 flex flex-wrap justify-center gap-4 items-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30 dark:border-gray-800/40 transition-all duration-300 relative ${filtersCollapsed ? 'max-h-16 min-h-[56px] overflow-hidden py-2 px-4' : ''}`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              {/* Bouton réduire/agrandir */}
              <button
                className="absolute right-4 top-4 bg-white dark:bg-gray-800 rounded-full p-1 shadow border border-gray-200 dark:border-gray-700 z-30"
                onClick={() => setFiltersCollapsed(v => !v)}
                aria-label={filtersCollapsed ? 'Agrandir les filtres' : 'Réduire les filtres'}
                style={{ transition: 'all 0.2s' }}
              >
                {filtersCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </button>
              {/* Contenu des filtres */}
              {!filtersCollapsed && (
                <>
                  {/* Multi-catégories */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {Object.keys(categoryStructure).map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategories(selectedCategories.includes(category)
                          ? selectedCategories.filter(c => c !== category)
                          : [...selectedCategories, category])}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${selectedCategories.includes(category)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg scale-105'
                          : 'bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30'}
                        `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {/* Multi-tags */}
                  <div className="flex flex-wrap gap-2 items-center ml-4">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTags(selectedTags.includes(tag)
                          ? selectedTags.filter(t => t !== tag)
                          : [...selectedTags, tag])}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${selectedTags.includes(tag)
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-400 scale-105 shadow'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30'}
                        `}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {/* Filtres avancés existants (date, vues, recherche) */}
                  <div className="flex flex-col md:flex-row gap-2 items-center ml-4">
                    <label className="text-sm text-gray-600 dark:text-gray-300">Date de&nbsp;:</label>
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="rounded-lg border px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
                    <span className="mx-1 text-gray-400">→</span>
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="rounded-lg border px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    <label className="text-sm text-gray-600 dark:text-gray-300">Vues&nbsp;≥</label>
                    <input type="range" min={0} max={maxViews} value={minViews} onChange={e => setMinViews(Number(e.target.value))} className="w-32 accent-indigo-500" />
                    <span className="text-sm text-indigo-600 dark:text-indigo-300 font-bold min-w-[40px] text-center">{minViews}</span>
                  </div>
                  {/* Filtres actifs badges */}
                  {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center ml-4">
                      {activeFilters.map((filter, i) => (
                        <motion.span key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800 transition" onClick={filter.onRemove}>
                          {filter.label}
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </motion.span>
                      ))}
                      <button onClick={() => { setSelectedCategories([]); setSelectedTags([]); setSelectedSubCategory(null); setSearchQuery(''); setDateFrom(''); setDateTo(''); setMinViews(0); }} className="ml-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Réinitialiser</button>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Liste des articles */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={viewMode + '-' + `${selectedCategories.join('-')}-${selectedTags.join('-')}-${selectedSubCategory}-${searchQuery}-${sortBy}-${sortOrder}-${dateFrom}-${dateTo}-${minViews}-${showFavorites}-${favorites.join('-')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}
              >
                {filteredArticles.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-16">
                    <Image src="/images/empty-state.svg" alt="Aucun résultat" width={120} height={120} className="mx-auto mb-4 opacity-60" />
                    <p className="text-lg text-gray-500 dark:text-gray-300 mb-2">Aucun article ne correspond à vos filtres.</p>
                    <a href="mailto:contact@conecio.com?subject=Suggestion%20d%27article%20blog" className="inline-block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition">Proposer un sujet</a>
                  </motion.div>
                ) : (
                  filteredArticles.slice(0, visibleCount).map((article, index) => (
                    viewMode === 'grid' ? (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.08 }}
                        className="single-blog bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-white/30 dark:border-gray-800/40 overflow-hidden flex flex-col p-0 hover:shadow-2xl transition-all duration-300 group"
                      >
                        <div className="blog-photo relative overflow-hidden">
                          <Link href={`/blog/${article.slug}`} className="block">
                            <Image
                              src={article.image}
                              alt={article.altText}
                              width={800}
                              height={400}
                              className="w-full h-48 object-cover rounded-t-lg"
                              priority={index < 3}
                            />
                          </Link>
                          {/* Like/Share bar */}
                          <div className="like-share absolute left-0 w-full flex justify-center gap-6 bg-white/80 dark:bg-gray-900/80 py-3 px-2 rounded-b-2xl shadow-lg transition-all duration-300 bottom-[-40px] opacity-0 group-hover:bottom-0 group-hover:opacity-100 z-10">
                            <button onClick={() => toggleFavorite(article.slug)} className="flex items-center gap-1 text-gray-500 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-all">
                              <svg className={`w-5 h-5 ${favorites.includes(article.slug) ? 'text-purple-500 dark:text-purple-400' : ''}`} fill={favorites.includes(article.slug) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                              <span className="text-xs font-semibold">{article.views || 0} Like</span>
                            </button>
                            <span className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2-4h4a2 2 0 012 2v4H7V6a2 2 0 012-2z" /></svg>
                              <span className="text-xs font-semibold">{article.comments?.length || 0} Comments</span>
                            </span>
                            <div
                              className="relative"
                              onMouseEnter={() => setShareHover(article.slug)}
                              onMouseLeave={() => setShareHover(null)}
                            >
                              <button className="flex items-center gap-1 text-gray-500 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                <span className="text-xs font-semibold">Share</span>
                              </button>
                              <AnimatePresence>
                                {shareHover === article.slug && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex flex-col items-center gap-2 z-50"
                                  >
                                    {shareLinks(article.slug).map(s => (
                                      <button
                                        key={s.label}
                                        onClick={e => { e.preventDefault(); window.open(s.url, '_blank'); }}
                                        className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition-all"
                                        aria-label={`Partager sur ${s.label}`}
                                      >
                                        {s.icon}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="blog-info flex-1 flex flex-col p-6">
                          <div className="post-meta flex items-center gap-4 mb-3">
                            <div className="post-date flex flex-col items-center justify-center border border-indigo-400 dark:border-indigo-500 rounded text-gray-800 dark:text-gray-100 w-10 h-10 font-bold mr-2">
                              <span className="text-lg leading-none">{new Date(article.date).getDate().toString().padStart(2, '0')}</span>
                            </div>
                            <div className="post-year flex-1">
                              <p className="uppercase text-xs text-gray-800 dark:text-gray-100 font-bold mb-0"><BlogDate date={article.date} /></p>
                              <h4 className="post-title text-lg font-bold mt-1">
                                <Link href={`/blog/${article.slug}`} className="transition-colors" style={{ color: '#6C6CFF' }}>{article.title}</Link>
                              </h4>
                            </div>
                          </div>
                          <div className="w-full h-0.5 my-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 opacity-60 rounded-full" />
                          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-3 flex-1">
                            {article.summary}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full shadow border border-indigo-100 dark:border-indigo-800">
                              <svg className="w-4 h-4 text-indigo-400 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                              {article.views || 0}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full shadow border border-indigo-100 dark:border-indigo-800">
                              <svg className="w-4 h-4 text-indigo-400 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
                              {getReadingTime(article.content)} min
                            </span>
                          </div>
                          <Link href={`/blog/${article.slug}`} className="button-2 inline-block text-gray-800 dark:text-gray-100 border border-indigo-400 dark:border-indigo-500 rounded-full px-6 py-2 font-bold hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all mt-4 group relative overflow-hidden">
                            <span className="relative z-10">Read more...</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-500 dark:to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                          </Link>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.07 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="flex flex-row w-full bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-800/40 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                      >
                        <div className="relative min-w-[120px] w-32 md:w-40 h-44 flex-shrink-0 rounded-l-2xl overflow-hidden shadow-lg border-r border-white/30 dark:border-gray-800/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                          <Image 
                            src={article.image} 
                            alt={article.altText} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1 p-6">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="post-date flex flex-col items-center justify-center border border-indigo-400 dark:border-indigo-500 rounded text-gray-800 dark:text-gray-100 w-10 h-10 font-bold mr-2">
                              <span className="text-lg leading-none">{new Date(article.date).getDate().toString().padStart(2, '0')}</span>
                            </div>
                            <div className="flex-1">
                              <p className="uppercase text-xs text-gray-800 dark:text-gray-100 font-bold mb-0"><BlogDate date={article.date} /></p>
                              <h2 className="text-xl md:text-2xl font-extrabold mb-1 font-[Poppins]" style={{ color: '#6C6CFF', textShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
                                {article.title}
                              </h2>
                            </div>
                          </div>
                          <div className="w-full h-0.5 my-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 opacity-40 rounded-full" />
                          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 line-clamp-2 md:line-clamp-3">
                            {article.summary}
                          </p>
                          <div className="flex items-center gap-4 mt-auto">
                            <span className="flex items-center gap-1 text-xs text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full shadow border border-indigo-100 dark:border-indigo-800">
                              <svg className="w-4 h-4 text-indigo-400 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                              {article.views || 0}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full shadow border border-indigo-100 dark:border-indigo-800">
                              <svg className="w-4 h-4 text-indigo-400 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
                              {getReadingTime(article.content)} min
                            </span>
                            <div className="flex gap-1 ml-auto">
                              <div
                                className="relative"
                                onMouseEnter={() => setShareHover(article.slug)}
                                onMouseLeave={() => setShareHover(null)}
                              >
                                <button
                                  className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:scale-110 transition-all flex items-center justify-center"
                                  aria-label="Partager"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                  </svg>
                                </button>
                                <AnimatePresence>
                                  {shareHover === article.slug && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 20 }}
                                      transition={{ duration: 0.25 }}
                                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex flex-col items-center gap-2 z-50"
                                    >
                                      {shareLinks(article.slug).map(s => (
                                        <button
                                          key={s.label}
                                          onClick={e => { e.preventDefault(); window.open(s.url, '_blank'); }}
                                          className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition-all"
                                          aria-label={`Partager sur ${s.label}`}
                                        >
                                          {s.icon}
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))
                )}
              </motion.div>
            </AnimatePresence>
            {/* Infinite scroll loader */}
            {visibleCount < filteredArticles.length && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </section>

        {/* --- SECTION CONTACT / PROPOSER UN SUJET --- */}
        <section className="py-8 flex justify-center items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-50" />
          <div className="flex flex-col items-center gap-4 max-w-5xl w-full mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-white/90 via-indigo-50/90 to-pink-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 border border-white/20 dark:border-gray-700/20 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* Illustration centrée */}
              <div className="mb-2">
                <img
                  src="/images/contact-img.d79dd481a5afbe1ed64a.webp"
                  alt="Contact illustration"
                  width={96}
                  height={96}
                  className="rounded-2xl shadow-lg border-2 border-white/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-800/50 mx-auto"
                  style={{ boxShadow: '0 0 0 4px rgba(255,255,255,0.1), 0 4px 24px 0 rgba(99,102,241,0.15)' }}
                />
              </div>
              {/* AnimatedTitle en gradient */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 font-[Poppins] tracking-tight animate__animated animate__fadeInDown">
                {locale === 'fr' && "Une idée d'article ?"}
                {locale === 'en' && "Got an Article Idea?"}
                {locale === 'ar' && "هل لديك فكرة لمقال؟"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-4 font-[Inter] max-w-2xl animate__animated animate__fadeInUp leading-relaxed">
                {locale === 'fr' && "Partagez votre inspiration avec nous, elle pourrait devenir notre prochain article ! Votre vision compte."}
                {locale === 'en' && "Share your inspiration with us, it could become our next article! Your vision matters."}
                {locale === 'ar' && "شارك إلهامك معنا، قد يصبح مقالنا القادم! رؤيتك مهمة."}
              </p>
              <a
                href="/contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-base mt-2 animate__animated animate__fadeInUp"
                style={{ boxShadow: '0 4px 14px 0 rgba(99,102,241,0.25)' }}
              >
                <span>
                  {locale === 'fr' && "Proposer un sujet"}
                  {locale === 'en' && "Suggest a Topic"}
                  {locale === 'ar' && "اقترح موضوعاً"}
                </span>
                <span className="text-white group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 