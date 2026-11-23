import React from 'react';

interface ParchmentChoiceProps {
  choice: 'check-in' | 'support';
  onClick: () => void;
}

export const ParchmentChoice: React.FC<ParchmentChoiceProps> = ({ choice, onClick }) => {
  const isCheckIn = choice === 'check-in';

  return (
    <button
      onClick={onClick}
      className="group text-left relative w-full md:w-[528px] min-h-[273px] bg-[#f1e6d0] border border-[#c5a66a] rounded-[20px] p-7 flex flex-col justify-between shadow-[0px_6px_20px_0px_rgba(0,0,0,0.14)] hover:shadow-[0px_10px_28px_0px_rgba(0,0,0,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col gap-3.5">
        {/* Icon */}
        <div className="w-8 h-8 shrink-0">
          <img
            src={isCheckIn ? '/assets/moon-and-star.svg' : '/assets/open-book.svg'}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="font-garamond font-medium text-[27px] sm:text-[29px] leading-[1.15] text-[#3b3036]">
          {isCheckIn ? "I'm not feeling okay." : "Here's how you can help me."}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-[#715b49]">
          {isCheckIn
            ? 'Some days are just a little harder than others. You can let me know.'
            : 'Sometimes, knowing what someone needs makes all the difference.'}
        </p>
      </div>

      {/* Button */}
      <div className="mt-5 w-full bg-[#642f43] group-hover:bg-[#522435] text-[#fff9ef] rounded-[12px] p-3 flex items-center justify-between transition-colors shadow-sm">
        <span className="font-sans font-medium text-[14px]">
          {isCheckIn ? 'Let me know' : 'Tell you what I need'}
        </span>
        <span className="text-[#f1e6d0] text-[18px] group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </button>
  );
};
