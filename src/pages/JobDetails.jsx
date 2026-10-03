import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Briefcase, MapPin, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-8 md:py-10 lg:py-12 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <Link 
              to="/careers" 
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#0B1220] hover:text-[#1677FF] transition-colors duration-200 mb-4 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span>Back to Open Positions</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-3.5">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#0B1220] pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#EEF3FF] border border-[#C9D7F5] text-[#0B1220] font-bold shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-[#1677FF]" /> {job.department}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] text-[#0B1220] font-medium transition-all duration-200 cursor-default group">
                <MapPin className="w-3.5 h-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] text-[#0B1220] font-medium transition-all duration-200 cursor-default group">
                <Clock className="w-3.5 h-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" /> {job.jobType}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] text-[#0B1220] font-medium transition-all duration-200 cursor-default group">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" /> {job.experience}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Application */}
      <section className="py-10 md:py-12 lg:py-14 bg-[#F1F4F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 text-left">
            
            {/* Left Column: Role Details (7 cols) */}
            <div className="lg:col-span-7 space-y-5 md:space-y-6">
              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 space-y-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                <h2 className="text-sm font-bold text-[#0B1220] font-mono tracking-wider uppercase">
                  ROLE OVERVIEW
                </h2>
                <p className="text-sm sm:text-base text-[#2B384E] leading-relaxed">
                  {job.shortDescription}
                </p>
              </div>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 space-y-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                <h2 className="text-sm font-bold text-[#0B1220] font-mono tracking-wider uppercase">
                  KEY RESPONSIBILITIES
                </h2>
                <div className="space-y-3">
                  {job.responsibilities.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2B384E] group p-1 rounded hover:bg-[#F8FAFF] transition-colors duration-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0B1220] group-hover:bg-[#1677FF] mt-2 shrink-0 transition-colors duration-200"></span>
                      <span className="group-hover:text-[#1677FF] transition-colors duration-200">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 space-y-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                <h2 className="text-sm font-bold text-[#0B1220] font-mono tracking-wider uppercase">
                  REQUIRED QUALIFICATIONS
                </h2>
                <div className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2B384E] group p-1 rounded hover:bg-[#F8FAFF] transition-colors duration-200">
                      <CheckCircle2 className="h-4 w-4 text-[#0B1220] group-hover:text-[#1677FF] shrink-0 mt-0.5 transition-colors duration-200" />
                      <span className="group-hover:text-[#1677FF] transition-colors duration-200">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Application Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 sticky top-28 space-y-6 shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                <div>
                  <span className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider block mb-1">
                    FAST-TRACK APPLICATION
                  </span>
                  <h3 className="text-xl font-bold text-[#0B1220]">
                    Apply for this Position
                  </h3>
                  <p className="text-xs text-[#2B384E] mt-1">
                    Direct review by senior engineering leads within 48 business hours.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-[#1677FF]" />
                    <h4 className="text-base font-bold text-[#0B1220]">Application Received</h4>
                    <p className="text-xs text-[#2B384E]">
                      Thank you for applying to TechFusion. Our team will review your profile and reach out via email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-[#0B1220] mb-1.5 font-bold">FULL NAME *</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                        placeholder="John Doe" 
                      />
                    </div>

                    <div>
                      <label className="block text-[#0B1220] mb-1.5 font-bold">EMAIL ADDRESS *</label>
                      <input 
                        required 
                        type="email" 
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                        placeholder="john@example.com" 
                      />
                    </div>

                    <div>
                      <label className="block text-[#0B1220] mb-1.5 font-bold">PHONE NUMBER *</label>
                      <input 
                        required 
                        type="tel" 
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>

                    <div>
                      <label className="block text-[#0B1220] mb-1.5 font-bold">RESUME URL (DRIVE / DROPBOX / LINKEDIN) *</label>
                      <input 
                        required 
                        type="url" 
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                        placeholder="https://drive.google.com/..." 
                      />
                    </div>

                    <div>
                      <label className="block text-[#0B1220] mb-1.5 font-bold">GITHUB / PORTFOLIO (OPTIONAL)</label>
                      <input 
                        type="url" 
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                        placeholder="https://github.com/..." 
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" className="w-full" size="default">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default JobDetails;
