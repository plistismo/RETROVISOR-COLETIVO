import React from 'react';

interface WindshieldProps {
  description: string;
  history: string;
  year: string;
  companyName: string;
}

export const Windshield: React.FC<WindshieldProps> = ({ description, history, year, companyName }) => {
  return (
    <div className="relative w-full mx-auto z-0 -mt-2">
      {/* Rubber Seal (Borda de Borracha) */}
      <div className="bg-gray-900 p-3 sm:p-5 rounded-3xl shadow-2xl">
        
        {/* The Glass Area */}
        <div className="relative bg-blue-50/90 rounded-2xl h-[400px] sm:h-[450px] overflow-hidden flex flex-col p-6 text-gray-800 shadow-inner border border-blue-200/50">
          
          {/* Glass Reflection Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 pointer-events-none z-10 rounded-2xl"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-3xl rounded-full pointer-events-none z-10"></div>

          {/* Wiper Shadows (Optional Detail) */}
          <div className="absolute bottom-0 left-1/4 w-2 h-48 bg-black/10 rotate-45 transform origin-bottom rounded-full blur-sm z-0"></div>
          <div className="absolute bottom-0 right-1/4 w-2 h-48 bg-black/10 -rotate-45 transform origin-bottom rounded-full blur-sm z-0"></div>

          {/* Content Card (A folha de papel colada no vidro) */}
          <div className="relative z-20 bg-white shadow-lg p-6 rotate-1 transform max-w-lg mx-auto border border-gray-300 transition-all duration-500 ease-in-out">
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 border border-yellow-200 shadow-sm rotate-2"></div>

            <h2 className="text-2xl font-bold font-['Saira_Stencil_One'] text-gray-800 mb-2 border-b-2 border-black pb-1 uppercase">
              Ficha Técnica
            </h2>
            
            <div className="space-y-4 font-['Roboto']">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Empresa Operadora</p>
                <p className="text-lg font-bold text-gray-900">{companyName}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Ano de Referência</p>
                <div className="inline-block bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono mt-1">
                  {year}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Sobre a Linha</p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-1">
                  {history}
                </p>
              </div>
            </div>

             <div className="mt-4 pt-4 border-t border-dashed border-gray-400 text-center text-xs text-gray-500 italic">
               "{description}"
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
