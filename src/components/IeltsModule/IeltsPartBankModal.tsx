import React, { useState } from 'react';
import { X, Search, BookOpen, Sparkles, Check, Layers, Folder, ChevronRight, Hash } from 'lucide-react';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';
import { ieltsPart2Bank, IeltsPart2Item } from '../../data/ieltsPart2Bank';
import { ieltsPart3Bank, IeltsPart3Item } from '../../data/ieltsPart3Bank';

export interface SelectedQuestionPayload {
  part: 'Part 1' | 'Part 2' | 'Part 3';
  question: string;
  vocab: string;
  answer: string;
  topic?: string;
  category: string;
}

interface IeltsPartBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPart?: 'Part 1' | 'Part 2' | 'Part 3';
  onSelectQuestion: (payload: SelectedQuestionPayload) => void;
}

export const IeltsPartBankModal: React.FC<IeltsPartBankModalProps> = ({
  isOpen,
  onClose,
  defaultPart = 'Part 1',
  onSelectQuestion,
}) => {
  const [activePart, setActivePart] = useState<'Part 1' | 'Part 2' | 'Part 3'>(defaultPart);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync activePart with defaultPart when opened
  React.useEffect(() => {
    if (isOpen) {
      setActivePart(defaultPart);
      setSelectedCategory('All');
      setSearchTerm('');
    }
  }, [isOpen, defaultPart]);

  if (!isOpen) return null;

  // Retrieve current active dataset
  const currentDataset: { id: number; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string }[] =
    activePart === 'Part 1'
      ? ieltsPart1Bank
      : activePart === 'Part 2'
      ? ieltsPart2Bank
      : ieltsPart3Bank;

  const categories = ['All', ...Array.from(new Set(currentDataset.map((item) => item.category)))];

  const filteredItems = currentDataset.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.question.toLowerCase().includes(searchLower) ||
      item.vocab.toLowerCase().includes(searchLower) ||
      item.answer.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.cueCardPrompt && item.cueCardPrompt.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (item: any) => {
    const text = `Part: ${activePart}\nCategory: ${item.category}\nQuestion: ${item.question}\n${item.cueCardPrompt ? `Prompt:\n${item.cueCardPrompt}\n` : ''}Vocab:\n${item.vocab}\n\nAnswer:\n${item.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedId(`${activePart}_${item.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelect = (item: any) => {
    onSelectQuestion({
      part: activePart,
      question: item.question,
      vocab: item.vocab,
      answer: item.answer,
      topic: item.topic || item.category,
      category: item.category
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 rounded-xl text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>📚 Thư Viện 300 Câu IELTS Speaking (Full Icons & Answers)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Part 1 • Part 2 • Part 3
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                100 câu Part 1, 100 đề Cue Card Part 2 và 100 câu thảo luận Part 3 chia theo thư mục chủ đề trực quan
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

        {/* Top Part Segmented Control & Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          {/* Part Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActivePart('Part 1');
                setSelectedCategory('All');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activePart === 'Part 1'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 1 (100 câu)</span>
            </button>

            <button
              onClick={() => {
                setActivePart('Part 2');
                setSelectedCategory('All');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activePart === 'Part 2'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 2 (100 Cue Cards)</span>
            </button>

            <button
              onClick={() => {
                setActivePart('Part 3');
                setSelectedCategory('All');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activePart === 'Part 3'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 3 (100 Thảo Luận)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm trong 100 câu ${activePart} theo câu hỏi, từ vựng...`}
              className="w-full pl-10 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs font-semibold text-slate-400">
            Hiển thị: <span className="text-indigo-400 font-bold">{filteredItems.length}</span> / 100 câu
          </div>
        </div>

        {/* Main Body: Left Folder/Category Tree + Right Question List */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Scrollable Category/Folder Tree */}
          <aside className="w-64 border-r border-slate-800 bg-slate-950/60 flex flex-col overflow-y-auto p-3 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 px-2 py-1 flex items-center gap-1.5 uppercase tracking-wider">
              <Folder className="w-3.5 h-3.5 text-indigo-400" />
              <span>Thư mục 20 Chủ đề:</span>
            </div>

            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? currentDataset.length
                  : currentDataset.filter((i) => i.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition group ${
                    isSelected
                      ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    <span className="truncate">{cat === 'All' ? '🌐 Tất cả chủ đề' : cat}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md shrink-0 ${
                    isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Right Scrollable Question Cards */}
          <main className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/30">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}".
              </div>
            ) : (
              filteredItems.map((item) => {
                const uniqueKey = `${activePart}_${item.id}`;

                return (
                  <div
                    key={uniqueKey}
                    className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 hover:border-slate-700 transition shadow-lg space-y-3 relative group"
                  >
                    {/* Header with Badges & Action Buttons */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          #{item.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {item.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {activePart}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition"
                        >
                          {copiedId === uniqueKey ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Layers className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{copiedId === uniqueKey ? 'Đã sao chép' : 'Sao chép'}</span>
                        </button>

                        <button
                          onClick={() => handleSelect(item)}
                          className="px-3.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-md"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Học câu này (Load)</span>
                        </button>
                      </div>
                    </div>

                    {/* Question / Cue Card Prompt */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-amber-300 block mb-1">
                        {activePart === 'Part 2' ? '📋 Đề bài Cue Card (Part 2):' : `❓ Câu hỏi (${activePart}):`}
                      </span>
                      <p className="text-sm font-bold text-slate-100 mb-1">{item.question}</p>
                      {item.cueCardPrompt && (
                        <div className="text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed mt-2 pt-2 border-t border-slate-800/60">
                          {item.cueCardPrompt}
                        </div>
                      )}
                    </div>

                    {/* Vocabulary List */}
                    <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                      <span className="text-[11px] font-bold text-indigo-300 block mb-1">
                        🔑 Từ vựng mấu chốt (Band 7.5 - 8.5 Vocab):
                      </span>
                      <div className="text-xs text-indigo-200 font-mono whitespace-pre-line leading-relaxed">
                        {item.vocab}
                      </div>
                    </div>

                    {/* Answer Icon Chain */}
                    <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
                      <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                        💬 Chuỗi Icon Bài Nói Mẫu (Icon-Anchored Model Answer):
                      </span>
                      <p className="text-xs font-medium text-slate-200 leading-relaxed select-text">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>
            💡 Bấm <b>"Học câu này (Load)"</b> để nạp dữ liệu đề bài, từ vựng và câu trả lời mẫu vào hệ thống <b>Visual Master Map</b>.
          </span>
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
