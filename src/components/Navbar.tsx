import React, { useState } from 'react';

interface NavbarProps {
  onOpenBooking: (serviceType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Logo & Wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/assets/aistudio/nordic-logo_9359fca8.jpeg"
              alt="Nordic Air Logo"
              className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-[#D32626]/30 group-hover:ring-[#D32626] transition-all duration-200"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none">
                <span className="text-[#1B5299]">NORDIC</span>
                <span className="text-[#D32626] ml-1">AIR</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#64748B] font-semibold uppercase mt-1">
                Durban · Air Conditioning
              </span>
            </div>
          </a>

          {/* Navigation Links (clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#475569]">
            <a href="#services" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              Services
            </a>
            <a href="#case-studies" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              Case Studies
            </a>
            <a href="#why-nordic" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              Why Us
            </a>
            <a href="#areas" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              Areas We Cover
            </a>
            <a href="#guide" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              Efficiency Guide
            </a>
            <a href="#faq" className="hover:text-[#1B5299] transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Direct Phone & Primary CTA (Pure text, no icons, no emojis) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:0319403388"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#0A1322] bg-white border border-slate-200 hover:border-red-300 shadow-xs transition-all whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#D32626]" />
              <span className="text-slate-500 font-normal">Call:</span>
              <span className="font-mono tracking-tight font-bold">031 940 3388</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button (Text based) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1B5299] rounded-lg"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-medium text-sm text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Our Services
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Case Studies
            </a>
            <a
              href="#why-nordic"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Why Choose Us
            </a>
            <a
              href="#areas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Areas We Cover
            </a>
            <a
              href="#guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Efficiency Guide
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1B5299]"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:0319403388"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#0A1322] bg-slate-100 border border-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#D32626]" />
              <span>031 940 3388 (Emergency Help)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-lg text-center shadow-sm"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
