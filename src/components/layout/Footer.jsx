import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "../common/Logo";

export function Footer() {
  return (
    <footer 
      className="relative bg-[whitesmoke] border-t border-[#E2E8F0] text-[#475569] text-sm overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#E2E8F0]">
          
          {/* Brand & Value Proposition */}
          <div className="lg:col-span-2 space-y-5 text-left">
            <Logo size="md" />
            
            <p className="text-[#475569] leading-relaxed max-w-sm text-sm">
              TechFusion is an enterprise software engineering studio. We architect and build resilient web platforms, mobile systems, and intelligent automated workflows for fast-growing companies worldwide.
            </p>

            {/* Production Systems Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.25)] text-xs shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span 
                  className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"
                  style={{ boxShadow: "0 0 8px #10B981" }}
                ></span>
              </span>
              <span className="font-mono text-[11px] text-[#059669] font-semibold tracking-wide">
                Production Systems Operational
              </span>
            </div>
          </div>

          {/* Core Engineering Services */}
          <div className="text-left">
            <h3 className="text-[13px] font-semibold text-[#0B1220] tracking-[0.08em] uppercase mb-4 font-mono">
              Engineering
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  to="/services/website-development" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Web Applications
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/mobile-app-development" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Mobile Products (iOS & Android)
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/ecommerce" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  E-Commerce Systems
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/crm" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Admin & Enterprise CRM
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/business-automation" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Cloud Workflow Automation
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/ai-integration" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  AI & Intelligent APIs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Case Studies */}
          <div className="text-left">
            <h3 className="text-[13px] font-semibold text-[#0B1220] tracking-[0.08em] uppercase mb-4 font-mono">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  to="/about" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  About the Studio
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link 
                  to="/industries" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Industries Served
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="inline-flex items-center gap-2 text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1 group"
                >
                  <span>Careers</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/20 font-medium">
                    Hiring
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/reviews" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  Engineering Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Office & Direct Contact */}
          <div className="text-left">
            <h3 className="text-[13px] font-semibold text-[#0B1220] tracking-[0.08em] uppercase mb-4 font-mono">
              Headquarters
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#1677FF] shrink-0 mt-0.5" />
                <span className="text-[#475569] leading-snug">
                  Tower A, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#1677FF] shrink-0" />
                <a 
                  href="tel:+919341660370" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  +91 93416 60370
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#1677FF] shrink-0" />
                <a 
                  href="mailto:rajankitt01@gmail.com" 
                  className="inline-block text-[#475569] hover:text-[#1677FF] transition-all duration-200 hover:translate-x-1"
                >
                  rajankitt01@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 hover:gap-[10px] text-xs font-semibold text-[#1677FF] hover:text-[#2563EB] transition-all duration-200 group"
                >
                  <span>Request Project Estimate</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Security Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#10B981]" />
            <span>© {new Date().getFullYear()} TechFusion Global Software. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link 
              to="/privacy" 
              className="text-[#64748B] hover:text-[#0B1220] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-[#64748B] hover:text-[#0B1220] transition-colors duration-200"
            >
              Terms of Engagement
            </Link>
            <Link 
              to="/contact" 
              className="text-[#64748B] hover:text-[#0B1220] transition-colors duration-200"
            >
              Security Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
