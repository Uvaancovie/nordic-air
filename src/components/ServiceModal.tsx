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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#E7F2FC] to-[#CFEAFB] text-[#042B60] relative border-b border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 px-3 py-1 rounded-lg bg-[#39A9EC]/10 hover:bg-[#39A9EC]/20 text-xs font-medium text-[#042B60] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            Close
          </button>

          <div className="text-xs font-semibold text-[#042B60] uppercase tracking-[0.18em] mb-2">
            <span>{service.category === 'residential' ? 'Home Service' : 'Business Service'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#042B60]">
            {service.title}
          </h3>

          <p className="text-sm text-slate-600 mt-2 max-w-lg">
            {service.tagline}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              What We Do
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="rounded-2xl bg-[#39A9EC]/[0.04] p-5 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              What Is Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#042B60] font-bold shrink-0">—</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#39A9EC]/10 border border-[#39A9EC]/25">
              <span className="text-[11px] font-semibold text-[#042B60] uppercase tracking-wider block mb-1">
                Best Suited For
              </span>
              <span className="text-xs text-slate-700 font-medium">
                {service.recommendedFor}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#39A9EC]/5 border border-[#39A9EC]/30">
              <span className="text-[11px] font-semibold text-[#042B60] uppercase tracking-wider block mb-1">
                Warranty & Guarantee
              </span>
              <span className="text-xs text-slate-700 font-medium">
                {service.warranty}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-[#39A9EC]/[0.04] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            Free quotes · Durban licensed team · No surprises
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-600 bg-[#39A9EC]/5 border border-slate-200 rounded-xl hover:bg-[#39A9EC]/10 transition-colors cursor-pointer text-center"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(service.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#042B60] hover:bg-[#088DD4] rounded-xl shadow-sm transition-colors cursor-pointer text-center"
            >
              Book this Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
