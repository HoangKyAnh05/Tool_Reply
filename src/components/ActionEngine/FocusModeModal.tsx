import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Maximize2, 
  RotateCcw, 
  Sparkles,
  Flame,
  HelpCircle
} from 'lucide-react';
import { ActionTask } from '../../types/actionEngine';
import { audioService } from '../../services/audioService';

interface FocusModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ActionTask | null;
  onComplete: (task: ActionTask, isFiveMinOnly?: boolean) => void;
  onOpenWhyStuck: (task: ActionTask) => void;
  isFiveMinuteRule?: boolean;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({
  isOpen,
  onClose,
  task,
  onComplete,
  onOpenWhyStuck,
  isFiveMinuteRule = false
}) => {
  const initialSeconds = isFiveMinuteRule ? 5 * 60 : (task?.estimatedDuration || 25) * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const [isDone5Min, setIsDone5Min] = useState(false);

  useEffect(() => {
    if (task) {
      const secs = isFiveMinuteRule ? 5 * 60 : (task.estimatedDuration || 25) * 60;
      setTimeLeft(secs);
      setIsActive(true);
      setIsDone5Min(false);
    }
  }, [task, isFiveMinuteRule]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isDone5Min) {
      setIsDone5Min(true);
      audioService.playBeep('success');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isDone5Min]);

  if (!isOpen || !task) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none">
      {/* Top Close / Minimize */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={() => onOpenWhyStuck(task)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 hover:bg-slate-800 text-xs font-semibold transition"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Đang bị kẹt? (Tại sao chưa làm?)</span>
        </button>

        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Anti-Procrastination Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-extrabold shadow-lg shadow-rose-500/10">
          <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>{isFiveMinuteRule ? '⚡ QUY TẮC 5 PHÚT — BẮT ĐẦU ĐỂ PHÁ VỠ SỰ TRÌ HOÃN' : '🔥 FOCUS MODE — KHÔNG PHÂN TÂM • CỨ LÀM'}</span>
        </div>

        {/* Task Title & Next Action */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {task.title}
          </h2>
          
          <div className="p-4 bg-slate-900/80 border border-indigo-500/30 rounded-2xl max-w-lg mx-auto shadow-inner">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              👉 BƯỚC HÀNH ĐỘNG TIẾP THEO (NEXT ACTION):
            </span>
            <p className="text-sm font-semibold text-slate-200">
              "{task.nextActionTitle}"
            </p>
          </div>
        </div>

        {/* Big Countdown Timer */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="text-6xl md:text-8xl font-mono font-extrabold tracking-tighter bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
            {formattedTime}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold transition shadow-lg"
            >
              {isActive ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              <span>{isActive ? 'Tạm dừng' : 'Tiếp tục'}</span>
            </button>

            <button
              onClick={() => {
                setTimeLeft(initialSeconds);
                setIsActive(true);
              }}
              className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Reset thời gian"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-minute milestone message */}
        {isDone5Min && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl max-w-md mx-auto text-xs text-emerald-200 animate-bounce">
            🎉 <strong>Tuyệt vời!</strong> Bạn đã vượt qua 5 phút kích hoạt sức ỳ đầu tiên. Hãy giữ đà và hoàn thành luôn nhé!
          </div>
        )}

        {/* Complete Action CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onComplete(task, isFiveMinuteRule)}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>✓ ĐÃ XONG! (HOÀN THÀNH VIỆC NÀY)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
