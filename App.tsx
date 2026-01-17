import React, { useState, useEffect } from 'react';
import { BUS_LINES } from './constants';
import { Headsign } from './components/Headsign';
import { Windshield } from './components/Windshield';
import { FrontMask } from './components/FrontMask';
import { Bumper } from './components/Bumper';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = BUS_LINES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BUS_LINES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BUS_LINES.length) % BUS_LINES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-2 sm:p-4 overflow-x-hidden">
      
      {/* The Bus Container */}
      <div 
        className="w-full max-w-3xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-700"
        style={{ '--bus-color': currentLine.color } as React.CSSProperties}
      >
        
        {/* 1. Header (Letreiro) */}
        <Headsign 
          lineNumber={currentLine.lineNumber} 
          destination={currentLine.destination} 
        />

        {/* 2. Main (Para-brisa) */}
        <Windshield 
          description={currentLine.description}
          history={currentLine.history}
          year={currentLine.year}
          companyName={currentLine.companyName}
        />

        {/* 3. Controls (Capô e Faróis) */}
        <FrontMask 
          logoText={currentLine.companyLogoText}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* 4. Footer (Para-choque) */}
        <Bumper 
          plate={currentLine.plate}
        />

      </div>

      {/* Background Ambience (Asphalt texture hint) */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-[-1]"></div>
    </div>
  );
};

export default App;
