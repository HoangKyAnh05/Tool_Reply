import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  Share2, 
  Copy, 
  Check, 
  Filter, 
  Heart, 
  Zap, 
  ShieldCheck,
  Calendar,
  Lock,
  Globe
} from 'lucide-react';
import { CompletedAction, ActionBadge, ActionUserProfile } from '../../types/actionEngine';
import { audioService } from '../../services/audioService';

interface HallOfFameViewProps {
  history: CompletedAction[];
  profile: ActionUserProfile;
  onReactToAction: (actionId: string, reactionType: 'respect' | 'brave' | 'letsGo' | 'proud') => void;
}

const BADGES_LIST: ActionBadge[] = [
  { id: 'b1', name: '⚡ FIRST MOVE', description: 'Hoàn thành chiến tích đầu tiên', icon: '⚡', requirement: '1 hành động ý nghĩa' },
  { id: 'b2', name: '🔥 NO EXCUSES', description: 'Đạt chuỗi 3 ngày hoàn thành liên tục', icon: '🔥', requirement: 'Chuỗi 3 ngày' },
  { id: 'b3', name: '🦁 COURAGE CHAMPION', description: 'Vượt qua nỗi sợ thực hiện 5 hành động dũng cảm', icon: '🦁', requirement: '5 Courage Actions' },
  { id: 'b4', name: '💀 PROCRASTINATION KILLER', description: 'Đánh bại sự trì hoãn 10 lần', icon: '💀', requirement: '10 Defeated Tasks' },
  { id: 'b5', name: '🚀 ACTION MACHINE', description: 'Hoàn thành 25 hành động không chần chừ', icon: '🚀', requirement: '25 Actions' },
  { id: 'b6', name: '👑 ACTION LEGEND', description: 'Bậc thầy kỷ luật bản thân với 1000+ XP', icon: '👑', requirement: '1000+ XP' }
];

export const HallOfFameView: React.FC<HallOfFameViewProps> = ({
  history,
  profile,
  onReactToAction
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'badges'>('today');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null);

  const handleShareCard = (action: CompletedAction) => {
    const text = `━━━━━━━━━━━━━━━━\n🏆 ACTION OF THE DAY: "${action.actionTitle}"\n${action.isCourageous ? '🦁 FEARLESS • ' : ''}+${action.xpEarned} XP\n"KHÔNG TRÌ HOÃN. KHÔNG NGẠI. CỨ LÀM."\n━━━━━━━━━━━━━━━━`;
    navigator.clipboard.writeText(text);
    setCopiedActionId(action.id);
    setTimeout(() => setCopiedActionId(null), 2000);
    audioService.playBeep('click');
  };

  const filteredHistory = history.filter((a) => {
    if (categoryFilter === 'courage') return a.isCourageous;
    if (categoryFilter === 'procrastination') return a.isProcrastinated;
    if (categoryFilter !== 'all') return a.category.toLowerCase() === categoryFilter.toLowerCase();
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-950 space-y-6">
      {/* Hall of Fame Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-purple-600/15 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 font-mono">
              HALL OF FAME — BẢNG VINH DANH HÀNH ĐỘNG
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            "Không vinh danh người nói nhiều. Vinh danh người DÁM LÀM."
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Mỗi chiến tích ở đây là minh chứng bạn đã chiến thắng sự trì hoãn và nỗi sợ.
          </p>
        </div>

        {/* User Stats Card */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
            {profile.avatar}
          </div>
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-white">{profile.username}</p>
            <p className="text-cyan-400 font-mono font-bold">⭐ {profile.totalXP} Action XP</p>
            <p className="text-amber-400 font-mono font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Streak: {profile.currentStreak} Ngày</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'today' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chiến Tích Hôm Nay
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'history' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lịch Sử Cá Nhân ({history.length})
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'badges' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Huy Hiệu (Badges)
          </button>
        </div>

        {/* Filter categories */}
        {activeTab === 'history' && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['all', 'courage', 'procrastination', 'study', 'work', 'health'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                  categoryFilter === cat ? 'bg-slate-800 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'courage' ? '🦁 Dũng cảm' : cat === 'procrastination' ? '💀 Đã từng hoãn' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Today Achievements */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          {history.filter((a) => Date.now() - a.completedAt < 86400000).length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
              <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-300">Hôm Nay Chưa Có Chiến Tích Nào</h4>
              <p className="text-xs text-slate-500 mt-1">
                Hãy sang mục "TODAY", chọn 1 nhiệm vụ và nhấn "🔥 BẮT ĐẦU" để ghi danh đầu tiên!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.filter((a) => Date.now() - a.completedAt < 86400000).map((act) => (
                <div
                  key={act.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 shadow-xl space-y-3 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {act.isCourageous ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🦁 COURAGE MOMENT
                        </span>
                      ) : act.isProcrastinated ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          💀 PROCRASTINATION DEFEATED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                          ⚡ ACTION COMPLETED
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono">
                        +{act.xpEarned} XP
                      </span>
                    </div>

                    <button
                      onClick={() => handleShareCard(act)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition"
                      title="Chia sẻ card chiến tích"
                    >
                      {copiedActionId === act.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedActionId === act.id ? 'Đã chép' : 'Share'}</span>
                    </button>
                  </div>

                  <p className="text-sm font-extrabold text-white leading-snug">
                    "{act.actionTitle}"
                  </p>

                  {act.reflectionNote && (
                    <p className="text-xs text-slate-400 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      💬 "{act.reflectionNote}"
                    </p>
                  )}

                  {/* Community Positive Reactions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <button
                      onClick={() => onReactToAction(act.id, 'respect')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>🔥 Respect</span>
                      <span className="font-bold text-amber-400">{act.reactions.respect}</span>
                    </button>

                    <button
                      onClick={() => onReactToAction(act.id, 'brave')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>🦁 Brave</span>
                      <span className="font-bold text-orange-400">{act.reactions.brave}</span>
                    </button>

                    <button
                      onClick={() => onReactToAction(act.id, 'letsGo')}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>⚡ Let's Go</span>
                      <span className="font-bold text-cyan-400">{act.reactions.letsGo}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Personal Timeline History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {filteredHistory.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(act.completedAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="px-2 py-0.2 rounded bg-slate-800 text-cyan-300 font-bold text-[10px]">
                    +{act.xpEarned} XP
                  </span>
                  {act.isCourageous && (
                    <span className="text-amber-400 font-bold text-[10px]">🦁 Courage</span>
                  )}
                </div>
                <p className="font-bold text-slate-100 text-sm">{act.actionTitle}</p>
                {act.reflectionNote && <p className="text-slate-400 italic">"{act.reflectionNote}"</p>}
              </div>

              <button
                onClick={() => handleShareCard(act)}
                className="self-start md:self-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Sao Chép Card</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {BADGES_LIST.map((b) => {
            const isUnlocked = profile.totalXP >= 100;
            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border flex items-start gap-3.5 transition ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-500/40 text-slate-200 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                  {b.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{b.name}</span>
                    {isUnlocked ? (
                      <span className="text-[10px] text-emerald-400 font-bold">ĐÃ MỞ</span>
                    ) : (
                      <Lock className="w-3 h-3 text-slate-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.description}</p>
                  <p className="text-[10px] text-amber-400/80 mt-1 font-mono">Yêu cầu: {b.requirement}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
