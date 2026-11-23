import React from 'react';
import { ScreenType } from '../types';

interface CheckInScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({ onNavigate }) => {
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
      <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[24px] p-7 sm:p-9 flex flex-col items-center gap-5 sm:gap-6 shadow-[0px_12px_36px_0px_rgba(0,0,0,0.18)]">
        {/* Guiding Sparkle */}
        <div className="w-10 h-10 shrink-0">
          <img src="/assets/guiding-sparkle.svg" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Question heading */}
        <h2 className="font-garamond font-medium text-[34px] sm:text-[43px] leading-[1.15] text-[#3b3036] text-center">
          Would you like to tell me what's going on?
        </h2>

        {/* Subtext */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-[#715b49] text-center max-w-lg">
          You can tell me as much or as little as you want. There's no pressure.
        </p>

        {/* Choice buttons */}
        <div className="w-full flex flex-col gap-3.5 mt-2">
          <button
            onClick={() => onNavigate('listening')}
            className="w-full bg-[#642f43] hover:bg-[#522435] text-[#fff9ef] border border-[#642f43] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01]"
          >
            I'd like to talk about it.
          </button>

          <button
            onClick={() => onNavigate('your-pace')}
            className="w-full bg-[#fff9ef] hover:bg-[#f6ebd6] text-[#642f43] border border-[#d1be98] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01]"
          >
            I don't want to talk about it yet.
          </button>
        </div>

        {/* Gentle reassurance tag */}
        <p className="font-caveat text-[16px] text-[#715b49] text-center mt-1">
          Either choice is completely okay.
        </p>
      </div>
    </div>
  );
};
