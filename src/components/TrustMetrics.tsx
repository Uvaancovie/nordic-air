import React from 'react';

export const TrustMetrics: React.FC = () => {
  const metrics = [
    {
      value: '100%',
      label: 'Guaranteed Work',
      sub: 'Clear, honest quotes',
      hasRedDot: false,
    },
    {
      value: '5.0 / 5.0',
      label: 'Google Rating',
      sub: '140+ happy Durban clients',
      hasRedDot: false,
    },
    {
      value: '24/7',
      label: 'Emergency Repair',
      sub: 'Day or night assistance',
      hasRedDot: true,
    },
    {
      value: '100%',
      label: 'Licensed & Insured',
      sub: 'Certified technicians',
      hasRedDot: false,
    },
    {
      value: 'Same-Day',
      label: 'Fast Service',
      sub: 'Mobile vans across Durban',
      hasRedDot: false,
    },
  ];

  return (
    <section className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="neo-card rounded-2xl glass-panel p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''}`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E2E] font-mono tabular-nums">
                  {m.value}
                </span>
                {m.hasRedDot && (
                  <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-soft-pulse ml-0.5" />
                )}
              </div>
              <span className="text-xs font-semibold text-slate-800 tracking-tight">
                {m.label}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
