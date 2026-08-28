import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  Scissors, 
  Flame, 
  Zap, 
  ShieldAlert, 
  Clock, 
  Trash2,
  ArrowRight
} from 'lucide-react';
import { ActionTask, StuckReason } from '../../types/actionEngine';

interface WhyStuckModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ActionTask | null;
  onSelectResolution: (task: ActionTask, reason: StuckReason) => void;
}

const STUCK_REASONS: { id: StuckReason; icon: string; title: string; desc: string; actionText: string }[] = [
  {
    id: 'dont_know_where_to_start',
    icon: '😵',
    title: 'Không biết bắt đầu từ đâu',
    desc: 'Mơ hồ, thiếu tài liệu hoặc chưa rõ bước 1 cần làm gì.',
    actionText: 'Tạo bước Next Action siêu nhỏ (1 phút)'
  },
  {
    id: 'too_big',
    icon: '🤯',
    title: 'Việc quá lớn & choáng ngợp',
    desc: 'Cảm giác task như một ngọn núi khổng lồ khó nuốt trôi.',
    actionText: 'Chia nhỏ thành 3-5 subtask'
  },
  {
    id: 'afraid_or_hesitant',
    icon: '😨',
    title: 'Tôi đang ngại / sợ bị từ chối / sợ sai',
    desc: 'Nỗi sợ tâm lý, ngại giao tiếp hoặc sợ phán xét.',
    actionText: 'Bật Courage Mode (Hành động dũng cảm)'
  },
  {
    id: 'low_energy',
    icon: '😴',
    title: 'Hết năng lượng / Mệt mỏi',
    desc: 'Đầu óc uể oải, không thể tập trung tư duy sâu.',
    actionText: 'Đổi sang việc Quick Win hoặc làm 5 phút nhẹ nhàng'
  },
  {
    id: 'distracted',
    icon: '📱',
    title: 'Bị phân tâm bởi MXH / Điện thoại',
    desc: 'Cứ định làm lại mở Facebook / TikTok / YouTube.',
    actionText: 'Bật Focus Mode toàn màn hình'
  },
  {
    id: 'not_enough_time',
    icon: '⏰',
    title: 'Không đủ thời gian bây giờ',
    desc: 'Chỉ có 10-15 phút rảnh trước khi đi việc khác.',
    actionText: 'Làm phiên bản mini 10 phút'
  },
  {
    id: 'no_longer_important',
    icon: '❌',
    title: 'Việc này không còn quan trọng nữa',
    desc: 'Tình thế đã đổi hoặc đây là việc không sinh giá trị.',
    actionText: 'Hủy hoặc chuyển vào Backlog'
  }
];

export const WhyStuckModal: React.FC<WhyStuckModalProps> = ({
  isOpen,
  onClose,
  task,
  onSelectResolution
}) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                TẠI SAO BẠN CHƯA LÀM VIỆC NÀY?
              </h3>
              <p className="text-xs text-slate-400">
                Hiểu rõ rào cản tâm lý để đưa ra giải pháp vượt qua sức ỳ tức thì
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Title */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Đang xét task: </span>
          <strong className="text-slate-200 text-sm">{task.title}</strong>
        </div>

        {/* Reasons Grid */}
        <div className="overflow-y-auto space-y-2.5 pr-1 text-xs">
          {STUCK_REASONS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectResolution(task, item.id);
                onClose();
              }}
              className="w-full p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 text-left transition flex items-start gap-3.5 group shadow-md"
            >
              <span className="text-2xl shrink-0 p-1 bg-slate-900 rounded-xl border border-slate-800">
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-xs group-hover:text-amber-300 transition">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
