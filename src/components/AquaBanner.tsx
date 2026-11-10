import React from 'react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

export const AquaBanner: React.FC = () => {
  const whatsAppUrl = generateWhatsAppQuoteUrl({
    serviceType: 'Assessment',
    suburb: 'Durban Metro',
    details: 'Inquiring via top aqua banner for free on-site assessment and written quote.',
    isUrgent: false,
  });

  return (
    <div className="bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0EA5E9] text-white text-xs py-2 px-4 shadow-sm border-b border-[#38BDF8]/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="font-mono font-bold uppercase tracking-wider text-[10px] bg-white/20 border border-white/30 px-2 py-0.5 rounded-md text-white">
            DURBAN METRO
          </span>
          <span className="font-medium text-white/95">
            Free On-Site Written Quotations &amp; Same-Day Rapid Aircon Dispatch
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-[11px]">
          <a
            href="tel:0319403388"
            className="flex items-center gap-1.5 font-semibold text-white hover:text-sky-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#E0F2FE] ring-2 ring-white/50" />
            <span className="font-mono">031 940 3388</span>
          </a>

          <span className="text-white/40">|</span>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-sky-100 underline decoration-white/40 hover:decoration-white transition-all"
          >
            WhatsApp Dispatch
          </a>
        </div>
      </div>
    </div>
  );
};
