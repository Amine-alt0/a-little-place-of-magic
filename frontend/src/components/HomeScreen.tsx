import React from 'react';
import { ParchmentChoice } from './ParchmentChoice';
import { ScreenType } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-8 sm:gap-10 px-4 sm:px-8 pt-6 sm:pt-10 pb-16 max-w-6xl mx-auto anim-welcome">
      {/* Welcome message header */}
      <div className="text-center max-w-[760px] flex flex-col items-center gap-4 sm:gap-5 px-2">
        <p className="font-caveat text-[28px] sm:text-[32px] text-[#c5a66a] leading-tight">
          Hey, you.
        </p>
        <div className="font-garamond font-medium text-[42px] sm:text-[56px] md:text-[68px] leading-[1.1] text-[#fff9ef]">
          <p className="mb-0">Sometimes, words are hard.</p>
          <p>{`That's okay.`}</p>
        </div>
        <p className="font-sans text-[15px] sm:text-[17px] leading-relaxed text-[#b7b5c7] max-w-2xl">
          I made this little place for you. Whenever things don't feel right, you can come here. You don't have to explain anything unless you want to.
        </p>
      </div>

      {/* Two gentle choices */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 max-w-[1080px]">
        <ParchmentChoice choice="check-in" onClick={() => onNavigate('check-in')} />
        <ParchmentChoice choice="support" onClick={() => onNavigate('how-i-can-help')} />
      </div>

      {/* A letter just for you banner */}
      <button
        onClick={() => onNavigate('your-letter')}
        className="group w-full max-w-[1080px] bg-[#25263f] border border-[#393a50] hover:border-[#c5a66a]/60 rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_36px_rgba(197,166,106,0.12)] transition-all duration-300 text-left"
      >
        {/* Closed Envelope Graphic */}
        <div className="w-[140px] sm:w-[184px] h-[95px] sm:h-[120px] shrink-0 group-hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/closed-envelope.svg"
            alt="Closed envelope"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        {/* Letter invitation copy */}
        <div className="flex-1 flex flex-col gap-2.5">
          <h2 className="font-garamond font-medium text-[28px] sm:text-[34px] leading-tight text-[#f1e6d0]">
            A little letter for you.
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] text-[#b7b5c7] leading-relaxed">
            A few words from me, for whenever you feel like reading them.
          </p>
          <div className="mt-2 text-[#c5a66a] group-hover:text-[#fff9ef] font-sans font-medium text-[14px] flex items-center gap-2 transition-colors">
            <span>Open your letter</span>
            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          </div>
        </div>
      </button>
    </div>
  );
};
