import React from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb,
  ArrowRight,
  GitBranch,
  Target
} from 'lucide-react';
import { AiImprovementReport } from '../../types/universe';

interface AiImprovementViewProps {
  report: AiImprovementReport;
  onApplyImprovement?: () => void;
}

export const AiImprovementView: React.FC<AiImprovementViewProps> = ({
  report,
  onApplyImprovement
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            AI DECISION OPTIMIZER & LEVERAGE REPORT
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-white">Báo Cáo Tối Ưu Hóa & Đòn Bẩy Chiến Lược</h2>
        <p className="text-xs text-slate-400">
          Phân tích những gì bạn làm tốt, rủi ro lớn nhất và đòn bẩy thay đổi cục diện
        </p>
      </div>

      {/* 1. BIGGEST LEVER (ĐÒN BẨY LỚN NHẤT) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-indigo-500/20 to-cyan-500/15 border border-amber-500/40 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>THE BIGGEST LEVER (ĐÒN BẨY QUYẾT ĐỊNH SỐ 1)</span>
        </div>

        <h3 className="text-lg font-bold text-white">
          {report.biggestLever.variableName}
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          {report.biggestLever.explanation}
        </p>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-semibold block">Giá trị ban đầu (Original):</span>
            <p className="font-bold text-rose-300">{report.biggestLever.comparison.originalValue}</p>
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-emerald-500/30 rounded-xl text-xs space-y-1">
            <span className="text-slate-400 font-semibold block">Giá trị tối ưu (AI Suggested):</span>
            <p className="font-bold text-emerald-300">{report.biggestLever.comparison.suggestedValue}</p>
            <span className="text-[11px] text-cyan-300 font-medium">{report.biggestLever.comparison.impactDelta}</span>
          </div>
        </div>
      </div>

      {/* 2. ORIGINAL VS AI-IMPROVED TIMELINE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-2">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            1. Kịch Bản Ban Đầu (Original Timeline)
          </span>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            {report.originalTimelineSummary}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            2. Kịch Bản Đã Tối Ưu (AI-Improved Timeline)
          </span>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            {report.improvedTimelineSummary}
          </p>
        </div>
      </div>

      {/* 3. BUTTERFLY EFFECT & CONDITIONS FOR SUCCESS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Butterfly Effect */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-4 h-4" />
            <span>Hiệu Ứng Cánh Bướm (Butterfly Effect)</span>
          </span>
          {report.butterflyEffects.map((be) => (
            <div key={be.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="text-cyan-300 font-bold">1. Quyết định nhỏ: {be.trigger}</div>
              <div className="text-slate-400">→ Hiệu ứng tức thì: {be.immediateEffect}</div>
              <div className="text-emerald-400 font-semibold">★ Hệ quả lâu dài: {be.longTermConsequence}</div>
            </div>
          ))}
        </div>

        {/* Conditions for success */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Điều Kiện Cốt Lõi Để Thành Công</span>
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {report.conditionsForSuccess.map((cond, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. BEST NEXT ACTION */}
      <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">
            HÀNH ĐỘNG TIẾP THEO TỐT NHẤT (BEST NEXT ACTION):
          </span>
          <p className="text-sm font-semibold text-white">
            {report.bestNextAction}
          </p>
        </div>
      </div>
    </div>
  );
};
