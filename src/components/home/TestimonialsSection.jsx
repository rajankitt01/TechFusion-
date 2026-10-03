import React from 'react';
import { Link } from 'react-router-dom';
import { testimonials } from '../../data/testimonials';
import { SectionHeader } from '../common/SectionHeader';
import { Star, ArrowRight } from 'lucide-react';

export function TestimonialsSection() {
  const displayReviews = testimonials.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-[#EEF2F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <SectionHeader
          tag="// 07. CLIENT VERIFICATION"
          title="What Engineering & Business Leaders Say"
          description="Read direct feedback from executives who engaged TechFusion to build and scale their primary software products."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {displayReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group rounded-xl border border-[#E2E7EF] bg-[#FFFFFF] p-6 sm:p-7 flex flex-col justify-between hover:border-[#BFDBFE] hover:bg-[#F8FAFF] shadow-[0_4px_20px_rgba(11,18,32,0.04)] transition-all duration-200 text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#0B1220] group-hover:text-[#1677FF] group-hover:border-[#BFDBFE] bg-[#EEF3FF] px-2.5 py-0.5 rounded border border-[#C9D7F5] font-bold shadow-2xs transition-colors duration-200">
                    VERIFIED CLIENT
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#2B384E] leading-relaxed mb-6 italic">
                  "{testimonial.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8ECF2] flex items-center gap-3 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#E2E7EF] shrink-0"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0B1220]">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[#596579]">
                    {testimonial.role}, <span className="text-[#0B1220] font-bold group-hover:text-[#1677FF] transition-colors duration-200">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High-Authority Dark Graphite CTA Banner */}
        <div className="rounded-2xl bg-[#111827] border border-[#1F2937] p-8 md:p-12 text-left relative overflow-hidden shadow-lg text-white">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-[11px] font-mono text-[#93C5FD] font-bold tracking-wider uppercase block">
              // READY TO DISCUSS ARCHITECTURE?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Have a Project in Mind? Let's Talk Technical Scope.
            </h3>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">
              Whether you need to build a new SaaS MVP, modernize a legacy system, or scale your mobile product, our senior engineers are ready to review your specifications.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-[#2563EB] text-white hover:bg-[#1677FF] transition-all duration-200 shadow-2xs"
              >
                <span>Schedule an Architecture Call</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold border border-[#E2E7EF] bg-[#FFFFFF] text-[#0B1220] hover:bg-[#F8FAFF] hover:border-[#BFDBFE] hover:text-[#1677FF] transition-all duration-200"
              >
                <span>Browse Case Studies</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
