import React, { useState } from 'react';
import { FAQ_DATA } from '../data/modsData';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Everything you need to know about safety, version compatibility, shaders, and the installer.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-[#121212] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-[#ff6a00] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ff6a00]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                    {item.answer}
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
