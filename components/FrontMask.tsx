import React from 'react';

interface FrontMaskProps {
  logoText: string;
  onPrev: () => void;
  onNext: () => void;
  isOn?: boolean;
}

export const FrontMask: React.FC<FrontMaskProps> = ({ logoText, onPrev, onNext, isOn = true }) => {
  return (
    <div className="w-full relative flex flex-col">
      
      {/* 
         UPPER SECTION: The "Saia" (Colored Band with Company Name)
      */}
      <div className="w-full h-24 relative flex items-center justify-center bg-[var(--bus-color)] border-b-4 border-black/20 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2)] z-10 rounded-t-xl pt-2">
         <div className="absolute top-0 w-full h-1 bg-white/10"></div>
         <div className="text-white font-['Jost'] font-black text-5xl opacity-25 tracking-tighter select-none scale-y-110">
            {logoText}
         </div>
      </div>

      {/* 
         LOWER SECTION: Body Color (White/Gray) 
         Houses the headlights and the grille.
      */}
      <div className="bg-gray-100 w-full pt-2 pb-6 px-4 relative z-20 flex flex-col justify-start min-h-[140px]">
         
         <div className="flex justify-between items-center max-w-5xl mx-auto gap-4 w-full mt-4">
            
            {/* 
                LEFT GROUP 
            */}
            <div className="flex items-center gap-2 bg-gray-200 p-2 pr-4 rounded-r-xl rounded-l-md border border-gray-400 shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] transform skew-x-3">
                 
                 {/* INTERACTIVE BLINKER (PREV BUTTON) - Modern Vertical */}
                 <button 
                    onClick={onPrev}
                    disabled={!isOn}
                    className={`w-6 h-16 rounded-sm border border-gray-400 shadow-md transition-all duration-200 overflow-hidden relative group cursor-pointer
                      ${isOn ? 'hover:brightness-125 active:scale-95' : 'cursor-not-allowed opacity-50'}
                      ${isOn ? 'bg-amber-500' : 'bg-amber-900'}
                    `}
                    aria-label="Voltar Linha"
                 >
                    {/* Crystal texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_45%,rgba(255,255,255,0.4)_50%,transparent_55%)] bg-[length:100%_4px]"></div>
                    {isOn && <div className="absolute inset-0 animate-pulse bg-amber-300/40"></div>}
                 </button>

                 {/* DOUBLE ROUND HEADLIGHTS */}
                 <div className="flex gap-2 ml-2">
                    <div className={`w-14 h-14 rounded-full border-4 border-gray-300 relative overflow-hidden shadow-lg
                        ${isOn ? 'bg-[#fffee0] shadow-[0_0_25px_rgba(255,253,200,0.8)]' : 'bg-gray-800'}
                    `}>
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,transparent_30%,black_100%)]"></div>
                    </div>
                    <div className={`w-14 h-14 rounded-full border-4 border-gray-300 relative overflow-hidden shadow-lg
                        ${isOn ? 'bg-[#fffee0] shadow-[0_0_25px_rgba(255,253,200,0.8)]' : 'bg-gray-800'}
                    `}>
                         <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,transparent_30%,black_100%)]"></div>
                    </div>
                 </div>
            </div>

            {/* CENTER GRILLE */}
            <div className="flex-1 max-w-[240px] h-20 bg-[#1a1a1a] rounded-lg border-4 border-gray-500 flex flex-col items-center justify-center relative shadow-inner mx-2">
               {/* Horizontal slats */}
               <div className="w-[90%] h-1 bg-gray-700 my-1.5 rounded-full"></div>
               <div className="w-[90%] h-1 bg-gray-700 my-1.5 rounded-full"></div>
               <div className="w-[90%] h-1 bg-gray-700 my-1.5 rounded-full"></div>
               
               {/* Emblem */}
               <div className="absolute bg-gradient-to-br from-gray-800 to-black w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center shadow-2xl z-10">
                   <span className="text-[10px] text-white font-black tracking-tighter">CAIO</span>
               </div>
            </div>

            {/* 
                RIGHT GROUP 
            */}
            <div className="flex items-center gap-2 bg-gray-200 p-2 pl-4 rounded-l-xl rounded-r-md border border-gray-400 shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] transform -skew-x-3">
                 
                 {/* DOUBLE ROUND HEADLIGHTS */}
                 <div className="flex gap-2 mr-2">
                    <div className={`w-14 h-14 rounded-full border-4 border-gray-300 relative overflow-hidden shadow-lg
                        ${isOn ? 'bg-[#fffee0] shadow-[0_0_25px_rgba(255,253,200,0.8)]' : 'bg-gray-800'}
                    `}>
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,transparent_30%,black_100%)]"></div>
                    </div>
                    <div className={`w-14 h-14 rounded-full border-4 border-gray-300 relative overflow-hidden shadow-lg
                        ${isOn ? 'bg-[#fffee0] shadow-[0_0_25px_rgba(255,253,200,0.8)]' : 'bg-gray-800'}
                    `}>
                         <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,transparent_30%,black_100%)]"></div>
                    </div>
                 </div>

                 {/* INTERACTIVE BLINKER (NEXT BUTTON) */}
                 <button 
                    onClick={onNext}
                    disabled={!isOn}
                    className={`w-6 h-16 rounded-sm border border-gray-400 shadow-md transition-all duration-200 overflow-hidden relative group cursor-pointer
                      ${isOn ? 'hover:brightness-125 active:scale-95' : 'cursor-not-allowed opacity-50'}
                      ${isOn ? 'bg-amber-500' : 'bg-amber-900'}
                    `}
                    aria-label="Próxima Linha"
                 >
                    {/* Crystal texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_45%,rgba(255,255,255,0.4)_50%,transparent_55%)] bg-[length:100%_4px]"></div>
                    {isOn && <div className="absolute inset-0 animate-pulse bg-amber-300/40"></div>}
                 </button>

            </div>
         </div>
      </div>

    </div>
  );
};