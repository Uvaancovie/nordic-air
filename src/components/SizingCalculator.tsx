import React, { useMemo, useRef, useState } from 'react';

interface SizingCalculatorProps {
  onAddToBooking: (details: { service: string; notes: string }) => void;
}

type ConditionId = 'none' | 'windows' | 'open' | 'ceiling' | 'extreme';

interface RoomCondition {
  id: ConditionId;
  title: string;
  description: string;
  multiplier: number;
}

const CONDITIONS: RoomCondition[] = [
  {
    id: 'windows',
    title: 'Large windows or direct sunlight',
    description: 'Large or oversized windows that receive strong sunlight.',
    multiplier: 1.1,
  },
  {
    id: 'open',
    title: 'Open to another room or area',
    description: 'The room has a wide opening into another room, office or bathroom.',
    multiplier: 1.1,
  },
  {
    id: 'ceiling',
    title: 'Ceiling higher than 3 metres',
    description: 'The room has more air volume because of a high ceiling.',
    multiplier: 1.1,
  },
  {
    id: 'extreme',
    title: 'Extremely hot or cold',
    description: 'The room becomes unusually hot or cold during the summer or winter.',
    multiplier: 1.15,
  },
  {
    id: 'none',
    title: 'None of the above',
    description: 'The room has normal windows, ceiling height and temperature conditions.',
    multiplier: 1,
  },
];

const STANDARD_SIZES = [9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000];

const COVERAGE_BY_BTU: Record<number, number> = {
  9000: 18,
  12000: 25,
  18000: 36,
  24000: 48,
  30000: 60,
  36000: 72,
  48000: 96,
  60000: 120,
};

interface UnitOption {
  brand: string;
  model: string;
  note: string;
  tag: string;
}

const getUnitOptions = (btu: number): UnitOption[] => {
  const capacity = btu.toLocaleString('en-US');

  if (btu >= 30000) {
    return [
      {
        brand: 'Carrier',
        model: `${capacity} BTU Ceiling Cassette`,
        note: 'Four-way airflow for offices and large open-plan spaces.',
        tag: 'Commercial',
      },
      {
        brand: 'Daikin',
        model: `${capacity} BTU Multi-Split Inverter`,
        note: 'Zoned control across several rooms from one outdoor unit.',
        tag: 'Multi-zone',
      },
      {
        brand: 'Samsung',
        model: `${capacity} BTU Commercial Inverter`,
        note: 'Energy-efficient cooling for busy business premises.',
        tag: 'Efficient',
      },
    ];
  }

  return [
    {
      brand: 'Daikin',
      model: `${capacity} BTU Gold-Fin Inverter`,
      note: 'Anti-rust coils built for Durban coastal air.',
      tag: 'Coastal grade',
    },
    {
      brand: 'Samsung',
      model: `${capacity} BTU WindFree`,
      note: 'Draft-free cooling for bedrooms and living areas.',
      tag: 'Draft-free',
    },
    {
      brand: 'LG',
      model: `${capacity} BTU DualCool Inverter`,
      note: 'High-efficiency inverter that cuts running costs.',
      tag: 'High efficiency',
    },
  ];
};

const formatBtu = (btu: number) => `${btu.toLocaleString('en-US')} BTU`;

export const SizingCalculator: React.FC<SizingCalculatorProps> = ({ onAddToBooking }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [condition, setCondition] = useState<ConditionId>('none');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    area: number;
    btu: number;
    condition: ConditionId;
    needsMultiple: boolean;
  } | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const area = useMemo(() => {
    const l = Number.parseFloat(length);
    const w = Number.parseFloat(width);
    if (!Number.isFinite(l) || !Number.isFinite(w) || l <= 0 || w <= 0) return 0;
    return l * w;
  }, [length, width]);

  const selectedCondition = CONDITIONS.find((item) => item.id === condition) ?? CONDITIONS[4];

  const recommendedUnits = result ? getUnitOptions(result.btu) : [];

  const calculate = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!Number.isFinite(Number.parseFloat(length)) || Number.parseFloat(length) <= 0) {
      setError('Enter the room length in metres to continue.');
      return;
    }
    if (!Number.isFinite(Number.parseFloat(width)) || Number.parseFloat(width) <= 0) {
      setError('Enter the room width in metres to continue.');
      return;
    }

    const rawBtu = area * 480 * selectedCondition.multiplier;
    const matches = STANDARD_SIZES.filter((size) => size >= rawBtu);
    const btu = matches.length > 0 ? matches[0] : STANDARD_SIZES[STANDARD_SIZES.length - 1];
    const needsMultiple = rawBtu > STANDARD_SIZES[STANDARD_SIZES.length - 1];

    setResult({ area, btu, condition, needsMultiple });

    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const startAgain = () => {
    setLength('');
    setWidth('');
    setCondition('none');
    setError('');
    setResult(null);
  };

  const addToBooking = () => {
    if (!result) return;

    const preferredUnit = recommendedUnits[0];
    const notes = [
      'AC Sizing Calculator result:',
      `Room ${result.area.toFixed(2)} m² (${length}m × ${width}m).`,
      `Condition: ${selectedCondition.title}.`,
      `Recommended capacity: ${formatBtu(result.btu)} inverter split.`,
      preferredUnit ? `Preferred unit: ${preferredUnit.brand} ${preferredUnit.model}.` : '',
      result.needsMultiple ? 'Note: room exceeds 60,000 BTU — multi-split setup required.' : '',
    ]
      .filter(Boolean)
      .join(' ');

    onAddToBooking({ service: 'Installation', notes });
  };

  return (
    <section id="sizing" className="py-20 bg-[#FAFDFF] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/nordic-logo.jpeg"
                alt="Nordic Air emblem"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#2ED1DF]/50 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight leading-none">
                  <span className="text-[#082D43]">NORDIC</span>
                  <span className="text-[#148CC7] ml-1.5">AIR</span>
                </span>
                <span className="text-[9px] tracking-[0.24em] text-slate-600 font-semibold uppercase mt-1.5">
                  Cool Comfort. Built Around You.
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2ED1DF]/5 border border-slate-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-3">
                <span>Room Sizing Calculator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#082D43] text-balance">
                Find the right aircon size for your room.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                Measure your room, answer one simple question, and we will recommend the capacity and units that suit Durban conditions.
              </p>
            </div>
          </div>

          <div className="hidden lg:block text-right shrink-0">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Supply &amp; Installation
            </span>
            <span className="block text-xs text-slate-600 mt-1">Durban and surrounds</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Calculator Card */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-8">
            <form onSubmit={calculate} className="space-y-8">

              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="w-7 h-7 rounded-full bg-[#2ED1DF]/15 border border-[#2ED1DF]/30 text-[#082D43] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h3 className="text-base font-bold text-[#082D43]">Enter the Room Size</h3>
                </div>
                <p className="text-xs text-slate-600 pl-10 mb-4">
                  Measure the inside length and width of the room in metres.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="room-length" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Room length
                    </label>
                    <div className="relative">
                      <input
                        id="room-length"
                        type="number"
                        min="0.1"
                        step="0.1"
                        inputMode="decimal"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="For example: 5"
                        className="field-dark w-full pl-4 pr-16 py-3 rounded-xl text-sm font-mono"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[11px] text-slate-500">
                        metres
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="room-width" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Room width
                    </label>
                    <div className="relative">
                      <input
                        id="room-width"
                        type="number"
                        min="0.1"
                        step="0.1"
                        inputMode="decimal"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="For example: 4"
                        className="field-dark w-full pl-4 pr-16 py-3 rounded-xl text-sm font-mono"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[11px] text-slate-500">
                        metres
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Calculated floor area
                  </span>
                  <span className="text-lg font-bold font-mono text-[#082D43] tabular-nums">
                    {area.toFixed(2)} m²
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="w-7 h-7 rounded-full bg-[#2ED1DF]/15 border border-[#2ED1DF]/30 text-[#082D43] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h3 className="text-base font-bold text-[#082D43]">Select the Room Condition</h3>
                </div>
                <p className="text-xs text-slate-600 pl-10 mb-4">
                  Choose the one option that best describes the room.
                </p>

                <div role="radiogroup" aria-label="Room condition" className="space-y-2.5">
                  {CONDITIONS.map((item) => {
                    const isSelected = condition === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setCondition(item.id)}
                        className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#2ED1DF]/10 border-[#2ED1DF]/50'
                            : 'bg-[#2ED1DF]/[0.03] border-slate-200 hover:bg-[#2ED1DF]/[0.06]'
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#148CC7]' : 'border-slate-300'
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#082D43]" />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-[#082D43]">{item.title}</span>
                          <span className="block text-xs text-slate-600 mt-0.5 leading-relaxed">{item.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/30 text-red-600 text-xs">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#082D43] hover:bg-[#148CC7] text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_40px_-20px_rgba(8,45,67,0.35)] transition-colors cursor-pointer"
                >
                  Calculate BTU Size
                </button>
                <p className="text-[11px] text-slate-600 text-center mt-3">
                  Takes about 30 seconds · No obligation · Free written quote
                </p>
              </div>

            </form>
          </div>

          {/* Side Info Column */}
          <div className="lg:col-span-5 space-y-6">

            {/* Common Room Sizes */}
            <div className="surface-card rounded-3xl p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#082D43]">Common Room Size Examples</h3>
              <p className="text-xs text-slate-600 mt-1 mb-4">
                These examples give you a quick idea of common air-conditioner sizes.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { btu: '9,000 BTU', area: 'Rooms up to 18 m²' },
                  { btu: '12,000 BTU', area: 'Rooms up to 25 m²' },
                  { btu: '18,000 BTU', area: 'Rooms up to 36 m²' },
                  { btu: '24,000 BTU', area: 'Rooms up to 48 m²' },
                ].map((item) => (
                  <div key={item.btu} className="p-3.5 rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200">
                    <span className="block text-sm font-bold font-mono text-[#082D43]">{item.btu}</span>
                    <span className="block text-[11px] text-slate-600 mt-0.5">{item.area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Measure */}
            <div className="surface-card rounded-3xl p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#082D43]">How to Measure</h3>
              <ol className="mt-3 space-y-2.5">
                {[
                  'Measure the room from one inside wall to the opposite inside wall.',
                  'Enter the length and width in metres.',
                  'Select one room condition that may increase the cooling requirement.',
                  'Press Calculate BTU Size to receive the recommended capacity.',
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-[#2ED1DF]/5 border border-slate-200 text-[10px] font-mono font-bold text-slate-600 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Disclaimer */}
            <div className="p-5 rounded-2xl bg-[#E9FAFC] border border-slate-200">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#082D43] mb-1.5">
                Please note
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                This calculator gives a practical estimate. Building insulation, room use, number of people, equipment, windows and climate can affect the final requirement.
              </p>
            </div>

          </div>
        </div>

        {/* Result */}
        {result && (
          <div ref={resultRef} className="mt-8 relative overflow-hidden surface-card rounded-3xl p-6 sm:p-8 border-[#2ED1DF]/30">
            <img
              src="/nordic-logo.jpeg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-16 w-64 h-64 rounded-full object-cover opacity-[0.07]"
            />

            <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#082D43]">
                  Recommended capacity
                </span>
                <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <span className="text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#082D43] leading-none">
                    {result.btu.toLocaleString('en-US')}
                  </span>
                  <span className="text-lg font-bold text-slate-600">BTU</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Inverter split system
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-3 max-w-xl">
                  For a {result.area.toFixed(2)} m² room with {selectedCondition.title.toLowerCase()}, we recommend a{' '}
                  <span className="text-[#082D43] font-semibold">{formatBtu(result.btu)}</span> inverter unit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={addToBooking}
                  className="w-full lg:w-72 py-4 px-6 rounded-2xl bg-[#082D43] hover:bg-[#148CC7] text-left transition-colors cursor-pointer shadow-[0_18px_40px_-20px_rgba(8,45,67,0.35)]"
                >
                  <span className="block text-sm font-extrabold uppercase tracking-wide text-white">
                    Add {formatBtu(result.btu)} to form
                  </span>
                  <span className="mt-0.5 block text-[11px] text-white/80">
                    Pre-fills your booking with this size.
                  </span>
                </button>
                <button
                  type="button"
                  onClick={startAgain}
                  className="w-full lg:w-72 py-3 px-6 rounded-2xl bg-[#2ED1DF]/5 hover:bg-[#2ED1DF]/10 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Start Again
                </button>
              </div>
            </div>

            {/* Result facts */}
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
              <div className="p-3.5 rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500">Floor area</span>
                <span className="block text-sm font-bold font-mono text-[#082D43] mt-0.5">{result.area.toFixed(2)} m²</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500">Room condition</span>
                <span className="block text-xs font-semibold text-[#082D43] mt-1 leading-snug">{selectedCondition.title}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500">Covers up to</span>
                <span className="block text-sm font-bold font-mono text-[#082D43] mt-0.5">
                  {COVERAGE_BY_BTU[result.btu] ?? '120'} m²
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2ED1DF]/[0.04] border border-slate-200">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500">System type</span>
                <span className="block text-sm font-bold text-[#082D43] mt-0.5">
                  {result.btu >= 30000 ? 'Multi-split / cassette' : 'Single split'}
                </span>
              </div>
            </div>

            {result.needsMultiple && (
              <div className="relative mt-4 p-3.5 rounded-xl bg-red-600/10 border border-red-600/30 text-xs text-red-600">
                This room is larger than a single 60,000 BTU unit can comfortably cool. We would recommend a multi-split or cassette setup — our team will confirm the best combination on site.
              </div>
            )}

            {/* Recommended units */}
            <div className="relative mt-7">
              <div className="flex items-end justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#082D43]">Recommended units</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Trusted brands we supply and install, matched to your calculated capacity.
                  </p>
                </div>
                <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Supplied &amp; installed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedUnits.map((unit, idx) => (
                  <div
                    key={`${unit.brand}-${unit.model}`}
                    className={`p-4 rounded-2xl border ${
                      idx === 0
                        ? 'bg-[#2ED1DF]/10 border-[#2ED1DF]/30'
                        : 'bg-[#2ED1DF]/[0.04] border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold font-mono text-[#082D43]">{unit.brand}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        idx === 0
                          ? 'bg-[#2ED1DF]/20 text-[#082D43]'
                          : 'bg-[#2ED1DF]/5 text-slate-600 border border-slate-200'
                      }`}>
                        {unit.tag}
                      </span>
                    </div>
                    <span className="block text-xs font-semibold text-slate-700 mt-1.5">{unit.model}</span>
                    <span className="block text-[11px] text-slate-600 mt-1 leading-relaxed">{unit.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
