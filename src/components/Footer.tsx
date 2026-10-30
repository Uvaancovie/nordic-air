import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F3F9FF] text-[#042B60] pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">

          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight leading-none">
                <span className="text-[#042B60]">NORDIC</span>
                <span className="text-[#088DD4] ml-2">AIR</span>
              </span>
              <span className="text-[9px] tracking-[0.28em] text-slate-600 font-semibold uppercase mt-1.5">
                Cool Comfort. Built Around You.
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Cool, quiet air conditioning for your home. We install, repair, and service air conditioners across Durban, Umhlanga, and Ballito with honest pricing and clean workmanship.
            </p>

            <div className="pt-2 text-xs text-slate-600">
              <span className="text-[#042B60]">Licensed Technicians</span>
              <span className="mx-2">·</span>
              <span>Fully Insured</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#088DD4] transition-colors">
                  New Installations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#088DD4] transition-colors">
                  Emergency Repairs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#088DD4] transition-colors">
                  Annual Servicing
                </a>
              </li>
              <li>
                <a href="#sizing" className="hover:text-[#088DD4] transition-colors">
                  AC Sizing Calculator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#088DD4] transition-colors">
                  Offices & Shops
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-[#088DD4] transition-colors">
                  Efficiency Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Areas Covered
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#areas" className="hover:text-[#088DD4] transition-colors">
                  Umhlanga & Gateway
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-[#088DD4] transition-colors">
                  Durban North & Virginia
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-[#088DD4] transition-colors">
                  Ballito & Salt Rock
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-[#088DD4] transition-colors">
                  Morningside & Berea
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-[#088DD4] transition-colors">
                  Westville & Hillcrest
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <a
                href="tel:0319403388"
                className="flex items-center gap-2 text-[#042B60] font-mono font-semibold hover:text-[#088DD4] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#39A9EC]" />
                <span>031 940 3388</span>
              </a>

              <div className="text-slate-600">
                Ridge Boulevard, Umhlanga, Durban
              </div>

              <div className="text-slate-600">
                service@nordicair.co.za
              </div>

              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[#39A9EC]/5 border border-slate-200 text-[10px] text-slate-600 font-mono">
                  24/7 Emergency Repairs
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <div>
            © {new Date().getFullYear()} Nordic Air. All rights reserved. Durban, KwaZulu-Natal.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-600">
              Licensed & Insured
            </span>
            <span className="text-[11px] text-slate-600">
              Durban, South Africa
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
