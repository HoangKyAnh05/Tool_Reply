import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  PenTool,
  TrendingUp,
  FileText,
  Maximize2,
  Minimize2,
  Volume2,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';
import { ieltsWritingTask1Bank } from '../../data/ieltsWritingTask1Bank';
import { ieltsWritingTask2Bank } from '../../data/ieltsWritingTask2Bank';
import { IeltsTask1Item, IeltsTask2Item } from '../../types/ieltsWriting';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';

interface IeltsWritingBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTask?: (type: 'task1' | 'task2', id: number) => void;
}

export const IeltsWritingBankModal: React.FC<IeltsWritingBankModalProps> = ({
  isOpen,
  onClose,
  onSelectTask
}) => {
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioService.playBeep('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const next = !isFullscreen;
    setIsFullscreen(next);
    await toggleNativeFullscreen();
  };

  // Filter lists
  const filteredTask1 = ieltsWritingTask1Bank.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.chartType === selectedCategory;
    const s = searchTerm.toLowerCase();
    return matchCat && (item.title.toLowerCase().includes(s) || item.prompt.toLowerCase().includes(s));
  });

  const filteredTask2 = ieltsWritingTask2Bank.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.essayType === selectedCategory;
    const s = searchTerm.toLowerCase();
    return matchCat && (item.topic.toLowerCase().includes(s) || item.prompt.toLowerCase().includes(s));
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        isFullscreen
          ? 'w-screen h-screen p-0 m-0 bg-slate-950'
          : 'items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn'
      }`}
    >
      <div
        className={`bg-slate-900 flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? 'w-full h-full rounded-none border-none'
            : 'border border-slate-800 w-full max-w-6xl h-[94vh] rounded-3xl shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-600/30 to-purple-600/30 border border-amber-500/30 rounded-xl text-amber-400">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>📚 Thư Viện 600 Đề Thi IELTS Writing (Bank)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  Task 1 (300) • Task 2 (300)
                </span>
                {isFullscreen && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    TOÀN MÀN HÌNH
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Tra cứu đề thi thật kèm biểu đồ trực quan & bài mẫu chuẩn Band 7.5 – 8.5+
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle */}
            <button
              onClick={handleToggleFullscreen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition shadow-sm"
              title={isFullscreen ? 'Thu nhỏ (Esc)' : 'Mở to toàn màn hình'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task 1 vs Task 2 Switcher & Search Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTask('task1');
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTask === 'task1'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Task 1 Biểu Đồ (300)
            </button>

            <button
              onClick={() => {
                setActiveTask('task2');
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTask === 'task2'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Task 2 Nghị Luận (300)
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm đề thi, từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* List of 300 items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-slate-950 space-y-3">
          {(activeTask === 'task1' ? filteredTask1 : filteredTask2).map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm group"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    #{item.id}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {activeTask === 'task1'
                      ? (item as IeltsTask1Item).chartType.toUpperCase()
                      : (item as IeltsTask2Item).essayType.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-amber-400 truncate">
                    🏷️ {item.category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-purple-300 transition">
                  {activeTask === 'task1' ? (item as IeltsTask1Item).title : (item as IeltsTask2Item).topic}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.prompt}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Band {item.bandScore}
                </span>

                <button
                  onClick={() =>
                    handleCopy(
                      `bank_${item.id}`,
                      activeTask === 'task1'
                        ? `${(item as IeltsTask1Item).title}\n${item.prompt}\n\n${item.sampleAnswerBand8}`
                        : `${(item as IeltsTask2Item).topic}\n${item.prompt}\n\n${item.sampleAnswerBand8}`
                    )
                  }
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Sao chép bài"
                >
                  {copiedId === `bank_${item.id}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                {onSelectTask && (
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      onSelectTask(activeTask, item.id);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow"
                  >
                    <span>Xem Bài Này</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
