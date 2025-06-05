import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const BlogPage = dynamic(() => import('../pages/blog'), {
  loading: () => <div>Chargement...</div>,
  ssr: false,
});

export default function DynamicBlogLoader() {
  return (
    <Suspense fallback={<div>Chargement du blog...</div>}>
      <BlogPage />
    </Suspense>
  );
} 