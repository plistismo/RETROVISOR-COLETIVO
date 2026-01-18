import React, { useMemo, useState } from 'react';
import { BusLine } from '../types';

interface WindshieldProps extends BusLine {
  isOn?: boolean;
}

export const Windshield: React.FC<WindshieldProps> = ({ 
  lineNumber, 
  itinerary, 
  isOn = true 
}) => {
  
  const [showDetails, setShowDetails] = useState(false);

  // Generate random raindrops
  const rainDrops = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.7 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.5
    }));
  }, []);

  const toggleDetails = () => {
    if (isOn) setShowDetails(!showDetails);
  };

  const cleanLineNumber = lineNumber.split('-')[0]; // "5341"
  const lineSuffix = lineNumber.split('-')[1] || "10"; // "10"

  return (
    <div className="relative w-full mx-auto z-0 -mt-2">
      {/* Rubber Seal (Borda de Borracha grossa do S21) */}
      <div className="bg-[#111] p-4 sm:p-5 rounded-3xl shadow-2xl border-t border-gray-800">
        
        {/* The Glass Area */}
        <div className={`relative rounded-[2rem] h-[450px] overflow-hidden flex flex-col shadow-inner border border-gray-800/50 transition-colors duration-1000
           ${isOn ? 'bg-[#1a202c]/90' : 'bg-black'}`}> {/* Vidro fumê escuro */}
          
          {/* RAIN LAYER */}
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden mix-blend-overlay">
             {rainDrops.map((drop, i) => (
                <div 
                  key={i}
                  className="absolute top-[-20px] w-[2px] h-16 bg-gradient-to-b from-transparent to-white/40 rounded-full animate-rain-fall"
                  style={{
                    left: `${drop.left}%`,
                    animationDelay: `${drop.delay}s`,
                    animationDuration: `${drop.duration}s`,
                    opacity: drop.opacity
                  }}
                />
             ))}
          </div>

          {/* Reflections */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none z-10"></div>
          
          {/* --- ELEMENTS ON GLASS --- */}

          {/* 1. Top Left Fixed Sign - Hides when details are shown */}
          <div className={`absolute top-6 left-6 z-20 transform -rotate-2 transition-all duration-500 
            ${isOn && !showDetails ? 'opacity-90 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <div className="bg-red-700 border-2 border-white/80 shadow-lg px-3 py-2 max-w-[140px] text-center">
               <span className="font-['Jost'] font-bold text-white text-lg leading-tight block drop-shadow-md">
                 VIA ALAM. STO. AMARO
               </span>
             </div>
             {/* Tape */}
             <div className="absolute -top-3 left-1/2 w-8 h-4 bg-white/40 rotate-90"></div>
          </div>

          {/* 2. Hidden Detailed Itinerary Overlay */}
          <div className={`absolute inset-0 z-15 bg-black/80 backdrop-blur-sm p-8 flex flex-wrap content-start gap-x-8 gap-y-2 transition-all duration-500
             ${showDetails && isOn ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
             
             <h3 className="w-full text-yellow-400 font-['Jost'] font-bold text-xl mb-4 border-b border-gray-600 pb-2">
               ITINERÁRIO PRINCIPAL
             </h3>
             
             {/* List Columns */}
             {itinerary ? itinerary.map((street, idx) => (
               <div key={idx} className="w-[45%] text-white/90 font-['Jost'] font-bold text-sm border-l-4 border-yellow-500 pl-2 mb-2">
                 {street}
               </div>
             )) : (
               <p className="text-gray-500">Informação não disponível.</p>
             )}
          </div>

          {/* 3. Bottom Center Trigger (The Split Sign) */}
          <button 
            onClick={toggleDetails}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95
              ${isOn ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-default'}`}
          >
            <div className="flex border-4 border-black rounded-lg overflow-hidden w-64 h-24 bg-black">
               {/* Left Side: White bg, Black Text */}
               <div className="w-2/3 bg-white flex items-center justify-center border-r-2 border-black">
                  <span className="font-['Jost'] font-bold text-black text-6xl tracking-tighter">
                    {cleanLineNumber}
                  </span>
               </div>
               {/* Right Side: Black bg, White Text */}
               <div className="w-1/3 bg-black flex items-center justify-center">
                  <span className="font-['Jost'] font-bold text-white text-5xl tracking-tighter">
                    {lineSuffix}
                  </span>
               </div>
            </div>
            {/* Suction cups logic (visual) */}
            <div className="absolute -top-2 left-4 w-4 h-4 rounded-full bg-gray-400/50 shadow-inner"></div>
            <div className="absolute -top-2 right-4 w-4 h-4 rounded-full bg-gray-400/50 shadow-inner"></div>
          </button>

        </div>
      </div>
    </div>
  );
};