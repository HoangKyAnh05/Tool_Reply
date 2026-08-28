import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  GitBranch,
  Lightbulb
} from 'lucide-react';
import { CriticalDecision, CriticalDecisionOption } from '../../types/universe';
import { audioService } from '../../services/audioService';

interface CriticalDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  decision: CriticalDecision | null;
  onSelectOption: (optionId: string) => void;
}

export const CriticalDecisionModal: React.FC<CriticalDecisionModalProps> = ({
  isOpen,
  onClose,
  decision,
  onSelectOption
}) => {
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);

  if (!isOpen || !decision) return null;

  const handleConfirm = () => {
    if (!selectedOptId) return;
    audioService.playBeep('decision');
    onSelectOption(selectedOptId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {decision.impact} IMPACT
                </span>
                <span className="text-xs text-slate-400 font-mono">{decision.time}</span>
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-white mt-0.5">
                {decision.title}
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Situation Brief */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-200 text-sm">{decision.situation}</p>
            <p className="text-slate-400">{decision.whyItMatters}</p>
          </div>

          {/* AI Recommendation Box */}
          {decision.aiRecommendation && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>AI Recommendation (Khuyến Nghị Chiến Lược):</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {decision.aiRecommendation.rationale}
              </p>
              <p className="text-indigo-300 font-medium">
                👉 <strong>Hành động đề xuất:</strong> {decision.aiRecommendation.actionableStep}
              </p>
            </div>
          )}

          {/* Options Grid */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              Chọn 1 trong các hướng đi để rẽ nhánh tương lai:
            </p>

            <div className="grid grid-cols-1 gap-3">
              {decision.options.map((opt) => {
                const isSelected = selectedOptId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOptId(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 text-white shadow-xl shadow-amber-950/40'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                        <span>{opt.label}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{opt.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="text-emerald-400">
                        <strong>✓ Lợi ích ngắn hạn:</strong> {opt.shortTermEffect}
                      </div>
                      <div className="text-rose-400">
                        <strong>⚠ Rủi ro tiềm ẩn:</strong> {opt.risk}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold text-xs transition"
          >
            Đóng
          </button>

          <button
            onClick={handleConfirm}
            disabled={!selectedOptId}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/30 disabled:opacity-40 disabled:pointer-events-none hover:scale-105 active:scale-95 transition"
          >
            <GitBranch className="w-4 h-4" />
            <span>Xác Nhận Rẽ Nhánh Vũ Trụ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
