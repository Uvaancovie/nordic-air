import React, { useState } from 'react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

interface HeroProps {
  onOpenBooking: (serviceType?: string, notes?: string) => void;
  onEmergencyClick: () => void;
}

const PRICE_BY_BTU: Record<string, string> = {
  '9,000 BTU': 'R6,700',
  '12,000 BTU': 'R8,900',
  '18,000 BTU': 'R13,500',
  '24,000 BTU': 'R18,900',
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onEmergencyClick }) => {
  const [roomSize, setRoomSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hasHeavySun, setHasHeavySun] = useState(false);

  let btu = '12,000 BTU';
  let desc = 'Best for main bedrooms and medium lounges (up to 28m²)';

  if (roomSize === 'small') {
    if (hasHeavySun) {
      btu = '12,000 BTU';
      desc = 'Extra cooling power for sunny rooms and top floors (up to 20m²)';
    } else {
      btu = '9,000 BTU';
      desc = 'Ideal for standard bedrooms and home studies (up to 18m²)';
    }
  } else if (roomSize === 'medium') {
    if (hasHeavySun) {
      btu = '18,000 BTU';
      desc = 'Strong cooling for warm living rooms with glass doors';
    } else {
      btu = '12,000 BTU';
      desc = 'Comfortably cools main bedrooms and medium living areas';
    }
  } else {
    if (hasHeavySun) {
      btu = '24,000 BTU';
      desc = 'Heavy-duty cooling for large open-plan living spaces';
    } else {
      btu = '18,000 BTU';
      desc = 'Great for large lounges and open-plan dining rooms';
    }
  }

  const price = PRICE_BY_BTU[btu] ?? 'R6,700';

  const handleUseSize = () => {
    const sizeLabel = roomSize === 'small' ? 'Small room' : roomSize === 'medium' ? 'Medium room' : 'Large room';
    const notes = `Selected with Sizing Tool: ${sizeLabel} (${hasHeavySun ? 'Heavy Sun / Top Floor' : 'Standard Sun'}) - ${btu} Inverter. From ${price} supplied and standard installed.`;
    onOpenBooking('Installation', notes);
  };

  const whatsappUrl = generateWhatsAppQuoteUrl({
    serviceType: 'Installation',
    suburb: 'Umhlanga',
    details: `Quick Sizing Tool: ${roomSize === 'small' ? 'Small room' : roomSize === 'medium' ? 'Medium room' : 'Large room'} (${hasHeavySun ? 'Heavy Sun / Top Floor' : 'Standard Sun'}) - Recommended ${btu} Inverter (from ${price}).`,
    isUrgent: false,
  });

  const sizeOptions: Array<{ id: 'small' | 'medium' | 'large'; label: string }> = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-white">
      {/* Ambient brand glows */}
      <div className="absolute top-0 right-1/4 w-[28rem] h-[28rem] bg-[#2563EB]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E11D2E]/[0.07] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Headline and Value */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#E11D2E]">
              Durban <span className="text-[#E11D2E]/60">•</span> Supply &amp; Install
            </div>

            <h1 className="font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-[#2563EB] text-[2.75rem] sm:text-6xl lg:text-7xl text-balance">
              <span className="block">Your comfort.</span>
              <span className="block">Our climate.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Inverter air conditioning from trusted brands, professionally installed across Durban.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              <span>Fixed written quotes</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span>5-year warranty</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span>Coastal anti-rust</span>
            </div>
          </div>

          {/* Right Column: Product Card, Price & Primary CTA */}
          <div className="lg:col-span-5 w-full">
            <div className="mx-auto max-w-md w-full">

              {/* Product panel */}
              <div className="rounded-[2rem] bg-white border border-slate-200 p-5 sm:p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
                    Inverter Mid-Wall Split
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#E11D2E] animate-soft-pulse" aria-hidden="true" />
                </div>

                {/* Light inner card with AC unit illustration */}
                <div className="mt-5 rounded-[1.4rem] bg-[#EFF4FF] h-40 sm:h-48 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/70 to-transparent" aria-hidden="true" />
                  <svg
                    viewBox="0 0 280 100"
                    className="relative w-[86%] max-w-[280px] drop-shadow-[0_10px_18px_rgba(15,30,60,0.18)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#DCE4F1" />
                      </linearGradient>
                    </defs>
                    <rect x="6" y="16" width="268" height="70" rx="22" fill="url(#ac-body)" stroke="#C6D2E5" strokeWidth="1.2" />
                    <rect x="24" y="52" width="232" height="3" rx="1.5" fill="#D9E1EE" />
                    <rect x="24" y="66" width="232" height="8" rx="4" fill="#C2CFE2" />
                    <circle cx="250" cy="34" r="4" fill="#E11D2E" />
                  </svg>
                </div>

                {/* Room sizing controls */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRoomSize(option.id)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        roomSize === option.id
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-[#2563EB]/[0.05] text-slate-600 border-slate-200 hover:bg-[#2563EB]/[0.08]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setHasHeavySun(!hasHeavySun)}
                  className={`mt-2 w-full py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    hasHeavySun
                      ? 'bg-[#2563EB]/15 text-[#2563EB] border-[#2563EB]/40'
                      : 'bg-[#2563EB]/[0.05] text-slate-600 border-slate-200 hover:bg-[#2563EB]/[0.08]'
                  }`}
                >
                  {hasHeavySun ? 'Heavy afternoon sun — included' : 'Gets strong afternoon sun?'}
                </button>

                <p className="mt-3 text-[11px] leading-relaxed text-slate-600">
                  {desc}
                </p>
              </div>

              {/* Price block */}
              <div className="mt-7 px-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-600">
                  From
                </span>
                <div className="mt-1 text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#2563EB] leading-none">
                  {price}
                </div>
                <div className="mt-2.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  {btu} <span className="text-[#E11D2E]">•</span> Supplied &amp; Standard Installed
                </div>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleUseSize}
                className="group mt-6 w-full rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-4 text-left transition-colors shadow-[0_18px_40px_-20px_rgba(37,99,235,0.55)] cursor-pointer"
              >
                <span className="block text-base font-extrabold uppercase tracking-tight text-[#2563EB]">
                  Book your installation
                </span>
                <span className="mt-1 block text-xs text-white/80">
                  Message us for availability, sizing advice and a quote.
                </span>
              </button>

              <p className="mt-4 text-[11px] text-slate-600">
                Standard installation conditions apply <span className="text-slate-600">•</span> Prices subject to availability
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
                >
                  WhatsApp this sizing
                </a>
                <button
                  type="button"
                  onClick={onEmergencyClick}
                  className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" aria-hidden="true" />
                  Urgent repair? Call 031 940 3388
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
