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
    <section id="guide" className="py-16 bg-[#F1F5F9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2 shadow-xs">
            <span>Efficiency Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E2E]">
            How an Inverter Saves Electricity
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Older air conditioners run at full blast and switch off repeatedly, wasting power. Modern inverter units gently adjust their speed, using over half the electricity.
          </p>
        </div>

        {/* Neat Card (No Icons, No Emojis, No Pricing) */}
        <div className="neo-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm">
          <div className="space-y-6">
            
            {/* Slider: Hours used per day */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={hoursInputId} className="text-xs font-bold text-slate-700">
                  Daily Usage:
                </label>
                <span className="text-sm font-bold font-mono text-[#0077D4] bg-sky-50 px-2.5 py-1 rounded-lg">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0077D4]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>2 hrs (Bedtime)</span>
                <span>6 hrs (Average evening)</span>
                <span>14 hrs (All day)</span>
              </div>
            </div>

            {/* Comparison Box (No Currency or Prices) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center sm:text-left">
                <span className="text-[11px] font-medium text-slate-400 block uppercase">
                  Old Standard AC
                </span>
                <span className="text-xl font-bold text-slate-700 font-mono mt-1 block">
                  100% Load
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">Frequent power spikes</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center sm:text-left">
                <span className="text-[11px] font-medium text-[#0077D4] block uppercase">
                  Modern Inverter
                </span>
                <span className="text-xl font-bold text-[#0077D4] font-mono mt-1 block">
                  35% Modulated
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  Cuts power draw by {powerSavedPercentage}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1E2E] text-white text-center sm:text-left flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">
                    Energy Efficiency
                  </span>
                  <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">
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
                  className="mt-2 text-[11px] font-semibold text-sky-300 hover:text-white transition-colors text-left"
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
