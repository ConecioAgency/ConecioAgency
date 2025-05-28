import { useState, useEffect } from 'react';
import { blogArticles } from '../data/blogArticles';

const EMOJIS = ['👍', '😍', '🔥', '👏', '😮'];
const COMMENTS_PER_PAGE = 4;

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  emojiReactions: { [emoji: string]: number };
}

export default function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState('');
  const [author, setAuthor] = useState('');
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Charger les commentaires simulés, les commentaires locaux et les likes
  useEffect(() => {
    const article = blogArticles.find(a => a.slug === articleSlug);
    const simulatedComments = article?.comments?.map(c => ({
      id: Math.random().toString(36).substr(2, 9),
      ...c,
      likes: 0,
      emojiReactions: {}
    })) || [];

    const saved = localStorage.getItem('comments-' + articleSlug);
    const localComments = saved ? JSON.parse(saved) : [];

    const savedLikes = localStorage.getItem('likes-' + articleSlug);
    const likedIds = savedLikes ? JSON.parse(savedLikes) : [];

    // Appliquer les likes sauvegardés aux commentaires
    const commentsWithLikes = [...simulatedComments, ...localComments].map(comment => ({
      ...comment,
      likes: likedIds.includes(comment.id) ? (comment.likes || 0) + 1 : comment.likes || 0
    }));

    setComments(commentsWithLikes);
    setLikedComments(likedIds);
  }, [articleSlug]);

  // Sauvegarder les commentaires et les likes
  useEffect(() => {
    const localComments = comments.filter(c => !c.author);
    localStorage.setItem('comments-' + articleSlug, JSON.stringify(localComments));
    localStorage.setItem('likes-' + articleSlug, JSON.stringify(likedComments));
  }, [comments, likedComments, articleSlug]);

  const addComment = () => {
    if (input.trim().length === 0) return;
    const newComment = {
      id: Date.now().toString(),
      author: author || 'Anonyme',
      avatar: '/images/avatars/default.jpg',
      date: 'À l\'instant',
      content: input,
      likes: 0,
      emojiReactions: {}
    };
    setComments([...comments, newComment]);
    setInput('');
    // Rediriger vers la dernière page après l'ajout d'un commentaire
    setCurrentPage(Math.ceil((comments.length + 1) / COMMENTS_PER_PAGE));
  };

  const likeComment = (id: string) => {
    if (likedComments.includes(id)) {
      // Retirer le like
      setLikedComments(prev => prev.filter(commentId => commentId !== id));
      setComments(comments.map(c => c.id === id ? { ...c, likes: Math.max(0, c.likes - 1) } : c));
    } else {
      // Ajouter le like
      setLikedComments(prev => [...prev, id]);
      setComments(comments.map(c => c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c));
    }
  };

  const reactEmoji = (id: string, emoji: string) => {
    setComments(comments.map(c =>
      c.id === id
        ? { ...c, emojiReactions: { ...c.emojiReactions, [emoji]: (c.emojiReactions[emoji] || 0) + 1 } }
        : c
    ));
  };

  // Calculer les commentaires à afficher pour la page courante
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const currentComments = comments.slice(startIndex, endIndex);

  return (
    <div className="mt-12 mb-8 p-6 rounded-2xl bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-white/40 dark:border-gray-800/50 font-[Inter]">
      <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Commentaires ({comments.length})</h3>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Votre nom (optionnel)"
          className="w-full px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm font-medium"
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Écrire un commentaire..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm font-medium"
            onKeyDown={e => { if (e.key === 'Enter') addComment(); }}
          />
          <button
            onClick={addComment}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-all font-[Poppins]"
          >
            Envoyer
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 && <div className="text-gray-400 text-sm italic">Aucun commentaire pour l'instant.</div>}
        {currentComments.map(comment => (
          <div key={comment.id} className="p-4 rounded-xl bg-gradient-to-br from-white/80 via-indigo-50 to-purple-50 dark:from-gray-900/80 dark:via-indigo-900/40 dark:to-purple-900/40 border border-white/40 dark:border-gray-800/50 flex flex-col gap-2 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-bold text-gray-800 dark:text-gray-100">{comment.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</div>
              </div>
            </div>
            <div className="text-gray-800 dark:text-gray-100 font-medium text-base font-[Inter]">{comment.content}</div>
            <div className="flex items-center gap-2 mt-2">
              <button 
                onClick={() => likeComment(comment.id)} 
                className={`flex items-center gap-1 text-indigo-500 dark:text-indigo-300 font-bold hover:scale-110 transition-all bg-white/70 dark:bg-gray-900/70 px-2 py-1 rounded-full shadow-sm border border-indigo-100 dark:border-indigo-900 ${likedComments.includes(comment.id) ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
              >
                👍 <span>{comment.likes}</span>
              </button>
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => reactEmoji(comment.id, emoji)}
                  className="text-xl hover:scale-125 transition-transform mx-1 bg-white/70 dark:bg-gray-900/70 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-900 shadow-sm"
                  aria-label={`Réagir avec ${emoji}`}
                >
                  {emoji} <span className="text-xs font-bold">{comment.emojiReactions[emoji] || ''}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            } transition-all`}
          >
            Précédent
          </button>
          <span className="text-gray-600 dark:text-gray-300">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            } transition-all`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
} 