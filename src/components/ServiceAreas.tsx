import React, { useState, useMemo } from 'react';
import { SuburbLocation } from '../types';

interface ServiceAreasProps {
  onSelectArea: (areaName: string) => void;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = ({ onSelectArea }) => {
  const allSuburbs: SuburbLocation[] = [
    // North Coast & Northern Suburbs
    {
      id: 'umhlanga',
      name: 'Umhlanga, Gateway & Prestondale',
      region: 'North Coast',
      coords: { x: 74, y: 32 },
      responseTime: '20–35 mins',
      unitsOnCall: 2,
      highlight: 'Apartments, coastal houses, and commercial Gateway office suites.',
      popularSystems: ['Daikin Inverter', 'Samsung WindFree'],
    },
    {
      id: 'durban-north',
      name: 'Durban North, Virginia & Beachwood',
      region: 'North Coast',
      coords: { x: 68, y: 44 },
      responseTime: '25–40 mins',
      unitsOnCall: 2,
      highlight: 'Family homes, seaside villas, guesthouses, and local businesses.',
      popularSystems: ['LG DualCool Inverter', 'Alliance Coastal'],
    },
    {
      id: 'la-lucia',
      name: 'La Lucia & Glenashley',
      region: 'North Coast',
      coords: { x: 71, y: 38 },
      responseTime: '25–40 mins',
      unitsOnCall: 1,
      highlight: 'Coastal properties, office parks, and residential complexes.',
      popularSystems: ['Daikin Multi-Split', 'Samsung Inverter'],
    },
    {
      id: 'ballito',
      name: 'Ballito, Salt Rock & Simbithi',
      region: 'North Coast',
      coords: { x: 86, y: 14 },
      responseTime: '35–50 mins',
      unitsOnCall: 2,
      highlight: 'Gated estates and sea-facing homes requiring rust-resistant units.',
      popularSystems: ['Daikin Coastal Inverter', 'Carrier Inverter'],
    },
    {
      id: 'phoenix',
      name: 'Phoenix, Mount Edgecombe & Cornubia',
      region: 'North Coast',
      coords: { x: 62, y: 28 },
      responseTime: '25–40 mins',
      unitsOnCall: 2,
      highlight: 'Residential homes, gated golf estates, and industrial warehouses.',
      popularSystems: ['Alliance Inverter', 'Midea Breezeless'],
    },
    {
      id: 'tongaat-verulam',
      name: 'Tongaat, Verulam & Umdloti',
      region: 'North Coast',
      coords: { x: 79, y: 20 },
      responseTime: '30–45 mins',
      unitsOnCall: 1,
      highlight: 'Coastal beach flats, farming estates, and local community homes.',
      popularSystems: ['Carrier Split Unit', 'Alliance Coastal'],
    },

    // Central Metro, Berea & Durban CBD
    {
      id: 'morningside',
      name: 'Morningside, Windermere & Stamford Hill',
      region: 'Central Metro',
      coords: { x: 58, y: 60 },
      responseTime: '25–35 mins',
      unitsOnCall: 2,
      highlight: 'High-ceiling apartments, classic houses, studios, and restaurants.',
      popularSystems: ['Samsung Inverter', 'Midea Breezeless'],
    },
    {
      id: 'berea-musgrave',
      name: 'Berea, Musgrave & Overport',
      region: 'Central Metro',
      coords: { x: 54, y: 62 },
      responseTime: '25–40 mins',
      unitsOnCall: 2,
      highlight: 'Heritage properties, apartment blocks, and medical suites.',
      popularSystems: ['Daikin Inverter', 'LG Smart Inverter'],
    },
    {
      id: 'glenwood',
      name: 'Glenwood, Umbilo & Bulwer',
      region: 'Central Metro',
      coords: { x: 52, y: 66 },
      responseTime: '30–40 mins',
      unitsOnCall: 1,
      highlight: 'Character suburban homes, student accommodation, and studios.',
      popularSystems: ['Alliance Inverter', 'Samsung Split'],
    },
    {
      id: 'durban-cbd',
      name: 'Durban CBD & Point Waterfront',
      region: 'Central Metro',
      coords: { x: 61, y: 68 },
      responseTime: '25–35 mins',
      unitsOnCall: 2,
      highlight: 'Waterfront apartments, commercial offices, and retail storefronts.',
      popularSystems: ['Daikin VRV System', 'Carrier Under-Ceiling'],
    },
    {
      id: 'reservoir-hills',
      name: 'Reservoir Hills, Clare Estate & Sydenham',
      region: 'Central Metro',
      coords: { x: 48, y: 56 },
      responseTime: '30–45 mins',
      unitsOnCall: 1,
      highlight: 'Spacious family residences and hillside properties.',
      popularSystems: ['Samsung WindFree', 'Alliance 18k Inverter'],
    },

    // Highway & West
    {
      id: 'westville',
      name: 'Westville & Cowies Hill',
      region: 'Highway & West',
      coords: { x: 42, y: 65 },
      responseTime: '30–45 mins',
      unitsOnCall: 2,
      highlight: 'Suburban family properties, office parks, and schools.',
      popularSystems: ['Alliance 18k Inverter', 'Carrier Split'],
    },
    {
      id: 'pinetown',
      name: 'Pinetown, New Germany & Sarnia',
      region: 'Highway & West',
      coords: { x: 36, y: 64 },
      responseTime: '35–45 mins',
      unitsOnCall: 2,
      highlight: 'Residential homes, commercial workshops, and manufacturing units.',
      popularSystems: ['Carrier Ducted System', 'Alliance Inverter'],
    },
    {
      id: 'kloof',
      name: 'Kloof, Gillitts & Winston Park',
      region: 'Highway & West',
      coords: { x: 26, y: 55 },
      responseTime: '35–50 mins',
      unitsOnCall: 1,
      highlight: 'Mist-belt estate homes needing summer cooling and winter warmth.',
      popularSystems: ['Daikin Heat Pump', 'LG DualCool'],
    },
    {
      id: 'hillcrest',
      name: 'Hillcrest, Waterfall & Botha’s Hill',
      region: 'Highway & West',
      coords: { x: 20, y: 52 },
      responseTime: '40–55 mins',
      unitsOnCall: 1,
      highlight: 'Gated residential estates and country commercial centres.',
      popularSystems: ['Daikin Inverter', 'Carrier Inverter'],
    },
    {
      id: 'queensburgh',
      name: 'Queensburgh, Malvern & Escombe',
      region: 'Highway & West',
      coords: { x: 44, y: 74 },
      responseTime: '35–50 mins',
      unitsOnCall: 1,
      highlight: 'Quiet valley suburban residences and private townhouses.',
      popularSystems: ['Alliance Inverter', 'Midea Breezeless'],
    },

    // South Coast & Southern Suburbs
    {
      id: 'bluff',
      name: 'Bluff, Brighton Beach & Wentworth',
      region: 'South Coast',
      coords: { x: 62, y: 78 },
      responseTime: '30–45 mins',
      unitsOnCall: 2,
      highlight: 'Seaside residential homes requiring coastal anti-rust protection.',
      popularSystems: ['Daikin Coastal Inverter', 'Alliance Coastal'],
    },
    {
      id: 'amanzimtoti',
      name: 'Amanzimtoti, Warner Beach & Doonside',
      region: 'South Coast',
      coords: { x: 55, y: 92 },
      responseTime: '35–50 mins',
      unitsOnCall: 2,
      highlight: 'Beachfront holiday apartments and freestanding family residences.',
      popularSystems: ['LG Inverter', 'Carrier Coastal Inverter'],
    },
    {
      id: 'chatsworth',
      name: 'Chatsworth, Havenside & Mobeni Heights',
      region: 'South Coast',
      coords: { x: 46, y: 80 },
      responseTime: '30–45 mins',
      unitsOnCall: 2,
      highlight: 'Family residences, multi-generational homes, and local shops.',
      popularSystems: ['Alliance Inverter', 'Samsung WindFree'],
    },
    {
      id: 'yellowwood-park',
      name: 'Yellowwood Park, Montclair & Woodlands',
      region: 'South Coast',
      coords: { x: 51, y: 76 },
      responseTime: '30–45 mins',
      unitsOnCall: 1,
      highlight: 'Nature reserve border properties and quiet suburban houses.',
      popularSystems: ['Alliance 12k Inverter', 'LG DualCool'],
    },

    // Inland & Greater Durban Communities
    {
      id: 'umlazi-isipingo',
      name: 'Umlazi, Isipingo & Prospecton',
      region: 'Inland Communities',
      coords: { x: 52, y: 86 },
      responseTime: '35–50 mins',
      unitsOnCall: 2,
      highlight: 'Residential communities, local shops, and automotive industrial hubs.',
      popularSystems: ['Alliance Inverter', 'Carrier Split'],
    },
    {
      id: 'inam-kwamashu',
      name: 'KwaMashu, Inanda & Ntuzuma',
      region: 'Inland Communities',
      coords: { x: 54, y: 24 },
      responseTime: '35–50 mins',
      unitsOnCall: 2,
      highlight: 'Community family homes, retail centres, and health facilities.',
      popularSystems: ['Alliance Inverter', 'Midea Breezeless'],
    },
  ];

  const [activeSuburb, setActiveSuburb] = useState<SuburbLocation>(allSuburbs[0]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'North Coast', 'Central Metro', 'Highway & West', 'South Coast', 'Inland Communities'];

  const filteredSuburbs = useMemo(() => {
    return allSuburbs.filter((sub) => {
      const matchesRegion = selectedRegion === 'All' || sub.region === selectedRegion;
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [allSuburbs, selectedRegion, searchQuery]);

  return (
    <section id="areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
            <span>Where We Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1322]">
            All Durban Suburbs Covered
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We provide fast, reliable air conditioning services across every neighbourhood in Greater Durban. From the North Coast to the South Coast, Central Durban, and Highway communities, our mobile teams are ready. Call{' '}
            <a href="tel:0319403388" className="font-semibold text-[#1B5299] hover:underline">
              (031) 940-3388
            </a>{' '}
            anytime.
          </p>
        </div>

        {/* Filter Controls (Regions + Search) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#1B5299] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {reg} {reg === 'All' ? `(${allSuburbs.length})` : ''}
              </button>
            ))}
          </div>

          {/* Quick Suburb Search Input */}
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your suburb..."
              className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
            />
          </div>
        </div>

        {/* Split Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Vector Coastal Map */}
          <div className="lg:col-span-6 bg-[#F0F7FB] rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm relative overflow-hidden min-h-[480px] flex flex-col justify-between">
            {/* Ambient Map Gridlines */}
            <div className="absolute inset-0 bg-[radial-gradient(#93C5FD_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Stylized Coastal Water & Land Outline SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-sky-200/50"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 60,0 C 65,30 55,60 70,100 L 100,100 L 100,0 Z"
                fill="rgba(186, 230, 253, 0.35)"
              />
              <path
                d="M 60,0 C 65,30 55,60 70,100"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <text x="75" y="90" fontSize="3.5" fill="#0284C7" opacity="0.5" fontFamily="sans-serif">
                INDIAN OCEAN
              </text>
            </svg>

            {/* Top map bar */}
            <div className="relative flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-slate-700">Durban City-Wide Coverage</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                All 22+ Municipal Hubs
              </span>
            </div>

            {/* Interactive Dots on Map (No Icons) */}
            <div className="relative my-8 h-64 sm:h-72 w-full">
              {allSuburbs.map((sub) => {
                const isSelected = sub.id === activeSuburb.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setActiveSuburb(sub)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition-all duration-300"
                    style={{ left: `${sub.coords.x}%`, top: `${sub.coords.y}%` }}
                    aria-label={sub.name}
                  >
                    <div className="relative flex flex-col items-center">
                      {isSelected && (
                        <span className="absolute -top-1 w-6 h-6 rounded-full bg-[#1B5299]/25 animate-ping" />
                      )}

                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                          isSelected
                            ? 'bg-[#1B5299] ring-4 ring-[#1B5299]/25'
                            : 'bg-white border-2 border-slate-400'
                        }`}
                      />

                      {isSelected && (
                        <span className="text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-md whitespace-nowrap shadow-xs bg-[#0A1322] text-white">
                          {sub.name.split(',')[0]}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Area Info Box */}
            <div className="relative bg-white rounded-2xl p-5 shadow-lg border border-slate-200/90 max-w-sm ml-auto">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#1B5299]">
                  {activeSuburb.region}
                </span>
                <h4 className="text-base font-bold text-[#0A1322] leading-tight mt-0.5">
                  {activeSuburb.name}
                </h4>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {activeSuburb.highlight}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Average Travel</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {activeSuburb.responseTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Mobile Squad</span>
                  <span className="font-semibold text-emerald-600 font-mono">
                    {activeSuburb.unitsOnCall} Van{activeSuburb.unitsOnCall > 1 ? 's' : ''} on Duty
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectArea(activeSuburb.name)}
                className="mt-4 w-full py-2 px-3 text-xs font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-xl transition-colors cursor-pointer shadow-xs text-center"
              >
                Book Service in {activeSuburb.name.split(',')[0]}
              </button>
            </div>

          </div>

          {/* Right Column: Complete Inclusive Suburb List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider">
                Select your neighbourhood ({filteredSuburbs.length} available):
              </span>
              <span>All Durban Areas Welcome</span>
            </div>

            {/* Scrollable container for all suburbs */}
            <div className="max-h-[520px] overflow-y-auto pr-1 space-y-2.5">
              {filteredSuburbs.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                  No suburb matches &quot;{searchQuery}&quot;. We cover all areas across Greater Durban. Call us at (031) 940-3388.
                </div>
              ) : (
                filteredSuburbs.map((sub, idx) => {
                  const isSelected = sub.id === activeSuburb.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setActiveSuburb(sub)}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1B5299]/5 border-[#1B5299] shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono font-bold text-slate-400 w-5">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-xs sm:text-sm font-semibold tracking-tight ${
                                isSelected ? 'text-[#1B5299]' : 'text-slate-900'
                              }`}
                            >
                              {sub.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                              · {sub.region}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>Travel: {sub.responseTime}</span>
                            <span>·</span>
                            <span>{sub.unitsOnCall} van on call</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 pl-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectArea(sub.name);
                          }}
                          className="text-xs font-semibold text-[#1B5299] hover:underline cursor-pointer"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Inclusive Community Guarantee Note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2 mt-2">
              <div>
                <span className="font-semibold text-slate-800 block">Every Durban Community Included</span>
                We service freestanding houses, flats, duplexes, business parks, and shops across eThekwini.
              </div>
              <a
                href="tel:0319403388"
                className="font-semibold text-[#0A1322] hover:text-[#1B5299] underline shrink-0 whitespace-nowrap"
              >
                Call (031) 940-3388
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
