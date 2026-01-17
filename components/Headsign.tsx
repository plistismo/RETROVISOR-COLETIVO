import React from 'react';

interface HeadsignProps {
  lineNumber: string;
  destination: string;
}

export const Headsign: React.FC<HeadsignProps> = ({ lineNumber, destination }) => {
  return (
    <div className="w-full bg-black p-4 rounded-t-3xl border-b-8 border-gray-800 shadow-lg z-10 relative">
      <div className="bg-[#111] border-4 border-gray-700 rounded-lg p-2 h-24 sm:h-32 flex items-center justify-between shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* LED/Canvas Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 pointer-events-none"></div>

        {/* Number Box */}
        <div className="h-full w-1/4 bg-[#220000] border-r-4 border-gray-800 flex items-center justify-center relative">
          <span className="font-['Share_Tech_Mono'] text-yellow-400 text-3xl sm:text-5xl md:text-6xl animate-pulse font-bold drop-shadow-[0_0_5px_rgba(255,200,0,0.8)]">
            {lineNumber}
          </span>
        </div>

        {/* Destination Box */}
        <div className="h-full w-3/4 flex items-center justify-center bg-[#0a0a0a]">
           <span className="font-['Share_Tech_Mono'] text-amber-500 text-2xl sm:text-4xl md:text-5xl uppercase tracking-widest text-center px-2 drop-shadow-[0_0_8px_rgba(255,165,0,0.6)]">
            {destination}
          </span>
        </div>
      </div>
    </div>
  );
};
