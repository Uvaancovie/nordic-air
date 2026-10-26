import React, { useState } from 'react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

interface HeroProps {
  onOpenBooking: (serviceType?: string, notes?: string) => void;
  onEmergencyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onEmergencyClick }) => {
  const [roomSize, setRoomSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hasHeavySun, setHasHeavySun] = useState(false);

  let btu = '12,000 BTU';
  let desc = 'Best for main bedrooms and medium lounges (up to 28m²)';
  let saving = 'Inverter technology cuts electricity use by over half';

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
    // large
    if (hasHeavySun) {
      btu = '24,000 BTU';
      desc = 'Heavy-duty cooling for large open-plan living spaces';
    } else {
      btu = '18,000 BTU';
      desc = 'Great for large lounges and open-plan dining rooms';
    }
  }

  const handleUseSize = () => {
    const sizeLabel = roomSize === 'small' ? 'Small room' : roomSize === 'medium' ? 'Medium room' : 'Large room';
    const notes = `Selected with Sizing Tool: ${sizeLabel} (${hasHeavySun ? 'Heavy Sun / Top Floor' : 'Standard Sun'}) - ${btu} Inverter.`;
    onOpenBooking('Installation', notes);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#E0F2FE] via-[#EDF7FC] to-[#F8FAFC]">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Value */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#475569]">
              <span className="text-[#0F1E2E] font-semibold">DURBAN AND SURROUNDS</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-[#0077D4]">Licensed Technicians</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                Same-Day Emergency Service
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F1E2E] leading-[1.1] text-balance">
              Cool, quiet air conditioning for your home.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
              We install, repair, and service air conditioners across Durban, Umhlanga, and Ballito. Clear written quotations, tidy work with no mess, and fast help when your unit stops cooling.
            </p>

            {/* Action Buttons (No icons, no emojis) */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking('Installation')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0077D4] hover:bg-[#0062b0] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Get a Free Quote
              </button>

              <button
                type="button"
                onClick={onEmergencyClick}
                className="px-6 py-3.5 text-sm font-semibold text-[#0F1E2E] bg-white/90 hover:bg-white border border-slate-200 hover:border-red-300 rounded-xl shadow-xs transition-all duration-200 group cursor-pointer flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>Urgent Repair Help</span>
                <span className="text-[11px] font-mono text-[#EF4444] font-medium bg-red-50 px-1.5 py-0.5 rounded ml-1">
                  24/7 Callout
                </span>
              </button>
            </div>

            {/* Guarantees (No icons, no prices) */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-[#0F1E2E] block text-sm">Fixed Written Quotes</span>
                No hidden costs or extras
              </div>
              <div>
                <span className="font-semibold text-[#0F1E2E] block text-sm">5-Year Warranty</span>
                On all new installations
              </div>
              <div>
                <span className="font-semibold text-[#0F1E2E] block text-sm">Resists Sea Rust</span>
                Built to handle Durban air
              </div>
            </div>
          </div>

          {/* Right Column: Neat Sizing Tool (No icons, no emojis, NO prices) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md w-full">
              <div className="neo-card rounded-3xl p-6 sm:p-7 glass-panel relative overflow-hidden shadow-md">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F1E2E] leading-tight">
                      Quick AC Sizing Tool
                    </h3>
                    <p className="text-[11px] text-slate-500">Find the right unit for your room</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#0077D4] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                    Room Sizer
                  </span>
                </div>

                <div className="py-4 space-y-4">
                  {/* Step 1: Room Size */}
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                      1. Room Size
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setRoomSize('small')}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          roomSize === 'small'
                            ? 'bg-[#0077D4] text-white border-[#0077D4] shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold">Small</div>
                        <div className={`text-[10px] ${roomSize === 'small' ? 'text-sky-100' : 'text-slate-400'}`}>
                          Bedroom
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRoomSize('medium')}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          roomSize === 'medium'
                            ? 'bg-[#0077D4] text-white border-[#0077D4] shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold">Medium</div>
                        <div className={`text-[10px] ${roomSize === 'medium' ? 'text-sky-100' : 'text-slate-400'}`}>
                          Master Bed
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRoomSize('large')}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          roomSize === 'large'
                            ? 'bg-[#0077D4] text-white border-[#0077D4] shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold">Large</div>
                        <div className={`text-[10px] ${roomSize === 'large' ? 'text-sky-100' : 'text-slate-400'}`}>
                          Lounge
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Sun Exposure */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-xs font-medium text-slate-700">
                      Gets strong afternoon sun or sea glare?
                    </span>
                    <button
                      type="button"
                      onClick={() => setHasHeavySun(!hasHeavySun)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        hasHeavySun
                          ? 'bg-[#0077D4] text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {hasHeavySun ? 'Yes (Sun)' : 'Normal'}
                    </button>
                  </div>

                  {/* Recommendation Box (NO prices, pure technical recommendation) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F1E2E] to-[#1A334E] text-white shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300">
                          Recommended Sizing
                        </span>
                        <div className="text-2xl font-bold font-mono tracking-tight text-white mt-0.5">
                          {btu}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-slate-400 block">Assessment</span>
                        <span className="text-xs font-semibold text-emerald-300">Free On-Site</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2">
                      {desc}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-sky-200">
                      {saving}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleUseSize}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#0077D4] hover:bg-[#0062b0] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  >
                    Book Free Assessment For This Size
                  </button>

                  <a
                    href={generateWhatsAppQuoteUrl({
                      serviceType: 'Installation',
                      suburb: 'Umhlanga',
                      details: `Quick Sizing Tool: ${roomSize === 'small' ? 'Small room' : roomSize === 'medium' ? 'Medium room' : 'Large room'} (${hasHeavySun ? 'Heavy Sun / Top Floor' : 'Standard Sun'}) - Recommended ${btu} Inverter.`,
                      isUrgent: false,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0F1E2E] bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center transition-all shadow-xs text-center"
                  >
                    WhatsApp This Sizing to Technician
                  </a>
                </div>

                <p className="text-[10px] text-slate-400 text-center mt-2.5">
                  Free site visit · Written quotation with no obligation
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
