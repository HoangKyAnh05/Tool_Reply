import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  BookOpen,
  Sparkles,
  Check,
  Layers,
  Folder,
  Plus,
  Trash2,
  Star,
  Maximize2,
  Minimize2,
  Eye,
  Volume2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';
import { ieltsPart2Bank, IeltsPart2Item } from '../../data/ieltsPart2Bank';
import { ieltsPart3Bank, IeltsPart3Item } from '../../data/ieltsPart3Bank';
import { storageService } from '../../services/storageService';
import { IeltsCustomQuestion } from '../../types/ielts';
import { IeltsCustomQuestionModal } from './IeltsCustomQuestionModal';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';

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
  defaultFullscreen?: boolean;
  onSelectQuestion: (payload: SelectedQuestionPayload) => void;
}

export const IeltsPartBankModal: React.FC<IeltsPartBankModalProps> = ({
  isOpen,
  onClose,
  defaultPart = 'Part 1',
  defaultFullscreen = false,
  onSelectQuestion,
}) => {
  const [activePart, setActivePart] = useState<'Part 1' | 'Part 2' | 'Part 3'>(defaultPart);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customVersion, setCustomVersion] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);
  const [focusItem, setFocusItem] = useState<any | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync activePart with defaultPart when opened
  useEffect(() => {
    if (isOpen) {
      setActivePart(defaultPart);
      setSelectedCategory('All');
      setSearchTerm('');
      if (defaultFullscreen) {
        setIsFullscreen(true);
      }
    } else {
      setFocusItem(null);
    }
  }, [isOpen, defaultPart, defaultFullscreen]);

  // Handle keyboard shortcuts (ESC to exit focus or modal, Arrows for prev/next in focus)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (focusItem) {
          setFocusItem(null);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusItem, isFullscreen, onClose]);

  if (!isOpen) return null;

  // Retrieve current active default dataset + custom questions
  const defaultDataset: { id: number | string; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string; isCustom?: boolean }[] =
    activePart === 'Part 1'
      ? ieltsPart1Bank
      : activePart === 'Part 2'
      ? ieltsPart2Bank
      : ieltsPart3Bank;

  const customQuestions: { id: string; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string; isCustom: boolean }[] =
    storageService.getCustomIeltsQuestions(activePart).map((q) => ({
      ...q,
      isCustom: true
    }));

  const currentDataset = [...customQuestions, ...defaultDataset];

  const categories = [
    'All',
    ...(customQuestions.length > 0 ? ['⭐ Câu hỏi tự tạo (Custom)'] : []),
    ...Array.from(new Set(defaultDataset.map((item) => item.category)))
  ];

  const filteredItems = currentDataset.filter((item) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === '⭐ Câu hỏi tự tạo (Custom)') {
      matchesCategory = !!item.isCustom;
    } else {
      matchesCategory = item.category === selectedCategory;
    }

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.question.toLowerCase().includes(searchLower) ||
      item.vocab.toLowerCase().includes(searchLower) ||
      item.answer.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.cueCardPrompt && item.cueCardPrompt.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    await toggleNativeFullscreen();
  };

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
    setFocusItem(null);
    onClose();
  };

  const handleDeleteCustom = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi tự tạo này?')) {
      storageService.deleteCustomIeltsQuestion(id);
      audioService.playBeep('click');
      setCustomVersion((v) => v + 1);
      if (focusItem && String(focusItem.id) === String(id)) {
        setFocusItem(null);
      }
    }
  };

  // TTS Read
  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const clean = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Navigation inside Zen Focus Reader
  const currentFocusIndex = focusItem ? filteredItems.findIndex((i) => String(i.id) === String(focusItem.id)) : -1;

  const handlePrevFocus = () => {
    if (currentFocusIndex > 0) {
      audioService.playBeep('click');
      if (isSpeaking && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setFocusItem(filteredItems[currentFocusIndex - 1]);
    }
  };

  const handleNextFocus = () => {
    if (currentFocusIndex >= 0 && currentFocusIndex < filteredItems.length - 1) {
      audioService.playBeep('click');
      if (isSpeaking && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setFocusItem(filteredItems[currentFocusIndex + 1]);
    }
  };

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
            : 'border border-slate-800 w-full max-w-6xl h-[94vh] rounded-2xl shadow-2xl'
        }`}
      >
        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 rounded-xl text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>📚 Thư Viện 300 Câu Hỏi IELTS Speaking (Bank)</span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Part 1 • Part 2 • Part 3
                </span>
                {isFullscreen && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    TOÀN MÀN HÌNH
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Tra cứu 300 câu mẫu kèm bài trả lời chi tiết và quản lý các câu hỏi tự tạo của bạn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Create Custom Question Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>➕ Tạo câu hỏi mới</span>
            </button>

            {/* Maximize / Minimize Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                isFullscreen
                  ? 'bg-purple-600/30 border-purple-500/60 text-purple-200 hover:bg-purple-600 hover:text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
              title={isFullscreen ? 'Thu nhỏ giao diện (Esc)' : 'Mở to toàn màn hình'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Thu nhỏ' : 'Mở Toàn Màn Hình'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Đóng thư viện (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Part Segmented Control & Search */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Part Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActivePart('Part 1');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePart === 'Part 1'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part 1 (100 câu)
            </button>

            <button
              onClick={() => {
                setActivePart('Part 2');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePart === 'Part 2'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part 2 Cue Cards (100 đề)
            </button>

            <button
              onClick={() => {
                setActivePart('Part 3');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activePart === 'Part 3'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part 3 Thảo Luận (100 câu)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm trong ${activePart} theo câu hỏi, từ vựng...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Categories Bar & Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Category List */}
          <aside className="w-56 border-r border-slate-800 bg-slate-950/40 p-3 overflow-y-auto hidden md:block shrink-0">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-2 px-2">
              Chủ đề ({categories.length - 1})
            </span>
            <div className="space-y-1">
              {categories.map((cat) => {
                let count = 0;
                if (cat === 'All') count = currentDataset.length;
                else if (cat === '⭐ Câu hỏi tự tạo (Custom)') count = customQuestions.length;
                else count = defaultDataset.filter((i) => i.category === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-md'
                        : cat.includes('Custom')
                        ? 'text-amber-300 hover:bg-amber-950/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        selectedCategory === cat
                          ? 'bg-indigo-800 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Question Cards List */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Active Category Info Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Đang hiển thị:</span>
                <span className="text-xs font-bold text-indigo-300">{selectedCategory}</span>
                <span className="text-xs text-slate-500">({filteredItems.length} câu)</span>
              </div>
              <div className="text-[11px] text-slate-500">
                💡 Bấm <b>"Phóng to câu này"</b> để mở to chỉ xem câu hỏi & bài mẫu
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <p>Không tìm thấy câu hỏi phù hợp.</p>
                {selectedCategory === '⭐ Câu hỏi tự tạo (Custom)' && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tạo câu hỏi mới cho phần này</span>
                  </button>
                )}
              </div>
            ) : (
              <div className={`grid gap-4 ${isFullscreen ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredItems.map((item) => {
                  const uniqueKey = `${activePart}_${item.id}`;

                  return (
                    <div
                      key={uniqueKey}
                      className={`border rounded-2xl p-4 transition shadow-lg space-y-3 relative group ${
                        item.isCustom
                          ? 'bg-slate-900/95 border-amber-500/30 hover:border-amber-500/60'
                          : 'bg-slate-900/90 border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      {/* Header with Badges & Action Buttons */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.isCustom ? (
                            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400" />
                              <span>TỰ TẠO</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              #{item.id}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                            {activePart}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {/* Zen Focus Single Question Button */}
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setFocusItem(item);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
                            title="Phóng to mở to chỉ xem riêng câu này"
                          >
                            <Eye className="w-3 h-3 text-cyan-300" />
                            <span>Phóng to câu này</span>
                          </button>

                          {item.isCustom && (
                            <button
                              onClick={(e) => handleDeleteCustom(e, String(item.id))}
                              title="Xóa câu tự tạo này"
                              className="p-1.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-400 hover:bg-red-900/50 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

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
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-md"
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
                      {item.vocab && (
                        <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                          <span className="text-[11px] font-bold text-indigo-300 block mb-1">
                            🔑 Từ vựng mấu chốt (Band 7.5 - 8.5 Vocab):
                          </span>
                          <div className="text-xs text-indigo-200 font-mono whitespace-pre-line leading-relaxed">
                            {item.vocab}
                          </div>
                        </div>
                      )}

                      {/* Answer Icon Chain */}
                      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
                        <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                          💬 Chuỗi Icon Bài Nói Mẫu (Icon-Anchored Model Answer):
                        </span>
                        <div className="text-xs font-medium text-slate-200 leading-relaxed select-text space-y-2">
                          {item.answer.split('\n\n').map((para: string, idx: number) => (
                            <p key={idx}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>
            💡 Bấm <b>"Phóng to câu này"</b> để xem to rõ từng câu, hoặc <b>"Học câu này (Load)"</b> để nạp vào hệ thống Visual Master Map.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFullscreen}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              {isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {/* ZEN FOCUS SINGLE QUESTION READER (Chế độ phóng to chỉ xem mỗi câu hỏi này) */}
      {focusItem && (
        <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col animate-fadeIn overflow-hidden select-text">
          {/* Zen Top Header */}
          <div className="px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
                {activePart}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {focusItem.category}
              </span>
              {currentFocusIndex >= 0 && (
                <span className="text-xs font-mono text-slate-400">
                  Câu {currentFocusIndex + 1} / {filteredItems.length}
                </span>
              )}
            </div>

            {/* Navigation & Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevFocus}
                disabled={currentFocusIndex <= 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold transition"
                title="Câu trước đó"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Câu trước</span>
              </button>

              <button
                onClick={handleNextFocus}
                disabled={currentFocusIndex >= filteredItems.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold transition"
                title="Câu tiếp theo"
              >
                <span className="hidden sm:inline">Câu tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSpeakText(`${focusItem.question}. ${focusItem.answer}`)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  isSpeaking
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white'
                }`}
                title="Nghe đọc tiếng Anh mẫu (Web Audio TTS)"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Dừng đọc' : 'Nghe phát âm'}</span>
              </button>

              <button
                onClick={() => handleSelect(focusItem)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Học câu này (Load)</span>
              </button>

              <button
                onClick={() => {
                  if (isSpeaking && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setFocusItem(null);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-bold transition ml-2"
                title="Thoát chế độ phóng to (Esc)"
              >
                <X className="w-4 h-4" />
                <span>Đóng (Esc)</span>
              </button>
            </div>
          </div>

          {/* Zen Main Reading Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-16 py-8 max-w-5xl mx-auto w-full space-y-8">
            {/* Big Question Prompt Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                  {activePart === 'Part 2' ? '📋 Đề bài Cue Card Part 2' : `❓ Đề bài câu hỏi (${activePart})`}
                </span>
                {focusItem.isCustom && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">
                    ⭐ Câu hỏi tự tạo
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed tracking-wide">
                {focusItem.question}
              </h1>
              {focusItem.cueCardPrompt && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 whitespace-pre-line leading-relaxed font-mono">
                  {focusItem.cueCardPrompt}
                </div>
              )}
            </div>

            {/* Key Vocabulary Highlights */}
            {focusItem.vocab && (
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <span>🔑 Từ vựng đắt giá (Band 7.5 - 8.5 Vocab List)</span>
                  </h3>
                  <span className="text-xs text-indigo-400 font-mono">
                    {focusItem.vocab.split('\n').filter(Boolean).length} từ vựng
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {focusItem.vocab
                    .split('\n')
                    .filter(Boolean)
                    .map((line: string, i: number) => {
                      const parts = line.split(' - ');
                      const word = parts[0] || line;
                      const meaning = parts.slice(1).join(' - ');
                      return (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col gap-1"
                        >
                          <span className="text-sm font-bold text-indigo-300 font-mono">{word}</span>
                          {meaning && <span className="text-xs text-slate-400 font-sans">{meaning}</span>}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Complete Model Speaking Answer with Icons */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>💬 Bài Nói Mẫu Chuẩn IELTS (Icon-Anchored Model Answer)</span>
                </h3>
                <button
                  onClick={() => handleCopy(focusItem)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Sao chép bài trả lời</span>
                </button>
              </div>

              <div className="text-base font-normal text-slate-100 leading-loose space-y-4">
                {focusItem.answer.split('\n\n').map((paragraph: string, idx: number) => (
                  <p
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom floating helper inside focus */}
            <div className="py-6 text-center text-xs text-slate-500">
              💡 Phím tắt: Dùng <b>←</b> hoặc <b>→</b> trên bàn phím để chuyển câu, bấm <b>Esc</b> để thoát phóng to.
            </div>
          </div>
        </div>
      )}

      {/* Custom Question Creator Modal */}
      <IeltsCustomQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultPart={activePart}
        onSaved={(newQ) => {
          setCustomVersion((v) => v + 1);
          setSelectedCategory('⭐ Câu hỏi tự tạo (Custom)');
        }}
      />
    </div>
  );
};
