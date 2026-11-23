import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Check } from 'lucide-react';

interface HowICanHelpScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmit: (choices: string[], specificRequest: string) => void;
}

const SUPPORT_OPTIONS = [
  'I just need someone to listen.',
  'I need some advice.',
  'I need a little distraction.',
  "I'd like some company.",
  'I need some space for now.',
  'Please check on me later.',
  'Something else...'
];

export const HowICanHelpScreen: React.FC<HowICanHelpScreenProps> = ({ onNavigate, onSubmit }) => {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [specificRequest, setSpecificRequest] = useState('');

  const toggleChoice = (choice: string) => {
    setSelectedChoices(prev =>
      prev.includes(choice) ? prev.filter(c => c !== choice) : [...prev, choice]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedChoices, specificRequest);
  };

  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-7 px-4 sm:px-6 pt-6 pb-16 max-w-2xl mx-auto anim-welcome">
      {/* Back navigation */}
      <button
        onClick={() => onNavigate('home')}
        className="w-full text-left font-sans text-[14px] text-[#c5a66a] hover:text-[#fff9ef] transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>←</span>
        <span>Back to the little space</span>
      </button>

      {/* Parchment conversation card */}
      <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[24px] p-7 sm:p-9 flex flex-col items-start gap-5 sm:gap-6 shadow-[0px_12px_36px_0px_rgba(0,0,0,0.18)]">
        <h2 className="font-garamond font-medium text-[34px] sm:text-[43px] leading-[1.12] text-[#3b3036]">
          What would help you feel a little better right now?
        </h2>

        <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-[#715b49]">
          You don't have to figure everything out alone. Just let me know what you need from me.
        </p>

        <p className="font-sans text-[12px] text-[#715b49]">
          Choose any that feel right. Everything is optional.
        </p>

        {/* Options list */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2.5">
            {SUPPORT_OPTIONS.map((option) => {
              const isChecked = selectedChoices.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleChoice(option)}
                  className={`w-full text-left flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[12px] border transition-all duration-200 cursor-pointer ${
                    isChecked
                      ? 'bg-[#fff9ef] border-[#642f43] shadow-sm'
                      : 'bg-[#fff9ef]/70 hover:bg-[#fff9ef] border-[#d1be98]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#642f43] border-[#642f43] text-[#fff9ef]'
                        : 'bg-[#fff9ef] border-[#806b55]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-sans text-[15px] text-[#3b3036] leading-relaxed">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Specific request text area */}
          <div className="w-full flex flex-col gap-2 mt-2">
            <label className="font-sans font-medium text-[14px] text-[#3b3036]">
              Is there anything specific you'd like me to do?
            </label>
            <textarea
              value={specificRequest}
              onChange={(e) => setSpecificRequest(e.target.value)}
              placeholder="You can tell me exactly what would help..."
              rows={4}
              className="w-full bg-[#fff9ef] border border-[#d1be98] focus:border-[#642f43] text-[#3b3036] placeholder-[#715b49]/70 rounded-[12px] p-3.5 font-sans text-[15px] leading-relaxed resize-none outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#642f43] hover:bg-[#522435] text-[#fff9ef] border border-[#642f43] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01] mt-2"
          >
            Send my answer
          </button>
        </form>

        <p className="font-sans text-[12px] text-[#715b49] text-center w-full">
          Your choices and any message will be shared with me.
        </p>
      </div>
    </div>
  );
};
