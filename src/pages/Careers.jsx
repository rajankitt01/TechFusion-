import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { jobs, jobDepartments, jobTypes } from '../data/jobs';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Laptop, Award, Users } from 'lucide-react';

export function Careers() {
  const [department, setDepartment] = useState('All');
  const [type, setType] = useState('All');

  const filteredJobs = jobs.filter(job => {
    const matchesDept = department === 'All' || job.department === department;
    const matchesType = type === 'All' || job.jobType === type;
    return matchesDept && matchesType;
  });

  const perks = [
    {
      icon: Laptop,
      title: "Deep Work Culture",
      description: "Minimal meetings, zero micromanagement, and generous uninterrupted blocks for actual software engineering."
    },
    {
      icon: Award,
      title: "Transparent Growth & Pay",
      description: "Market-leading compensation, bi-annual performance evaluations, and clear engineering progression bands."
    },
    {
      icon: Users,
      title: "Flexible Hybrid Setup",
      description: "Work from our modern Gurugram office or remotely across India. We measure code output, not desk hours."
    }
  ];

  return (
    <PageWrapper>
      {/* Editorial Hero */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-10 md:py-12 lg:py-14 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF3FF] border border-[#C9D7F5] text-xs font-mono font-bold tracking-wider text-[#0B1220] mb-4 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"></span>
              <span>ENGINEERING CAREERS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-4">
              Build Production Systems with High Engineering Standards
            </h1>

            <p className="text-base sm:text-lg text-[#2B384E] leading-relaxed">
              We are an engineering-driven team building mission-critical products for global businesses. If you value clean architecture, automated testing, and direct ownership, you'll thrive at TechFusion.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Culture Pillars */}
      <section className="py-10 md:py-12 lg:py-14 bg-[#F1F4F8] border-b border-[#E2E7EF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] p-6 space-y-2.5 transition-all duration-200 group shadow-[0_4px_20px_rgba(17,24,39,0.04)]"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center justify-center text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-[#2B384E] leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="pt-10 md:pt-12 lg:pt-14 pb-12 md:pb-14 lg:pb-16 bg-[#F7F8FA]" id="open-positions">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 text-left">
            <div>
              <span className="text-xs font-mono text-[#0B1220] font-bold tracking-wider uppercase block mb-2">
                ACTIVE OPENINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220]">
                Open Engineering & Design Positions
              </h2>
            </div>

            {/* Filter Dropdowns */}
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="px-3.5 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E7EF] text-xs font-mono text-[#0B1220] font-medium focus:outline-none focus:border-[#1677FF] shadow-2xs"
              >
                <option value="All">All Departments</option>
                {jobDepartments.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-3.5 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E7EF] text-xs font-mono text-[#0B1220] font-medium focus:outline-none focus:border-[#1677FF] shadow-2xs"
              >
                <option value="All">All Job Types</option>
                {jobTypes.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4 text-left">
            {filteredJobs.length === 0 ? (
              <div className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-12 text-center text-[#2B384E]">
                <p>No positions match your selected filters. Check back soon or send your resume to rajankitt01@gmail.com.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#BFDBFE] hover:bg-[#F8FAFF] hover:shadow-[0_4px_20px_rgba(17,24,39,0.06)] transition-all duration-200 group shadow-[0_4px_20px_rgba(17,24,39,0.04)]"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EEF3FF] border border-[#C9D7F5] text-[#0B1220] font-bold">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-mono text-[#0B1220] font-medium">
                        • {job.jobType}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200">
                      {job.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2B384E] max-w-2xl leading-relaxed">
                      {job.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#2B384E] pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200" />
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/careers/${job.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0B1220] text-[#FFFFFF] hover:bg-[#1677FF] transition-all duration-200 shrink-0 w-full md:w-auto justify-center shadow-xs group/btn"
                  >
                    <span>View Role & Apply</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}

export default Careers;
