import React, { useMemo, useRef, useState } from 'react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

interface SizingCalculatorProps {
  onAddToBooking: (details: { service: string; notes: string }) => void;
}

type ConditionId = 'windows' | 'open' | 'ceiling' | 'extreme' | 'none';

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
    multiplier: 1.15,
  },
  {
    id: 'open',
    title: 'Open to another room or area',
    description: 'The room has a wide opening into another room, office or bathroom.',
    multiplier: 1.15,
  },
  {
    id: 'ceiling',
    title: 'Ceiling higher than 3 metres',
    description: 'The room has more air volume because of a high ceiling.',
    multiplier: 1.2,
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
    multiplier: 1.0,
  },
];

const STANDARD_SIZES = [9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000];

// Standard South African capacity coverage thresholds
const getRecommendedBtu = (areaSqM: number, multiplier: number): number => {
  const adjustedArea = areaSqM * multiplier;
  if (adjustedArea <= 18) return 9000;
  if (adjustedArea <= 25) return 12000;
  if (adjustedArea <= 36) return 18000;
  if (adjustedArea <= 48) return 24000;
  if (adjustedArea <= 60) return 30000;
  if (adjustedArea <= 72) return 36000;
  if (adjustedArea <= 96) return 48000;
  return 60000;
};

// Power and daily electricity savings estimation
// Inverter compressor modulates down to ~35% capacity when target temperature reached, saving up to 65% vs non-inverter
const calculateElectricitySavings = (btu: number, dailyHours: number = 7) => {
  // Approximate standard non-inverter draw: ~btu / 10 / 1000 in kW
  const nonInverterKw = (btu / 1000) * 0.105;
  // Modern inverter averages ~40% effective draw over run cycle
  const inverterAverageKw = nonInverterKw * 0.42;

  const nonInverterDailyKwh = nonInverterKw * dailyHours;
  const inverterDailyKwh = inverterAverageKw * dailyHours;
  const dailyKwhSaved = nonInverterDailyKwh - inverterDailyKwh;
  const monthlyKwhSaved = dailyKwhSaved * 30;
  const percentSaved = Math.round(((nonInverterDailyKwh - inverterDailyKwh) / nonInverterDailyKwh) * 100);

  return {
    dailyKwhSaved: Number(dailyKwhSaved.toFixed(1)),
    monthlyKwhSaved: Math.round(monthlyKwhSaved),
    percentSaved,
    standardDailyKwh: Number(nonInverterDailyKwh.toFixed(1)),
    inverterDailyKwh: Number(inverterDailyKwh.toFixed(1)),
  };
};

export const SizingCalculator: React.FC<SizingCalculatorProps> = ({ onAddToBooking }) => {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [condition, setCondition] = useState<ConditionId>('none');
  const [dailyHours, setDailyHours] = useState<number>(7);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<{
    area: number;
    btu: number;
    condition: ConditionId;
    needsMultiple: boolean;
    savings: ReturnType<typeof calculateElectricitySavings>;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const parsedLength = Number.parseFloat(length);
  const parsedWidth = Number.parseFloat(width);

  const calculatedArea = useMemo(() => {
    if (!Number.isFinite(parsedLength) || !Number.isFinite(parsedWidth) || parsedLength <= 0 || parsedWidth <= 0) {
      return 0;
    }
    return parsedLength * parsedWidth;
  }, [parsedLength, parsedWidth]);

  const selectedCondition = CONDITIONS.find((c) => c.id === condition) || CONDITIONS[4];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!Number.isFinite(parsedLength) || parsedLength <= 0) {
      setError('Please enter a valid room length in metres.');
      return;
    }
    if (!Number.isFinite(parsedWidth) || parsedWidth <= 0) {
      setError('Please enter a valid room width in metres.');
      return;
    }

    const btu = getRecommendedBtu(calculatedArea, selectedCondition.multiplier);
    const needsMultiple = calculatedArea * selectedCondition.multiplier > 60;
    const savings = calculateElectricitySavings(btu, dailyHours);

    setResult({
      area: calculatedArea,
      btu,
      condition,
      needsMultiple,
      savings,
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStartAgain = () => {
    setLength('');
    setWidth('');
    setCondition('none');
    setError('');
    setResult(null);
  };

  const handleAddToBooking = () => {
    if (!result) return;
    const notes = [
      `2-Step BTU Sizing result:`,
      `Room size: ${result.area.toFixed(2)} m² (${length}m × ${width}m).`,
      `Room condition: ${selectedCondition.title}.`,
      `Recommended capacity: ${result.btu.toLocaleString('en-US')} BTU Inverter.`,
      `Daily savings: ~${result.savings.dailyKwhSaved} kWh/day (${result.savings.percentSaved}% power cut with modulating inverter).`,
      result.needsMultiple ? 'Multi-split configuration required for large space.' : '',
    ]
      .filter(Boolean)
      .join(' ');

    onAddToBooking({ service: 'Installation', notes });
  };

  const whatsAppUrl = result
    ? generateWhatsAppQuoteUrl({
        serviceType: 'Installation',
        suburb: 'Durban Metro',
        details: `Room Sizing result: ${result.area.toFixed(2)} m² (${length}m × ${width}m), Condition: ${selectedCondition.title}. Recommended: ${result.btu.toLocaleString('en-US')} BTU Inverter (~${result.savings.dailyKwhSaved} kWh/day saved). Please send free written quote.`,
        isUrgent: false,
      })
    : '';

  return (
    <section id="sizing" className="py-20 bg-[#F8FBFF] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/25 text-[#0369A1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>Interactive 2-Step Sizing &amp; Power Savings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042B60] tracking-tight">
              Air Conditioner Sizing &amp; Electricity Savings Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Calculate the exact BTU rating needed for your room in two quick steps and see how much electricity an AUX inverter unit saves each day compared to older fixed-speed models.
            </p>
          </div>

          <div className="hidden lg:block text-right">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Durban Climate Engine
            </span>
            <span className="text-xs text-slate-600 block mt-0.5">
              Calibrated for coastal humidity &amp; heat loads
            </span>
          </div>
        </div>

        {/* 2-Step Form & Side Guidance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Step 1 & Step 2 */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <form onSubmit={handleCalculate} className="space-y-8">
              
              {/* STEP 1: Enter the Room Size */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-xl bg-[#0284C7] text-white font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#042B60]">Enter the Room Size</h3>
                    <p className="text-xs text-slate-600">
                      Measure the inside length and width of the room in metres.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Room Length */}
                  <div>
                    <label htmlFor="room-length-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Room length
                    </label>
                    <div className="relative">
                      <input
                        id="room-length-input"
                        type="number"
                        min="0.5"
                        max="50"
                        step="0.1"
                        inputMode="decimal"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="For example: 5"
                        className="w-full pl-4 pr-16 py-3.5 rounded-xl border border-slate-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none text-sm font-mono text-slate-800 bg-[#F8FBFF]"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium text-slate-500">
                        metres
                      </span>
                    </div>
                  </div>

                  {/* Room Width */}
                  <div>
                    <label htmlFor="room-width-input" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Room width
                    </label>
                    <div className="relative">
                      <input
                        id="room-width-input"
                        type="number"
                        min="0.5"
                        max="50"
                        step="0.1"
                        inputMode="decimal"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="For example: 4"
                        className="w-full pl-4 pr-16 py-3.5 rounded-xl border border-slate-200 focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none text-sm font-mono text-slate-800 bg-[#F8FBFF]"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium text-slate-500">
                        metres
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calculated Floor Area Banner */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0284C7]/5 border border-[#0284C7]/20 px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Calculated floor area
                  </span>
                  <span className="text-xl font-bold font-mono text-[#0284C7]">
                    {calculatedArea.toFixed(2)} m²
                  </span>
                </div>
              </div>

              {/* STEP 2: Select the Room Condition */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-xl bg-[#0284C7] text-white font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#042B60]">Select the Room Condition</h3>
                    <p className="text-xs text-slate-600">
                      Choose the one option that best describes the room.
                    </p>
                  </div>
                </div>

                <div role="radiogroup" aria-label="Room condition" className="space-y-2.5 mt-4">
                  {CONDITIONS.map((cond) => {
                    const isSelected = condition === cond.id;
                    return (
                      <button
                        key={cond.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setCondition(cond.id)}
                        className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0284C7]/10 border-[#0284C7] ring-1 ring-[#0284C7]/30'
                            : 'bg-[#F8FBFF] border-slate-200 hover:border-sky-300 hover:bg-white'
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#0284C7]' : 'border-slate-300'
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#0284C7]" />}
                        </span>
                        <div>
                          <span className="block text-sm font-bold text-[#042B60]">
                            {cond.title}
                          </span>
                          <span className="block text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {cond.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              {/* Action Buttons: Calculate BTU Size & Start Again */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#042B60] hover:bg-[#0284C7] text-white text-sm font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer text-center"
                >
                  Calculate BTU Size
                </button>
                <button
                  type="button"
                  onClick={handleStartAgain}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Start Again
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Instant calculations · Zero obligation · Free written quote upon inspection
              </p>
            </form>
          </div>

          {/* Right Column: Guidance, Disclaimer & Examples */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* How to Measure Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-[#042B60] mb-3">
                How to Measure
              </h3>
              <ol className="space-y-2.5">
                {[
                  'Measure the room from one inside wall to the opposite inside wall.',
                  'Enter the length and width in metres.',
                  'Select one room condition that may increase the cooling requirement.',
                  'Press Calculate BTU Size to receive the recommended capacity.',
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-[#0284C7]/10 text-[#0284C7] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Common Room Size Examples Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-[#042B60]">
                Common Room Size Examples
              </h3>
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
                  <div key={item.btu} className="p-3.5 rounded-xl bg-[#F8FBFF] border border-slate-200">
                    <span className="block text-sm font-bold font-mono text-[#042B60]">
                      {item.btu}
                    </span>
                    <span className="block text-[11px] text-slate-600 mt-0.5">
                      {item.area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Please note Disclaimer */}
            <div className="p-5 rounded-2xl bg-[#E0F2FE]/60 border border-[#0284C7]/20">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0369A1] mb-1.5">
                Please note:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                This calculator gives a practical estimate. Building insulation, room use, number of people, equipment, windows and climate can affect the final requirement.
              </p>
            </div>

          </div>

        </div>

        {/* CALCULATED RESULT & AVERAGE DAILY ELECTRICITY SAVINGS SECTION */}
        {result && (
          <div
            ref={resultRef}
            className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0284C7]/30 shadow-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-8 border-b border-slate-200">
              
              {/* Capacity Recommendation */}
              <div>
                <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-3 py-1 rounded-md mb-2">
                  Recommended Capacity Result
                </span>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mt-1">
                  <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#042B60]">
                    {result.btu.toLocaleString('en-US')}
                  </span>
                  <span className="text-xl font-bold text-slate-600">BTU</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    Inverter Split System
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-3 max-w-xl">
                  For your <strong className="text-slate-800">{result.area.toFixed(2)} m²</strong> room with{' '}
                  <strong className="text-slate-800">{selectedCondition.title.toLowerCase()}</strong>, a{' '}
                  <strong className="text-[#0284C7]">{result.btu.toLocaleString('en-US')} BTU</strong> inverter unit provides optimal comfort and rapid cooling throw.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-72">
                <button
                  type="button"
                  onClick={handleAddToBooking}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#042B60] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer text-center"
                >
                  Add {result.btu.toLocaleString('en-US')} BTU to Booking Form
                </button>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer text-center"
                >
                  WhatsApp This Sizing
                </a>
                <button
                  type="button"
                  onClick={handleStartAgain}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Recalculate
                </button>
              </div>
            </div>

            {/* AVERAGE DAILY ELECTRICITY SAVINGS ESTIMATOR */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    <h4 className="text-lg font-bold text-[#042B60]">
                      Average Daily Electricity Savings
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    How much power an AUX modulating inverter saves versus old fixed-speed non-inverter compressors.
                  </p>
                </div>

                {/* Daily usage hours interactive toggle */}
                <div className="flex items-center gap-2 bg-[#F8FBFF] p-2 rounded-xl border border-slate-200 self-start sm:self-auto">
                  <span className="text-[11px] text-slate-600 font-medium">Daily Runtime:</span>
                  {[4, 7, 12].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => {
                        setDailyHours(hours);
                        if (result) {
                          setResult({
                            ...result,
                            savings: calculateElectricitySavings(result.btu, hours),
                          });
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                        dailyHours === hours
                          ? 'bg-[#0284C7] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Metric 1: Daily kWh Saved */}
                <div className="p-5 rounded-2xl bg-[#0284C7]/5 border border-[#0284C7]/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0369A1] block">
                      Daily Power Cut
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-[#042B60]">
                        ~{result.savings.dailyKwhSaved}
                      </span>
                      <span className="text-xs font-bold text-slate-600">kWh / day saved</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">
                    Based on {dailyHours} hours daily operation at steady-state climate maintenance.
                  </p>
                </div>

                {/* Metric 2: Monthly Conservation */}
                <div className="p-5 rounded-2xl bg-[#0284C7]/5 border border-[#0284C7]/20 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0369A1] block">
                      Monthly Energy Saved
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-[#042B60]">
                        ~{result.savings.monthlyKwhSaved}
                      </span>
                      <span className="text-xs font-bold text-slate-600">kWh / month</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">
                    Helps lower monthly electricity bills and protects against Durban tariff hikes.
                  </p>
                </div>

                {/* Metric 3: Modulation Efficiency */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white flex flex-col justify-between shadow-md">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                      Modulation Benefit
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-extrabold font-mono">
                        {result.savings.percentSaved}%
                      </span>
                      <span className="text-xs font-semibold text-sky-100">Power reduction</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-sky-100 mt-3 leading-relaxed">
                    Modulates compressor draw down to ~35% once room is cold, avoiding energy spikes.
                  </p>
                </div>

              </div>

              {/* High-capacity Multi-split notice */}
              {result.needsMultiple && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  <strong>Large Space Recommendation:</strong> For rooms over 48 m², a multi-split or ceiling cassette system ensures balanced temperature distribution without cold spots. Our senior technician will verify on site during your free measurement.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
