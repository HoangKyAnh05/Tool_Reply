import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Sliders, 
  BarChart3, 
  Clock, 
  Lock,
  Plus,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { EvolutionLevel, UpgradeRequirement, QualityGateCriteria } from '../../types/fishbone';
import { fishboneService } from '../../services/fishboneService';
import { audioService } from '../../services/audioService';

interface LevelDetailViewProps {
  level: EvolutionLevel;
  onOpenQualityGate: () => void;
  onToggleRequirementStatus: (reqId: string) => void;
}

export const LevelDetailView: React.FC<LevelDetailViewProps> = ({
  level,
  onOpenQualityGate,
  onToggleRequirementStatus
}) => {
  const gap = fishboneService.computeGapAnalysis(level);
  const maturityScore = fishboneService.calculateMaturityScore(level);
  const { isReady, failingReasons } = fishboneService.evaluateQualityGate(level);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 bg-slate-950">
      {/* Level Title & Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              LEVEL {level.number}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              level.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300'
                : level.status === 'in_progress'
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {level.status.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">{level.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{level.description}</p>
        </div>

        {/* Quality Gate / Level Up Button */}
        <button
          onClick={onOpenQualityGate}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs shadow-xl transition-all ${
            isReady
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 hover:scale-105 animate-pulse'
              : 'bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>{isReady ? '🎉 READY FOR LEVEL UP (LÊN CẤP)' : '🔒 QUALITY GATE (ĐIỀU KIỆN LÊN CẤP)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 1. GAP ANALYSIS: Current State → Target State → Gap */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>Phân Tích Khoảng Cách Tiến Hóa (Gap Analysis)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Maturity Score: <strong className="text-white font-bold">{maturityScore}/100</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Team Size */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Quy Mô Nhân Sự</span>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">{level.currentState.teamSize} người</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-300">{level.targetState.teamSize}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-400 block">
              Gap: +{gap.teamSizeGap} nhân sự
            </span>
          </div>

          {/* SOP Count */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Số Lượng SOP</span>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">{level.currentState.sopCount} SOP</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-300">{level.targetState.sopCount}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 block">
              Gap: +{gap.sopCountGap} SOP cần viết
            </span>
          </div>

          {/* Automation % */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Tự Động Hóa</span>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">{level.currentState.automationPercent}%</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-300">{level.targetState.automationPercent}%</span>
            </div>
            <span className="text-[10px] font-bold text-purple-400 block">
              Gap: +{gap.automationPercentGap}% công nghệ
            </span>
          </div>

          {/* Quality Score */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Điểm Chất Lượng</span>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-300">{level.currentState.qualityScore}/100</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-300">{level.targetState.qualityScore}</span>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 block">
              Gap: +{gap.qualityScoreGap} điểm QA
            </span>
          </div>
        </div>
      </div>

      {/* 2. NEXT BEST ACTIONS & CRITICAL BLOCKERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Best Actions */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/15 to-slate-900 border border-amber-500/30 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Hành Động Đột Phá Tiếp Theo (Next Best Action)</span>
          </span>
          <div className="space-y-2 text-xs">
            {level.nextBestActions.map((nba) => (
              <div key={nba.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{nba.title}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300">
                    {nba.impact} Impact
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Ước tính nỗ lực: {nba.effort}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Blockers */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Điểm Nghẽn Vận Hành (Critical Blockers)</span>
          </span>
          <div className="space-y-2 text-xs">
            {level.blockers.map((blk) => (
              <div key={blk.id} className="p-3 bg-slate-950/80 rounded-xl border border-rose-500/20 space-y-1">
                <p className="font-bold text-rose-300">{blk.title}</p>
                <p className="text-[11px] text-slate-400">
                  👉 <strong>Giải pháp:</strong> {blk.resolutionPlan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. UPGRADE REQUIREMENTS & TASKS */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Hạng Mục Nâng Cấp Bắt Buộc (Upgrade Requirements)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {level.requirements.filter((r) => r.status === 'done').length} / {level.requirements.length} Hoàn Thành
          </span>
        </div>

        <div className="space-y-3">
          {level.requirements.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                    {req.dimensionName}
                  </span>
                  {req.isMandatoryForLevelUp && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      BẮT BUỘC LEVEL UP
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onToggleRequirementStatus(req.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    req.status === 'done'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {req.status === 'done' ? '✓ ĐÃ XONG (100%)' : 'Chưa Xong'}
                </button>
              </div>

              <h4 className="text-sm font-bold text-white">{req.title}</h4>
              <p className="text-xs text-slate-400">{req.description}</p>

              {req.acceptanceCriteria?.length > 0 && (
                <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                  {req.acceptanceCriteria.map((ac, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      ✓ {ac}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
