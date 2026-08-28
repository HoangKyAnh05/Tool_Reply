import React, { useState } from 'react';
import { 
  X, 
  Scissors, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Flame
} from 'lucide-react';
import { ActionTask } from '../../types/actionEngine';

interface TaskBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ActionTask | null;
  onSaveBreakdown: (task: ActionTask, subtasks: string[], updatedNextAction: string) => void;
}

export const TaskBreakdownModal: React.FC<TaskBreakdownModalProps> = ({
  isOpen,
  onClose,
  task,
  onSaveBreakdown
}) => {
  const [subtasks, setSubtasks] = useState<string[]>([
    'Bước 1: Mở phần mềm và đọc lướt qua tài liệu',
    'Bước 2: Tạo khung sườn / thư mục / ghi chú ban đầu',
    'Bước 3: Viết 1 chức năng nhỏ nhất đầu tiên'
  ]);
  const [newSubtask, setNewSubtask] = useState('');

  if (!isOpen || !task) return null;

  const handleAdd = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, newSubtask.trim()]);
    setNewSubtask('');
  };

  const handleRemove = (idx: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== idx));
  };

  const handleApply = () => {
    const nextAction = subtasks[0] || task.nextActionTitle;
    onSaveBreakdown(task, subtasks, nextAction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">CHIA NHỎ VIỆC QUÁ LỚN</h3>
              <p className="text-xs text-slate-400">
                Biến task cồng kềnh thành những bước siêu nhỏ để bắt đầu ngay
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Name */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">Nhiệm vụ gốc: </span>
          <strong className="text-white text-sm">{task.title}</strong>
        </div>

        {/* Subtasks List */}
        <div className="overflow-y-auto space-y-2 pr-1 text-xs">
          <label className="font-bold text-slate-300 block mb-1">
            Các bước hành động nhỏ tiếp theo (Bước 1 sẽ là Next Action):
          </label>

          {subtasks.map((st, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 gap-2"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold font-mono text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-200 truncate">{st}</span>
              </div>

              <button
                onClick={() => handleRemove(idx)}
                className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add input */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Thêm bước nhỏ tiếp theo..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={!newSubtask.trim()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
          >
            <Flame className="w-4 h-4" />
            <span>Áp Dụng & Bắt Đầu Bước 1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
