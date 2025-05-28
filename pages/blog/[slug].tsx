import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { blogArticles } from '../../data/blogArticles';
import type { BlogArticle } from '../../data/blogArticles';
import CommentsSection from '../../components/CommentsSection';
import { useEffect, useRef, useState } from 'react';

export async function getStaticPaths() {
  return {
    paths: blogArticles.map(article => ({ params: { slug: article.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const article = blogArticles.find(a => a.slug === params.slug);
  const index = blogArticles.findIndex(a => a.slug === params.slug);
  const prev = index > 0 ? blogArticles[index - 1] : null;
  const next = index < blogArticles.length - 1 ? blogArticles[index + 1] : null;
  return { props: { article, prev, next } };
}

type ArticleType = typeof blogArticles[0];

type BlogArticleProps = {
  article: ArticleType;
  prev: ArticleType | null;
  next: ArticleType | null;
};

function TableOfContents() {
  const [mounted, setMounted] = useState(false);
  const [headings, setHeadings] = useState<{id: string, text: string, level: number, index: number}[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const article = document.querySelector('.custom-article-premium');
    if (!article) return;

    const hs = Array.from(article.querySelectorAll('h2, h3')).map((el: any, i) => ({
      id: el.id || el.textContent.replace(/\s+/g, '-').toLowerCase(),
      text: el.textContent,
      level: el.tagName === 'H2' ? 2 : 3,
      index: i + 1
    }));
    setHeadings(hs);

    // Ajouter id si manquant
    hs.forEach(h => {
      const el = document.getElementById(h.id);
      if (!el) {
        const found = Array.from(article.querySelectorAll('h2, h3')).find((e: any) => e.textContent === h.text);
        if (found) found.id = h.id;
      }
    });

    // Fonction de suivi du scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerOffset = 150;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculer la position du sommaire
      const tocPosition = Math.min(
        Math.max(0, scrollPosition - 150),
        maxScroll - 200
      );
      setPosition(tocPosition);

      // Trouver le heading actif
      for (let i = hs.length - 1; i >= 0; i--) {
        const el = document.getElementById(hs[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          
          if (elementTop <= scrollPosition + headerOffset) {
            setActiveId(hs[i].id);
            break;
          }
        }
      }
    };

    // Ajouter l'écouteur de scroll avec throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Appel initial

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [mounted]);

  if (!mounted || headings.length === 0) return null;

  return (
    <nav 
      className="w-64 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-white/40 dark:border-gray-800/40 p-6 font-[Inter] z-50 backdrop-blur-md"
      style={{
        position: 'fixed',
        top: '150px',
        left: 'calc((100% - 1280px) / 2 + 32px)',
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto'
      }}
    >
      <div className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-lg font-[Poppins] tracking-wide border-b border-gray-200 dark:border-gray-700 pb-3">
        Sommaire
      </div>
      <ul className="space-y-3">
        {headings.map((h, index) => (
          <li key={h.id} className="ml-0" style={{ marginLeft: h.level === 3 ? 20 : 0 }}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  const headerOffset = 150;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`group flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                activeId === h.id 
                  ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-700 dark:text-indigo-200 font-semibold shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-300 ${
                activeId === h.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30'
              }`}>
                {index + 1}
              </span>
              <span className="flex-1">{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogArticle({ article, prev, next }: BlogArticleProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!article) return <div>Article non trouvé.</div>;
  return (
    <>
      <Head>
        <title>{article.title} | Blog Digital Marketing | Conecio</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={`https://www.conecio.com/blog/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:url" content={`https://www.conecio.com/blog/${article.slug}`} />
        <meta property="og:site_name" content="Conecio" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={article.date} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content="Digital Marketing" />
        <meta property="article:tag" content={article.tags.join(', ')} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={article.image} />
        <meta name="twitter:site" content="@conecio" />
        <meta name="twitter:creator" content="@conecio" />
        
        {/* Autres meta tags */}
        <meta name="author" content={article.author} />
        <meta name="language" content="fr" />
        <meta name="revisit-after" content="7 days" />
        <meta name="generator" content="Next.js" />
        
        {/* Données structurées */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.summary,
            "image": article.image,
            "datePublished": article.date,
            "dateModified": article.date,
            "author": {
              "@type": "Person",
              "name": article.author,
              "url": "https://www.conecio.com/team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Conecio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.conecio.com/images/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.conecio.com/blog/${article.slug}`
            },
            "keywords": article.tags.join(', '),
            "articleSection": "Digital Marketing",
            "inLanguage": "fr-FR",
            "wordCount": article.content.split(/\s+/).length,
            "isAccessibleForFree": true,
            "isPartOf": {
              "@type": "Blog",
              "name": "Blog Digital Marketing Conecio",
              "url": "https://www.conecio.com/blog"
            }
          })}
        </script>
      </Head>
      <main className="flex-1 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex gap-8">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents />
            </div>
            <div className="flex-1 px-4 lg:px-8">
              <button onClick={() => router.back()} className="mb-6 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b5cff] via-[#e14fff] to-[#ff8c4d] text-white font-bold shadow-xl hover:scale-105 transition-all">
                <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                Retour au blog
              </button>
              <div className="mb-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-8 flex flex-col items-center">
                <span className="uppercase text-xs tracking-widest font-semibold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text mb-2 inline-block">Blog</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight drop-shadow-xl text-center">{article.title}</h1>
                <div className="w-full h-1 my-3 rounded-full bg-gradient-to-r from-[#7b5cff] via-[#e14fff] to-[#ff8c4d]" />
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2 justify-center">
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>{article.author}</span>
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>{new Date(article.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>{article.content.match(/\d+\s?min|\d+\s?mots/)?.[0] || 'Lecture rapide'}</span>
                  <div className="flex gap-1">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 rounded bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-indigo-600 dark:text-indigo-200 font-semibold shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="relative w-full h-64 mt-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-100 dark:border-indigo-900">
                  <Image src={article.image} alt={article.title} fill className="object-cover" priority />
                </div>
              </div>
              {mounted && (
                <article className="prose prose-lg dark:prose-invert max-w-none font-[Inter] custom-article-premium" itemScope itemType="https://schema.org/BlogPosting">
                  <meta itemProp="datePublished" content={article.date} />
                  <meta itemProp="dateModified" content={article.date} />
                  <meta itemProp="author" content={article.author} />
                  <meta itemProp="publisher" content="Conecio" />
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: article.content.replace(/chang/g, '') 
                    }} 
                  />
                </article>
              )}

              {/* Mini-bio auteur */}
              <div className="flex items-center gap-6 mt-12 mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/60 dark:via-purple-900/60 dark:to-pink-900/60 shadow-lg" itemScope itemType="https://schema.org/Person">
                <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                  <Image
                    src="/images/astronaute.png"
                    alt="Blogger Conecio"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2" itemProp="name">L. Conecio</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4" itemProp="description">
                    🚀 Explorateur du digital et passionné d'innovation, je partage mes découvertes et conseils pour propulser votre présence en ligne vers de nouveaux sommets. Mon objectif ? Vous aider à naviguer dans l'univers du marketing digital avec confiance et créativité.
                  </p>
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/in/conecio" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://twitter.com/conecio" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Section commentaires (démo front) */}
              <CommentsSection articleSlug={article.slug} />

              <div className="flex justify-between mt-12 gap-4">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b5cff] via-[#e14fff] to-[#ff8c4d] text-white font-bold shadow-xl hover:scale-105 transition-all">
                    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    {prev.title}
                  </Link>
                ) : <span />}
                {next ? (
                  <Link href={`/blog/${next.slug}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#7b5cff] via-[#e14fff] to-[#ff8c4d] text-white font-bold shadow-xl hover:scale-105 transition-all">
                    {next.title}
                    <svg className="w-5 h-5 ml-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ) : <span />}
              </div>
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/60 dark:via-purple-900/60 dark:to-pink-900/60 shadow-lg flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-[Poppins] mb-2 text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2"><svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /></svg>Vous souhaitez aller plus loin ?</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-200">Contactez notre équipe pour booster votre stratégie digitale ou découvrez nos autres articles premium.</p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition-all gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7" /><path d="M21 10.5a2.121 2.121 0 01-2.121 2.121H17.5a2.121 2.121 0 01-2.121-2.121V6" /></svg>Contactez-nous</Link>
                  <Link href="/blog" className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 font-bold shadow hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>Voir tous les articles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-article-premium {
            counter-reset: h2-counter;
            font-size: 0.875rem;
            line-height: 1.5;
            color: #374151;
            font-weight: 400;
          }

          .custom-article-premium h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            counter-increment: h2-counter;
            line-height: 1.3;
          }

          .custom-article-premium h2:before {
            content: counter(h2-counter);
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #fff;
            font-size: 0.875rem;
            font-weight: 700;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
            flex-shrink: 0;
          }

          .custom-article-premium h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.125rem;
            font-weight: 600;
            color: #4b5563;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
          }

          .custom-article-premium p {
            margin-bottom: 0.875rem;
            font-size: 0.875rem;
            line-height: 1.5;
            color: #4b5563;
            font-weight: 400;
          }

          .custom-article-premium ul li {
            position: relative;
            padding-left: 1.75rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            color: #4b5563;
            display: flex;
            align-items: flex-start;
            font-weight: 400;
          }

          .custom-article-premium ul li:before {
            content: '';
            display: inline-block;
            width: 0.75rem;
            height: 0.75rem;
            margin-right: 0.5rem;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
            flex-shrink: 0;
            margin-top: 0.25rem;
          }

          .custom-article-premium a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid #e5e7eb;
            transition: all 0.2s ease;
            font-size: 0.875rem;
          }

          .custom-article-premium strong {
            color: #1f2937;
            font-weight: 600;
            font-size: 0.875rem;
          }

          .custom-article-premium blockquote {
            border-left: 2px solid #4f46e5;
            padding-left: 1rem;
            margin: 1.25rem 0;
            font-style: italic;
            color: #4b5563;
            background: linear-gradient(to right, rgba(79, 70, 229, 0.05), transparent);
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 400;
          }

          .custom-article-premium img {
            border-radius: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            margin: 2rem 0;
          }

          .custom-article-premium code {
            background: #f3f4f6;
            padding: 0.15rem 0.3rem;
            border-radius: 0.25rem;
            font-size: 0.8125rem;
            color: #4f46e5;
            font-weight: 500;
          }

          .custom-article-premium pre {
            background: #1f2937;
            padding: 1.25rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }

          .custom-article-premium pre code {
            background: none;
            padding: 0;
            color: #e5e7eb;
            font-weight: 400;
            font-size: 0.8125rem;
          }

          /* Ajustement des marges et espacements */
          .custom-article-premium > *:first-child {
            margin-top: 0;
          }

          .custom-article-premium > *:last-child {
            margin-bottom: 0;
          }

          /* Ajustement des sections */
          .custom-article-premium section {
            margin-bottom: 1.5rem;
          }

          /* Ajustement des listes */
          .custom-article-premium ul, 
          .custom-article-premium ol {
            margin: 0.75rem 0;
            padding-left: 1.5rem;
          }

          .dark .custom-article-premium {
            color: #e5e7eb;
          }

          .dark .custom-article-premium h2 {
            color: #f3f4f6;
          }

          .dark .custom-article-premium h3 {
            color: #d1d5db;
          }

          .dark .custom-article-premium p,
          .dark .custom-article-premium ul li {
            color: #d1d5db;
          }

          .dark .custom-article-premium strong {
            color: #f3f4f6;
          }

          .dark .custom-article-premium blockquote {
            background: linear-gradient(to right, rgba(79, 70, 229, 0.1), transparent);
            color: #d1d5db;
          }

          .dark .custom-article-premium code {
            background: #374151;
            color: #a78bfa;
          }
        `}</style>
      </main>
    </>
  );
} 