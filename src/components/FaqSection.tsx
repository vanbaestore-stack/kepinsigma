import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950/80 backdrop-blur-[2px] border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.faq.heading}
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base">
            {t.faq.subheading}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-950/90 rounded-2xl border border-zinc-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div className="text-zinc-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
