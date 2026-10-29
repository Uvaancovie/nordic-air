import React, { useState } from 'react';
import { ServiceCategory, ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('residential');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const residentialServices: ServiceItem[] = [
    {
      id: 'res-maintenance',
      category: 'residential',
      title: 'Annual Servicing',
      tagline: 'Keeps your aircon cold, clean, and smelling fresh.',
      description:
        'A thorough clean and checkup. We clean out dusty filters and cooling coils, clear the drain pipe so water does not drip down your walls, and test electrical parts so your AC runs quietly and uses less power.',
      features: [
        'Deep-clean filters and cooling coils',
        'Clear drain lines to prevent indoor water leaks',
        'Check gas pressure and electrical parts',
        'Help lower your monthly electricity bill',
      ],
      recommendedFor: 'Bedrooms, living rooms, and flats in Durban, Umhlanga, and Ballito.',
      warranty: '6-Month guarantee on all adjustments and servicing.',
    },
    {
      id: 'res-repairs',
      category: 'residential',
      title: 'Repairs & Breakdowns',
      tagline: 'Fast help when your aircon stops blowing cold air.',
      description:
        'If your AC is blowing warm air, making strange rattling sounds, dripping water inside, or tripping your power, we can fix it quickly. Our vans carry genuine replacement parts to get you cool again right away.',
      features: [
        'Same-day callouts across Greater Durban',
        'We fix all major brands (Daikin, Samsung, LG)',
        'Fix water drips, noise, and power trips',
        'Clear price given before we begin',
      ],
      recommendedFor: 'Any AC breakdown or sudden cooling failure on hot days.',
      warranty: '12-Month guarantee on all new replacement parts.',
    },
    {
      id: 'res-install',
      category: 'residential',
      title: 'New AC Installation',
      tagline: 'Quiet, energy-saving air conditioners for your home.',
      description:
        'We help you choose the right unit for your room size so you stay cool without paying high electricity bills. Every installation is done neatly with rust-resistant outdoor brackets and neat pipe covers.',
      features: [
        'Help choosing the right size for your room',
        'Inverter units that save up to 65% electricity',
        'Outdoor brackets built to resist sea rust',
        'Up to 5 years manufacturer warranty',
      ],
      recommendedFor: 'New homes, renovations, or replacing noisy old air conditioners.',
      warranty: '5-Year unit warranty and 2-year installation guarantee.',
    },
  ];

  const commercialServices: ServiceItem[] = [
    {
      id: 'com-offices',
      category: 'commercial',
      title: 'Offices & Retail Shops',
      tagline: 'Multi-room cooling to keep staff and clients comfortable.',
      description:
        'Dependable cooling solutions for whole offices, shops, medical practices, and restaurants with easy central temperature controls.',
      features: [
        'Cool separate rooms to different temperatures',
        'Energy-efficient units that cut running costs',
        'Simple wall or central touch controllers',
        'Quiet operation so meetings stay undisturbed',
      ],
      recommendedFor: 'Office floors, medical rooms, restaurants, and retail spaces.',
      warranty: 'Full commercial manufacturer warranty and service support.',
    },
    {
      id: 'com-maintenance',
      category: 'commercial',
      title: 'Business Maintenance Plans',
      tagline: 'Regular checkups so your business never loses cooling.',
      description:
        'Scheduled regular servicing for offices and commercial buildings to avoid sudden breakdowns during busy work hours and keep equipment working smoothly.',
      features: [
        'Priority same-day emergency callouts',
        'Regular filter and coil deep cleaning',
        'Written safety and condition reports',
        'Discounts on all replacement parts',
      ],
      recommendedFor: 'Property managers, offices, schools, and business centres.',
      warranty: 'Priority service agreement with dedicated local team.',
    },
    {
      id: 'com-server',
      category: 'commercial',
      title: 'Server & Computer Rooms',
      tagline: 'Continuous cooling to protect computers and servers.',
      description:
        'Dedicated 24/7 cooling units for IT server rooms and computer hubs to stop expensive hardware from overheating.',
      features: [
        'Runs 24 hours a day, 365 days a year',
        'Automatic backup system if one unit stops',
        'Keeps humidity and heat at safe levels',
        'Emergency phone alerts if temperature rises',
      ],
      recommendedFor: 'IT server rooms, tech offices, and telecom rooms.',
      warranty: '24/7 fast response priority guarantee.',
    },
  ];

  const currentServices = activeTab === 'residential' ? residentialServices : commercialServices;

  return (
    <section id="services" className="py-20 bg-[#FAFDFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2ED1DF]/5 border border-slate-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            <span>What We Do</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#082D43]">
            Our Services
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            From quick repairs to new installations, we look after homes and businesses across Durban and KwaZulu-Natal.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#2ED1DF]/5 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('residential')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'residential'
                  ? 'bg-[#082D43] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#148CC7]'
              }`}
            >
              Home Air Conditioning
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('commercial')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'commercial'
                  ? 'bg-[#082D43] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#148CC7]'
              }`}
            >
              Business & Offices
            </button>
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.map((service, idx) => (
            <div
              key={service.id}
              className="surface-card surface-card-hover rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Top Bar */}
              <div className="p-6 pb-4 bg-[#2ED1DF]/[0.04] border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  0{idx + 1}
                </span>

                {idx === 0 && (
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#2ED1DF]/15 text-[#082D43] border border-[#2ED1DF]/30 px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                {idx === 2 && (
                  <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#2ED1DF]/10 text-[#082D43] border border-[#2ED1DF]/30 px-2.5 py-1 rounded-full">
                    5-Yr Warranty
                  </span>
                )}
              </div>

              {/* Card Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#082D43]">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 mb-5">
                    {service.tagline}
                  </p>

                  <div className="space-y-2.5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-[#082D43] font-bold shrink-0">—</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => onBookService(service.title)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#082D43] hover:bg-[#148CC7] shadow-sm transition-colors cursor-pointer text-center"
                  >
                    Book Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-[#2ED1DF]/5 hover:bg-[#2ED1DF]/10 border border-slate-200 transition-colors cursor-pointer text-center"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={onBookService}
      />
    </section>
  );
};
