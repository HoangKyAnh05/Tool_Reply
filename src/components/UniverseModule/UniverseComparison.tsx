import React from 'react';
import { 
  GitCompare, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Activity, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ParallelUniverse } from '../../types/universe';

interface UniverseComparisonProps {
  universes: ParallelUniverse[];
  onSelectUniverse: (id: string) => void;
}

export const UniverseComparison: React.FC<UniverseComparisonProps> = ({
  universes,
  onSelectUniverse
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CROSS-UNIVERSE COMPARISON MATRIX
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">So Sánh Đa Vũ Trụ Song Song</h2>
          <p className="text-xs text-slate-400">
            Thay đổi 1 quyết định cốt lõi tạo ra các tương lai khác nhau như thế nào?
          </p>
        </div>
      </div>

      {/* Comparison Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universes.map((univ) => (
          <div
            key={univ.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">
                  {univ.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {univ.scenes.length} Scenes
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-100 group-hover:text-cyan-300 transition">
                {univ.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {univ.tagline}
              </p>
            </div>

            {/* Universe Metrics Progress Bars */}
            <div className="space-y-2.5 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              {/* Success Potential */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-slate-400">Tiềm năng thành công</span>
                  <span className="text-emerald-400">{univ.metrics.successPotential}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${univ.metrics.successPotential}%` }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-slate-400">Mức độ rủi ro</span>
                  <span className="text-rose-400">{univ.metrics.riskLevel}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${univ.metrics.riskLevel}%` }}
                  />
                </div>
              </div>

              {/* Stress Level */}
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-slate-400">Áp lực / Stress</span>
                  <span className="text-amber-400">{univ.metrics.stressLevel}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${univ.metrics.stressLevel}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectUniverse(univ.id)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 text-xs font-bold transition"
            >
              <span>Vào Vũ Trụ Này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
