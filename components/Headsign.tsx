import React, { useState, useMemo } from 'react';

interface HeadsignProps {
  lineNumber: string;
  destination: string; // TP
  secondaryDestination: string; // TS
  intermediateDestinations: string[];
  isOn?: boolean;
}

export const Headsign: React.FC<HeadsignProps> = ({ 
  lineNumber, 
  destination, 
  secondaryDestination, 
  intermediateDestinations,
  isOn = true 
}) => {
  const [activeLight, setActiveLight] = useState<'TP' | 'TS'>('TP');

  const toggleLight = (type: 'TP' | 'TS') => {
    if (!isOn) return;
    setActiveLight(type);
  };

  // Parsing line number
  const cleanLineNumber = lineNumber.split('-')[0];

  // --- DESTINATION LOGIC ---
  // Create the full strip: [TP, ...intermediates, TS]
  const destinationStrip = useMemo(() => {
    // Ensure we always have a valid array
    const intermediates = intermediateDestinations || [];
    return [destination, ...intermediates, secondaryDestination];
  }, [destination, secondaryDestination, intermediateDestinations]);

  // Determine index: 0 for TP, last index for TS
  const activeIndex = activeLight === 'TP' ? 0 : destinationStrip.length - 1;

  // --- LINE NUMBER LOGIC ---
  // Generate random numbers for the "spin" effect, ending with the actual number
  const numberStrip = useMemo(() => {
    const randoms = Array.from({ length: 15 }).map(() => 
      Math.floor(1000 + Math.random() * 9000).toString()
    );
    return [...randoms, cleanLineNumber];
  }, [cleanLineNumber]); // Only regenerate when the line number actually changes

  // Helper for dynamic font size using Container Query Units (cqw)
  const getDestinationStyle = (text: string) => {
    const len = text.length;
    // Increased cqw values to utilize space better, but kept clamps to avoid overflow
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
             {/* Key changes forces re-render of animation */}
             <div 
                key={cleanLineNumber} 
                className={`flex flex-col w-full absolute top-0 left-0 ${isOn ? 'animate-slot-roll-custom' : ''}`}
             >
                {numberStrip.map((num, i) => (
                  <div key={i} className="h-[80px] flex items-center justify-center shrink-0"> 
                     {/* height matches parent container roughly (h-24 minus borders/padding ~ 80px) */}
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

           {/* The Destination Strip */}
           <div 
             className="w-full absolute top-0 left-0 flex flex-col transition-transform ease-in-out"
             style={{
               height: `${destinationStrip.length * 100}%`,
               transform: `translateY(-${(activeIndex * (100 / destinationStrip.length))}%)`,
               transitionDuration: '3000ms' // Slower, smoother roll
             }}
           >
             {destinationStrip.map((dest, i) => (
               <div 
                  key={i} 
                  className="w-full flex items-center justify-center bg-[#050505] px-2 overflow-hidden" 
                  style={{ height: `${100 / destinationStrip.length}%` }} // Equal height for all items
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

      <style>{`
        @keyframes slotRollCustom {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-100% + 80px)); } /* Stops at the last item (assuming 80px item height) */
        }
        .animate-slot-roll-custom {
          animation: slotRollCustom 1.5s cubic-bezier(0.1, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};