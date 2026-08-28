import React, { useState } from 'react';
import { 
  Flame, 
  Trophy, 
  Sparkles, 
  Plus, 
  Calendar, 
  HelpCircle, 
  Clock,
  Zap
} from 'lucide-react';
import { 
  ActionTask, 
  CompletedAction, 
  ActionUserProfile, 
  StuckReason 
} from '../../types/actionEngine';
import { 
  storageService, 
  defaultActionTasks, 
  defaultActionHistory, 
  defaultActionProfile 
} from '../../services/storageService';
import { TodayCommandCenter } from './TodayCommandCenter';
import { FocusModeModal } from './FocusModeModal';
import { WhyStuckModal } from './WhyStuckModal';
import { TaskBreakdownModal } from './TaskBreakdownModal';
import { ActionRecognitionModal } from './ActionRecognitionModal';
import { DailyVictoryModal } from './DailyVictoryModal';
import { HallOfFameView } from './HallOfFameView';
import { QuickAddTaskModal } from './QuickAddTaskModal';
import { audioService } from '../../services/audioService';

export const ActionEngineWorkspace: React.FC = () => {
  const [tasks, setTasks] = useState<ActionTask[]>(() => storageService.getActionTasks());
  const [history, setHistory] = useState<CompletedAction[]>(() => storageService.getActionHistory());
  const [profile, setProfile] = useState<ActionUserProfile>(() => storageService.getActionProfile());
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'hall_of_fame'>('today');

  // Modals
  const [focusTask, setFocusTask] = useState<ActionTask | null>(null);
  const [isFiveMinuteMode, setIsFiveMinuteMode] = useState(false);
  const [whyStuckTask, setWhyStuckTask] = useState<ActionTask | null>(null);
  const [breakdownTask, setBreakdownTask] = useState<ActionTask | null>(null);
  const [recognitionTask, setRecognitionTask] = useState<ActionTask | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);

  const saveTasksAndState = (updatedTasks: ActionTask[]) => {
    setTasks(updatedTasks);
    storageService.saveActionTasks(updatedTasks);
  };

  const handleStartFocus = (task: ActionTask, isFiveMin = false) => {
    setFocusTask(task);
    setIsFiveMinuteMode(isFiveMin);
    const updated = tasks.map((t) => t.id === task.id ? { ...t, status: 'IN_PROGRESS' as const } : t);
    saveTasksAndState(updated);
  };

  const handleCompleteFromFocus = (task: ActionTask, isFiveMinOnly = false) => {
    setFocusTask(null);
    setRecognitionTask(task);
  };

  const handleSaveActionRecognition = (action: CompletedAction) => {
    const updatedHistory = [action, ...history];
    setHistory(updatedHistory);
    storageService.saveActionHistory(updatedHistory);

    // Update Task status to COMPLETED
    const updatedTasks = tasks.map((t) =>
      t.id === action.taskId ? { ...t, status: 'COMPLETED' as const, completedAt: Date.now() } : t
    );
    saveTasksAndState(updatedTasks);

    // Update User Profile & XP
    const updatedProfile: ActionUserProfile = {
      ...profile,
      totalXP: profile.totalXP + action.xpEarned,
      dailyXP: profile.dailyXP + action.xpEarned,
      totalActions: profile.totalActions + 1,
      totalCourageActions: action.isCourageous ? profile.totalCourageActions + 1 : profile.totalCourageActions,
      totalAntiProcrastinationActions: action.isProcrastinated ? profile.totalAntiProcrastinationActions + 1 : profile.totalAntiProcrastinationActions
    };
    setProfile(updatedProfile);
    storageService.saveActionProfile(updatedProfile);

    // Check if Core Day Complete
    const coreTasks = updatedTasks.filter((t) => t.isToday && (t.priority === 'MUST_DO' || t.priority === 'SHOULD_DO'));
    const allCoreDone = coreTasks.length > 0 && coreTasks.every((t) => t.status === 'COMPLETED');
    if (allCoreDone) {
      setTimeout(() => {
        setIsVictoryModalOpen(true);
      }, 1000);
    }
  };

  const handlePostponeTask = (task: ActionTask) => {
    const updated = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          postponedCount: t.postponedCount + 1,
          isToday: false
        };
      }
      return t;
    });
    saveTasksAndState(updated);
    audioService.playBeep('click');
  };

  const handleStuckResolution = (task: ActionTask, reason: StuckReason) => {
    if (reason === 'too_big') {
      setBreakdownTask(task);
    } else if (reason === 'afraid_or_hesitant') {
      handleStartFocus(task, true);
    } else if (reason === 'dont_know_where_to_start' || reason === 'not_enough_time') {
      handleStartFocus(task, true);
    } else if (reason === 'no_longer_important') {
      const updated = tasks.filter((t) => t.id !== task.id);
      saveTasksAndState(updated);
    }
  };

  const handleSaveBreakdown = (task: ActionTask, subtasks: string[], nextAction: string) => {
    const updated = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          nextActionTitle: nextAction,
          subtasks: subtasks.map((st, idx) => ({ id: `st_${idx}`, title: st, completed: false }))
        };
      }
      return t;
    });
    saveTasksAndState(updated);
    audioService.playBeep('success');
    handleStartFocus(task, true);
  };

  const handleAddTask = (newTask: ActionTask) => {
    const updated = [newTask, ...tasks];
    saveTasksAndState(updated);
    audioService.playBeep('success');
  };

  const handleFillSampleTasks = () => {
    audioService.playBeep('success');
    setTasks(defaultActionTasks);
    storageService.saveActionTasks(defaultActionTasks);
    setHistory(defaultActionHistory);
    storageService.saveActionHistory(defaultActionHistory);
    setProfile(defaultActionProfile);
    storageService.saveActionProfile(defaultActionProfile);
  };

  const handleReactToAction = (actionId: string, reactionType: 'respect' | 'brave' | 'letsGo' | 'proud') => {
    const updated = history.map((act) => {
      if (act.id === actionId) {
        return {
          ...act,
          reactions: {
            ...act.reactions,
            [reactionType]: act.reactions[reactionType] + 1
          }
        };
      }
      return act;
    });
    setHistory(updated);
    storageService.saveActionHistory(updated);
    audioService.playBeep('click');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Sub Topbar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              Action Engine & Hall of Fame
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold">
                Anti-Procrastination
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              "Không trì hoãn. Không ngại. Cứ làm."
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          {/* Fill Sample Button */}
          <button
            onClick={handleFillSampleTasks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/30 border border-rose-500/50 hover:bg-rose-600 hover:text-white text-rose-200 text-xs font-bold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Việc Mẫu (Fill Demo)</span>
          </button>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('today')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition ${
                activeSubTab === 'today'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>🔥 TODAY ({tasks.filter((t) => t.isToday && t.status !== 'COMPLETED').length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('hall_of_fame')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition ${
                activeSubTab === 'hall_of_fame'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>🏆 HALL OF FAME</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Việc Mới</span>
          </button>
        </div>
      </div>

      {/* Main Workspace content */}
      <main className="flex-1 flex overflow-hidden">
        {activeSubTab === 'today' ? (
          <TodayCommandCenter
            tasks={tasks}
            profile={profile}
            onStartFocus={handleStartFocus}
            onOpenWhyStuck={(task) => setWhyStuckTask(task)}
            onOpenBreakdown={(task) => setBreakdownTask(task)}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
            onCompleteTaskDirect={(task) => handleCompleteFromFocus(task)}
            onPostponeTask={handlePostponeTask}
            onDeleteTask={(id) => saveTasksAndState(tasks.filter((t) => t.id !== id))}
            onFillSampleTasks={handleFillSampleTasks}
          />
        ) : (
          <HallOfFameView
            history={history}
            profile={profile}
            onReactToAction={handleReactToAction}
          />
        )}
      </main>

      {/* Focus Mode Modal */}
      <FocusModeModal
        isOpen={Boolean(focusTask)}
        onClose={() => setFocusTask(null)}
        task={focusTask}
        onComplete={handleCompleteFromFocus}
        onOpenWhyStuck={(t) => {
          setFocusTask(null);
          setWhyStuckTask(t);
        }}
        isFiveMinuteRule={isFiveMinuteMode}
      />

      {/* Why Stuck Modal */}
      <WhyStuckModal
        isOpen={Boolean(whyStuckTask)}
        onClose={() => setWhyStuckTask(null)}
        task={whyStuckTask}
        onSelectResolution={handleStuckResolution}
      />

      {/* Task Breakdown Modal */}
      <TaskBreakdownModal
        isOpen={Boolean(breakdownTask)}
        onClose={() => setBreakdownTask(null)}
        task={breakdownTask}
        onSaveBreakdown={handleSaveBreakdown}
      />

      {/* Action Recognition Modal */}
      <ActionRecognitionModal
        isOpen={Boolean(recognitionTask)}
        onClose={() => setRecognitionTask(null)}
        task={recognitionTask}
        onSaveAction={handleSaveActionRecognition}
        onNextTaskNow={() => {
          const remaining = tasks.filter((t) => t.isToday && t.status !== 'COMPLETED');
          if (remaining.length > 0) {
            handleStartFocus(remaining[0], false);
          }
        }}
      />

      {/* Daily Victory Modal */}
      <DailyVictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setIsVictoryModalOpen(false)}
        completedCoreCount={tasks.filter((t) => t.isToday && (t.priority === 'MUST_DO' || t.priority === 'SHOULD_DO') && t.status === 'COMPLETED').length}
        totalCoreCount={tasks.filter((t) => t.isToday && (t.priority === 'MUST_DO' || t.priority === 'SHOULD_DO')).length}
        streakDays={profile.currentStreak}
        dailyXp={profile.dailyXP}
        focusMinutes={profile.todayFocusMinutes}
      />

      {/* Quick Add Task Modal */}
      <QuickAddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
