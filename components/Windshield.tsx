import React, { useMemo, useState } from 'react';
import { BusLine } from '../types';

interface WindshieldProps extends BusLine {
  isOn?: boolean;
}

export const Windshield: React.FC<WindshieldProps> = ({ 
  lineNumber, 
  itinerary, 
  viaSign,
  isOn = true 
}) => {
  
  const [showDetails, setShowDetails] = useState(false);

  // Generate random raindrops
  const rainDrops = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.5 + Math.random() * 0.5,
      opacity: 0.2 + Math.random() * 0.4
    }));
  }, []);

  const toggleDetails = () => {
    if (isOn) setShowDetails(!showDetails);
  };

  const cleanLineNumber = lineNumber.split('-')[0];
  const lineSuffix = lineNumber.split('-')[1] || "10";

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6">
      
      {/* Rubber Seal (Moldura preta) */}
      <div className="bg-[#111] p-2 pt-3 rounded-[1.5rem] shadow-2xl relative z-10">
        
        {/* The Glass Area */}
        <div className={`relative rounded-[1rem] h-[280px] sm:h-[300px] overflow-hidden flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-gray-800 transition-colors duration-1000
           ${isOn ? 'bg-[#1a202c]' : 'bg-black'}`}> 
          
          {/* RAIN LAYER */}
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden mix-blend-screen">
             {rainDrops.map((drop, i) => (
                <div 
                  key={i}
                  className="absolute top-[-50px] w-[1px] h-20 bg-white/30 rounded-full animate-rain-fall"
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
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/60 pointer-events-none z-10"></div>
          
          {/* WIPERS */}
          <div className="absolute bottom-0 w-full h-full z-20 pointer-events-none">
            {/* Left Wiper */}
            <div className={`absolute bottom-2 left-[25%] w-2 h-[220px] bg-[#0a0a0a] origin-bottom transform -rotate-[50deg] shadow-xl rounded-full border border-gray-800
              ${isOn ? 'animate-[wipe_2.5s_ease-in-out_infinite]' : ''}`}>
               <div className="absolute top-0 -left-1 w-4 h-32 bg-black rounded opacity-90"></div>
            </div>
             {/* Right Wiper */}
            <div className={`absolute bottom-2 right-[45%] w-2 h-[220px] bg-[#0a0a0a] origin-bottom transform -rotate-[50deg] shadow-xl rounded-full border border-gray-800
              ${isOn ? 'animate-[wipe_2.5s_ease-in-out_infinite_0.15s]' : ''}`}>
               <div className="absolute top-0 -left-1 w-4 h-32 bg-black rounded opacity-90"></div>
            </div>
          </div>

          {/* --- ELEMENTS ON GLASS --- */}

          {/* 1. Via Sign - MOVED TO TOP CENTER */}
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 
            ${isOn && !showDetails ? 'opacity-95 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <div className="bg-white border-2 border-black shadow-lg px-4 py-1.5 min-w-[160px] shadow-black/50 transform rotate-[-1deg]">
               <span className="font-['Jost'] font-black text-black text-xl leading-none block uppercase text-center tracking-tighter">
                 {viaSign}
               </span>
             </div>
             {/* Tape holding it */}
             <div className="absolute -top-3 left-1/2 w-8 h-6 bg-gray-400/40 -translate-x-1/2 rotate-2 backdrop-blur-sm"></div>
          </div>

          {/* 2. Itinerary Overlay */}
          <div className={`absolute inset-0 z-25 bg-black/80 backdrop-blur-md p-6 flex flex-col gap-4 transition-all duration-500
             ${showDetails && isOn ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'}`}>
             <h3 className="text-yellow-400 font-['Jost'] font-black text-2xl uppercase border-b-2 border-yellow-500/50 pb-2">
               Itinerário
             </h3>
             <div className="flex flex-wrap gap-x-4 gap-y-2 content-start overflow-y-auto">
               {itinerary ? itinerary.map((street, idx) => (
                 <div key={idx} className="bg-white/10 px-3 py-1 rounded text-white font-['Jost'] font-bold text-sm border-l-2 border-yellow-500">
                   {street}
                 </div>
               )) : (
                 <p className="text-gray-500">Sem detalhes.</p>
               )}
             </div>
          </div>

          {/* 3. Bottom Plate (Line Number) - Kept at bottom left */}
          <button 
            onClick={toggleDetails}
            className={`absolute bottom-4 left-6 z-20 transition-all duration-300 transform hover:scale-105 active:scale-95 group
              ${isOn ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}
          >
            <div className="flex border-[2px] border-black rounded shadow-lg overflow-hidden w-40 h-14">
               <div className="w-2/3 bg-gray-100 flex items-center justify-center border-r border-black group-hover:bg-white transition-colors">
                  <span className="font-['Jost'] font-black text-black text-3xl tracking-tighter">
                    {cleanLineNumber}
                  </span>
               </div>
               <div className="w-1/3 bg-black flex items-center justify-center">
                  <span className="font-['Jost'] font-bold text-white text-2xl tracking-tighter">
                    {lineSuffix}
                  </span>
               </div>
            </div>
          </button>

        </div>
      </div>
      <style>{`
        @keyframes wipe {
          0% { transform: rotate(-50deg); }
          40% { transform: rotate(50deg); }
          60% { transform: rotate(50deg); }
          100% { transform: rotate(-50deg); }
        }
      `}</style>
    </div>
  );
};