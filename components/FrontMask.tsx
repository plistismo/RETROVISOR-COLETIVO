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
        
        {/* Left Headlight Group (Visual Only) */}
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-lg`}
          >
             {/* The Lamp */}
             <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-300 border border-gray-400/50
               ${isOn 
                 ? 'bg-yellow-100/30 shadow-headlight-off' 
                 : 'bg-gray-800 shadow-inner'
               }`}></div>
             <div className="absolute inset-0 rounded-full opacity-40 bg-[repeating-conic-gradient(transparent_0deg,transparent_10deg,rgba(255,255,255,0.5)_15deg)] pointer-events-none"></div>
          </div>
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
                <span className="text-gray-300 font-bold text-3xl font-['Jost']">SP</span>
             </div>
          </div>
          
          <div className="absolute bottom-2 z-10 text-gray-400 font-bold font-['Jost'] tracking-[0.5em] text-xs">
            {logoText}
          </div>
        </div>

        {/* Right Headlight Group (Visual Only) */}
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-lg`}
          >
             {/* The Lamp */}
             <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-300 border border-gray-400/50
               ${isOn 
                 ? 'bg-yellow-100/30 shadow-headlight-off' 
                 : 'bg-gray-800 shadow-inner'
               }`}></div>
             <div className="absolute inset-0 rounded-full opacity-40 bg-[repeating-conic-gradient(transparent_0deg,transparent_10deg,rgba(255,255,255,0.5)_15deg)] pointer-events-none"></div>
          </div>
        </div>

      </div>
      
      {/* Turn Signals (Pisca Alerta) - NOW THE BUTTONS */}
      
      {/* Left Turn Signal (Previous) */}
      <button 
        onClick={onPrev}
        disabled={!isOn}
        aria-label="Linha Anterior"
        className={`absolute top-4 left-2 sm:left-4 w-8 h-20 rounded-md border-2 border-gray-600 shadow-[0_5px_10px_rgba(0,0,0,0.5)] transition-all duration-200 overflow-hidden
          ${isOn ? 'cursor-pointer hover:brightness-110 active:scale-95 active:brightness-125' : 'cursor-not-allowed opacity-50'}
        `}
      >
        <div className={`w-full h-full ${isOn ? 'bg-orange-500 animate-pulse' : 'bg-orange-900'}`}>
          {/* Internal texture */}
          <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,black_2px,black_4px)]"></div>
        </div>
      </button>

      {/* Right Turn Signal (Next) */}
      <button 
        onClick={onNext}
        disabled={!isOn}
        aria-label="Próxima Linha"
        className={`absolute top-4 right-2 sm:right-4 w-8 h-20 rounded-md border-2 border-gray-600 shadow-[0_5px_10px_rgba(0,0,0,0.5)] transition-all duration-200 overflow-hidden
          ${isOn ? 'cursor-pointer hover:brightness-110 active:scale-95 active:brightness-125' : 'cursor-not-allowed opacity-50'}
        `}
      >
        <div className={`w-full h-full ${isOn ? 'bg-orange-500 animate-pulse' : 'bg-orange-900'}`}>
          {/* Internal texture */}
          <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(-45deg,transparent,transparent_2px,black_2px,black_4px)]"></div>
        </div>
      </button>

    </div>
  );
};