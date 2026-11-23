import React, { useState } from 'react';
import { ScreenType, LetterData } from '../types';

interface YourLetterScreenProps {
  letter: LetterData;
  onNavigate: (screen: ScreenType) => void;
}

export const YourLetterScreen: React.FC<YourLetterScreenProps> = ({ letter, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open or toggleable

  const toggleLetter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-7 px-4 sm:px-6 pt-6 pb-20 max-w-3xl mx-auto anim-welcome">
      {/* Back navigation */}
      <button
        onClick={() => onNavigate('home')}
        className="w-full text-left font-sans text-[14px] text-[#c5a66a] hover:text-[#fff9ef] transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span>←</span>
        <span>Back to the little space</span>
      </button>

      {/* Screen Title */}
      <h2 className="font-garamond font-medium text-[38px] sm:text-[50px] leading-tight text-[#f1e6d0] text-center">
        {letter.title}
      </h2>

      {/* Animated Opening Envelope Graphic */}
      <div 
        onClick={toggleLetter} 
        className="relative w-[220px] h-[190px] shrink-0 cursor-pointer group transition-transform hover:scale-105 duration-300"
        title={isOpen ? "Click to fold letter" : "Click wax seal to open"}
      >
        {/* Envelope Flap */}
        <div
          className="absolute left-0 top-0 w-[220px] h-[70px] transition-transform duration-700 origin-bottom"
          style={{
            transform: isOpen ? 'scaleY(1)' : 'scaleY(-1)',
          }}
        >
          <img src="/assets/envelope-flap.svg" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Envelope Back */}
        <div className="absolute left-0 top-[70px] w-[220px] h-[118px]">
          <img src="/assets/envelope-back.svg" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Envelope Front Folds */}
        <div className="absolute left-0 top-[70px] w-[220px] h-[118px]">
          <img src="/assets/envelope-front.svg" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Envelope Bottom Fold */}
        <div className="absolute left-0 top-[70px] w-[220px] h-[70px]">
          <img src="/assets/envelope-bottom.svg" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Wax Seal - breaks/fades when opened */}
        <div
          className={`absolute left-[92px] top-[114px] w-[36px] h-[36px] transition-all duration-500 ${
            isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <img src="/assets/wax-seal.svg" alt="Wax seal" className="w-full h-full object-contain filter drop-shadow" />
        </div>
      </div>

      {/* Personal Parchment Letter */}
      {isOpen && (
        <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[16px] sm:rounded-[20px] p-6 sm:p-12 flex flex-col font-caveat gap-5 sm:gap-6 text-left leading-[1.4] shadow-[0px_16px_40px_0px_rgba(0,0,0,0.22)] anim-welcome">
          {/* Salutation */}
          <p className="text-[#642f43] text-[28px] sm:text-[34px] font-bold">
            {letter.salutation}
          </p>

          {/* Letter Paragraphs */}
          <div className="flex flex-col gap-4 text-[#3b3036] text-[22px] sm:text-[27px] leading-relaxed">
            {letter.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Signoff */}
          <p className="text-[#642f43] text-[27px] sm:text-[32px] font-bold mt-2">
            {letter.signoff}
          </p>
        </div>
      )}

      {/* Return button */}
      <button
        onClick={() => onNavigate('home')}
        className="w-full bg-[#642f43] hover:bg-[#522435] text-[#fff9ef] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01]"
      >
        Back to the little space
      </button>
    </div>
  );
};
