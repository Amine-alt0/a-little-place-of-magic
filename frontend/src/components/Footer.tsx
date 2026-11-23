import React from 'react';

interface FooterProps {
  paused: boolean;
  onToggleMotion: () => void;
}

export const Footer: React.FC<FooterProps> = ({ paused, onToggleMotion }) => {
  return (
    <footer className="relative z-10 w-full flex flex-col items-center gap-2.5 px-6 pt-5 pb-8 text-center max-w-3xl mx-auto mt-auto">
      <p className="font-caveat text-[16px] sm:text-[18px] text-[#c5a66a] leading-normal tracking-wide">
        No pressure. No perfect words.
      </p>
      <p className="font-sans text-[12px] text-[#b7b5c7] leading-relaxed max-w-md">
        Anything you send is shared with Amine, the person who made this space.
      </p>

      {/* Motion preference control */}
      <button
        onClick={onToggleMotion}
        className="mt-1 inline-flex items-center justify-center font-sans text-[12px] text-[#c5a66a] hover:text-[#fff9ef] transition-colors cursor-pointer py-1.5 px-4 rounded-full border border-[#c5a66a]/30 hover:border-[#c5a66a] bg-[#171b35]/60 backdrop-blur-sm"
      >
        {paused ? 'Resume motion' : 'Pause motion'}
      </button>
    </footer>
  );
};
