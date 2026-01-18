import React from 'react';

interface FrontMaskProps {
  logoText: string;
  onPrev: () => void;
  onNext: () => void;
  isOn?: boolean;
}

export const FrontMask: React.FC<FrontMaskProps> = ({ logoText, onPrev, onNext, isOn = true }) => {
  return (
    <div className="bg-[var(--bus-color)] w-full p-4 sm:p-8 relative transition-colors duration-700 ease-in-out shadow-[inset_0_10px_20px_rgba(0,0,0,0.3)]">
      
      {/* Grill Area */}
      <div className="flex justify-between items-center max-w-4xl mx-auto gap-4 sm:gap-8">
        
        {/* Left Headlight Group (Prev Button) */}
        <div className="flex flex-col items-center">
          <button
            onClick={onPrev}
            disabled={!isOn}
            aria-label="Linha Anterior"
            className={`group relative w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-lg transition-transform ${isOn ? 'active:scale-95 cursor-pointer' : 'cursor-not-allowed opacity-80'}`}
          >
             {/* The Lamp */}
             <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-300 border border-gray-400/50
               ${isOn 
                 ? 'bg-yellow-100/30 shadow-headlight-off group-hover:bg-yellow-100 group-hover:shadow-headlight-on' 
                 : 'bg-gray-800 shadow-inner' // Dead lamp
               }`}></div>
             {/* Reflector lines */}
             <div className="absolute inset-0 rounded-full opacity-40 bg-[repeating-conic-gradient(transparent_0deg,transparent_10deg,rgba(255,255,255,0.5)_15deg)]"></div>
          </button>
          <span className={`mt-2 text-xs font-bold font-['Jost'] uppercase tracking-wider bg-black/30 px-2 rounded transition-colors duration-500 ${isOn ? 'text-white/80' : 'text-gray-600'}`}>Anterior</span>
        </div>

        {/* Center Grille (Motor) */}
        <div className="flex-1 h-32 sm:h-40 bg-[#1a1a1a] rounded-lg border-b-4 border-gray-600 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
          {/* Grille Texture */}
          <div className="absolute inset-0 flex flex-col space-y-2 p-2 opacity-50">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full h-1 bg-gray-700 rounded-full"></div>
            ))}
          </div>

          {/* Mercedes Star / Logo Emblem */}
          <div className="relative z-10 w-24 h-24 rounded-full border-4 border-gray-300 bg-gray-800 flex items-center justify-center shadow-lg">
             <div className="w-20 h-20 rounded-full border border-gray-500 flex items-center justify-center bg-gray-900">
                {/* Simulated Logo */}
                <span className="text-gray-300 font-bold text-3xl font-['Jost']">SP</span>
             </div>
          </div>
          
          <div className="absolute bottom-2 z-10 text-gray-400 font-bold font-['Jost'] tracking-[0.5em] text-xs">
            {logoText}
          </div>
        </div>

        {/* Right Headlight Group (Next Button) */}
        <div className="flex flex-col items-center">
          <button
            onClick={onNext}
            disabled={!isOn}
            aria-label="Próxima Linha"
            className={`group relative w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-lg transition-transform ${isOn ? 'active:scale-95 cursor-pointer' : 'cursor-not-allowed opacity-80'}`}
          >
             {/* The Lamp */}
             <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-300 border border-gray-400/50
               ${isOn 
                 ? 'bg-yellow-100/30 shadow-headlight-off group-hover:bg-yellow-100 group-hover:shadow-headlight-on' 
                 : 'bg-gray-800 shadow-inner'
               }`}></div>
             {/* Reflector lines */}
             <div className="absolute inset-0 rounded-full opacity-40 bg-[repeating-conic-gradient(transparent_0deg,transparent_10deg,rgba(255,255,255,0.5)_15deg)]"></div>
          </button>
           <span className={`mt-2 text-xs font-bold font-['Jost'] uppercase tracking-wider bg-black/30 px-2 rounded transition-colors duration-500 ${isOn ? 'text-white/80' : 'text-gray-600'}`}>Próximo</span>
        </div>

      </div>
      
      {/* Turn Signals (Setas) */}
      <div className={`absolute top-4 left-2 sm:left-4 w-8 h-16 rounded border-2 border-gray-600 shadow-md transition-all duration-1000 ${isOn ? 'bg-orange-500 opacity-80' : 'bg-orange-900 opacity-40'}`}></div>
      <div className={`absolute top-4 right-2 sm:right-4 w-8 h-16 rounded border-2 border-gray-600 shadow-md transition-all duration-1000 ${isOn ? 'bg-orange-500 opacity-80' : 'bg-orange-900 opacity-40'}`}></div>

    </div>
  );
};