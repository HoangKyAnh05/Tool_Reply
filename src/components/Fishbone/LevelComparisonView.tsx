import React, { useState } from 'react';
import { 
  GitCompare, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2 
} from 'lucide-react';
import { FishboneProject } from '../../types/fishbone';

interface LevelComparisonViewProps {
  project: FishboneProject;
}

export const LevelComparisonView: React.FC<LevelComparisonViewProps> = ({ project }) => {
  const [levelAIndex, setLevelAIndex] = useState(0);
  const [levelBIndex, setLevelBIndex] = useState(Math.min(1, project.levels.length - 1));

  const lvlA = project.levels[levelAIndex] || project.levels[0];
  const lvlB = project.levels[levelBIndex] || project.levels[1] || project.levels[0];

  const diffTeam = lvlB.currentState.teamSize - lvlA.currentState.teamSize;
  const diffSOP = lvlB.currentState.sopCount - lvlA.currentState.sopCount;
  const diffQuality = lvlB.currentState.qualityScore - lvlA.currentState.qualityScore;
  const diffAutomation = lvlB.currentState.automationPercent - lvlA.currentState.automationPercent;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitCompare className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
              LEVEL COMPARISON MATRIX
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">So Sánh Tiến Hóa Giữa Các Cấp Độ</h2>
          <p className="text-xs text-slate-400">
            Xem sự khác biệt rõ rệt về quy mô (Scale) và độ trưởng thành (Maturity)
          </p>
        </div>

        {/* Selectors */}
        <div className="flex items-center gap-2 text-xs">
          <select
            value={levelAIndex}
            onChange={(e) => setLevelAIndex(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
          >
            {project.levels.map((lvl, idx) => (
              <option key={lvl.id} value={idx}>
                Level {lvl.number}: {lvl.name.slice(0, 25)}
              </option>
            ))}
          </select>

          <span className="text-slate-500 font-bold">vs</span>

          <select
            value={levelBIndex}
            onChange={(e) => setLevelBIndex(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
          >
            {project.levels.map((lvl, idx) => (
              <option key={lvl.id} value={idx}>
                Level {lvl.number}: {lvl.name.slice(0, 25)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/60">
              <th className="py-3 px-4">Chỉ Số / Yếu Tố Tiến Hóa</th>
              <th className="py-3 px-4 text-cyan-300">Level {lvlA.number} ({lvlA.name.split(':')[0]})</th>
              <th className="py-3 px-4 text-indigo-300">Level {lvlB.number} ({lvlB.name.split(':')[0]})</th>
              <th className="py-3 px-4 text-amber-400 text-right">Mức Độ Thay Đổi (Delta)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            <tr className="hover:bg-slate-800/30">
              <td className="py-3 px-4 font-sans font-bold text-slate-200">Quy mô nhân sự (Team Size)</td>
              <td className="py-3 px-4 text-slate-300">{lvlA.currentState.teamSize} người</td>
              <td className="py-3 px-4 text-slate-300">{lvlB.currentState.teamSize} người</td>
              <td className="py-3 px-4 text-right font-bold text-emerald-400">
                {diffTeam >= 0 ? `+${diffTeam}` : diffTeam} người
              </td>
            </tr>

            <tr className="hover:bg-slate-800/30">
              <td className="py-3 px-4 font-sans font-bold text-slate-200">Số lượng SOP chuẩn hóa</td>
              <td className="py-3 px-4 text-slate-300">{lvlA.currentState.sopCount} SOP</td>
              <td className="py-3 px-4 text-slate-300">{lvlB.currentState.sopCount} SOP</td>
              <td className="py-3 px-4 text-right font-bold text-emerald-400">
                {diffSOP >= 0 ? `+${diffSOP}` : diffSOP} SOP
              </td>
            </tr>

            <tr className="hover:bg-slate-800/30">
              <td className="py-3 px-4 font-sans font-bold text-slate-200">Điểm chất lượng (Quality Score)</td>
              <td className="py-3 px-4 text-slate-300">{lvlA.currentState.qualityScore}/100</td>
              <td className="py-3 px-4 text-slate-300">{lvlB.currentState.qualityScore}/100</td>
              <td className="py-3 px-4 text-right font-bold text-cyan-400">
                {diffQuality >= 0 ? `+${diffQuality}` : diffQuality} điểm
              </td>
            </tr>

            <tr className="hover:bg-slate-800/30">
              <td className="py-3 px-4 font-sans font-bold text-slate-200">Mức độ tự động hóa (Automation)</td>
              <td className="py-3 px-4 text-slate-300">{lvlA.currentState.automationPercent}%</td>
              <td className="py-3 px-4 text-slate-300">{lvlB.currentState.automationPercent}%</td>
              <td className="py-3 px-4 text-right font-bold text-purple-400">
                {diffAutomation >= 0 ? `+${diffAutomation}` : diffAutomation}%
              </td>
            </tr>

            <tr className="hover:bg-slate-800/30">
              <td className="py-3 px-4 font-sans font-bold text-slate-200">Điểm trưởng thành toàn diện (Maturity)</td>
              <td className="py-3 px-4 text-slate-300 font-bold">{lvlA.maturityScore}/100</td>
              <td className="py-3 px-4 text-slate-300 font-bold">{lvlB.maturityScore}/100</td>
              <td className="py-3 px-4 text-right font-bold text-amber-400">
                {lvlB.maturityScore - lvlA.maturityScore >= 0 ? `+${lvlB.maturityScore - lvlA.maturityScore}` : lvlB.maturityScore - lvlA.maturityScore} MS
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
