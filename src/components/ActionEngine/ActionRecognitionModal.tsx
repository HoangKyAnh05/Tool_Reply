import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActionTask, ActionDifficulty, CompletedAction } from '../../types/actionEngine';
import { audioService } from '../../services/audioService';

interface ActionRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ActionTask | null;
  onSaveAction: (action: CompletedAction) => void;
  onNextTaskNow: () => void;
}

export const ActionRecognitionModal: React.FC<ActionRecognitionModalProps> = ({
  isOpen,
  onClose,
  task,
  onSaveAction,
  onNextTaskNow
}) => {
  const [selectedType, setSelectedType] = useState<'procrastinated' | 'courageous' | 'standard'>('procrastinated');
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !task) return null;

  const calculateXp = (type: string): { xp: number; difficulty: ActionDifficulty } => {
    if (type === 'courageous') return { xp: 100, difficulty: 'FEARLESS' };
    if (type === 'procrastinated') return { xp: 75, difficulty: 'BOLD' };
    return { xp: 35, difficulty: 'BRAVE' };
  };

  const { xp, difficulty } = calculateXp(selectedType);

  const handleConfirmAction = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    audioService.playBeep('success');

    const completedAction: CompletedAction = {
      id: `act_${Date.now()}`,
      taskId: task.id,
      taskTitle: task.title,
      actionTitle: task.nextActionTitle || task.title,
      category: task.category,
      difficulty,
      xpEarned: xp,
      isProcrastinated: selectedType === 'procrastinated',
      isCourageous: selectedType === 'courageous',
      courageReason: selectedType === 'courageous' ? reflection : undefined,
      reflectionNote: reflection || undefined,
      visibility: 'public',
      reactions: { respect: 1, brave: 1, letsGo: 2, proud: 1 },
      completedAt: Date.now()
    };

    onSaveAction(completedAction);
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            XONG! HÔM NAY BẠN ĐÃ LÀM ĐƯỢC.
          </h3>
          <p className="text-xs text-slate-400 font-semibold">
            "{task.title}"
          </p>
        </div>

        {/* Action Recognition Question */}
        <div className="space-y-3 text-xs">
          <p className="font-bold uppercase tracking-wider text-slate-300 text-center text-[11px]">
            Điều này có phải là việc bạn từng trì hoãn hoặc ngại làm không?
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => setSelectedType('procrastinated')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                selectedType === 'procrastinated'
                  ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/30'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-2xl p-1 bg-slate-900 rounded-xl border border-slate-800">💀</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-300">🔥 ĐÃ TỪNG TRÌ HOÃN (Procrastination Defeated)</span>
                  <span className="font-mono text-xs font-extrabold text-rose-400">+75 XP</span>
                </div>
                <p className="text-[11px] text-slate-400">Tôi đã từng chần chừ nhưng hôm nay đã quyết tâm làm.</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('courageous')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                selectedType === 'courageous'
                  ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg shadow-amber-950/30'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-2xl p-1 bg-slate-900 rounded-xl border border-slate-800">🦁</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">🦁 ĐÃ TỪNG NGẠI (Courage Moment)</span>
                  <span className="font-mono text-xs font-extrabold text-amber-400">+100 XP</span>
                </div>
                <p className="text-[11px] text-slate-400">Tôi đã vượt qua sự ngại ngùng/nỗi sợ để hành động.</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('standard')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                selectedType === 'standard'
                  ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg shadow-indigo-950/30'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-2xl p-1 bg-slate-900 rounded-xl border border-slate-800">⚡</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300">⚡ KHÔNG, NHƯNG VẪN ĐÁNG GHI NHẬN</span>
                  <span className="font-mono text-xs font-extrabold text-indigo-400">+35 XP</span>
                </div>
                <p className="text-[11px] text-slate-400">Hoàn thành đúng tiến độ hàng ngày với sự tập trung.</p>
              </div>
            </button>
          </div>

          {/* Optional Reflection */}
          <div className="pt-2">
            <input
              type="text"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Ghi chú ngắn / Cảm giác sau khi làm xong (Tùy chọn)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold"
          >
            Đóng
          </button>

          {!isSaved ? (
            <button
              onClick={handleConfirmAction}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ghi Nhận Chiến Tích (+{xp} XP)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onNextTaskNow();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
            >
              <span>🔥 LÀM TIẾP VIỆC TIẾP THEO (MOMENTUM)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
