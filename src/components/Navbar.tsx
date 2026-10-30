import React, { useState } from 'react';

interface NavbarProps {
  onOpenBooking: (serviceType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4 lg:gap-6">
          
          {/* Brand Logo & Wordmark */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group" aria-label="Nordic Air home">
            <img
              src="/nordic-logo.jpeg"
              alt="Nordic Air logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-sm ring-2 ring-[#39A9EC]/50 group-hover:ring-[#39A9EC] transition-all duration-200"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                <span className="text-[#042B60]">NORDIC</span>
                <span className="text-[#088DD4] ml-1.5 sm:ml-2">AIR</span>
              </span>
              <span className="hidden min-[390px]:block lg:hidden xl:block text-[8px] tracking-[0.18em] text-slate-600 font-semibold uppercase mt-1.5 sm:text-[9px] sm:tracking-[0.28em]">
                Cool Comfort. Built Around You.
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] xl:text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-[#088DD4] transition-colors whitespace-nowrap">
              Services
            </a>
            <a href="#sizing" className="hover:text-[#088DD4] transition-colors whitespace-nowrap">
              AC Sizing
            </a>
            <a href="#case-studies" className="hover:text-[#088DD4] transition-colors whitespace-nowrap">
              Case Studies
            </a>
            <a href="#why-nordic" className="hidden xl:block hover:text-[#088DD4] transition-colors whitespace-nowrap">
              Why Us
            </a>
            <a href="#areas" className="hover:text-[#088DD4] transition-colors whitespace-nowrap">
              Areas We Cover
            </a>
            <a href="#guide" className="hidden xl:block hover:text-[#088DD4] transition-colors whitespace-nowrap">
              Efficiency Guide
            </a>
            <a href="#faq" className="hover:text-[#088DD4] transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Direct Phone & Primary CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href="tel:0319403388"
              className="hidden min-[1400px]:flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#042B60] bg-[#39A9EC]/5 border border-slate-200 hover:border-[#39A9EC]/30 hover:bg-[#39A9EC]/10 transition-all whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#39A9EC] animate-soft-pulse" />
              <span className="text-slate-600 font-normal">Call:</span>
              <span className="font-mono tracking-tight font-bold">031 940 3388</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-white bg-[#042B60] hover:bg-[#088DD4] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="hidden min-[360px]:block px-2.5 py-1.5 text-xs font-bold text-white bg-[#042B60] hover:bg-[#088DD4] rounded-lg"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-[#39A9EC]/5 border border-slate-200 hover:bg-[#39A9EC]/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 font-medium text-sm text-slate-600">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Our Services
            </a>
            <a
              href="#sizing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              AC Sizing Calculator
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Case Studies
            </a>
            <a
              href="#why-nordic"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Why Choose Us
            </a>
            <a
              href="#areas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Areas We Cover
            </a>
            <a
              href="#guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Efficiency Guide
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#088DD4]"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <a
              href="tel:0319403388"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#042B60] bg-[#39A9EC]/5 border border-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#39A9EC]" />
              <span>031 940 3388 (Emergency Help)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-sm font-bold text-white bg-[#042B60] hover:bg-[#088DD4] rounded-lg text-center shadow-sm"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
