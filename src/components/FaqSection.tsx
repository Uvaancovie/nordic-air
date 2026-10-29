import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'How do you provide quotes for air conditioning installations and repairs?',
      answer:
        'We provide free, transparent written quotations tailored to your specific room size and cooling needs. A qualified technician visits your space, checks the layout and sun exposure, and gives you an exact upfront quotation with all equipment, brackets, and labour included. There are no surprise fees or extra charges.',
    },
    {
      question: 'Can you come out today if my aircon stops working?',
      answer:
        'Yes. On hot Durban summer days, an aircon breakdown is urgent. We have technicians on standby 24/7 across Durban and Umhlanga. Call us at 031 940 3388 and we will dispatch a technician to assist you as soon as possible.',
    },
    {
      question: 'How do you stop air conditioners from rusting near the sea?',
      answer:
        'Sea air contains salt mist that can rust an ordinary air conditioner in less than two years. We only install units with anti-corrosion coil treatments, and we mount outdoor condensers on marine-grade brackets that will not rust or stain your exterior walls.',
    },
    {
      question: 'Which areas around Durban do you cover?',
      answer:
        'We cover all of Durban, Umhlanga, Ballito, Salt Rock, Durban North, Morningside, Berea, Westville, Cowies Hill, Kloof, and Hillcrest.',
    },
    {
      question: 'How quickly can I book a site visit?',
      answer:
        'For urgent breakdowns, we can usually assist on the same day. For new installations or routine servicing, we can typically visit within 24 to 48 hours at a time that suits your schedule.',
    },
    {
      question: 'What aircon brands do you install and repair?',
      answer:
        'We work on all major brands including Daikin, Samsung, LG, Carrier, Alliance, and Midea. We use genuine replacement parts and all new units include up to 5 years manufacturer warranty.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#FAFDFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2ED1DF]/5 border border-slate-200 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-3">
            <span>FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#082D43]">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Clear, honest answers to common questions about our air conditioning services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-slate-700 group-hover:text-[#148CC7] transition-colors pr-6">
                    {faq.question}
                  </span>

                  <span className="text-slate-600 font-mono font-bold text-lg w-6 text-center shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed pr-8 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact fallback block */}
        <div className="mt-10 p-6 rounded-2xl bg-[#2ED1DF]/[0.04] border border-slate-200 text-center text-xs text-slate-600">
          <span>Have a question not listed here? </span>
          <a
            href="tel:0319403388"
            className="font-semibold text-[#082D43] hover:underline ml-1"
          >
            Call us directly at (031) 940-3388
          </a>
        </div>

      </div>
    </section>
  );
};
