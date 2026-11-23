import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ListeningScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSubmit: (message: string) => void;
}

export const ListeningScreen: React.FC<ListeningScreenProps> = ({ onNavigate, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
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
      <div className="w-full bg-[#f1e6d0] border border-[#c5a66a] rounded-[24px] p-7 sm:p-9 flex flex-col items-start gap-5 shadow-[0px_12px_36px_0px_rgba(0,0,0,0.18)]">
        <h2 className="font-garamond font-medium text-[38px] sm:text-[48px] leading-[1.12] text-[#3b3036]">
          I'm listening.
        </h2>

        <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-[#715b49]">
          Take your time. Write whatever is on your mind. You don't have to find the perfect words.
        </p>

        {/* Message Input Box */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's been on your mind?"
              rows={8}
              className="w-full bg-[#fff9ef] border-2 border-[#d1be98] focus:border-[#642f43] text-[#3b3036] placeholder-[#715b49]/70 rounded-[12px] p-4 font-sans text-[15px] leading-relaxed resize-none outline-none transition-colors shadow-inner"
            />
          </div>

          <p className="font-sans text-[12px] text-[#715b49] -mt-1">
            You can leave this blank. Nothing here needs explaining.
          </p>

          <button
            type="submit"
            className="w-full bg-[#642f43] hover:bg-[#522435] text-[#fff9ef] border border-[#642f43] rounded-[12px] p-3.5 sm:p-4 font-sans font-medium text-[15px] text-center cursor-pointer transition-all duration-200 shadow-sm hover:scale-[1.01]"
          >
            Send this to me.
          </button>
        </form>

        <p className="font-sans text-[12px] text-[#715b49] text-center w-full">
          This will be shared with Amine, the person who made this space.
        </p>

        <button
          onClick={() => onNavigate('check-in')}
          className="w-full bg-[#fff9ef] hover:bg-[#f6ebd6] text-[#642f43] border border-[#d1be98] rounded-[12px] p-3 font-sans font-medium text-[14px] text-center cursor-pointer transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};
