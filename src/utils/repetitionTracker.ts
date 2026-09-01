// Utility for tracking repetition levels with 5 primary tiers + extended unique colors

export interface RepetitionTier {
  level: number;
  name: string;
  emoji: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
  badgeClass: string;
  glowClass: string;
  dotColor: string;
}

export const REPETITION_TIERS: RepetitionTier[] = [
  {
    level: 0,
    name: 'Chưa học',
    emoji: '⚪',
    borderClass: 'border-slate-800',
    bgClass: 'bg-slate-950/80',
    textClass: 'text-slate-200',
    badgeClass: 'bg-slate-800 text-slate-400 border-slate-700',
    glowClass: '',
    dotColor: '#64748b'
  },
  // Mức 1: Xanh nước biển
  {
    level: 1,
    name: 'Mức 1: Xanh nước biển',
    emoji: '🔵',
    borderClass: 'border-blue-500 ring-1 ring-blue-500/50',
    bgClass: 'bg-blue-950/70',
    textClass: 'text-blue-200',
    badgeClass: 'bg-blue-600 text-white border-blue-400 font-extrabold shadow-md shadow-blue-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.35)] ring-2 ring-blue-500',
    dotColor: '#3b82f6'
  },
  // Mức 2: Vàng
  {
    level: 2,
    name: 'Mức 2: Vàng',
    emoji: '🟡',
    borderClass: 'border-amber-400 ring-1 ring-amber-400/50',
    bgClass: 'bg-amber-950/70',
    textClass: 'text-amber-200',
    badgeClass: 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-md shadow-amber-500/30',
    glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-2 ring-amber-400',
    dotColor: '#f59e0b'
  },
  // Mức 3: Đỏ
  {
    level: 3,
    name: 'Mức 3: Đỏ',
    emoji: '🔴',
    borderClass: 'border-rose-500 ring-1 ring-rose-500/50',
    bgClass: 'bg-rose-950/70',
    textClass: 'text-rose-200',
    badgeClass: 'bg-rose-600 text-white border-rose-400 font-extrabold shadow-md shadow-rose-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(244,63,94,0.35)] ring-2 ring-rose-500',
    dotColor: '#f43f5e'
  },
  // Mức 4: Tím
  {
    level: 4,
    name: 'Mức 4: Tím',
    emoji: '🟣',
    borderClass: 'border-purple-500 ring-1 ring-purple-500/50',
    bgClass: 'bg-purple-950/70',
    textClass: 'text-purple-200',
    badgeClass: 'bg-purple-600 text-white border-purple-400 font-extrabold shadow-md shadow-purple-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-purple-500',
    dotColor: '#a855f7'
  },
  // Mức 5: Xanh lá cây
  {
    level: 5,
    name: 'Mức 5: Xanh lá cây',
    emoji: '🟢',
    borderClass: 'border-emerald-500 ring-1 ring-emerald-500/50',
    bgClass: 'bg-emerald-950/70',
    textClass: 'text-emerald-200',
    badgeClass: 'bg-emerald-600 text-white border-emerald-400 font-extrabold shadow-md shadow-emerald-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500',
    dotColor: '#10b981'
  },
  // Mức 6+: Các màu tiếp theo không trùng với các màu trước
  {
    level: 6,
    name: 'Mức 6: Cam tươi',
    emoji: '🟠',
    borderClass: 'border-orange-500 ring-1 ring-orange-500/50',
    bgClass: 'bg-orange-950/70',
    textClass: 'text-orange-200',
    badgeClass: 'bg-orange-600 text-white border-orange-400 font-extrabold shadow-md shadow-orange-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(249,115,22,0.35)] ring-2 ring-orange-500',
    dotColor: '#f97316'
  },
  {
    level: 7,
    name: 'Mức 7: Hồng sen',
    emoji: '🌸',
    borderClass: 'border-pink-500 ring-1 ring-pink-500/50',
    bgClass: 'bg-pink-950/70',
    textClass: 'text-pink-200',
    badgeClass: 'bg-pink-600 text-white border-pink-400 font-extrabold shadow-md shadow-pink-600/30',
    glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.35)] ring-2 ring-pink-500',
    dotColor: '#ec4899'
  },
  {
    level: 8,
    name: 'Mức 8: Xanh lơ ngọc',
    emoji: '💎',
    borderClass: 'border-cyan-400 ring-1 ring-cyan-400/50',
    bgClass: 'bg-cyan-950/70',
    textClass: 'text-cyan-200',
    badgeClass: 'bg-cyan-500 text-slate-950 border-cyan-300 font-extrabold shadow-md shadow-cyan-500/30',
    glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400',
    dotColor: '#06b6d4'
  },
  {
    level: 9,
    name: 'Mức 9: Vàng Gold',
    emoji: '⭐',
    borderClass: 'border-yellow-300 ring-1 ring-yellow-300/60',
    bgClass: 'bg-yellow-950/70',
    textClass: 'text-yellow-100',
    badgeClass: 'bg-yellow-400 text-slate-950 border-yellow-200 font-black shadow-md shadow-yellow-400/40',
    glowClass: 'shadow-[0_0_25px_rgba(234,179,8,0.45)] ring-2 ring-yellow-300',
    dotColor: '#eab308'
  },
  {
    level: 10,
    name: 'Mức 10: Bạch kim Crown',
    emoji: '👑',
    borderClass: 'border-white ring-2 ring-white/80',
    bgClass: 'bg-slate-850',
    textClass: 'text-white font-black',
    badgeClass: 'bg-white text-slate-950 border-slate-200 font-black shadow-lg shadow-white/30',
    glowClass: 'shadow-[0_0_30px_rgba(255,255,255,0.6)] ring-2 ring-white',
    dotColor: '#ffffff'
  }
];

const STORAGE_KEY_PREFIX = 'ielts_study_repetition_counts_v1';

export const repetitionService = {
  getAllCounts(): Record<string, number> {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PREFIX);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getCount(key: string): number {
    const all = this.getAllCounts();
    return all[key] || 0;
  },

  incrementCount(key: string): number {
    const all = this.getAllCounts();
    const current = all[key] || 0;
    const next = current + 1;
    all[key] = next;
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX, JSON.stringify(all));
    } catch (e) {
      console.error('Save repetition count error:', e);
    }
    return next;
  },

  resetCount(key: string): void {
    const all = this.getAllCounts();
    delete all[key];
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX, JSON.stringify(all));
    } catch (e) {
      console.error('Reset repetition count error:', e);
    }
  },

  getTier(count: number): RepetitionTier {
    if (count <= 0) return REPETITION_TIERS[0];
    const index = ((count - 1) % (REPETITION_TIERS.length - 1)) + 1;
    const baseTier = REPETITION_TIERS[index];
    return {
      ...baseTier,
      level: count,
      name: `Lần ${count}: ${baseTier.name.replace(/^Mức \d+:\s*/, '')}`
    };
  }
};
