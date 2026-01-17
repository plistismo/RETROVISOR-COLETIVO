import React from 'react';

interface BumperProps {
  plate: string;
}

export const Bumper: React.FC<BumperProps> = ({ plate }) => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 min-h-[120px] rounded-b-lg border-t-4 border-gray-600 shadow-2xl relative flex flex-col items-center justify-center py-6">
      
      {/* Metallic Texture Lines */}
      <div className="absolute top-2 w-full h-1 bg-white/30"></div>
      <div className="absolute bottom-2 w-full h-1 bg-black/20"></div>
      
      {/* License Plate */}
      <div className="bg-gray-200 border-4 border-black rounded px-4 py-2 shadow-lg transform -translate-y-2">
        <div className="text-[10px] text-center uppercase font-bold tracking-widest text-gray-600">Brasil</div>
        <div className="font-mono text-3xl sm:text-4xl font-bold text-gray-800 tracking-wider uppercase border-t border-gray-400 mt-1 pt-1">
          {plate}
        </div>
      </div>

      {/* Fog Lights / Utilities */}
      <div className="w-full max-w-4xl flex justify-between px-8 sm:px-16 mt-4">
        <div className="w-16 h-6 bg-red-800/80 rounded border border-gray-500 shadow-inner"></div>
        
        {/* Links */}
        <div className="flex space-x-4 text-xs font-bold text-gray-700 uppercase tracking-widest">
          <button className="hover:text-black hover:underline">Mapa</button>
          <span className="text-gray-400">|</span>
          <button className="hover:text-black hover:underline">Galeria</button>
          <span className="text-gray-400">|</span>
          <button className="hover:text-black hover:underline">Contato</button>
        </div>

        <div className="w-16 h-6 bg-red-800/80 rounded border border-gray-500 shadow-inner"></div>
      </div>
    </div>
  );
};
