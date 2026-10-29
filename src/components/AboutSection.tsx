import React from 'react';

interface AboutSectionProps {
  onOpenBooking: (serviceType?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-nordic" className="py-20 bg-[#FAFDFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Trust Grid */}
          <div className="lg:col-span-6">
            <div className="surface-card rounded-3xl p-6 sm:p-8">

              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-[#082D43]">The Nordic Standard</h3>
                  <p className="text-xs text-slate-600">Our promise when working in your home</p>
                </div>
                <span className="text-xs font-semibold text-[#082D43] bg-[#2ED1DF]/10 px-2.5 py-1 rounded-full border border-[#2ED1DF]/30">
                  Guaranteed Workmanship
                </span>
              </div>

              {/* 4 Numbered Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">

                <div className="p-4 rounded-2xl surface-inset">
                  <span className="text-[10px] font-mono font-bold text-[#082D43] block mb-1">
                    01
                  </span>
                  <h4 className="text-xs font-bold text-[#082D43] uppercase tracking-wide">
                    Clean & Tidy Work
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    We wear shoe covers, catch all drill dust, and leave your room spotless.
                  </p>
                </div>

                <div className="p-4 rounded-2xl surface-inset">
                  <span className="text-[10px] font-mono font-bold text-[#082D43] block mb-1">
                    02
                  </span>
                  <h4 className="text-xs font-bold text-[#082D43] uppercase tracking-wide">
                    Resists Sea Rust
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Treated outdoor coils and brackets made for Durban&apos;s salty coastal air.
                  </p>
                </div>

                <div className="p-4 rounded-2xl surface-inset">
                  <span className="text-[10px] font-mono font-bold text-[#082D43] block mb-1">
                    03
                  </span>
                  <h4 className="text-xs font-bold text-[#082D43] uppercase tracking-wide">
                    Fast Emergency Callout
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Same-day service when your air conditioning stops working in summer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl surface-inset">
                  <span className="text-[10px] font-mono font-bold text-[#082D43] block mb-1">
                    04
                  </span>
                  <h4 className="text-xs font-bold text-[#082D43] uppercase tracking-wide">
                    Fixed Written Quotes
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    You see the exact price before we start. No surprise extra charges.
                  </p>
                </div>

              </div>

              {/* Bottom Metrics Bar */}
              <div className="p-4 rounded-2xl bg-[#E9FAFC] text-[#082D43] grid grid-cols-3 gap-2 text-center border border-slate-200">
                <div>
                  <span className="block text-base font-bold font-mono text-[#082D43]">12+</span>
                  <span className="text-[10px] text-slate-600">Years in Durban</span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="block text-base font-bold font-mono text-[#082D43]">5 Yrs</span>
                  <span className="text-[10px] text-slate-600">Unit Warranty</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="block text-base font-bold font-mono text-[#148CC7]">WhatsApp</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Straightforward English Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#082D43]">
              Simple, Reliable Air Conditioning
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#082D43] leading-[1.05] text-balance">
              You need a reliable air conditioning team.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Durban is hot, humid, and close to the ocean. Cheap air conditioners rust fast in our salt air, leak water down walls, and drive up your electricity bill. We help you choose the right unit, install it neatly, and keep it cooling for years to come.
            </p>

            {/* Core Checkpoints */}
            <div className="space-y-4 pt-1">
              <div className="border-l-2 border-[#082D43] pl-4">
                <span className="font-bold text-[#082D43] text-sm block">
                  Same-Day Emergency Service
                </span>
                <span className="text-xs text-slate-600">
                  If your air conditioning cuts out during a heatwave, our mobile team comes out fast.
                </span>
              </div>

              <div className="border-l-2 border-[#082D43] pl-4">
                <span className="font-bold text-[#082D43] text-sm block">
                  Free Written Quotes
                </span>
                <span className="text-xs text-slate-600">
                  We give you a complete quotation upfront with all parts, brackets, and labour included.
                </span>
              </div>

              <div className="border-l-2 border-[#082D43] pl-4">
                <span className="font-bold text-[#082D43] text-sm block">
                  Friendly, Certified Technicians
                </span>
                <span className="text-xs text-slate-600">
                  Qualified local specialists who arrive on time and take care of your home.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenBooking('Repair')}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wide text-white bg-[#082D43] hover:bg-[#148CC7] rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Book a Free Site Visit
              </button>

              <a
                href="#areas"
                className="text-xs font-medium text-slate-600 hover:text-[#148CC7] transition-colors"
              >
                See Durban Suburbs We Cover
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
