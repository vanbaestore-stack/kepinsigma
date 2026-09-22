import React from 'react';
import { Calculator, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OrderWorkflow: React.FC = () => {
  const { t } = useLanguage();

  const icons = [Calculator, MessageSquare, ShieldCheck, CheckCircle2];

  return (
    <section id="alur" className="py-24 bg-zinc-950/80 backdrop-blur-[2px] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
            {t.workflow.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.workflow.heading}
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base">
            {t.workflow.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.workflow.steps.map((s, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="bg-zinc-950/90 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <IconComp className="w-6 h-6 text-red-400 shrink-0" />
                    <span className="font-mono text-xl font-bold text-zinc-500">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
