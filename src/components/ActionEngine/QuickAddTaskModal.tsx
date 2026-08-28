import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Flame, 
  Clock, 
  Calendar, 
  Target,
  ArrowRight
} from 'lucide-react';
import { ActionTask, TaskPriority } from '../../types/actionEngine';

interface QuickAddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: ActionTask) => void;
}

export const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask
}) => {
  const [title, setTitle] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MUST_DO');
  const [duration, setDuration] = useState(30);
  const [isToday, setIsToday] = useState(true);
  const [category, setCategory] = useState<'Study' | 'Work' | 'Personal' | 'Health' | 'Communication'>('Study');

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!nextAction || nextAction.startsWith('Bắt đầu')) {
      setNextAction(`Mở tài liệu và làm 5 phút đầu tiên của: "${val.slice(0, 30)}"`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: ActionTask = {
      id: `task_${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      estimatedDuration: duration,
      dueDate: new Date().toISOString().split('T')[0],
      status: isToday ? 'READY' : 'BACKLOG',
      isToday,
      nextActionTitle: nextAction.trim() || `Bắt đầu 5 phút đầu tiên của: "${title.trim()}"`,
      postponedCount: 0,
      timeSpentMinutes: 0,
      createdAt: Date.now()
    };

    onAddTask(newTask);
    setTitle('');
    setNextAction('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Plus className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">Thêm Nhiệm Vụ & Next Action</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">
              1. Tên nhiệm vụ (Task):
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ví dụ: Làm bài tập Java / Học IELTS / Gửi CV..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5">
              2. Bước hành động nhỏ nhất tiếp theo (Next Action):
            </label>
            <input
              type="text"
              required
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="Ví dụ: Mở phần mềm và đọc requirement trong 5 phút"
              className="w-full bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1 italic">
              💡 Đây là bước siêu nhỏ sẽ hiển thị trực tiếp tại nút "🔥 BẮT ĐẦU".
            </p>
          </div>

          {/* Priority & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Mức độ ưu tiên:</label>
              <select
                value={priority}
                onChange={(e: any) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500"
              >
                <option value="MUST_DO">🔴 MUST DO TODAY (Bắt buộc)</option>
                <option value="SHOULD_DO">🟠 SHOULD DO (Nên làm)</option>
                <option value="QUICK_WIN">🟡 QUICK WIN (Nhanh 5-10p)</option>
                <option value="BACKLOG">⚪ BACKLOG (Tương lai)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Thời lượng ước tính:</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500"
              >
                <option value={5}>⚡ 5 Phút (Phá vỡ sức ỳ)</option>
                <option value={15}>⏱ 15 Phút</option>
                <option value={25}>⏱ 25 Phút (Pomodoro)</option>
                <option value={45}>⏱ 45 Phút</option>
                <option value={60}>⏱ 60 Phút</option>
              </select>
            </div>
          </div>

          {/* Today vs Backlog */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <span className="font-bold text-slate-300 block">Xếp vào danh sách Hôm Nay (Today):</span>
              <span className="text-[11px] text-slate-500">Nếu tắt, task sẽ lưu vào Backlog tương lai</span>
            </div>
            <input
              type="checkbox"
              checked={isToday}
              onChange={(e) => setIsToday(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo & Bắt Đầu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
