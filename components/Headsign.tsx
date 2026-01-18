import React, { useState, useMemo, useEffect } from 'react';
import { MASTER_DESTINATIONS, MASTER_LINE_NUMBERS } from '../constants';

interface HeadsignProps {
  lineNumber: string;
  destination: string;
  secondaryDestination: string;
  intermediateDestinations: string[];
  isOn?: boolean;
}

export const Headsign: React.FC<HeadsignProps> = ({ 
  lineNumber, 
  destination, 
  secondaryDestination, 
  isOn = true 
}) => {
  const [activeLight, setActiveLight] = useState<'TP' | 'TS'>('TP');

  // Destination Roll Logic
  const targetText = activeLight === 'TP' ? destination : secondaryDestination;
  const targetIndex = useMemo(() => {
    const idx = MASTER_DESTINATIONS.indexOf(targetText);
    return idx >= 0 ? idx : 0; 
  }, [targetText]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('2s');

  useEffect(() => {
    if (!isOn) return;
    const distance = Math.abs(targetIndex - currentIndex);
    const newDurationMs = Math.min(6000, 2000 + (distance * 100));
    setTransitionDuration(`${newDurationMs}ms`);
    setCurrentIndex(targetIndex);
    
    // Auto toggle simulation
    const interval = setInterval(() => {
        setActiveLight(prev => prev === 'TP' ? 'TS' : 'TP');
    }, 8000); 

    return () => clearInterval(interval);
  }, [targetText, isOn, targetIndex]); 

  useEffect(() => {
     setCurrentIndex(targetIndex);
  }, [targetIndex]);


  const cleanLineNumber = lineNumber.split('-')[0];
  // Line Number Roll Logic
  const targetLineIndex = useMemo(() => {
    const idx = MASTER_LINE_NUMBERS.indexOf(cleanLineNumber);
    return idx >= 0 ? idx : 0;
  }, [cleanLineNumber]);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lineTransitionDuration, setLineTransitionDuration] = useState('2s');

  useEffect(() => {
    if (!isOn) return;
    const distance = Math.abs(targetLineIndex - currentLineIndex);
    const newDurationMs = Math.min(5000, 1500 + (distance * 150));
    setLineTransitionDuration(`${newDurationMs}ms`);
    setCurrentLineIndex(targetLineIndex);
  }, [targetLineIndex, isOn]);

  // Precise Dynamic Font Sizing using Container Query Units (cqw)
  // This ensures the text ALWAYS fits the width of the container.
  const getDestinationStyle = (text: string) => {
    const len = text.length;
    // Formula: Size roughly = ContainerWidth / (CharCount * AvgCharWidthFactor)
    // We cap it at 18cqw (approx fitting height) and floor it at 4cqw.
    let val = 145 / (len + 1); 
    
    // Hard limits
    if (val > 22) val = 22; // Don't exceed height
    
    return { fontSize: `${val}cqw` };
  };

  return (
    <div className="w-full relative pt-2 px-2 bg-gray-100 rounded-t-[3.5rem] flex justify-center">
      
      {/* Top Roof / Destination Housing */}
      <div className="bg-[#151515] p-1.5 rounded-t-[1rem] rounded-b-sm border-b-4 border-gray-800 shadow-xl w-[98%] relative z-20">
        
        {/* Height tight to font (h-16 to h-20 range) */}
        <div className="flex gap-1.5 h-16 sm:h-20">
          
          {/* Left Box: Line Number */}
          <div className="w-[25%] bg-[#0a0a0a] rounded-sm border-2 border-gray-700 relative overflow-hidden flex items-center justify-center shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none"></div>
             <div className="relative w-full h-full overflow-hidden">
               <div 
                  className="w-full absolute top-0 left-0 flex flex-col transition-transform ease-in-out"
                  style={{
                     height: `${MASTER_LINE_NUMBERS.length * 100}%`,
                     transform: `translateY(-${(currentLineIndex * (100 / MASTER_LINE_NUMBERS.length))}%)`,
                     transitionDuration: isOn ? lineTransitionDuration : '0s'
                  }}
               >
                  {MASTER_LINE_NUMBERS.map((num, i) => (
                    <div key={i} className="w-full flex items-center justify-center shrink-0"
                       style={{ height: `${100 / MASTER_LINE_NUMBERS.length}%` }} 
                    > 
                       <span className={`font-['Jost'] font-bold text-4xl sm:text-5xl tracking-tighter leading-none
                         ${isOn ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-800 opacity-20'}`}>
                         {num}
                       </span>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          {/* Right Box: Destination Roll */}
          {/* containerType: 'inline-size' allows child elements to use 'cqw' units */}
          <div 
            className="w-[75%] bg-[#0a0a0a] rounded-sm border-2 border-gray-700 relative overflow-hidden flex items-center"
            style={{ containerType: 'inline-size' }}
          >
             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none"></div>

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
                    className="w-full h-full flex items-center justify-center px-1" 
                    style={{ height: `${100 / MASTER_DESTINATIONS.length}%` }} 
                 >
                    {/* NO WRAPPING allowed. Font size adjusts to fit. */}
                    <span className={`font-['Jost'] font-bold uppercase tracking-tight text-center leading-none whitespace-nowrap w-full
                      ${isOn ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'text-yellow-900/20'}`}
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
    </div>
  );
};