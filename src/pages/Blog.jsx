import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { blogPosts, blogCategories } from '../data/blog';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <PageWrapper>
      {/* Editorial Hero */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-10 md:py-12 lg:py-14 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF3FF] border border-[#C9D7F5] text-xs font-mono font-bold tracking-wider text-[#0B1220] mb-4 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"></span>
              <span>// ENGINEERING INSIGHTS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-4">
              Architecture Patterns & Technical Analysis
            </h1>

            <p className="text-base sm:text-lg text-[#2B384E] leading-relaxed">
              Read practical perspectives on software architecture, frontend performance, data security, and cloud scalability written by practicing engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="pt-10 md:pt-12 lg:pt-14 pb-12 md:pb-14 lg:pb-16 bg-[#F1F4F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-[#1677FF] text-[#FFFFFF] font-bold shadow-xs' 
                    : 'bg-[#FFFFFF] text-[#0B1220] font-medium border border-[#E2E7EF] hover:bg-[#F8FAFF] hover:border-[#BFDBFE] hover:text-[#1677FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] overflow-hidden flex flex-col justify-between hover:border-[#BFDBFE] hover:bg-[#F8FAFF] hover:shadow-[0_4px_20px_rgba(17,24,39,0.06)] transition-all duration-300 group text-left shadow-[0_4px_20px_rgba(17,24,39,0.04)]"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F4F8]">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E2E7EF] text-[11px] font-mono text-[#0B1220] shadow-2xs font-bold">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#2B384E] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#0B1220] mb-3 group-hover:text-[#1677FF] transition-colors duration-200 leading-snug">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-[#2B384E] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#E8ECF2] mt-auto">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200 pt-4"
                  >
                    <span>Read Technical Article</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

export default Blog;
