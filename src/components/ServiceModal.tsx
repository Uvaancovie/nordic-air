import React from 'react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0A1322] to-[#162740] text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            Close
          </button>

          <div className="text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
            <span>{service.category === 'residential' ? 'Home Service' : 'Business Service'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {service.title}
          </h3>

          <p className="text-sm text-slate-300 mt-2 max-w-lg">
            {service.tagline}
          </p>
        </div>

        {/* Modal Body in Simple English (No Icons, No Emojis, No Prices) */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              What We Do
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              What Is Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#1B5299] font-bold shrink-0">—</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#1B5299]/10 border border-[#1B5299]/20">
              <span className="text-[11px] font-semibold text-[#1B5299] uppercase tracking-wider block mb-1">
                Best Suited For
              </span>
              <span className="text-xs text-slate-800 font-medium">
                {service.recommendedFor}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                Warranty & Guarantee
              </span>
              <span className="text-xs text-slate-800 font-medium">
                {service.warranty}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Free quotes · Durban licensed team · No surprises
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-center"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(service.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-xl shadow-xs transition-colors cursor-pointer text-center"
            >
              Book this Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
