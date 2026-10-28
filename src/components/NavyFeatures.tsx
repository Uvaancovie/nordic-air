import React from 'react';

export const NavyFeatures: React.FC = () => {
  const features = [
    {
      num: '01',
      title: '24/7 Fast Repair',
      description:
        'When your aircon cuts out during a Durban heatwave, we come out fast. Day or night.',
      hasEmergencyBadge: true,
    },
    {
      num: '02',
      title: 'Clear, Fixed Quotes',
      description:
        'You get an honest price before we start any work. No hidden extras or surprise bills.',
    },
    {
      num: '03',
      title: 'Licensed Technicians',
      description:
        'Certified aircon specialists with 12+ years experience. Your home is always in safe hands.',
    },
    {
      num: '04',
      title: 'Regular Servicing',
      description:
        'Keep your unit cold, fresh-smelling, and clean while saving on your monthly electricity bill.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 sm:p-12 text-[#2563EB] shadow-2xl relative overflow-hidden border border-slate-200">
          {/* Subtle background glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E11D2E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y md:divide-y-0 lg:divide-x divide-slate-200">
            {features.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  idx > 0 ? 'pt-6 md:pt-0 lg:pl-6' : ''
                }`}
              >
                <div className="relative mb-5 w-12 h-12 rounded-2xl bg-[#2563EB]/5 border border-slate-200 flex items-center justify-center text-[#2563EB] font-mono font-bold text-sm transition-transform hover:scale-105">
                  <span>{item.num}</span>
                  {item.hasEmergencyBadge && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E11D2E] border-2 border-white animate-soft-pulse" />
                  )}
                </div>

                <h3 className="text-base font-bold text-[#2563EB] tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
