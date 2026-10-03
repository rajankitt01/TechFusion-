import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowRight, Code2, Server, Smartphone, Cpu, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const [activeTab, setActiveTab] = useState('architecture');

  const techBadges = [
    { name: "React 19 & Next.js", icon: Code2 },
    { name: "Node.js & Python", icon: Server },
    { name: "PostgreSQL & Redis", icon: Cpu },
    { name: "Flutter & React Native", icon: Smartphone },
    { name: "AWS & Docker CI/CD", icon: ShieldCheck },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] tech-subtle-grid pt-12 md:pt-16 pb-16 lg:pb-20 border-b border-[#E2E7EF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Top Understated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF3FF] border border-[#C9D7F5] text-xs font-mono text-[#0B1220] mb-6 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-[#1677FF]"></span>
          <span className="text-[#0B1220] font-bold">TechFusion Engineering Studio</span>
          <span className="text-[#596579]">•</span>
          <span className="text-[#2B384E] font-medium">Full-Cycle Digital Delivery</span>
        </div>

        {/* Main Grid: Value Proposition + Architecture Showcase */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0B1220] leading-[1.18]">
              We Architect and Build Resilient Software for Ambitious Enterprises
            </h1>

            <p className="text-base text-[#2B384E] leading-relaxed max-w-xl font-normal">
              From enterprise web platforms and high-concurrency mobile products to custom CRM engines and business automation, we translate complex functional requirements into dependable, production-ready software.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/contact" className="group gap-2">
                  <span>Schedule Technical Discovery</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio" className="group">
                  <span>View Production Work</span>
                </Link>
              </Button>
            </div>

            {/* Credibility Anchors */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-[#E2E7EF] text-left">
              <div>
                <p className="text-2xl font-bold font-mono text-[#0B1220]">100%</p>
                <p className="text-xs text-[#2B384E] font-medium mt-0.5">Code Ownership Transfer</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-[#1677FF]">99.98%</p>
                <p className="text-xs text-[#2B384E] font-medium mt-0.5">Uptime Architecture</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-[#0B1220]">Direct</p>
                <p className="text-xs text-[#2B384E] font-medium mt-0.5">Senior Engineer Access</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Craft Architecture Showcase Panel */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-[#E2E7EF] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(11,18,32,0.04)] overflow-hidden">
              
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#F1F4F8] border-b border-[#E2E7EF] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]/80"></div>
                  <div className="h-3 w-3 rounded-full bg-[#F59E0B]/80"></div>
                  <div className="h-3 w-3 rounded-full bg-[#10B981]/80"></div>
                  <span className="ml-2 text-xs font-mono font-medium text-[#2B384E]">techfusion-system-console.v2</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#1677FF] bg-[#EEF3FF] px-2.5 py-0.5 rounded border border-[#C9D7F5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF] animate-pulse"></span>
                  <span>PRODUCTION ONLINE</span>
                </div>
              </div>

              {/* Console Tabs */}
              <div className="flex border-b border-[#E2E7EF] bg-[#FFFFFF] px-2 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-4 py-2.5 transition-colors duration-200 border-b-2 ${
                    activeTab === 'architecture'
                      ? 'border-[#1677FF] text-[#0B1220] font-bold bg-[#F8FAFF]'
                      : 'border-transparent text-[#2B384E] hover:text-[#1677FF]'
                  }`}
                >
                  Architecture Overview
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-4 py-2.5 transition-colors duration-200 border-b-2 ${
                    activeTab === 'api'
                      ? 'border-[#1677FF] text-[#0B1220] font-bold bg-[#F8FAFF]'
                      : 'border-transparent text-[#2B384E] hover:text-[#1677FF]'
                  }`}
                >
                  Data Pipeline & SLA
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2.5 transition-colors duration-200 border-b-2 ${
                    activeTab === 'security'
                      ? 'border-[#1677FF] text-[#0B1220] font-bold bg-[#F8FAFF]'
                      : 'border-transparent text-[#2B384E] hover:text-[#1677FF]'
                  }`}
                >
                  Security & Compliance
                </button>
              </div>

              {/* Console Tab Content */}
              <div className="p-6 text-left space-y-4">
                {activeTab === 'architecture' && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#2B384E] font-medium">Frontend Layer</span>
                          <span className="text-[10px] font-mono text-[#1677FF] bg-[#EEF3FF] px-1.5 rounded font-bold">98/100 Vitals</span>
                        </div>
                        <p className="text-sm font-bold text-[#0B1220]">React 19 / Next.js</p>
                        <p className="text-[11px] text-[#596579] mt-1 font-mono">Edge Cached via Global CDN</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#2B384E] font-medium">Backend Core</span>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 rounded font-bold">&lt; 35ms p99</span>
                        </div>
                        <p className="text-sm font-bold text-[#0B1220]">Node.js & Python API</p>
                        <p className="text-[11px] text-[#596579] mt-1 font-mono">Asynchronous Microservices</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#111827] text-white font-mono text-xs space-y-1.5">
                      <div className="text-[#93C5FD] flex items-center gap-2 font-semibold">
                        <Terminal className="h-3.5 w-3.5 text-[#1677FF]" />
                        <span>System Health Diagnostic</span>
                      </div>
                      <div className="text-emerald-400">✓ Database Cluster (PostgreSQL + Redis): Synchronized</div>
                      <div className="text-emerald-400">✓ Automated CI/CD GitHub Actions: Passing Tests</div>
                      <div className="text-[#D1D5DB]">✓ Multi-Region SSL & DDoS Mitigation: Enforced</div>
                    </div>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                        <p className="text-xs text-[#2B384E] font-medium">Avg Latency</p>
                        <p className="text-lg font-bold font-mono text-[#1677FF] mt-1">24ms</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                        <p className="text-xs text-[#2B384E] font-medium">Availability</p>
                        <p className="text-lg font-bold font-mono text-emerald-700 mt-1">99.98%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                        <p className="text-xs text-[#2B384E] font-medium">Encryption</p>
                        <p className="text-lg font-bold font-mono text-[#0B1220] mt-1">AES-256</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] space-y-1">
                      <p className="text-xs font-bold text-[#0B1220]">Built-In Observability & Analytics</p>
                      <p className="text-xs text-[#2B384E] leading-relaxed">
                        Every system is engineered with distributed tracing, error boundary tracking, and real-time operational dashboard instrumentation.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] flex items-start gap-3 hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                      <CheckCircle2 className="h-5 w-5 text-[#1677FF] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[#0B1220]">Role-Based Access Control (RBAC)</p>
                        <p className="text-xs text-[#2B384E] mt-0.5">Granular user roles, cryptographically signed JWT tokens, and OAuth2 integration.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F1F4F8] border border-[#E2E7EF] flex items-start gap-3 hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[#0B1220]">Automated Disaster Recovery</p>
                        <p className="text-xs text-[#2B384E] mt-0.5">Automated incremental cloud backups with tested point-in-time recovery pipelines.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Console Footer */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#596579] border-t border-[#E2E7EF] font-mono">
                  <span>DEPLOYMENT: PRODUCTION</span>
                  <span>REGION: ASIA-SOUTH (MUMBAI)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Technology Stack Strip */}
        <div className="mt-14 pt-8 border-t border-[#E2E7EF]">
          <p className="text-xs font-mono font-bold text-[#0B1220] uppercase tracking-wider mb-4 text-center lg:text-left">
            Core Production Technologies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {techBadges.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#E2E7EF] text-[#0B1220] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] transition-all duration-200 shadow-[0_4px_20px_rgba(11,18,32,0.04)] cursor-default"
                >
                  <Icon className="h-4 w-4 text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200 shrink-0" />
                  <span className="text-xs font-bold truncate group-hover:text-[#1677FF] transition-colors duration-200">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
