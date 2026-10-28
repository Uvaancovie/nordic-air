import React, { useState, useId } from 'react';

interface EnergyEstimatorProps {
  onPreFillBooking: (details: { service: string; notes: string }) => void;
}

export const EnergyEstimator: React.FC<EnergyEstimatorProps> = ({ onPreFillBooking }) => {
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const hoursInputId = useId();

  // Pure efficiency metrics (NO PRICING, NO RANDS)
  const powerSavedPercentage = 65;

  return (
    <section id="guide" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Simple Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2563EB]/5 border border-slate-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-2">
            <span>Efficiency Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2563EB]">
            How an Inverter Saves Electricity
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Older air conditioners run at full blast and switch off repeatedly, wasting power. Modern inverter units gently adjust their speed, using over half the electricity.
          </p>
        </div>

        {/* Card */}
        <div className="surface-card rounded-3xl p-6 sm:p-8">
          <div className="space-y-6">

            {/* Slider: Hours used per day */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={hoursInputId} className="text-xs font-bold text-slate-600">
                  Daily Usage:
                </label>
                <span className="text-sm font-bold font-mono text-[#2563EB] bg-[#2563EB]/12 px-2.5 py-1 rounded-lg border border-[#2563EB]/20">
                  {hoursPerDay} hours / day
                </span>
              </div>
              <input
                id={hoursInputId}
                type="range"
                min="2"
                max="14"
                step="1"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2 bg-[#2563EB]/10 rounded-lg appearance-none cursor-pointer accent-[#E11D2E]"
              />
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>2 hrs (Bedtime)</span>
                <span>6 hrs (Average evening)</span>
                <span>14 hrs (All day)</span>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">

              <div className="p-4 rounded-2xl surface-inset text-center sm:text-left">
                <span className="text-[11px] font-medium text-slate-600 block uppercase">
                  Old Standard AC
                </span>
                <span className="text-xl font-bold text-slate-700 font-mono mt-1 block">
                  100% Load
                </span>
                <span className="text-[11px] text-slate-600 mt-1 block">Frequent power spikes</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/25 text-center sm:text-left">
                <span className="text-[11px] font-semibold text-[#2563EB] block uppercase">
                  Modern Inverter
                </span>
                <span className="text-xl font-bold text-[#2563EB] font-mono mt-1 block">
                  35% Modulated
                </span>
                <span className="text-[11px] text-emerald-300 font-semibold mt-1 block">
                  Cuts power draw by {powerSavedPercentage}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F1F5FF] border border-slate-200 text-[#2563EB] text-center sm:text-left flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-600 block uppercase">
                    Energy Efficiency
                  </span>
                  <span className="text-xl font-bold text-emerald-300 font-mono mt-1 block">
                    A+++ Rating
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onPreFillBooking({
                      service: 'Installation',
                      notes: `Inquiring about high-efficiency inverter models for energy savings.`,
                    })
                  }
                  className="mt-2 text-[11px] font-semibold text-[#2563EB] hover:text-[#2563EB] transition-colors text-left cursor-pointer"
                >
                  Ask about inverter models
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
