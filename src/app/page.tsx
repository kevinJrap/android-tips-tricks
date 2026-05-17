import React from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getAllArticles } from '@/lib/articles';

export default function Home() {
  const articles = getAllArticles();
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 border-b border-gray-800">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Practical Android Tips That <span className="text-emerald-400">Actually Make Your Phone Better</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Stop generic advice. We provide deeply researched, step-by-step guides to fix battery drain, stop system ads, uncover hidden features, and optimize your Android experience.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Xiaomi Guides', 'Battery Savings', 'Hidden Features', 'One UI Tips'].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-gray-900 border border-gray-700 hover:border-emerald-500/50 rounded-full text-sm font-medium text-gray-300 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Top Ad Placeholder */}
      <AdPlaceholder />

      {/* Latest & Trending */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
            Trending Guides
          </h2>
          <Link href="/articles" className="text-sm text-emerald-400 hover:text-emerald-300">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* In-Content Ad Placeholder */}
      <AdPlaceholder />

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-100 mb-6">Explore by Topic</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Battery & Power", icon: "🔋", desc: "Stop drain & heating" },
            { name: "Hidden Features", icon: "⚡", desc: "Secret settings unlocked" },
            { name: "Brand Guides", icon: "📱", desc: "Xiaomi, Samsung, BBK" },
            { name: "Privacy & Ads", icon: "🔒", desc: "Block tracking & bloat" }
          ].map((cat) => (
            <div key={cat.name} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition-colors cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-bottom-left">{cat.icon}</div>
              <h3 className="font-bold text-gray-200 mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
