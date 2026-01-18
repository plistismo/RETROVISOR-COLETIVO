import React, { useState, useEffect } from 'react';
import { BUS_LINES } from './constants';
import { Headsign } from './components/Headsign';
import { Windshield } from './components/Windshield';
import { FrontMask } from './components/FrontMask';
import { Bumper } from './components/Bumper';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const currentLine = BUS_LINES[currentIndex];

  const handleNext = () => {
    if (!isOn) return;
    setCurrentIndex((prev) => (prev + 1) % BUS_LINES.length);
  };

  const handlePrev = () => {
    if (!isOn) return;
    setCurrentIndex((prev) => (prev - 1 + BUS_LINES.length) % BUS_LINES.length);
  };

  const handleIgnition = () => {
    if (isOn || isStarting) return;

    setIsStarting(true);
    
    // Simula o tempo do motor de arranque
    setTimeout(() => {
      setIsStarting(false);
      setIsOn(true);
    }, 1500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOn) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOn]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-2 sm:p-4 overflow-x-hidden relative">
      
      {/* Ignition Overlay (Key) */}
      {!isOn && !isStarting && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500">
           <button 
             onClick={handleIgnition}
             className="group flex flex-col items-center justify-center p-8 rounded-full bg-yellow-500 hover:bg-yellow-400 shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all transform hover:scale-105 active:scale-95 border-4 border-yellow-700"
           >
             <div className="w-16 h-16 border-4 border-black rounded-full mb-2 flex items-center justify-center relative">
                <div className="w-2 h-8 bg-black"></div>
                <div className="absolute w-8 h-2 bg-black"></div>
             </div>
             <span className="font-['Jost'] text-black text-xl uppercase tracking-widest font-bold">Dar Partida</span>
           </button>
           <p className="mt-4 text-gray-400 font-['Jost'] font-bold text-sm animate-pulse">Gire a chave para iniciar o sistema</p>
        </div>
      )}

      {/* The Bus Container */}
      <div 
        className={`w-full max-w-3xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 relative
          ${isStarting ? 'animate-engine-start' : ''} 
          ${isOn ? 'animate-engine-idle filter-none' : 'brightness-50 grayscale-[0.8]'}
        `}
        style={{ '--bus-color': currentLine.color } as React.CSSProperties}
      >
        
        {/* 1. Header (Letreiro) */}
        <Headsign 
          lineNumber={currentLine.lineNumber} 
          destination={currentLine.destination} 
          isOn={isOn}
        />

        {/* 2. Main (Para-brisa) */}
        <Windshield 
          {...currentLine}
          isOn={isOn}
        />

        {/* 3. Controls (Capô e Faróis) */}
        <FrontMask 
          logoText={currentLine.companyLogoText}
          onPrev={handlePrev}
          onNext={handleNext}
          isOn={isOn}
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