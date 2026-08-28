import React from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Zap,
  Info
} from 'lucide-react';
import { ScenarioModel, SimulationVariable } from '../../types/universe';

interface ScenarioReviewProps {
  scenario: ScenarioModel;
  variables: any[];
  onStartSimulation: () => void;
  onBackToInterview: () => void;
}

export const ScenarioReview: React.FC<ScenarioReviewProps> = ({
  scenario,
  variables,
  onStartSimulation,
  onBackToInterview
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SCENARIO MODEL REVIEW
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Độ hoàn thiện: {scenario.completenessScore}%
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">{scenario.title}</h2>
          </div>

          <button
            onClick={onStartSimulation}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-xl shadow-cyan-600/30 hover:scale-105 active:scale-95 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>SIMULATE MY FUTURE (BẮT ĐẦU MÔ PHỎNG)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Classification Grids: FACT, PLAN, ASSUMPTION, UNKNOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FACTS */}
          <div className="p-5 bg-slate-900/80 border border-emerald-500/30 rounded-2xl space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>1. DỮ KIỆN ĐÃ XÁC THỰC (FACT)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                {scenario.facts.length} mục
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {scenario.facts.map((f) => (
                <li key={f.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PLANS */}
          <div className="p-5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>2. KẾ HOẠCH DỰ KIẾN (PLAN)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                {scenario.plans.length} mục
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {scenario.plans.map((p) => (
                <li key={p.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">→</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ASSUMPTIONS */}
          <div className="p-5 bg-slate-900/80 border border-amber-500/30 rounded-2xl space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>3. GIẢ ĐỊNH CHƯA KIỂM CHỨNG (ASSUMPTION)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">
                {scenario.assumptions.length} mục
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {scenario.assumptions.map((a) => (
                <li key={a.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">?</span>
                  <span>{a.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* UNKNOWNS */}
          <div className="p-5 bg-slate-900/80 border border-purple-500/30 rounded-2xl space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>4. ẨN SỐ / RỦI RO CHƯA RÕ (UNKNOWN)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">
                {scenario.unknowns.length} mục
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {scenario.unknowns.map((u) => (
                <li key={u.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
                  <span className="text-purple-400 font-bold">!</span>
                  <span>{u.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* High-Impact Variables & Levers */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Các biến số đòn bẩy quan trọng nhất (Critical Variables):</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {variables.map((v) => (
              <div key={v.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200">{v.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    v.impact === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {v.impact} IMPACT
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                  <span>Giá trị hiện tại: <strong className="text-cyan-300">{v.currentValue}</strong></span>
                  <span>Độ bất định: {v.uncertainty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Transparency Notice */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Nguyên tắc cốt lõi:</strong> Mô phỏng dựa trên nhân quả logic và dữ kiện bạn cung cấp, không phải dự đoán bói toán chắc chắn 100%. Mọi nhánh tương lai đều có thể thay đổi bằng hành động thực tế.
          </span>
        </div>
      </div>
    </div>
  );
};
