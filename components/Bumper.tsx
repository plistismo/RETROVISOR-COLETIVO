import React from 'react';

interface BumperProps {
  plate: string;
}

export const Bumper: React.FC<BumperProps> = ({ plate }) => {
  return (
    <div className="w-full bg-[#1e1e1e] h-20 rounded-b-[3rem] border-t-8 border-black shadow-2xl relative flex items-center justify-center z-20">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Plate Area */}
      <div className="bg-gray-200 border-2 border-gray-500 rounded px-4 py-1 shadow-lg transform translate-y-2 z-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center border-b border-gray-400 mb-0.5 px-1">
             <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
             <span className="text-[7px] uppercase font-bold text-gray-600 tracking-wider">Brasil</span>
        </div>
        <div className="font-['Jost'] font-bold text-2xl text-black tracking-widest uppercase leading-none">
          {plate}
        </div>
      </div>

      {/* Fog Lights / Reflectors */}
      <div className="absolute left-12 w-12 h-4 bg-red-900/50 rounded-full border border-gray-700 shadow-inner"></div>
      <div className="absolute right-12 w-12 h-4 bg-red-900/50 rounded-full border border-gray-700 shadow-inner"></div>
    </div>
  );
};