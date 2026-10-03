import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';

export function BlogDetails() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-8 md:py-10 lg:py-12 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#0B1220] hover:text-[#1677FF] transition-colors duration-200 mb-4 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span>Back to Engineering Insights</span>
          </Link>

          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#EEF3FF] border border-[#C9D7F5] text-[#0B1220] font-bold shadow-2xs">
              {post.category}
            </span>
            <span className="text-xs font-mono text-[#0B1220] font-bold">TECHNICAL PERSPECTIVE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.2] mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#2B384E] pt-2 border-t border-[#E2E7EF]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0B1220]" /> {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0B1220]" /> {post.author}
            </span>
            <span>•</span>
            <span className="text-[#2B384E]">TechFusion Engineering Team</span>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <section className="py-6 md:py-8 bg-[#F1F4F8] border-b border-[#E2E7EF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="rounded-2xl overflow-hidden border border-[#E2E7EF] aspect-[16/9] max-h-[460px] w-full bg-[#FFFFFF] shadow-sm">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-10 md:py-14 bg-[#FFFFFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-left">
          <div 
            className="prose prose-slate max-w-none text-[#2B384E] text-base leading-relaxed space-y-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#0B1220] [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#0B1220] [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>a]:text-[#0B1220] [&>a]:hover:text-[#1677FF] [&>a]:underline transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Callout Footer */}
          <div className="mt-8 md:mt-10 pt-6 border-t border-[#E8ECF2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-[#2B384E]">
              <span>Published by </span>
              <strong className="text-[#0B1220]">{post.author}</strong>
              <span> at TechFusion Engineering Studio.</span>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220] hover:text-[#1677FF] transition-colors duration-200 group"
            >
              <span>Discuss Engineering Topics</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default BlogDetails;
