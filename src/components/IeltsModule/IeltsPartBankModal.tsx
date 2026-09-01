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
  ChevronRight,
  Smartphone,
  Image as ImageIcon,
  Bot,
  Columns2,
  Zap,
  RotateCcw
} from 'lucide-react';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';
import { ieltsPart2Bank, IeltsPart2Item } from '../../data/ieltsPart2Bank';
import { ieltsPart3Bank, IeltsPart3Item } from '../../data/ieltsPart3Bank';
import { ieltsWritingTask1Bank } from '../../data/ieltsWritingTask1Bank';
import { ieltsWritingTask2Bank } from '../../data/ieltsWritingTask2Bank';
import { storageService } from '../../services/storageService';
import { IeltsCustomQuestion, IeltsQuestionPartType } from '../../types/ielts';
import { IeltsCustomQuestionModal } from './IeltsCustomQuestionModal';
import { MobileProjectSimulatorModal } from '../common/MobileProjectSimulatorModal';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { IeltsAnnotatedPhraseViewer } from '../common/IeltsAnnotatedPhraseViewer';
import { annotateSpeakingAnswer, annotateWritingParagraph } from '../../utils/ieltsTextAnnotator';
import { getStandardizedSpeakingAnswer } from '../../utils/ieltsSpeakingExpander';
import { GeminiMiniWebPanel } from './GeminiMiniWebPanel';
import { repetitionService, RepetitionTier } from '../../utils/repetitionTracker';

export interface SelectedQuestionPayload {
  part: IeltsQuestionPartType | string;
  question: string;
  vocab: string;
  answer: string;
  topic?: string;
  category: string;
  imageUrl?: string;
}

interface IeltsPartBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPart?: IeltsQuestionPartType | string;
  defaultFullscreen?: boolean;
  onSelectQuestion: (payload: SelectedQuestionPayload) => void;
  onOpenSplitGemini?: (prompt: string) => void;
}

export const IeltsPartBankModal: React.FC<IeltsPartBankModalProps> = ({
  isOpen,
  onClose,
  defaultPart = 'Part 1',
  defaultFullscreen = false,
  onSelectQuestion,
  onOpenSplitGemini,
}) => {
  const [activePart, setActivePart] = useState<IeltsQuestionPartType | string>(defaultPart);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [customVersion, setCustomVersion] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);
  const [isSplitWithGemini, setIsSplitWithGemini] = useState(false);
  const [activeGeminiPrompt, setActiveGeminiPrompt] = useState<string>('');
  const [focusItem, setFocusItem] = useState<any | null>(null);
  const [focusViewMode, setFocusViewMode] = useState<'annotated' | 'plain'>('annotated');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
  const [repetitionCounts, setRepetitionCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      setRepetitionCounts(repetitionService.getAllCounts());
    }
  }, [isOpen]);

  const handleIncrementRepetition = (key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playBeep('click');
    const newCount = repetitionService.incrementCount(key);
    setRepetitionCounts((prev) => ({ ...prev, [key]: newCount }));
  };

  const getPromptForQuestion = (item: any) => {
    const cueCard = item.cueCardPrompt ? `\n- Gợi ý Cue Card: "${item.cueCardPrompt}"` : '';
    const vocabHint = item.vocab ? `\n- Từ vựng gợi ý: ${item.vocab.split('\n').filter(Boolean).join(' | ')}` : '';
    return `[❓] Đề bài IELTS: "${item.question}"${cueCard}${vocabHint}

Hãy đóng vai là Chuyên gia IELTS Band 9.0:
1. Đưa ra các ý tưởng trả lời xuất sắc kèm từ vựng band cao (7.5 - 8.5+) có dịch nghĩa tiếng Việt trong ngữ cảnh.
2. Tạo các tình huống và câu hỏi thực tế mở rộng mà tôi nên dùng cấu trúc/từ vựng này.
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm 4 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 💬 Câu trả lời mẫu / Câu ví dụ minh họa (High-band Sample)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Từ vựng mấu chốt & Phân tích cách dùng (Key Collocation & Band Boost)`;
  };

  const getPromptForVocab = (vocabText: string, questionText: string) => {
    const cleanVocab = vocabText.split('\n').filter(Boolean).map((v: string) => v.trim()).join(' | ');
    const qPart = questionText ? `\n- Ngữ cảnh đề bài: "${questionText}"` : '';
    return `[🔑] Danh sách từ vựng: ${cleanVocab}${qPart}

Hãy đóng vai là Chuyên gia IELTS:
1. Giải thích nghĩa của từng từ/cụm từ trong ngữ cảnh của câu và chủ đề trên.
2. Tạo các câu hỏi và tình huống thực tế mà tôi phải áp dụng những từ vựng này.
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm 4 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 💬 Câu ví dụ / Câu đối thoại mẫu chứa từ vựng (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích ngữ cảnh & Cách ăn điểm từ vựng (Band 8.0+ Impact)`;
  };

  const handleCopyPrompt = (promptText: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playBeep('click');
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleSendPromptToGemini = (promptText: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playBeep('decision');
    setActiveGeminiPrompt(promptText);
    setIsSplitWithGemini(true);
    if (onOpenSplitGemini) {
      onOpenSplitGemini(promptText);
    }
  };

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
        if (zoomImageUrl) {
          setZoomImageUrl(null);
        } else if (focusItem) {
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
  }, [isOpen, focusItem, isFullscreen, zoomImageUrl, onClose]);

  if (!isOpen) return null;

  // Retrieve current active default dataset + custom questions
  const defaultDataset: { id: number | string; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string; isCustom?: boolean; imageUrl?: string }[] =
    activePart === 'Part 1'
      ? ieltsPart1Bank
      : activePart === 'Part 2'
      ? ieltsPart2Bank
      : activePart === 'Part 3'
      ? ieltsPart3Bank
      : activePart === 'Writing Task 1'
      ? ieltsWritingTask1Bank.map((item) => ({
          id: item.id,
          category: item.category || 'Writing Task 1',
          question: `${item.title}\n\n${item.prompt}`,
          vocab: item.keyVocabulary?.map((v) => `${v.word} - ${v.meaning}`).join('\n') || '',
          answer: item.sampleAnswerBand8,
          imageUrl: item.imageUrl
        }))
      : ieltsWritingTask2Bank.map((item) => ({
          id: item.id,
          category: item.category || 'Writing Task 2',
          question: item.prompt,
          vocab: item.lexicalResource?.map((v) => `${v.term} - ${v.explanation}`).join('\n') || '',
          answer: item.sampleAnswerBand8
        }));

  const customQuestions: { id: string; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string; isCustom: boolean; imageUrl?: string }[] =
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
    const isWriting = activePart.includes('Writing');
    const ans = isWriting
      ? item.answer
      : getStandardizedSpeakingAnswer(activePart, item.question, item.answer, item.vocab, item.cueCardPrompt, item.id);
    const text = `Part: ${activePart}\nCategory: ${item.category}\nQuestion: ${item.question}\n${item.cueCardPrompt ? `Prompt:\n${item.cueCardPrompt}\n` : ''}Vocab:\n${item.vocab}\n\nAnswer:\n${ans}`;
    navigator.clipboard.writeText(text);
    setCopiedId(`${activePart}_${item.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelect = (item: any) => {
    const isWriting = activePart.includes('Writing');
    const ans = isWriting
      ? item.answer
      : getStandardizedSpeakingAnswer(activePart, item.question, item.answer, item.vocab, item.cueCardPrompt, item.id);
    onSelectQuestion({
      part: activePart,
      question: item.question,
      vocab: item.vocab,
      answer: ans,
      topic: item.topic || item.category,
      category: item.category,
      imageUrl: item.imageUrl
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
            : 'border border-slate-800 w-full max-w-6xl h-[94vh] rounded-3xl shadow-2xl'
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
                <span>📚 Thư Viện Đề Thi IELTS (Speaking & Writing)</span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Part 1 • Part 2 • Part 3 • Task 1 • Task 2
                </span>
                {isFullscreen && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    TOÀN MÀN HÌNH
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Tra cứu đề thi Speaking & Writing Task 1 (kèm ảnh biểu đồ) và quản lý câu hỏi tự tạo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gemini MiniWeb Split Screen Toggle Button */}
            <button
              onClick={() => {
                audioService.playBeep('click');
                setIsSplitWithGemini(!isSplitWithGemini);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                isSplitWithGemini
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border-blue-500/40 text-blue-300 hover:text-white hover:from-blue-600 hover:to-indigo-600'
              }`}
              title="Chia đôi màn hình với Gemini Web để vừa xem đề vừa hỏi AI"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">{isSplitWithGemini ? '🌐 Đang Chia Đôi' : '🌐 Gemini MiniWeb (Chia đôi)'}</span>
              <span className="sm:hidden">🌐 Gemini</span>
            </button>

            {/* Create Custom Question Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>➕ Tạo câu hỏi mới</span>
            </button>

            {/* Mobile Mode Button */}
            <button
              onClick={() => {
                audioService.playBeep('click');
                setIsMobileModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50 hover:from-purple-600 hover:to-pink-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm"
              title="Xem 300 câu hỏi trên giao diện điện thoại (Mobile Phone View)"
            >
              <Smartphone className="w-3.5 h-3.5 text-pink-300" />
              <span className="hidden sm:inline">📱 Chế độ Điện Thoại</span>
              <span className="sm:hidden">📱 Mobile</span>
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
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            <button
              onClick={() => {
                setActivePart('Part 1');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
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
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                activePart === 'Part 2'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part 2 Cue Cards
            </button>

            <button
              onClick={() => {
                setActivePart('Part 3');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                activePart === 'Part 3'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Part 3 Thảo Luận
            </button>

            <button
              onClick={() => {
                setActivePart('Writing Task 1');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                activePart === 'Writing Task 1'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-purple-400/80 hover:text-purple-200 hover:bg-purple-950/40'
              }`}
            >
              📊 Writing Task 1 (Biểu Đồ)
            </button>

            <button
              onClick={() => {
                setActivePart('Writing Task 2');
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                activePart === 'Writing Task 2'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/40'
              }`}
            >
              📝 Writing Task 2 (Nghị Luận)
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
        <div className="flex-1 flex overflow-hidden w-full h-full min-h-0">
          {/* Left Questions & Vocabulary Library */}
          <div className={`flex h-full overflow-hidden transition-all duration-200 ${
            isSplitWithGemini ? 'w-[52%] shrink-0 border-r border-slate-800' : 'w-full flex-1'
          }`}>
            {/* Left Category List */}
            <aside className={`${isSplitWithGemini ? 'w-44' : 'w-56'} border-r border-slate-800 bg-slate-950/40 p-3 overflow-y-auto hidden md:block shrink-0`}>
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

          {/* Center Question Cards List */}
          <main className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 ${isSplitWithGemini ? 'border-r border-slate-800' : ''}`}>
            {/* Active Category Info Banner */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Đang hiển thị:</span>
                <span className="text-xs font-bold text-indigo-300">{selectedCategory}</span>
                <span className="text-xs text-slate-500">({filteredItems.length} câu)</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                {!isSplitWithGemini && (
                  <button
                    onClick={() => setIsSplitWithGemini(true)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Mở Gemini song song</span>
                  </button>
                )}
                <span>💡 Bấm <b>"Phóng to"</b> để học chuyên sâu</span>
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
              <div className={`grid gap-4 ${isFullscreen && !isSplitWithGemini ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredItems.map((item) => {
                  const uniqueKey = `${activePart}_${item.id}`;
                  const qRepCount = repetitionCounts[`q_${item.id}`] || 0;
                  const qTier = repetitionService.getTier(qRepCount);

                  const vocabRepCount = repetitionCounts[`vocab_${item.id}`] || 0;
                  const vocabTier = repetitionService.getTier(vocabRepCount);

                  const chainRepCount = repetitionCounts[`chain_${item.id}`] || 0;
                  const chainTier = repetitionService.getTier(chainRepCount);

                  const questionPrompt = getPromptForQuestion(item);
                  const vocabPrompt = item.vocab ? getPromptForVocab(item.vocab, item.question) : '';

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
                          {/* 1-Click Open Gemini MiniWeb for this Question */}
                          <button
                            onClick={() => handleSendPromptToGemini(questionPrompt)}
                            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/50 text-blue-200 hover:from-blue-600 hover:to-indigo-600 hover:text-white text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
                            title="Mở Gemini MiniWeb chia đôi màn hình và nạp sẵn prompt câu hỏi này"
                          >
                            <Bot className="w-3.5 h-3.5 text-cyan-300" />
                            <span>🌐 Gemini MiniWeb</span>
                          </button>

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
                            <span>Phóng to</span>
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
                            <span>{copiedId === uniqueKey ? 'Đã chép' : 'Sao chép'}</span>
                          </button>

                          <button
                            onClick={() => handleSelect(item)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-md"
                          >
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>Học (Load)</span>
                          </button>
                        </div>
                      </div>

                      {/* Task 1 Image Thumbnail if available */}
                      {item.imageUrl && (
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/30 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
                            <span className="text-xs font-semibold text-purple-300">
                              🖼️ Đã đính kèm ảnh biểu đồ Task 1
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomImageUrl(item.imageUrl || null);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:text-white text-[11px] font-bold flex items-center gap-1 transition"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Xem ảnh</span>
                          </button>
                        </div>
                      )}

                      {/* 1. QUESTION / CUE CARD PROMPT BOX (With 5-Level Color Repetition & Gemini Prompt) */}
                      <div
                        className={`p-3.5 rounded-xl border transition-all duration-200 ${
                          qRepCount > 0
                            ? `${qTier.bgClass} ${qTier.borderClass} ${qTier.glowClass}`
                            : 'bg-slate-950/80 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={(e) => handleIncrementRepetition(`q_${item.id}`, e)}
                            className={`text-[11px] font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition hover:scale-105 active:scale-95 ${
                              qRepCount > 0
                                ? qTier.badgeClass
                                : 'bg-slate-900 text-amber-300 border-slate-700 hover:border-amber-500/50'
                            }`}
                            title="Bấm để đổi mức màu ghi nhớ lần học cho đề bài này (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                          >
                            <span>{qTier.emoji}</span>
                            <span>{activePart === 'Part 2' ? '📋 Đề bài Cue Card (Part 2)' : `❓ Đề bài (${activePart})`}</span>
                            {qRepCount > 0 && <span className="underline font-black">({qTier.name.split(':')[0]})</span>}
                          </button>

                          <div className="flex items-center gap-1.5">
                            {/* Color Repetition Level Button for Question */}
                            <button
                              type="button"
                              onClick={(e) => handleIncrementRepetition(`q_${item.id}`, e)}
                              title="Bấm để ghi nhận 1 lần học đề bài (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                              className={`text-[10px] px-2.5 py-0.5 rounded-md border flex items-center gap-1 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                                qRepCount > 0 ? qTier.badgeClass : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                              }`}
                            >
                              <span>{qTier.emoji}</span>
                              <span>{qRepCount > 0 ? `Lần ${qRepCount}` : 'Đổi mức màu'}</span>
                            </button>

                            {/* Prompt Gemini for Question */}
                            <button
                              type="button"
                              onClick={(e) => handleCopyPrompt(questionPrompt, `q_prompt_${item.id}`, e)}
                              title="Sao chép prompt hỏi Gemini về các tình huống và câu hỏi nên dùng từ đề bài này"
                              className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-bold transition ${
                                copiedPromptId === `q_prompt_${item.id}`
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                              }`}
                            >
                              {copiedPromptId === `q_prompt_${item.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Bot className="w-3 h-3" />}
                              <span>{copiedPromptId === `q_prompt_${item.id}` ? 'Đã copy' : 'Copy Prompt'}</span>
                            </button>

                            {/* Send to Gemini Split View */}
                            <button
                              type="button"
                              onClick={(e) => handleSendPromptToGemini(questionPrompt, e)}
                              title="Mở Gemini chia đôi màn hình và nạp sẵn prompt này"
                              className="text-[10px] px-2 py-0.5 rounded-md border bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600 hover:text-white flex items-center gap-1 font-bold transition"
                            >
                              <Zap className="w-3 h-3 text-amber-300" />
                              <span>Gửi sang Gemini</span>
                            </button>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-slate-100 mb-1">{item.question}</p>
                        {item.cueCardPrompt && (
                          <div className="text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed mt-2 pt-2 border-t border-slate-800/60">
                            {item.cueCardPrompt}
                          </div>
                        )}
                      </div>

                      {/* 2. VOCABULARY LIST BOX (With 5-Level Color Repetition & Gemini Prompt) */}
                      {item.vocab && (
                        <div
                          className={`p-3 rounded-xl border transition-all duration-200 ${
                            vocabRepCount > 0
                              ? `${vocabTier.bgClass} ${vocabTier.borderClass} ${vocabTier.glowClass}`
                              : 'bg-indigo-950/20 border-indigo-500/20'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={(e) => handleIncrementRepetition(`vocab_${item.id}`, e)}
                              className={`text-[11px] font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition hover:scale-105 active:scale-95 ${
                                vocabRepCount > 0
                                  ? vocabTier.badgeClass
                                  : 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30 hover:border-indigo-400'
                              }`}
                              title="Bấm để đổi mức màu ghi nhớ từ vựng (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                            >
                              <span>{vocabTier.emoji}</span>
                              <span>🔑 Từ vựng mấu chốt (Band 7.5 - 8.5 Vocab)</span>
                              {vocabRepCount > 0 && <span className="underline font-black">({vocabTier.name.split(':')[0]})</span>}
                            </button>

                            <div className="flex items-center gap-1.5">
                              {/* Color Repetition Level Button for Vocab */}
                              <button
                                type="button"
                                onClick={(e) => handleIncrementRepetition(`vocab_${item.id}`, e)}
                                title="Bấm để ghi nhận 1 lần học từ vựng (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                                className={`text-[10px] px-2.5 py-0.5 rounded-md border flex items-center gap-1 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                                  vocabRepCount > 0 ? vocabTier.badgeClass : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                                }`}
                              >
                                <span>{vocabTier.emoji}</span>
                                <span>{vocabRepCount > 0 ? `Lần ${vocabRepCount}` : 'Đổi mức màu'}</span>
                              </button>

                              {/* Prompt Gemini for Vocab */}
                              <button
                                type="button"
                                onClick={(e) => handleCopyPrompt(vocabPrompt, `v_prompt_${item.id}`, e)}
                                title="Sao chép prompt hỏi Gemini cách dùng những từ vựng này trong thực tế"
                                className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-bold transition ${
                                  copiedPromptId === `v_prompt_${item.id}`
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                                }`}
                              >
                                {copiedPromptId === `v_prompt_${item.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Bot className="w-3 h-3" />}
                                <span>Prompt Từ Vựng</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => handleSendPromptToGemini(vocabPrompt, e)}
                                title="Mở Gemini và nạp prompt từ vựng"
                                className="text-[10px] px-2 py-0.5 rounded-md border bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600 hover:text-white flex items-center gap-1 font-bold transition"
                              >
                                <Zap className="w-3 h-3 text-amber-300" />
                                <span>Gửi Gemini</span>
                              </button>
                            </div>
                          </div>

                          <div className="text-xs text-indigo-200 font-mono whitespace-pre-line leading-relaxed">
                            {item.vocab}
                          </div>
                        </div>
                      )}

                      {/* 3. ANSWER ICON CHAIN (With 5-Level Color Repetition & Gemini Actions) */}
                      <div
                        className={`p-3.5 rounded-xl border space-y-2 transition-all duration-200 ${
                          chainRepCount > 0
                            ? `${chainTier.bgClass} ${chainTier.borderClass} ${chainTier.glowClass}`
                            : 'bg-slate-950/90 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={(e) => handleIncrementRepetition(`chain_${item.id}`, e)}
                            className={`text-[11px] font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition hover:scale-105 active:scale-95 ${
                              chainRepCount > 0
                                ? chainTier.badgeClass
                                : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30 hover:border-emerald-400'
                            }`}
                            title="Bấm để đổi mức màu ghi nhớ cho cả chuỗi icon bài học này"
                          >
                            <span>{chainTier.emoji}</span>
                            <span>💬 Chuỗi Icon & Ý Nghĩa Từng Cụm Từ (Học Sâu)</span>
                            {chainRepCount > 0 && <span className="underline font-black">({chainTier.name.split(':')[0]})</span>}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleIncrementRepetition(`chain_${item.id}`, e)}
                            title="Bấm để ghi nhận 1 lần học chuỗi icon (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                            className={`text-[10px] px-2.5 py-0.5 rounded-md border flex items-center gap-1 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                              chainRepCount > 0 ? chainTier.badgeClass : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                            }`}
                          >
                            <span>{chainTier.emoji}</span>
                            <span>{chainRepCount > 0 ? `Lần ${chainRepCount}` : 'Đổi mức màu'}</span>
                          </button>
                        </div>
                        {(() => {
                          const isWriting = activePart.includes('Writing');
                          const standardAnswer = isWriting
                            ? item.answer
                            : getStandardizedSpeakingAnswer(activePart, item.question, item.answer, item.vocab, item.cueCardPrompt, item.id);
                          const chunks = isWriting
                            ? annotateWritingParagraph(standardAnswer)
                            : annotateSpeakingAnswer(standardAnswer, item.vocab);
                          return (
                            <IeltsAnnotatedPhraseViewer
                              chunks={chunks}
                              defaultExpandFirst={false}
                              questionContext={item.question}
                              onSendToGemini={handleSendPromptToGemini}
                            />
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Right Gemini MiniWeb Split Screen Panel */}
        {isSplitWithGemini && (
          <div className="w-[48%] h-full shrink-0 flex flex-col bg-slate-950 animate-fadeIn min-w-[340px] overflow-hidden">
            <GeminiMiniWebPanel
              externalPrompt={activeGeminiPrompt}
              onClose={() => setIsSplitWithGemini(false)}
              className="w-full h-full"
            />
          </div>
        )}
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
      {focusItem && (() => {
        const focusQRepCount = repetitionCounts[`q_${focusItem.id}`] || 0;
        const focusQTier = repetitionService.getTier(focusQRepCount);

        const focusVocabRepCount = repetitionCounts[`vocab_${focusItem.id}`] || 0;
        const focusVocabTier = repetitionService.getTier(focusVocabRepCount);

        const focusChainRepCount = repetitionCounts[`chain_${focusItem.id}`] || 0;
        const focusChainTier = repetitionService.getTier(focusChainRepCount);

        const focusQuestionPrompt = getPromptForQuestion(focusItem);
        const focusVocabPrompt = focusItem.vocab ? getPromptForVocab(focusItem.vocab, focusItem.question) : '';

        return (
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
                {/* Toggle Gemini Split inside Zen view */}
                <button
                  onClick={() => {
                    audioService.playBeep('click');
                    setIsSplitWithGemini(!isSplitWithGemini);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                    isSplitWithGemini
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-md'
                      : 'bg-blue-950/40 border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white'
                  }`}
                  title="Mở Gemini MiniWeb song song để vừa học vừa hỏi đáp"
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{isSplitWithGemini ? 'Đang mở Gemini' : '🌐 Mở Gemini song song'}</span>
                </button>

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
                  onClick={() => {
                    const isWriting = activePart.includes('Writing');
                    const ans = isWriting
                      ? focusItem.answer
                      : getStandardizedSpeakingAnswer(activePart, focusItem.question, focusItem.answer, focusItem.vocab, focusItem.cueCardPrompt, focusItem.id);
                    handleSpeakText(`${focusItem.question}. ${ans}`);
                  }}
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

            {/* Zen Body Container with Optional Gemini Split Screen */}
            <div className="flex-1 flex overflow-hidden w-full h-full min-h-0">
              {/* Left Zen Main Reading Body */}
              <div className={`overflow-y-auto px-4 sm:px-8 py-6 space-y-6 ${
                isSplitWithGemini ? 'w-[52%] shrink-0 border-r border-slate-800' : 'w-full max-w-5xl mx-auto'
              }`}>
                {/* Big Question Prompt Header (With 5-Level Color Repetition & Gemini Prompt) */}
                <div
                  className={`p-6 rounded-2xl border shadow-xl space-y-3 transition-all duration-200 ${
                    focusQRepCount > 0
                      ? `${focusQTier.bgClass} ${focusQTier.borderClass} ${focusQTier.glowClass}`
                      : 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
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

                    <div className="flex items-center gap-2">
                      {/* Repetition Level Button for Question */}
                      <button
                        type="button"
                        onClick={(e) => handleIncrementRepetition(`q_${focusItem.id}`, e)}
                        className={`text-xs px-3 py-1 rounded-xl border flex items-center gap-1.5 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                          focusQRepCount > 0 ? focusQTier.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span>{focusQTier.emoji}</span>
                        <span>{focusQRepCount > 0 ? `Lần học: ${focusQRepCount}` : 'Ghi nhớ lần học'}</span>
                      </button>

                      {/* Prompt Gemini for Question */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyPrompt(focusQuestionPrompt, `zen_q_${focusItem.id}`, e)}
                        className={`text-xs px-3 py-1 rounded-xl border flex items-center gap-1.5 font-bold transition ${
                          copiedPromptId === `zen_q_${focusItem.id}`
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {copiedPromptId === `zen_q_${focusItem.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
                        <span>{copiedPromptId === `zen_q_${focusItem.id}` ? 'Đã copy Prompt' : 'Copy Prompt Gemini'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleSendPromptToGemini(focusQuestionPrompt, e)}
                        className="text-xs px-3 py-1 rounded-xl border bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600 hover:text-white flex items-center gap-1.5 font-bold transition"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Gửi sang Gemini</span>
                      </button>
                    </div>
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

                {/* Task 1 Attached Chart in Zen View */}
                {focusItem.imageUrl && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-purple-400" />
                        <span>📊 Biểu đồ đề bài Task 1</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setZoomImageUrl(focusItem.imageUrl)}
                        className="text-xs text-purple-300 hover:text-white px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 flex items-center gap-1 font-semibold"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Xem phóng to</span>
                      </button>
                    </div>
                    <div className="flex justify-center bg-slate-950/60 rounded-xl p-4 overflow-hidden">
                      <img
                        src={focusItem.imageUrl}
                        alt="Biểu đồ Task 1"
                        onClick={() => setZoomImageUrl(focusItem.imageUrl)}
                        className="max-h-96 w-auto object-contain rounded-lg cursor-pointer hover:opacity-95 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Key Vocabulary Highlights (With 5-Level Color Repetition & Gemini Prompt) */}
                {focusItem.vocab && (
                  <div
                    className={`p-6 rounded-2xl border shadow-lg space-y-3 transition-all duration-200 ${
                      focusVocabRepCount > 0
                        ? `${focusVocabTier.bgClass} ${focusVocabTier.borderClass} ${focusVocabTier.glowClass}`
                        : 'bg-slate-900/90 border-indigo-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2 flex-wrap gap-2">
                      <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                        <span>🔑 Từ vựng đắt giá (Band 7.5 - 8.5 Vocab List)</span>
                        <span className="text-xs text-indigo-400 font-mono">
                          ({focusItem.vocab.split('\n').filter(Boolean).length} từ)
                        </span>
                      </h3>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleIncrementRepetition(`vocab_${focusItem.id}`, e)}
                          className={`text-xs px-3 py-1 rounded-xl border flex items-center gap-1.5 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                            focusVocabRepCount > 0 ? focusVocabTier.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          <span>{focusVocabTier.emoji}</span>
                          <span>{focusVocabRepCount > 0 ? `Lần học: ${focusVocabRepCount}` : 'Ghi nhớ lần học'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyPrompt(focusVocabPrompt, `zen_v_${focusItem.id}`, e)}
                          className={`text-xs px-3 py-1 rounded-xl border flex items-center gap-1.5 font-bold transition ${
                            copiedPromptId === `zen_v_${focusItem.id}`
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          {copiedPromptId === `zen_v_${focusItem.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
                          <span>Prompt Từ Vựng</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleSendPromptToGemini(focusVocabPrompt, e)}
                          className="text-xs px-3 py-1 rounded-xl border bg-indigo-600/30 text-indigo-200 border-indigo-500/40 hover:bg-indigo-600 hover:text-white flex items-center gap-1.5 font-bold transition"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Gửi Gemini</span>
                        </button>
                      </div>
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

                {/* Complete Model Speaking Answer with Icons & Annotated Breakdown */}
                <div
                  className={`p-6 rounded-2xl border shadow-xl space-y-4 transition-all duration-200 ${
                    focusChainRepCount > 0
                      ? `${focusChainTier.bgClass} ${focusChainTier.borderClass} ${focusChainTier.glowClass}`
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <span>💬 Bài Nói / Viết Mẫu Chuẩn IELTS (Icon-Anchored Model Answer)</span>
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => handleIncrementRepetition(`chain_${focusItem.id}`, e)}
                        className={`text-xs px-3 py-1 rounded-xl border flex items-center gap-1.5 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                          focusChainRepCount > 0 ? focusChainTier.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span>{focusChainTier.emoji}</span>
                        <span>{focusChainRepCount > 0 ? `Lần học: ${focusChainRepCount}` : 'Ghi nhớ lần học'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                        <button
                          onClick={() => {
                            audioService.playBeep('click');
                            setFocusViewMode('annotated');
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition ${
                            focusViewMode === 'annotated'
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Tách Icon & Giải Thích Ý Nghĩa</span>
                        </button>
                        <button
                          onClick={() => {
                            audioService.playBeep('click');
                            setFocusViewMode('plain');
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                            focusViewMode === 'plain'
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>Văn Bản Liền</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleCopy(focusItem)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold px-2 py-1 bg-slate-800 rounded-lg transition"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </button>
                    </div>
                  </div>

                  {focusViewMode === 'annotated' ? (
                    <div className="space-y-4 pt-1">
                      {(() => {
                        const isWriting = activePart.includes('Writing');
                        const standardAnswer = isWriting
                          ? focusItem.answer
                          : getStandardizedSpeakingAnswer(activePart, focusItem.question, focusItem.answer, focusItem.vocab, focusItem.cueCardPrompt, focusItem.id);
                        const chunks = isWriting
                          ? annotateWritingParagraph(standardAnswer)
                          : annotateSpeakingAnswer(standardAnswer, focusItem.vocab);
                        return (
                          <IeltsAnnotatedPhraseViewer
                            chunks={chunks}
                            defaultExpandFirst={false}
                            questionContext={focusItem.question}
                            onSendToGemini={handleSendPromptToGemini}
                          />
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-base font-normal text-slate-100 leading-loose space-y-4 pt-1">
                      {(() => {
                        const isWriting = activePart.includes('Writing');
                        const standardAnswer = isWriting
                          ? focusItem.answer
                          : getStandardizedSpeakingAnswer(activePart, focusItem.question, focusItem.answer, focusItem.vocab, focusItem.cueCardPrompt, focusItem.id);
                        return standardAnswer.split('\n\n').map((paragraph: string, idx: number) => (
                          <p
                            key={idx}
                            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                          >
                            {paragraph}
                          </p>
                        ));
                      })()}
                    </div>
                  )}
                </div>

                {/* Bottom floating helper inside focus */}
                <div className="py-6 text-center text-xs text-slate-500">
                  💡 Phím tắt: Dùng <b>←</b> hoặc <b>→</b> trên bàn phím để chuyển câu, bấm <b>Esc</b> để thoát phóng to.
                </div>
              </div>

              {/* Right Zen Gemini Split View Panel */}
              {isSplitWithGemini && (
                <div className="w-[48%] h-full shrink-0 flex flex-col bg-slate-950 animate-fadeIn min-w-[340px] overflow-hidden">
                  <GeminiMiniWebPanel
                    externalPrompt={activeGeminiPrompt}
                    onClose={() => setIsSplitWithGemini(false)}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Lightbox Zoom Image Modal */}
      {zoomImageUrl && (
        <div
          onClick={() => setZoomImageUrl(null)}
          className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto">
            <img src={zoomImageUrl} alt="Zoomed Chart" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain mx-auto" />
            <button
              onClick={() => setZoomImageUrl(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
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

      {/* Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        initialTab="ielts300"
        onSelectIeltsQuestion={(item) => {
          handleSelect(item);
          setIsMobileModalOpen(false);
        }}
      />
    </div>
  );
};
