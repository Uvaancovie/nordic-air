import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1322] text-white pt-16 pb-12 border-t border-[#1B5299]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid (No Icons, No Emojis, No Prices) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/nordic-logo_9359fca8.jpeg"
                alt="Nordic Air Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D32626]/40 shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                <span className="text-[#38BDF8]">NORDIC</span>
                <span className="text-[#D32626] ml-1">AIR</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Cool, quiet air conditioning for your home. We install, repair, and service air conditioners across Durban, Umhlanga, and Ballito with honest pricing and clean workmanship.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="text-sky-300">Licensed Technicians</span>
              <span className="mx-2">·</span>
              <span>Fully Insured</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  New Installations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Emergency Repairs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Annual Servicing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Offices & Shops
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  Efficiency Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Areas Covered
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#areas" className="hover:text-white transition-colors">
                  Umhlanga & Gateway
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white transition-colors">
                  Durban North & Virginia
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white transition-colors">
                  Ballito & Salt Rock
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white transition-colors">
                  Morningside & Berea
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white transition-colors">
                  Westville & Hillcrest
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact (Pure typography) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <a
                href="tel:0319403388"
                className="flex items-center gap-2 text-white font-mono font-semibold hover:text-sky-300 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#D32626]" />
                <span>031 940 3388</span>
              </a>

              <div className="text-slate-400">
                Ridge Boulevard, Umhlanga, Durban
              </div>

              <div className="text-slate-400">
                service@nordicair.co.za
              </div>

              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400 font-mono">
                  24/7 Emergency Repairs
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Nordic Air. All rights reserved. Durban, KwaZulu-Natal.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">
              Licensed & Insured
            </span>
            <span className="text-[11px] text-slate-400">
              Durban, South Africa
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
