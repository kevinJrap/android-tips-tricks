import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdPlaceholder from '@/components/AdPlaceholder';
import React from 'react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Android Toolbox`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to all tips
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              {article.category}
            </span>
            <span className="flex items-center text-sm text-gray-400 font-medium bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
              <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {article.readingTime}
            </span>
            {article.lastVerified && (
              <span className="flex items-center text-sm text-emerald-300 font-medium bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-800/50">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Verified: {article.lastVerified}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-8">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between py-6 border-y border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20">
                AT
              </div>
              <div>
                <p className="text-sm font-bold text-gray-200">Written by Human Experts</p>
                <p className="text-xs text-gray-500">Tested on physical devices • No AI fluff</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg text-[#25D366] font-bold text-sm transition-colors" title="Share on WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Share
              </a>
            </div>
          </div>
        </header>

        {/* Telegram Banner */}
        <div className="bg-[#0088cc]/10 border border-[#0088cc]/30 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.05-.19-.02-.27 0-.11.03-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.48 1-.74 3.93-1.71 6.55-2.84 7.86-3.38 3.74-1.54 4.51-1.81 5.01-1.82.11 0 .35.03.48.14.11.09.14.22.14.35-.01.12-.02.26-.04.48z"/></svg>
            <div>
              <p className="text-white font-bold text-sm md:text-base">Join our private Telegram channel</p>
              <p className="text-gray-400 text-xs md:text-sm">Get secret tips we don't post on the website.</p>
            </div>
          </div>
          <a href="#" className="whitespace-nowrap px-6 py-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold rounded-lg transition-colors text-sm">
            Join Now
          </a>
        </div>

        {/* Top Content Ad */}
        <AdPlaceholder />

        <div 
          className="prose prose-invert prose-lg md:prose-xl max-w-none mt-10 mb-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Bottom Feedback Module */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-bold text-white mb-2">Did this actually solve your problem?</h3>
          <p className="text-gray-400 mb-6 text-sm">We hate useless tutorials as much as you do. Let us know if this worked.</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-gray-800 hover:bg-emerald-900/50 hover:border-emerald-500/50 border border-gray-700 rounded-lg text-gray-300 font-medium transition-all flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              Yes, it worked
            </button>
            <button className="px-6 py-2 bg-gray-800 hover:bg-red-900/30 hover:border-red-500/50 border border-gray-700 rounded-lg text-gray-300 font-medium transition-all flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
              No, it didn't
            </button>
          </div>
        </div>

        {/* Bottom Content Ad */}
        <AdPlaceholder />
      </article>
    </div>
  );
}
