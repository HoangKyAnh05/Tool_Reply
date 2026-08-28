export type TaskPriority = 'MUST_DO' | 'SHOULD_DO' | 'QUICK_WIN' | 'BACKLOG';

export type TaskStatus = 
  | 'BACKLOG'
  | 'TODAY'
  | 'READY'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'PAUSED'
  | 'CANCELLED'
  | 'MOVED'
  | 'OVERDUE';

export type ActionDifficulty = 'STARTER' | 'BRAVE' | 'BOLD' | 'FEARLESS' | 'LEGENDARY';

export type StuckReason = 
  | 'dont_know_where_to_start'
  | 'too_big'
  | 'low_energy'
  | 'afraid_or_hesitant'
  | 'distracted'
  | 'not_enough_time'
  | 'no_longer_important';

export interface ActionTask {
  id: string;
  title: string;
  description?: string;
  category: 'Study' | 'Work' | 'Personal' | 'Health' | 'Communication' | 'Finance';
  priority: TaskPriority;
  estimatedDuration: number; // in minutes
  dueDate: string; // YYYY-MM-DD
  dueTime?: string;
  status: TaskStatus;
  isToday: boolean;
  nextActionTitle: string; // "Mở project và đọc requirement trong 5 phút"
  postponedCount: number;
  subtasks?: { id: string; title: string; completed: boolean }[];
  timeSpentMinutes: number;
  createdAt: number;
  completedAt?: number;
  isProcrastinated?: boolean;
  isCourageous?: boolean;
}

export interface CompletedAction {
  id: string;
  taskId: string;
  taskTitle: string;
  actionTitle: string;
  category: string;
  difficulty: ActionDifficulty;
  xpEarned: number;
  isProcrastinated: boolean;
  isCourageous: boolean;
  courageReason?: string;
  reflectionNote?: string;
  visibility: 'public' | 'friends' | 'private';
  reactions: {
    respect: number; // 🔥
    brave: number; // 🦁
    letsGo: number; // ⚡
    proud: number; // ❤️
    userReacted?: string;
  };
  completedAt: number;
}

export interface ActionBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  requirement: string;
}

export interface ActionUserProfile {
  username: string;
  avatar: string;
  totalXP: number;
  dailyXP: number;
  currentStreak: number;
  longestStreak: number;
  totalActions: number;
  totalCourageActions: number;
  totalAntiProcrastinationActions: number;
  todayFocusMinutes: number;
  lastActiveDate: string; // YYYY-MM-DD
}
