import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Scissors, 
  HelpCircle, 
  AlertTriangle, 
  Play, 
  Zap, 
  ChevronDown, 
  ChevronRight,
  ArrowRight,
  Trophy,
  Layers
} from 'lucide-react';
import { ActionTask, ActionUserProfile, TaskPriority } from '../../types/actionEngine';
import { audioService } from '../../services/audioService';

interface TodayCommandCenterProps {
  tasks: ActionTask[];
  profile: ActionUserProfile;
  onStartFocus: (task: ActionTask, isFiveMin?: boolean) => void;
  onOpenWhyStuck: (task: ActionTask) => void;
  onOpenBreakdown: (task: ActionTask) => void;
  onOpenAddTask: () => void;
  onCompleteTaskDirect: (task: ActionTask) => void;
  onPostponeTask: (task: ActionTask) => void;
  onDeleteTask: (id: string) => void;
  onFillSampleTasks?: () => void;
}

export const TodayCommandCenter: React.FC<TodayCommandCenterProps> = ({
  tasks,
  profile,
  onStartFocus,
  onOpenWhyStuck,
  onOpenBreakdown,
  onOpenAddTask,
  onCompleteTaskDirect,
  onPostponeTask,
  onDeleteTask,
  onFillSampleTasks
}) => {
  const [showBacklog, setShowBacklog] = useState(false);

  const todayTasks = tasks.filter((t) => t.isToday && t.status !== 'COMPLETED');
  const completedToday = tasks.filter((t) => t.isToday && t.status === 'COMPLETED');
  const backlogTasks = tasks.filter((t) => !t.isToday && t.status !== 'COMPLETED');

  // Next recommended task (Top priority not completed)
  const nextTask = todayTasks.find((t) => t.priority === 'MUST_DO') || todayTasks[0] || null;

  // Calculate Core Completion %
  const coreTasks = tasks.filter((t) => t.isToday && (t.priority === 'MUST_DO' || t.priority === 'SHOULD_DO'));
  const completedCore = coreTasks.filter((t) => t.status === 'COMPLETED');
  const coreProgressPercent = coreTasks.length > 0 ? Math.round((completedCore.length / coreTasks.length) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Header & Daily Progress Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                <Flame className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-extrabold text-white">TODAY COMMAND CENTER</h2>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              "Đừng để việc hôm nay thành việc ngày mai. Bắt đầu với 5 phút."
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onFillSampleTasks && (
              <button
                onClick={onFillSampleTasks}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/30 border border-rose-500/50 hover:bg-rose-600 hover:text-white text-rose-200 text-xs font-bold transition shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>⚡ Nạp Việc Mẫu (Fill Demo)</span>
              </button>
            )}

            <button
              onClick={onOpenAddTask}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ VIỆC MỚI</span>
            </button>
          </div>
        </div>

        {/* Core Progress Bar */}
        <div className="space-y-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiến độ nhiệm vụ cốt lõi: <strong>{completedCore.length} / {coreTasks.length} việc</strong></span>
            </span>
            <span className="font-mono text-cyan-400 font-bold">{coreProgressPercent}%</span>
          </div>

          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${coreProgressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Streak: {profile.currentStreak} Ngày</span>
            </span>
            <span>⭐ {profile.dailyXP} XP Hôm Nay</span>
            <span>⏱ {profile.todayFocusMinutes} Phút Focus</span>
          </div>
        </div>
      </div>

      {/* 1. THE ONE NEXT ACTION HERO CARD */}
      {nextTask && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
              🔥 THE ONE NEXT ACTION (VIỆC CẦN LÀM TIẾP THEO)
            </span>
            <span className="text-xs font-mono text-slate-400">
              Ước tính: {nextTask.estimatedDuration} phút
            </span>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">
              {nextTask.title}
            </h3>
            <p className="text-xs text-indigo-300 font-medium mt-1">
              👉 <strong>Hành động nhỏ:</strong> "{nextTask.nextActionTitle}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartFocus(nextTask, false)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-extrabold text-xs shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 transition"
            >
              <Flame className="w-4 h-4" />
              <span>🔥 BẮT ĐẦU NGAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartFocus(nextTask, true)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-amber-500 text-amber-300 text-xs font-bold transition"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>⚡ LÀM 5 PHÚT (VƯỢT SỨC Ỳ)</span>
            </button>

            <button
              onClick={() => onOpenWhyStuck(nextTask)}
              className="flex items-center gap-1 px-3 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tại sao chưa làm?</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. TODAY TASKS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nhiệm Vụ Hôm Nay ({todayTasks.length} việc còn lại)</span>
          </h4>
        </div>

        {todayTasks.length === 0 ? (
          <div className="text-center py-10 bg-slate-900/30 rounded-2xl border border-slate-800 text-xs text-slate-500 space-y-2">
            <p>🎉 Bạn đã hoàn thành toàn bộ danh sách việc hôm nay!</p>
            {onFillSampleTasks && (
              <button
                onClick={onFillSampleTasks}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-xs transition"
              >
                ⚡ Nạp thêm danh sách việc mẫu mới
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs group"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        task.priority === 'MUST_DO'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : task.priority === 'SHOULD_DO'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-cyan-300'
                      }`}
                    >
                      {task.priority.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ⏱ {task.estimatedDuration}m • {task.category}
                    </span>

                    {task.postponedCount >= 2 && (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span>Chuyển {task.postponedCount} lần</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-bold text-white leading-snug">{task.title}</p>
                  <p className="text-[11px] text-indigo-300 truncate">
                    👉 Next: {task.nextActionTitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => onStartFocus(task, false)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:scale-105 transition shadow-md shadow-indigo-600/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Làm Ngay</span>
                  </button>

                  <button
                    onClick={() => onStartFocus(task, true)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition"
                    title="Làm 5 phút kích hoạt"
                  >
                    5 Phút
                  </button>

                  <button
                    onClick={() => onOpenBreakdown(task)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Chia nhỏ việc"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onPostponeTask(task)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Chuyển sang ngày mai"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onCompleteTaskDirect(task)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-950/60 text-slate-400 hover:text-emerald-400 transition"
                    title="Đánh dấu hoàn thành"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. COMPLETED TODAY */}
      {completedToday.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            ✓ ĐÃ HOÀN THÀNH HÔM NAY ({completedToday.length})
          </span>
          <div className="space-y-1.5">
            {completedToday.map((ct) => (
              <div
                key={ct.id}
                className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="line-through">{ct.title}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">+XP Ghi Nhận</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FUTURE BACKLOG (COLLAPSIBLE) */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setShowBacklog(!showBacklog)}
          className="flex items-center justify-between w-full text-xs font-bold text-slate-400 hover:text-slate-200 p-2 rounded-xl bg-slate-900/50"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Danh Sách Backlog Tương Lai ({backlogTasks.length} việc)</span>
          </span>
          <span>{showBacklog ? '▲ Thu gọn' : '▼ Mở rộng'}</span>
        </button>

        {showBacklog && (
          <div className="mt-3 space-y-2">
            {backlogTasks.map((bt) => (
              <div
                key={bt.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="text-slate-300">{bt.title}</span>
                <button
                  onClick={() => {
                    bt.isToday = true;
                    bt.status = 'READY';
                    audioService.playBeep('click');
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-[11px]"
                >
                  Đưa vào Hôm Nay
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
