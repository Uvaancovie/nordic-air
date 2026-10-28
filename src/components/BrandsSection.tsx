import React from 'react';

export const BrandsSection: React.FC = () => {
  const brands = [
    { name: 'Daikin', specialty: 'Built to resist sea air', country: 'Japan' },
    { name: 'Samsung', specialty: 'Gentle, draft-free cooling', country: 'Korea' },
    { name: 'LG Inverter', specialty: 'Uses up to 65% less power', country: 'Korea' },
    { name: 'Carrier', specialty: 'Heavy-duty & reliable', country: 'USA' },
    { name: 'Alliance', specialty: 'Local Durban favourite', country: 'South Africa' },
    { name: 'Midea', specialty: 'Quiet & affordable', country: 'Global' },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="md:w-1/3 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B5299] block mb-1">
              Authorized Partner
            </span>
            <h3 className="text-xl font-bold text-[#0A1322] tracking-tight">
              Brands We Install & Fix
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              We install reliable brands with up to 5 years warranty and full access to genuine spare parts.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {brands.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors flex flex-col justify-center text-center sm:text-left"
              >
                <span className="text-sm font-bold text-slate-900 tracking-tight font-mono">
                  {b.name}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {b.specialty}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
