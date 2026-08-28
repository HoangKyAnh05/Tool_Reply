import React from 'react';
import { 
  X, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Lock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EvolutionLevel } from '../../types/fishbone';
import { fishboneService } from '../../services/fishboneService';
import { audioService } from '../../services/audioService';

interface QualityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: EvolutionLevel;
  onConfirmLevelUp: () => void;
}

export const QualityGateModal: React.FC<QualityGateModalProps> = ({
  isOpen,
  onClose,
  level,
  onConfirmLevelUp
}) => {
  if (!isOpen) return null;

  const { isReady, exitCriteria, failingReasons } = fishboneService.evaluateQualityGate(level);

  const handleLevelUp = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    audioService.playBeep('success');
    onConfirmLevelUp();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isReady ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                QUALITY GATE — ĐIỀU KIỆN LÊN CẤP LEVEL {level.number}
              </h3>
              <p className="text-xs text-slate-400">
                Kiểm định chất lượng nghiêm ngặt trước khi chuyển trạng thái tiến hóa
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exit Criteria List */}
        <div className="overflow-y-auto space-y-3 pr-1 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-300 block mb-1">
            Bảng Kiểm Soát Tiêu Chuẩn Xuất Cổng (Exit Criteria):
          </span>

          <div className="space-y-2">
            {exitCriteria.map((crit) => (
              <div
                key={crit.id}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  crit.isSatisfied
                    ? 'bg-slate-950/80 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/80 border-rose-500/40 text-slate-300'
                }`}
              >
                {crit.isSatisfied ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{crit.title}</span>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.2 rounded ${
                      crit.isSatisfied ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {crit.isSatisfied ? 'ĐẠT (PASSED)' : 'CHƯA ĐẠT'}
                    </span>
                  </div>
                  {crit.failureReason && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      ⚠ Lý do chưa đạt: {crit.failureReason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Explanation if failing */}
          {!isReady && failingReasons.length > 0 && (
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-xs space-y-1.5 text-rose-200">
              <span className="font-bold block uppercase tracking-wider text-rose-300">
                🔒 TẠI SAO CHƯA THỂ LEVEL UP?
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                {failingReasons.map((fr, idx) => (
                  <li key={idx}>{fr}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold"
          >
            Đóng
          </button>

          {isReady ? (
            <button
              onClick={handleLevelUp}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>XÁC NHẬN LEVEL UP (LÊN LEVEL {level.number + 1})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold opacity-50 cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Chưa Đủ Điều Kiện Lên Cấp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
