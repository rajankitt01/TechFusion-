import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { testimonials } from '../data/testimonials';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Reviews() {
  return (
    <PageWrapper>
      {/* Editorial Hero */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-10 md:py-12 lg:py-14 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF3FF] border border-[#C9D7F5] text-xs font-mono font-bold tracking-wider text-[#0B1220] mb-4 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"></span>
              <span>// VERIFIED FEEDBACK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-4">
              Client Endorsements & Engineering Feedback
            </h1>

            <p className="text-base sm:text-lg text-[#2B384E] leading-relaxed">
              Read candid testimonials from founders, CTOs, and product directors who rely on TechFusion for mission-critical software engineering and deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pt-10 md:pt-12 lg:pt-14 pb-12 md:pb-14 lg:pb-16 bg-[#F1F4F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 flex flex-col justify-between hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200 text-left shadow-[0_4px_20px_rgba(17,24,39,0.04)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#0B1220] bg-[#EEF3FF] px-2.5 py-0.5 rounded border border-[#C9D7F5] shadow-2xs font-bold">
                      VERIFIED ENGAGEMENT
                    </span>
                  </div>

                  <p className="text-sm text-[#2B384E] leading-relaxed mb-6 italic group-hover:text-[#0B1220] transition-colors duration-200">
                    "{testimonial.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-5 border-t border-[#E8ECF2] mt-auto">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-11 h-11 rounded-full object-cover border border-[#E2E7EF] shrink-0" 
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200">{testimonial.name}</h4>
                    <p className="text-xs text-[#2B384E]">
                      {testimonial.role}, <span className="text-[#0B1220] font-semibold group-hover:text-[#1677FF] transition-colors duration-200">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating CTA Card above footer */}
          <div 
            className="mt-10 md:mt-12 rounded-[16px] bg-[#0A1128] border border-white/[0.08] p-8 md:p-10 text-center max-w-3xl mx-auto space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] text-white relative z-10"
            style={{
              background: "radial-gradient(circle at 50% 0%, #111e3b 0%, #080c16 80%)",
            }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to Experience Accountable Software Engineering?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Discuss your product specifications with a senior technical architect and receive a comprehensive sprint roadmap.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-[#FFFFFF] hover:bg-[#1677FF] transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-[0.98]"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

export default Reviews;
