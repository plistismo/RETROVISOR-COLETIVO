import React, { useState, useMemo, useEffect } from 'react';
import { MASTER_DESTINATIONS, MASTER_LINE_NUMBERS } from '../constants';

interface HeadsignProps {
  lineNumber: string;
  destination: string; // TP
  secondaryDestination: string; // TS
  intermediateDestinations: string[]; // Ignored for the main roll logic now, but kept in props
  isOn?: boolean;
}

export const Headsign: React.FC<HeadsignProps> = ({ 
  lineNumber, 
  destination, 
  secondaryDestination, 
  isOn = true 
}) => {
  const [activeLight, setActiveLight] = useState<'TP' | 'TS'>('TP');

  const toggleLight = (type: 'TP' | 'TS') => {
    if (!isOn) return;
    setActiveLight(type);
  };

  // Parsing line number
  const cleanLineNumber = lineNumber.split('-')[0];

  // --- DESTINATION LOGIC (GLOBAL ROLL) ---
  
  // Determine which text we WANT to show
  const targetText = activeLight === 'TP' ? destination : secondaryDestination;
  
  // Find where it is in the master list
  const targetIndex = useMemo(() => {
    const idx = MASTER_DESTINATIONS.indexOf(targetText);
    return idx >= 0 ? idx : 0; 
  }, [targetText]);

  // Determine transition duration based on distance
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('2s');

  useEffect(() => {
    if (!isOn) return;

    const distance = Math.abs(targetIndex - currentIndex);
    // Base speed logic
    const newDurationMs = Math.min(6000, 2000 + (distance * 100));
    setTransitionDuration(`${newDurationMs}ms`);
    
    // Update index to trigger animation
    setCurrentIndex(targetIndex);
  }, [targetIndex, isOn]);


  // --- LINE NUMBER LOGIC (GLOBAL ROLL) ---
  
  // Find where current line number is in the master list
  const targetLineIndex = useMemo(() => {
    const idx = MASTER_LINE_NUMBERS.indexOf(cleanLineNumber);
    return idx >= 0 ? idx : 0;
  }, [cleanLineNumber]);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lineTransitionDuration, setLineTransitionDuration] = useState('2s');

  useEffect(() => {
    if (!isOn) return;
    
    const distance = Math.abs(targetLineIndex - currentLineIndex);
    // Similar duration logic to destination
    const newDurationMs = Math.min(5000, 1500 + (distance * 150));
    setLineTransitionDuration(`${newDurationMs}ms`);

    setCurrentLineIndex(targetLineIndex);
  }, [targetLineIndex, isOn]);

  // Helper for dynamic font size using Container Query Units (cqw)
  const getDestinationStyle = (text: string) => {
    const len = text.length;
    if (len > 20) {
       return { fontSize: 'clamp(1rem, 6cqw, 1.8rem)' }; 
    } else if (len > 12) {
      return { fontSize: 'clamp(1.5rem, 8cqw, 2.5rem)' };
    } else {
      return { fontSize: 'clamp(2.5rem, 13cqw, 4rem)' };
    }
  };

  return (
    <div className="w-full relative z-20">
      
      {/* Top Roof Section */}
      <div className="bg-[#1a1a1a] h-12 rounded-t-[30px] border-b-2 border-gray-700 flex justify-center items-center relative shadow-lg">
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

      {/* Main Headsign Box */}
      <div className="bg-black p-2 border-x-8 border-gray-800 shadow-2xl relative flex gap-2 h-24">
        
        {/* Left Box: Line Number */}
        <div className="w-1/3 h-full bg-[#111] rounded border-4 border-gray-700 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
           
           <div className="relative w-full h-full overflow-hidden">
             {/* The Number Strip - GLOBAL LIST */}
             <div 
                className="w-full absolute top-0 left-0 flex flex-col transition-transform ease-in-out"
                style={{
                   height: `${MASTER_LINE_NUMBERS.length * 100}%`,
                   transform: `translateY(-${(currentLineIndex * (100 / MASTER_LINE_NUMBERS.length))}%)`,
                   transitionDuration: isOn ? lineTransitionDuration : '0s'
                }}
             >
                {MASTER_LINE_NUMBERS.map((num, i) => (
                  <div key={i} className="w-full flex items-center justify-center shrink-0 border-b border-white/5"
                     style={{ height: `${100 / MASTER_LINE_NUMBERS.length}%` }} 
                  > 
                     <span className={`font-['Jost'] font-bold text-6xl sm:text-7xl tracking-tighter leading-none
                       ${isOn ? 'text-white opacity-90' : 'text-gray-800 opacity-20'}`}>
                       {num}
                     </span>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Right Box: Destination Roll */}
        <div className="w-2/3 h-full bg-[#111] rounded border-4 border-gray-700 relative overflow-hidden" style={{ containerType: 'inline-size' }}>
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-10 pointer-events-none z-0"></div>

           {/* The Destination Strip - GLOBAL LIST */}
           <div 
             className="w-full absolute top-0 left-0 flex flex-col transition-transform ease-in-out"
             style={{
               height: `${MASTER_DESTINATIONS.length * 100}%`,
               transform: `translateY(-${(currentIndex * (100 / MASTER_DESTINATIONS.length))}%)`,
               transitionDuration: isOn ? transitionDuration : '0s'
             }}
           >
             {MASTER_DESTINATIONS.map((dest, i) => (
               <div 
                  key={i} 
                  className="w-full flex items-center justify-center bg-[#050505] px-2 overflow-hidden border-b border-white/5" 
                  style={{ height: `${100 / MASTER_DESTINATIONS.length}%` }} // Equal height for all items
               >
                  <span className={`font-['Jost'] font-bold uppercase tracking-wider text-center leading-none whitespace-nowrap
                    ${isOn ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-yellow-900/20'}`}
                    style={getDestinationStyle(dest)}
                  >
                    {dest}
                  </span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};