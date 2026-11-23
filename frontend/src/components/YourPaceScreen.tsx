import React from 'react';
import { ScreenType } from '../types';

interface YourPaceScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAcknowledge: () => void;
}

export const YourPaceScreen: React.FC<YourPaceScreenProps> = ({ onNavigate, onAcknowledge }) => {
  const handleReturn = () => {
    onAcknowledge();
    onNavigate('home');
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
      <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[24px] p-8 sm:p-10 flex flex-col items-center gap-5 sm:gap-6 shadow-[0px_12px_36px_0px_rgba(0,0,0,0.18)] text-center">
        {/* Guiding Sparkle */}
        <div className="w-10 h-10 shrink-0">
          <img src="/assets/guiding-sparkle.svg" alt="" className="w-full h-full object-contain" />
        </div>

        <h2 className="font-garamond font-medium text-[38px] sm:text-[48px] leading-[1.12] text-[#3b3036]">
          That's completely okay.
        </h2>

        <p className="font-sans text-[16px] sm:text-[17px] leading-relaxed text-[#715b49] max-w-md">
          You don't have to explain yourself. I'll respect that. Whenever you're ready, I'm here.
        </p>

        <p className="font-caveat text-[26px] sm:text-[30px] text-[#642f43] font-semibold">
          Your pace. Always.
        </p>

        <button
          onClick={handleReturn}
          className="w-full bg-[#642f43] hover:bg-[#522435] text-[#fff9ef] border border-[#642f43] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01] mt-2"
        >
          Back to the little space
        </button>
      </div>
    </div>
  );
};
