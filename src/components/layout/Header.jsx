import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../common/Logo";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Industries", href: "/industries" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Reviews", href: "/reviews" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md border-b border-[#E2E7EF]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3.5 py-1.5 text-sm font-bold rounded-md transition-colors duration-200 relative ${
                    isActive
                      ? "text-[#000000] bg-black/5"
                      : "text-[#000000] hover:text-[#1677FF] hover:bg-black/5"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#000000] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#1677FF] transition-all duration-200 shadow-xs active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="p-2 rounded-lg border border-[#000000]/15 bg-transparent text-[#000000] hover:text-[#1677FF] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#1677FF] transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#FFFFFF] border-l border-[#E2E7EF] p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl text-[#000000]"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#E2E7EF]">
                  <Logo size="sm" onClick={() => setMobileMenuOpen(false)} />
                  <button
                    type="button"
                    className="p-1.5 rounded-lg border border-[#E2E7EF] text-[#000000] hover:text-[#1677FF] hover:bg-black/5 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="py-5 space-y-1">
                  {navLinks.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200 ${
                          isActive
                            ? "bg-black/5 text-[#000000]"
                            : "text-[#000000] hover:text-[#1677FF] hover:bg-black/5"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Info */}
              <div className="pt-5 border-t border-[#E2E7EF] space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#1677FF] transition-all duration-200 shadow-xs"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>

                <div className="space-y-2 text-xs text-[#2B384E] pt-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#1677FF]" />
                    <span className="text-[#000000] font-semibold">+91 93416 60370</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#1677FF]" />
                    <span className="text-[#000000] font-semibold">rajankitt01@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#1677FF] shrink-0 mt-0.5" />
                    <span className="text-[#000000] font-semibold">Sector 39, Gurugram, Haryana</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
