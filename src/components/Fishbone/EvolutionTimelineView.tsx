import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  History, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { FishboneProject } from '../../types/fishbone';

interface EvolutionTimelineViewProps {
  project: FishboneProject;
}

export const EvolutionTimelineView: React.FC<EvolutionTimelineViewProps> = ({ project }) => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <History className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">
            EVOLUTION TIMELINE & SNAPSHOTS
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-white">Dòng Thời Gian Tiến Hóa Hệ Thống</h2>
        <p className="text-xs text-slate-400">
          Lịch sử tiến bộ, các mốc nâng cấp đã đạt được và các bản lưu Snapshot theo từng Level
        </p>
      </div>

      {/* Timeline nodes */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-500/30">
        {project.levels.map((lvl) => {
          const isCompleted = lvl.status === 'completed';
          const isCurrent = lvl.number === project.currentLevelNumber;

          return (
            <div
              key={lvl.id}
              className={`p-5 rounded-3xl border relative transition shadow-xl ${
                isCompleted
                  ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                  : isCurrent
                  ? 'bg-gradient-to-r from-indigo-950/60 to-slate-900/90 border-indigo-500 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              {/* Bullet Node */}
              <div
                className={`absolute -left-[27px] top-6 w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${
                  isCompleted ? 'bg-emerald-400' : isCurrent ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-cyan-300">
                    LEVEL {lvl.number}
                  </span>
                  <h3 className="font-extrabold text-base text-white">{lvl.name}</h3>
                </div>

                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-300' : isCurrent ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-500'
                }`}>
                  {lvl.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3">{lvl.objective}</p>

              {/* State Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block">Nhân sự:</span>
                  <strong className="text-slate-200">{lvl.currentState.teamSize} người</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">SOP chuẩn:</span>
                  <strong className="text-cyan-300">{lvl.currentState.sopCount} SOP</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Chất lượng QA:</span>
                  <strong className="text-emerald-300">{lvl.currentState.qualityScore}/100</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Maturity Score:</span>
                  <strong className="text-amber-400">{lvl.maturityScore}/100</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
