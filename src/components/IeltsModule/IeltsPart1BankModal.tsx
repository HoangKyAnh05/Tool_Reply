import React, { useState } from 'react';
import { X, Search, BookOpen, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';

interface IeltsPart1BankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (item: IeltsPart1Item) => void;
}

export const IeltsPart1BankModal: React.FC<IeltsPart1BankModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(ieltsPart1Bank.map((item) => item.category)))];

  const filteredItems = ieltsPart1Bank.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vocab.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (item: IeltsPart1Item) => {
    const text = `Q: ${item.question}\nVocab:\n${item.vocab}\n\nAnswer:\n${item.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>📚 Kho 100 Câu Hỏi & Model Answer IELTS Speaking Part 1</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Full Icons & Micro-Chains
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                100 câu Part 1 chia theo 20 chủ đề kèm Vocab & Chuỗi Icon Neo Ý Tưởng sắc nét
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo câu hỏi, từ vựng hoặc chủ đề..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Hiển thị: <span className="text-indigo-400 font-bold">{filteredItems.length}</span> / 100 câu
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat === 'All' ? '🌐 Tất cả (100)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Question List Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/30">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 hover:border-slate-700 transition shadow-lg space-y-3 relative group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      #{item.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Layers className="w-3 h-3 text-slate-400" />}
                      <span>{copiedId === item.id ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectQuestion(item);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-md"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Học câu này (Load)</span>
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-xs font-bold text-amber-300 block mb-0.5">❓ Câu hỏi Part 1:</span>
                  <p className="text-sm font-semibold text-slate-100">{item.question}</p>
                </div>

                {/* Vocabulary List */}
                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                  <span className="text-[11px] font-bold text-indigo-300 block mb-1">🔑 Từ vựng mấu chốt (Vocabulary):</span>
                  <div className="text-xs text-indigo-200 font-mono whitespace-pre-line leading-relaxed">
                    {item.vocab}
                  </div>
                </div>

                {/* Answer Icon Chain */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-1">💬 Chuỗi Icon Bài Nói Mẫu (Icon-Anchored Answer):</span>
                  <p className="text-xs font-medium text-slate-200 leading-relaxed select-text">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>💡 Bấm <b>"Học câu này (Load)"</b> để nạp dữ liệu câu hỏi & trả lời trực tiếp vào hệ thống Sơ Đồ Nhớ Visual Map 30s.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
