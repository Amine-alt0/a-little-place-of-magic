import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="relative z-10 w-full flex items-center justify-between px-6 sm:px-12 md:px-20 py-6 h-[88px] max-w-7xl mx-auto">
      {/* Logo & Title */}
      <div 
        onClick={() => onNavigate('home')} 
        className="flex items-center gap-3 cursor-pointer group transition-opacity hover:opacity-90"
      >
        <div className="w-[22px] h-[22px] shrink-0 transition-transform duration-500 group-hover:rotate-45">
          <img src="/assets/spark.svg" alt="A little spark" className="w-full h-full" />
        </div>
        <h1 className="font-garamond font-medium text-[22px] sm:text-[25px] leading-tight text-[#fff9ef] tracking-wide">
          A little place of magic
        </h1>
      </div>

      {/* Navigation action / Link */}
      <div className="flex items-center gap-4">
        {currentScreen !== 'home' ? (
          <button
            onClick={() => onNavigate('home')}
            className="font-sans text-[13px] text-[#c5a66a] hover:text-[#fff9ef] transition-colors py-1 px-3 rounded-lg hover:bg-[#25263f]/50 cursor-pointer"
          >
            Home
          </button>
        ) : (
          <span className="font-sans text-[12px] sm:text-[13px] text-[#c5a66a] select-none tracking-wider">
            Made for you
          </span>
        )}

        {/* Quiet Inbox shortcut for creator/brother */}
        <button
          onClick={() => onNavigate(currentScreen === 'inbox' ? 'home' : 'inbox')}
          title="Quiet Inbox (Notes for you)"
          className="text-[#715b49] hover:text-[#c5a66a] p-1.5 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 opacity-60 hover:opacity-100"
        >
          <span>💌</span>
        </button>
      </div>
    </header>
  );
};
