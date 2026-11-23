import React from 'react';

export const SendingScreen: React.FC = () => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center gap-7 px-4 sm:px-6 pt-16 pb-20 max-w-2xl mx-auto anim-welcome">
      <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[24px] p-10 sm:p-14 flex flex-col items-center gap-6 shadow-[0px_12px_36px_0px_rgba(0,0,0,0.18)] text-center">
        {/* Pulsing Sparkle */}
        <div className="w-12 h-12 shrink-0 animate-spin" style={{ animationDuration: '4s' }}>
          <img src="/assets/guiding-sparkle.svg" alt="" className="w-full h-full object-contain" />
        </div>

        <h2 className="font-garamond font-medium text-[38px] sm:text-[46px] leading-[1.12] text-[#3b3036]">
          Sending a little note…
        </h2>

        <p className="font-sans text-[16px] text-[#715b49]">
          Just a moment.
        </p>

        {/* Gentle progress track */}
        <div className="w-48 h-1.5 bg-[#d1be98]/40 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-[#642f43] rounded-full animate-pulse w-full" />
        </div>

        <p className="font-sans text-[12px] text-[#715b49]/70 mt-2">
          Delivering with warmth and care.
        </p>
      </div>
    </div>
  );
};
