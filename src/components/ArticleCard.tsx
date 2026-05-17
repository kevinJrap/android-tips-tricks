import React from 'react';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
}

export default function ArticleCard({ title, excerpt, slug, category, date }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block group">
      <article className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            {category}
          </span>
          <time className="text-xs text-gray-500">{date}</time>
        </div>
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3 mt-auto">
          {excerpt}
        </p>
      </article>
    </Link>
  );
}
