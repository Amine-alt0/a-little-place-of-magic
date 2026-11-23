import React, { useState, useEffect } from 'react';
import { Atmosphere } from './components/Atmosphere';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { CheckInScreen } from './components/CheckInScreen';
import { ListeningScreen } from './components/ListeningScreen';
import { YourPaceScreen } from './components/YourPaceScreen';
import { HowICanHelpScreen } from './components/HowICanHelpScreen';
import { SendingScreen } from './components/SendingScreen';
import { ReassuranceScreen } from './components/ReassuranceScreen';
import { YourLetterScreen } from './components/YourLetterScreen';
import { InboxScreen } from './components/InboxScreen';
import { ScreenType, LetterData } from './types';
import { api, DEFAULT_LETTER } from './services/api';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [motionPaused, setMotionPaused] = useState<boolean>(() => {
    return localStorage.getItem('magic_motion_paused') === 'true';
  });
  const [letter, setLetter] = useState<LetterData>(DEFAULT_LETTER);

  // Load letter content from backend / Supabase
  useEffect(() => {
    api.fetchLetter().then(setLetter);
  }, []);

  const toggleMotion = () => {
    setMotionPaused((prev) => {
      const next = !prev;
      localStorage.setItem('magic_motion_paused', String(next));
      return next;
    });
  };

  const handleSendCheckIn = async (message: string) => {
    setCurrentScreen('sending');
    await api.sendCheckIn({
      feeling_state: 'not_feeling_okay',
      ready_to_talk: true,
      message
    });
    // Brief pause to allow the calming animation to be experienced
    setTimeout(() => {
      setCurrentScreen('reassurance');
    }, 1200);
  };

  const handlePaceAcknowledge = async () => {
    await api.sendCheckIn({
      feeling_state: 'not_feeling_okay',
      ready_to_talk: false,
      message: ''
    });
  };

  const handleSendSupport = async (choices: string[], specificRequest: string) => {
    setCurrentScreen('sending');
    await api.sendSupportRequest({
      choices,
      specific_request: specificRequest
    });
    setTimeout(() => {
      setCurrentScreen('reassurance');
    }, 1200);
  };

  return (
    <div className={`relative min-h-screen bg-[#171b35] flex flex-col justify-between overflow-x-hidden ${motionPaused ? 'motion-paused' : ''}`}>
      {/* Visual Magical Atmosphere (Candles, halo wash, floating spell lights) */}
      <Atmosphere paused={motionPaused} />

      {/* Top Header */}
      <Header currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Main Experience Screen */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 px-3 sm:px-6 z-10 w-full">
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'check-in' && (
          <CheckInScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'listening' && (
          <ListeningScreen onNavigate={setCurrentScreen} onSubmit={handleSendCheckIn} />
        )}

        {currentScreen === 'your-pace' && (
          <YourPaceScreen onNavigate={setCurrentScreen} onAcknowledge={handlePaceAcknowledge} />
        )}

        {currentScreen === 'how-i-can-help' && (
          <HowICanHelpScreen onNavigate={setCurrentScreen} onSubmit={handleSendSupport} />
        )}

        {currentScreen === 'sending' && (
          <SendingScreen />
        )}

        {currentScreen === 'reassurance' && (
          <ReassuranceScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'your-letter' && (
          <YourLetterScreen letter={letter} onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'inbox' && (
          <InboxScreen onNavigate={setCurrentScreen} />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer paused={motionPaused} onToggleMotion={toggleMotion} />
    </div>
  );
};

export default App;
