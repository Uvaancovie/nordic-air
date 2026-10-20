import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F1E2E] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid (No Icons, No Emojis, No Prices) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                NORDIC<span className="text-[#38BDF8] ml-1">AIR</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EF4444] ml-1.5 align-middle" />
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
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
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
