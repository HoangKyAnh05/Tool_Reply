import React from 'react';
import { 
  GitBranch, 
  Clock, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { ParallelUniverse, TimelineScene } from '../../types/universe';

interface UniverseTimelineProps {
  universes: ParallelUniverse[];
  activeUniverseId: string;
  onSelectUniverse: (id: string) => void;
  activeSceneIndex: number;
  onSelectScene: (idx: number) => void;
}

export const UniverseTimeline: React.FC<UniverseTimelineProps> = ({
  universes,
  activeUniverseId,
  onSelectUniverse,
  activeSceneIndex,
  onSelectScene
}) => {
  const activeUniverse = universes.find((u) => u.id === activeUniverseId) || universes[0];

  return (
    <aside className="w-80 border-r border-slate-800/80 bg-slate-900/40 p-4 flex flex-col overflow-y-auto space-y-4 shrink-0">
      {/* Universes Switcher */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vũ Trụ Song Song ({universes.length})</span>
          </label>
        </div>

        <div className="space-y-1.5">
          {universes.map((univ) => {
            const isActive = univ.id === activeUniverseId;
            return (
              <button
                key={univ.id}
                onClick={() => onSelectUniverse(univ.id)}
                className={`w-full p-2.5 rounded-xl border text-left transition text-xs flex items-center justify-between group ${
                  isActive
                    ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-md shadow-cyan-950/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold truncate">{univ.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{univ.tagline}</p>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ml-1 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Timeline of Active Universe */}
      <div className="border-t border-slate-800 pt-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Dòng Thời Gian ({activeUniverse.scenes.length} sự kiện)</span>
          </span>
        </div>

        <div className="relative pl-3 space-y-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {activeUniverse.scenes.map((scene, idx) => {
            const isCurrent = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => onSelectScene(idx)}
                className={`relative w-full p-3 rounded-xl border text-left transition text-xs flex flex-col gap-1 ${
                  isCurrent
                    ? 'bg-indigo-950/50 border-indigo-500 text-white shadow-lg shadow-indigo-950/40'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {/* Node indicator dot */}
                <div
                  className={`absolute -left-[17px] top-4 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                    isCurrent ? 'bg-indigo-400 scale-125' : 'bg-slate-600'
                  }`}
                />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">
                    {scene.dayOrTime}
                  </span>
                  {scene.decisionPoint && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 animate-pulse">
                      QUYẾT ĐỊNH
                    </span>
                  )}
                </div>

                <p className="font-bold text-slate-100 line-clamp-1">{scene.title}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                  {scene.whatHappened}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
