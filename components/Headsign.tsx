import React, { useState } from 'react';

interface HeadsignProps {
  lineNumber: string;
  destination: string;
  isOn?: boolean;
}

export const Headsign: React.FC<HeadsignProps> = ({ lineNumber, destination, isOn = true }) => {
  const [activeLight, setActiveLight] = useState<'TP' | 'TS' | null>(null);

  const toggleLight = (type: 'TP' | 'TS') => {
    if (!isOn) return;
    setActiveLight(prev => prev === type ? null : type);
  };

  // Parsing line number for the split display: "5341-10" -> "5341"
  const cleanLineNumber = lineNumber.split('-')[0];

  // Helper to determine font size based on text length to avoid line breaks
  const getDestinationStyle = (text: string) => {
    const len = text.length;
    // Logic: The longer the text, the smaller the percentage of container width (cqw) used.
    if (len > 15) {
      return { fontSize: 'clamp(1.2rem, 9cqw, 2rem)' }; // Very long text
    } else if (len > 8) {
      return { fontSize: 'clamp(1.8rem, 11cqw, 2.8rem)' }; // Medium text (like TERM. LAPA)
    } else {
      return { fontSize: 'clamp(2.5rem, 15cqw, 3.8rem)' }; // Short text
    }
  };

  return (
    <div className="w-full relative z-20">
      
      {/* Top Roof Section (Fibra de vidro superior do S21) */}
      <div className="bg-[#1a1a1a] h-12 rounded-t-[30px] border-b-2 border-gray-700 flex justify-center items-center relative shadow-lg">
        
        {/* TP / TS Lights Container */}
        <div className="flex gap-16">
          
          {/* TP Light */}
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toggleLight('TP')}>
            <div className={`w-12 h-6 rounded-full border-2 border-gray-600 transition-all duration-300 shadow-inner
              ${isOn && activeLight === 'TP' 
                ? 'bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] border-red-800' 
                : 'bg-red-900/30'}`}
            ></div>
            <span className="text-[10px] text-gray-500 font-bold font-['Jost'] tracking-widest select-none">TP</span>
          </div>

          {/* TS Light */}
          <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toggleLight('TS')}>
             <div className={`w-12 h-6 rounded-full border-2 border-gray-600 transition-all duration-300 shadow-inner
              ${isOn && activeLight === 'TS' 
                ? 'bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.8)] border-red-800' 
                : 'bg-red-900/30'}`}
            ></div>
            <span className="text-[10px] text-gray-500 font-bold font-['Jost'] tracking-widest select-none">TS</span>
          </div>

        </div>
      </div>

      {/* Main Headsign Box Container - Height h-24 */}
      <div className="bg-black p-2 border-x-8 border-gray-800 shadow-2xl relative flex gap-2 h-24">
        
        {/* Left Box: Fixed Number */}
        <div className="w-1/3 h-full bg-[#111] rounded border-4 border-gray-700 relative overflow-hidden flex items-center justify-center">
           {/* Glass Glare */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
           
           <span className={`font-['Jost'] font-bold text-6xl sm:text-7xl tracking-tighter transition-opacity duration-500 leading-none mt-1
             ${isOn ? 'text-white opacity-90' : 'text-gray-800 opacity-20'}`}>
             {cleanLineNumber}
           </span>
        </div>

        {/* Right Box: Rolling Destination */}
        <div className="w-2/3 h-full bg-[#111] rounded border-4 border-gray-700 relative overflow-hidden" style={{ containerType: 'inline-size' }}>
           {/* Glass Glare */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
           
           {/* Texture */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-10 pointer-events-none z-0"></div>

           {/* The Scroll Container */}
           <div className={`w-full h-[400%] absolute top-0 left-0 flex flex-col transition-all duration-500
             ${isOn ? (activeLight ? '' : 'animate-roll-destination') : ''}
           `}
             style={{
               // If a light is active, force position. 0% is TP, 50% is TS.
               transform: activeLight === 'TP' ? 'translateY(0)' : activeLight === 'TS' ? 'translateY(-50%)' : undefined
             }}
           >
             
             {/* 1. Main Destination (TP) */}
             <div className="h-[25%] flex items-center justify-center bg-[#050505] px-2 overflow-hidden">
                <span className={`font-['Jost'] font-bold uppercase tracking-wider text-center leading-none whitespace-nowrap
                  ${isOn ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-yellow-900/20'}`}
                  style={getDestinationStyle(destination)}
                >
                  {destination}
                </span>
             </div>

             {/* 2. Intermediates */}
             <div className="h-[25%] flex flex-col items-center justify-center bg-[#050505] space-y-1 overflow-hidden">
                <span className={`font-['Jost'] font-bold text-lg sm:text-xl uppercase tracking-widest whitespace-nowrap
                  ${isOn ? 'text-green-400' : 'text-green-900/20'}`}>
                  SESC POMPEIA
                </span>
                 <span className={`font-['Jost'] font-bold text-lg sm:text-xl uppercase tracking-widest whitespace-nowrap
                  ${isOn ? 'text-green-400' : 'text-green-900/20'}`}>
                  TRAV. LAPA
                </span>
             </div>

             {/* 3. Secondary Destination (TS) */}
             <div className="h-[25%] flex items-center justify-center bg-[#050505] px-2 overflow-hidden">
                <span className={`font-['Jost'] font-bold uppercase tracking-wider text-center leading-none whitespace-nowrap
                  ${isOn ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-yellow-900/20'}`}
                  style={getDestinationStyle("TERM. SECUNDÁRIO")}
                >
                  TERM. SECUNDÁRIO
                </span>
             </div>

             {/* 4. Intermediates Clone / Loop */}
             <div className="h-[25%] flex flex-col items-center justify-center bg-[#050505] space-y-1 overflow-hidden">
                 <span className={`font-['Jost'] font-bold text-lg sm:text-xl uppercase tracking-widest whitespace-nowrap
                  ${isOn ? 'text-green-400' : 'text-green-900/20'}`}>
                  TRAV. LAPA
                </span>
                 <span className={`font-['Jost'] font-bold text-lg sm:text-xl uppercase tracking-widest whitespace-nowrap
                  ${isOn ? 'text-green-400' : 'text-green-900/20'}`}>
                  SESC POMPEIA
                </span>
             </div>

             {/* 5. Main Clone for loop is simulated by resetting to 0 via keyframe */}

           </div>
        </div>

      </div>
    </div>
  );
};