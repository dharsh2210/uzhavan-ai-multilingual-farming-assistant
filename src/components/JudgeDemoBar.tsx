import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Users, RefreshCw, Cpu, Presentation } from 'lucide-react';

interface JudgeDemoBarProps {
  onOpenArchitecture: () => void;
  onOpenPitchGuide: () => void;
}

export const JudgeDemoBar: React.FC<JudgeDemoBarProps> = ({
  onOpenArchitecture,
  onOpenPitchGuide
}) => {
  const { user, demoFarmersList, switchFarmer, resetDemoData, isLoading } = useAuth();
  const { language } = useLanguage();

  return (
    <div id="judge-demo-bar" className="bg-[#0e241b] text-green-100 border-b border-green-900/60 text-xs py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Badge & Persona Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase text-[10px]">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            Hackathon Judge Demo Suite
          </span>

          <div className="flex items-center gap-1 bg-green-950/70 border border-green-800/80 rounded-full p-0.5">
            <Users className="w-3.5 h-3.5 text-green-400 ml-2" />
            <span className="text-green-300 text-[11px] font-medium hidden sm:inline px-1">Persona:</span>
            {demoFarmersList.map((f) => {
              const isSelected = user.id === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => switchFarmer(f.id)}
                  disabled={isLoading}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-yellow-400 text-green-950 shadow-sm'
                      : 'text-green-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{f.name.split(' ')[0]}</span>
                  <span className="opacity-80 text-[10px] ml-1">({f.district})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Pitch Guide, Architecture & Reset Data */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenPitchGuide}
            className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-green-950 px-3 py-1 rounded-full transition-all font-bold text-xs shadow-sm whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5 text-green-950 flex-shrink-0" />
            <span>3-Min Pitch Guide</span>
          </button>

          <button
            type="button"
            onClick={onOpenArchitecture}
            className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/20 hover:bg-white/20 px-3 py-1 rounded-full transition-colors font-semibold text-xs whitespace-nowrap"
          >
            <Cpu className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
            <span>AI Architecture</span>
          </button>

          <button
            type="button"
            onClick={resetDemoData}
            title="Reset to fresh demo states"
            className="inline-flex items-center gap-1 text-green-300 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 flex-shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline text-xs">Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
