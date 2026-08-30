import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  Zap, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { FishboneProject, EvolutionLevel } from '../../types/fishbone';

interface FishboneProjectCanvasProps {
  project: FishboneProject;
  activeLevelId: string;
  onSelectLevel: (levelId: string) => void;
  onOpenQualityGate: (level: EvolutionLevel) => void;
}

export const FishboneProjectCanvas: React.FC<FishboneProjectCanvasProps> = ({
  project,
  activeLevelId,
  onSelectLevel,
  onOpenQualityGate
}) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            🐟
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              Bản Đồ Tiến Hóa Xương Cá (Fishbone Evolution Map)
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Level 1 → Level {project.targetLevelNumber} (Final Level)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Đầu cá = Khởi đầu • Xương sống = Hành trình tiến hóa • Xương nhánh = Chiều trưởng thành & SOP • Đuôi cá = Trạng thái hoàn thiện
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Fishbone Visualization */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="min-w-[900px] flex items-center justify-between relative px-6 py-12">
          {/* Central Horizontal Spine */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 rounded-full z-0 shadow-lg shadow-cyan-600/20" />

          {/* Fish Head (Đầu Cá - Level 1 Initial) */}
          <div className="relative z-10 flex flex-col items-center shrink-0 mr-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 border-2 border-cyan-300 text-white flex items-center justify-center text-2xl shadow-xl shadow-cyan-600/40 transform -rotate-12">
              🐟
            </div>
            <span className="text-[10px] font-extrabold font-mono text-cyan-300 mt-2 uppercase tracking-wider">
              FISH HEAD (L1)
            </span>
          </div>

          {/* Major Level Bones */}
          <div className="flex-1 flex items-center justify-around relative z-10 px-4">
            {project.levels.map((lvl) => {
              const isSelected = lvl.id === activeLevelId;
              const isCurrent = lvl.number === project.currentLevelNumber;
              const isCompleted = lvl.status === 'completed';

              return (
                <div key={lvl.id} className="flex flex-col items-center relative group">
                  {/* Top Branch */}
                  <div className="h-12 w-0.5 bg-indigo-500/60 mb-2 relative flex flex-col items-center">
                    <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300 whitespace-nowrap shadow">
                      {lvl.dimensions[0]?.name || 'Nhân Sự & SOP'}
                    </div>
                  </div>

                  {/* Level Node on Spine */}
                  <button
                    onClick={() => onSelectLevel(lvl.id)}
                    className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl relative ${
                      isSelected
                        ? 'bg-cyan-600 border-white text-white ring-4 ring-cyan-500/30 scale-105'
                        : isCompleted
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : isCurrent
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 animate-pulse'
                        : 'bg-slate-950/80 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="text-xs font-mono font-extrabold">
                      L{lvl.number}
                    </span>
                    <span className="text-[10px] font-bold truncate max-w-[50px] leading-tight">
                      {isCompleted ? '✓ 100%' : `${lvl.maturityScore || 0} MS`}
                    </span>

                    {isCurrent && (
                      <span className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-900 animate-ping" />
                    )}
                  </button>

                  <span className="text-xs font-extrabold text-slate-200 mt-2 text-center truncate max-w-[120px]">
                    {lvl.name.split(':')[1]?.trim() || lvl.name}
                  </span>

                  {/* Bottom Branch */}
                  <div className="h-12 w-0.5 bg-purple-500/60 mt-2 relative flex flex-col items-center">
                    <div className="absolute -bottom-3 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300 whitespace-nowrap shadow">
                      {lvl.dimensions[1]?.name || 'Chất Lượng & TC'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fish Tail (Đuôi Cá - Target State L5) */}
          <div className="relative z-10 flex flex-col items-center shrink-0 ml-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 border-2 border-pink-300 text-white flex items-center justify-center text-2xl shadow-xl shadow-purple-600/40">
              🎯
            </div>
            <span className="text-[10px] font-extrabold font-mono text-pink-300 mt-2 uppercase tracking-wider">
              TARGET STATE (L5)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
