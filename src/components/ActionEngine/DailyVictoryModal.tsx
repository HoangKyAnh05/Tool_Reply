import React from 'react';
import { 
  X, 
  Trophy, 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyVictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCoreCount: number;
  totalCoreCount: number;
  streakDays: number;
  dailyXp: number;
  focusMinutes: number;
}

export const DailyVictoryModal: React.FC<DailyVictoryModalProps> = ({
  isOpen,
  onClose,
  completedCoreCount,
  totalCoreCount,
  streakDays,
  dailyXp,
  focusMinutes
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl flex flex-col text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 mx-auto shadow-2xl shadow-amber-500/30 animate-bounce">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            CORE DAY COMPLETE
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            HÔM NAY BẠN ĐÃ LÀM NHỮNG GÌ CẦN LÀM!
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Đừng để việc hôm nay thành việc ngày mai. Bạn đã chiến thắng sức ỳ và bảo vệ trọn vẹn mục tiêu cốt lõi.
          </p>
        </div>

        {/* Victory Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Nhiệm Vụ Cốt Lõi</span>
            <p className="text-base font-extrabold text-emerald-400">
              {completedCoreCount}/{totalCoreCount}
            </p>
          </div>

          <div className="space-y-1 border-x border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Chuỗi Ngày</span>
            <p className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streakDays} Ngày</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Action XP</span>
            <p className="text-base font-extrabold text-cyan-400">
              +{dailyXp} XP
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-extrabold text-xs shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition"
          >
            TUYỆT VỜI! KẾT THÚC NGÀY THÀNH CÔNG 🎯
          </button>
        </div>
      </div>
    </div>
  );
};
