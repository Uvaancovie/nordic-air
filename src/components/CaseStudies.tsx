import React, { useState } from 'react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

interface CaseStudy {
  id: string;
  category: 'coastal' | 'residential' | 'commercial';
  categoryLabel: string;
  number: string;
  suburb: string;
  suburbFullName: string;
  title: string;
  propertyType: string;
  systemInstalled: string;
  challenge: string;
  solution: string;
  outcome: string;
  keyMetric: string;
  keyMetricLabel: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'umhlanga-penthouse',
    category: 'coastal',
    categoryLabel: 'Coastal & Marine',
    number: '01',
    suburb: 'Umhlanga Rocks',
    suburbFullName: 'Umhlanga, Gateway & Prestondale',
    title: 'Marine Anti-Rust System for Seafront Penthouse',
    propertyType: 'Oceanfront Residential Penthouse',
    systemInstalled: 'Gold-Fin Inverter Units (Whisper Silent)',
    challenge: 'Direct onshore salt spray caused severe corrosion and compressor failure on previous standard units within 18 months.',
    solution: 'Fitted marine-grade gold-fin anti-corrosion condenser coils and elevated stainless brackets with vibration dampers.',
    outcome: 'Whisper-quiet 19dB operation in bedrooms with permanent protection against Durban coastal salt corrosion.',
    keyMetric: '100% Anti-Rust',
    keyMetricLabel: 'Marine Protection',
  },
  {
    id: 'berea-heritage',
    category: 'residential',
    categoryLabel: 'Heritage & Architectural',
    number: '02',
    suburb: 'Berea & Musgrave',
    suburbFullName: 'Berea, Musgrave & Overport',
    title: 'Discreet Cooling for High-Ceiling Victorian Home',
    propertyType: 'Historic High-Ceiling Residence',
    systemInstalled: 'Concealed Multi-Zone Inverter Systems',
    challenge: 'High 3.8-metre ceilings created extreme heat pockets upstairs, while historic cornices prohibited exterior surface trunking.',
    solution: 'Routed concealed refrigeration piping through roof trusses and placed motorized directional louvres to distribute cooling evenly.',
    outcome: 'Preserved the historic interior architecture with no visible wall cabling, keeping rooms uniformly cool during high humidity.',
    keyMetric: 'Zero Exposed Pipes',
    keyMetricLabel: 'Concealed Clean Finish',
  },
  {
    id: 'ballito-villa',
    category: 'coastal',
    categoryLabel: 'Coastal & Marine',
    number: '03',
    suburb: 'Ballito & Simbithi',
    suburbFullName: 'Ballito, Salt Rock & Simbithi',
    title: 'Continuous Dehumidification for Coastal Estate Villa',
    propertyType: 'Simbithi Eco-Estate Family Villa',
    systemInstalled: 'Multi-Split Inverter with Independent Dry Mode',
    challenge: 'Durban North Coast summer humidity exceeded 80%, causing interior stickiness and mold risks across 4 bedrooms.',
    solution: 'Engineered a multi-split setup featuring independent sensor-driven dry modes that extract excess moisture without overcooling.',
    outcome: 'Comfortable 50% relative humidity maintained throughout summer with low steady-state electrical power draw.',
    keyMetric: '50% Target Humidity',
    keyMetricLabel: 'Automatic Moisture Control',
  },
  {
    id: 'westville-office',
    category: 'commercial',
    categoryLabel: 'Office & Business',
    number: '04',
    suburb: 'Westville',
    suburbFullName: 'Westville & Cowies Hill',
    title: 'Zoned Air Conditioning for Multi-Tenant Office Park',
    propertyType: 'Corporate Office Park Suite',
    systemInstalled: 'Commercial Ceiling Cassettes with Zone Controls',
    challenge: 'Older non-inverter roof units cooled unevenly, leaving sun-facing corner offices too hot and center boardrooms freezing.',
    solution: 'Replaced outdated package units with four-way ceiling cassette inverters featuring separate programmable wall thermostats.',
    outcome: 'Independent climate control per department with rapid cooling response during peak Durban afternoon temperatures.',
    keyMetric: 'Over 45% Energy Cut',
    keyMetricLabel: 'Inverter Power Efficiency',
  },
];

interface CaseStudiesProps {
  onRequestSetup: (studyTitle: string, suburbFullName: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onRequestSetup }) => {
  const [filter, setFilter] = useState<'all' | 'coastal' | 'residential' | 'commercial'>('all');

  const filteredStudies = filter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((study) => study.category === filter);

  return (
    <section id="case-studies" className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B5299] font-mono">
                PROVEN LOCAL WORK
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D32626]" />
              <span className="text-xs font-semibold text-slate-500">
                Greater Durban Installations
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1322]">
              Real Installations Across Durban
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every Durban suburb has unique climate challenges—from salt air corrosion along the coast to high-volume heat in heritage homes. Here is how our certified technicians deliver tidy, long-lasting cooling.
            </p>
          </div>

          {/* Category Filter Tabs (Plain text buttons) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#1B5299] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Work
            </button>
            <button
              type="button"
              onClick={() => setFilter('coastal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'coastal'
                  ? 'bg-[#1B5299] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Coastal & Marine
            </button>
            <button
              type="button"
              onClick={() => setFilter('residential')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'residential'
                  ? 'bg-[#1B5299] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Heritage & Homes
            </button>
            <button
              type="button"
              onClick={() => setFilter('commercial')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'commercial'
                  ? 'bg-[#1B5299] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Business & Office
            </button>
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => {
            const whatsAppUrl = generateWhatsAppQuoteUrl({
              serviceType: 'Installation',
              suburb: study.suburbFullName,
              details: `I saw your case study for ${study.title} in ${study.suburb} and would like to discuss a similar setup.`,
              isUrgent: false,
            });

            return (
              <div
                key={study.id}
                className="neo-card rounded-3xl bg-slate-50/70 border border-slate-200 p-7 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B5299] bg-[#1B5299]/10 border border-[#1B5299]/20 px-2.5 py-0.5 rounded-full">
                        {study.suburb}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        — {study.categoryLabel}
                      </span>
                    </div>
                    <span className="text-lg font-mono font-bold text-slate-300">
                      {study.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#0A1322] tracking-tight leading-snug mb-1">
                    {study.title}
                  </h3>
                  <div className="text-xs text-slate-500 mb-6 font-medium">
                    Property: {study.propertyType} · Hardware: {study.systemInstalled}
                  </div>

                  {/* Problem / Solution / Outcome Breakdown */}
                  <div className="space-y-3.5 text-xs text-slate-700">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Durban Climate Challenge
                      </span>
                      <p className="leading-relaxed text-slate-700">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5299] block mb-1">
                        Nordic Air Solution
                      </span>
                      <p className="leading-relaxed text-slate-700">
                        {study.solution}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                        Verified Outcome
                      </span>
                      <p className="leading-relaxed text-slate-700">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Key Metric Strip */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">
                      {study.keyMetricLabel}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#0A1322]">
                      {study.keyMetric}
                    </span>
                  </div>
                </div>

                {/* Card Dual Action Buttons (Web Booking or Direct WhatsApp) */}
                <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onRequestSetup(study.title, study.suburbFullName)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Request Similar Setup
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-[#0A1322] bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-center inline-block"
                  >
                    Discuss on WhatsApp
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Suburb Inclusivity Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A1322]">
              Covering All Greater Durban Suburbs
            </div>
            <p className="text-xs text-slate-600">
              From Ballito down to Amanzimtoti, and inland across Westville, Pinetown, Kloof, and Hillcrest.
            </p>
          </div>
          <a
            href="#booking"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0A1322] hover:bg-[#162740] transition-colors whitespace-nowrap cursor-pointer"
          >
            Check Availability In Your Area
          </a>
        </div>

      </div>
    </section>
  );
};
