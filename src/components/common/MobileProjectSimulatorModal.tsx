import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  BookOpen,
  Layers,
  Heart,
  BrainCircuit,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Copy,
  Sparkles,
  Maximize2,
  Minimize2,
  TrendingUp,
  Share2,
  ExternalLink,
  Zap,
  Play,
  RotateCcw,
  PenTool
} from 'lucide-react';
import { ieltsPart1Bank } from '../../data/ieltsPart1Bank';
import { ieltsPart2Bank } from '../../data/ieltsPart2Bank';
import { ieltsPart3Bank } from '../../data/ieltsPart3Bank';
import { ieltsWritingTask1Bank } from '../../data/ieltsWritingTask1Bank';
import { ieltsWritingTask2Bank } from '../../data/ieltsWritingTask2Bank';
import { fishboneVocab3000Bank } from '../../data/fishboneVocab3000Bank';
import { IeltsTask1ChartViewer } from '../IeltsWriting/IeltsTask1ChartViewer';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { FishboneProject } from '../../types/fishbone';
import { GenzSavedPhrase } from '../../types/genz';
import { IeltsSpeakingLesson } from '../../types/ielts';
import { getStandardizedSpeakingAnswer } from '../../utils/ieltsSpeakingExpander';

interface MobileIeltsItem {
  id: string | number;
  category: string;
  question: string;
  vocab: string;
  answer: string;
  topic?: string;
  cueCardPrompt?: string;
  isCustom?: boolean;
}

export type MobileProjectTab = 'ielts300' | 'writing' | 'fishbone' | 'genz' | 'current_lesson';

interface MobileProjectSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: MobileProjectTab;
  onSelectIeltsQuestion?: (item: any) => void;
}

export const MobileProjectSimulatorModal: React.FC<MobileProjectSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'ielts300',
  onSelectIeltsQuestion
}) => {
  const [activeTab, setActiveTab] = useState<MobileProjectTab>(initialTab);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true); // true = iPhone mockup frame, false = full width mobile view
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 300 Questions State
  const [activePart, setActivePart] = useState<'Part 1' | 'Part 2' | 'Part 3'>('Part 1');
  const [searchIelts, setSearchIelts] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [ieltsIndex, setIeltsIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fishbone State
  const [fishboneProject, setFishboneProject] = useState<FishboneProject>(() => storageService.getFishboneProject());

  // GenZ State
  const [genzPhrases, setGenzPhrases] = useState<GenzSavedPhrase[]>(() => storageService.getGenzSaved());

  // Current IELTS Lesson
  const [currentLesson, setCurrentLesson] = useState<IeltsSpeakingLesson>(() => storageService.getCurrentIeltsLesson());

  // IELTS Writing 600 State
  const [writingSubTask, setWritingSubTask] = useState<'task1' | 'task2'>('task1');
  const [writingTask1Index, setWritingTask1Index] = useState(0);
  const [writingTask2Index, setWritingTask2Index] = useState(0);

  // Fishbone Mobile Vocab State
  const [fishboneSubMode, setFishboneSubMode] = useState<'roadmap' | 'vocab'>('roadmap');
  const [fishboneVocabIndex, setFishboneVocabIndex] = useState<number>(0);

  // Update on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setFishboneProject(storageService.getFishboneProject());
      setGenzPhrases(storageService.getGenzSaved());
      setCurrentLesson(storageService.getCurrentIeltsLesson());
      setIeltsIndex(0);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  }, [isOpen, initialTab]);

  // Handle ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Active dataset for 300 IELTS bank
  const defaultBank: MobileIeltsItem[] =
    activePart === 'Part 1'
      ? (ieltsPart1Bank as unknown as MobileIeltsItem[])
      : activePart === 'Part 2'
      ? (ieltsPart2Bank as unknown as MobileIeltsItem[])
      : (ieltsPart3Bank as unknown as MobileIeltsItem[]);

  const customQuestions: MobileIeltsItem[] = storageService.getCustomIeltsQuestions(activePart).map((q) => ({
    ...q,
    isCustom: true
  }));

  const fullBank: MobileIeltsItem[] = [...customQuestions, ...defaultBank];

  const categories = [
    'All',
    ...(customQuestions.length > 0 ? ['⭐ Tự tạo (Custom)'] : []),
    ...Array.from(new Set(defaultBank.map((i) => i.category)))
  ];

  const filteredIelts = fullBank.filter((item) => {
    let matchCat = false;
    if (selectedCategory === 'All') matchCat = true;
    else if (selectedCategory === '⭐ Tự tạo (Custom)') matchCat = !!item.isCustom;
    else matchCat = item.category === selectedCategory;

    const s = searchIelts.toLowerCase();
    const matchSearch =
      item.question.toLowerCase().includes(s) ||
      item.vocab.toLowerCase().includes(s) ||
      item.answer.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s);
    return matchCat && matchSearch;
  });

  const currentIeltsItem = filteredIelts[ieltsIndex] || filteredIelts[0];

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    audioService.playBeep('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
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

  const handleNextIelts = () => {
    if (ieltsIndex < filteredIelts.length - 1) {
      audioService.playBeep('click');
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIeltsIndex((i) => i + 1);
    }
  };

  const handlePrevIelts = () => {
    if (ieltsIndex > 0) {
      audioService.playBeep('click');
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIeltsIndex((i) => i - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      {/* Outer Shell */}
      <div className="flex flex-col items-center max-w-full h-[96vh]">
        {/* Top Control Bar for Simulator */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 mb-3 flex items-center justify-between shadow-xl shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Chế Độ Xem Điện Thoại</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-300 font-mono">
                  MOBILE
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Giao diện tối ưu cho smartphone</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Toggle Phone Frame vs Full Mobile Screen */}
            <button
              onClick={() => {
                audioService.playBeep('click');
                setIsPhoneFrame(!isPhoneFrame);
              }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 transition"
              title={isPhoneFrame ? 'Chuyển sang màn hình điện thoại tràn viền' : 'Chuyển sang khung mô phỏng iPhone'}
            >
              {isPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{isPhoneFrame ? 'Tràn viền' : 'Khung máy'}</span>
            </button>

            <button
              onClick={() => {
                audioService.playBeep('click');
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/80 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Đóng (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phone Mockup or Mobile Frame Container */}
        <div
          className={`flex flex-col bg-slate-950 overflow-hidden shadow-2xl transition-all duration-300 ${
            isPhoneFrame
              ? 'w-[390px] h-[780px] max-h-[85vh] rounded-[48px] border-[10px] border-slate-800 ring-1 ring-white/10 relative'
              : 'w-full max-w-md h-[85vh] rounded-3xl border border-slate-800'
          }`}
        >
          {/* iPhone Dynamic Island & Status Bar (Only in Phone Frame) */}
          {isPhoneFrame && (
            <div className="pt-2 px-6 flex items-center justify-between shrink-0 select-none">
              <span className="text-[11px] font-bold text-slate-400">9:41</span>
              {/* Dynamic Island pill */}
              <div className="w-24 h-5 bg-black rounded-full border border-slate-800 flex items-center justify-center gap-1.5 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-purple-300 font-bold">Tool Imagine</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Mobile In-App Header & Project Selector */}
          <div className="p-3 border-b border-slate-800/80 bg-slate-900/90 shrink-0">
            {/* Quick Project Switcher Pills */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setActiveTab('ielts300');
                }}
                className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 transition ${
                  activeTab === 'ielts300'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>📚</span>
                <span className="text-[9px] leading-none">300 Từ</span>
              </button>

              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setActiveTab('writing');
                }}
                className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 transition ${
                  activeTab === 'writing'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>✍️</span>
                <span className="text-[9px] leading-none">Writing</span>
              </button>

              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setActiveTab('fishbone');
                }}
                className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 transition ${
                  activeTab === 'fishbone'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🐟</span>
                <span className="text-[9px] leading-none">Xương Cá</span>
              </button>

              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setActiveTab('genz');
                }}
                className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 transition ${
                  activeTab === 'genz'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>💖</span>
                <span className="text-[9px] leading-none">Gen Z</span>
              </button>

              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setActiveTab('current_lesson');
                }}
                className={`py-1.5 rounded-lg flex flex-col items-center gap-0.5 transition ${
                  activeTab === 'current_lesson'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🎯</span>
                <span className="text-[9px] leading-none">Bài Học</span>
              </button>
            </div>
          </div>

          {/* Mobile Main Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 bg-slate-950 text-slate-100">
            {/* ========================================================= */}
            {/* TAB 1: 300 CÂU HỎI & TỪ VỰNG IELTS TRÊN ĐIỆN THOẠI */}
            {/* ========================================================= */}
            {activeTab === 'ielts300' && (
              <div className="space-y-3 pb-6 animate-fadeIn">
                {/* Part Selector in Mobile */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-xl border border-slate-800">
                  {(['Part 1', 'Part 2', 'Part 3'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        audioService.playBeep('click');
                        setActivePart(p);
                        setSelectedCategory('All');
                        setIeltsIndex(0);
                      }}
                      className={`flex-1 py-1 text-center rounded-lg text-xs font-bold transition ${
                        activePart === p
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Search Bar in Mobile */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm từ vựng, câu hỏi..."
                    value={searchIelts}
                    onChange={(e) => {
                      setSearchIelts(e.target.value);
                      setIeltsIndex(0);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Horizontal Category Scroll Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {categories.slice(0, 10).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIeltsIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition ${
                        selectedCategory === cat
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Current Active Item - Flashcard Style */}
                {currentIeltsItem ? (
                  <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-purple-950/20 border border-purple-500/30 rounded-3xl p-4 shadow-xl space-y-3">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {activePart} • #{ieltsIndex + 1}/{filteredIelts.length}
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 truncate max-w-[150px]">
                        🏷️ {currentIeltsItem.category}
                      </span>
                    </div>

                    {/* Question Prompt */}
                    <div>
                      <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
                        Câu Hỏi Thảo Luận:
                      </h4>
                      <p className="text-sm font-extrabold text-white leading-snug">
                        {currentIeltsItem.question}
                      </p>
                    </div>

                    {/* Part 2 Cue Card if present */}
                    {currentIeltsItem.cueCardPrompt && (
                      <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200 whitespace-pre-line leading-relaxed">
                        {currentIeltsItem.cueCardPrompt}
                      </div>
                    )}

                    {/* Key Vocabulary Pills */}
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Từ Vựng Trọng Tâm:</span>
                        <span className="text-[10px] text-slate-400">Chạm để copy</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {currentIeltsItem.vocab
                          .split('\n')
                          .filter(Boolean)
                          .map((v, i) => (
                            <button
                              key={i}
                              onClick={() => handleCopyText(`v_${i}`, v)}
                              className="px-2 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-medium text-emerald-200 text-left hover:bg-emerald-900/60 transition active:scale-95"
                            >
                              {copiedId === `v_${i}` ? '✓ Đã sao chép!' : v}
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Model Speaking Answer */}
                    <div>
                      {(() => {
                        const stdAnswer = getStandardizedSpeakingAnswer(
                          activePart,
                          currentIeltsItem.question,
                          currentIeltsItem.answer,
                          currentIeltsItem.vocab,
                          currentIeltsItem.cueCardPrompt,
                          typeof currentIeltsItem.id === 'number' ? currentIeltsItem.id : undefined
                        );

                        return (
                          <>
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                                Bài Nói Mẫu ({activePart === 'Part 2' ? '10-15 Câu' : '3-5 Câu'}):
                              </h4>
                              <button
                                onClick={() => handleSpeak(stdAnswer)}
                                className={`p-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                                  isSpeaking
                                    ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                                    : 'bg-slate-800 border-slate-700 text-cyan-300 hover:text-white'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>{isSpeaking ? 'Dừng đọc' : 'Nghe Audio'}</span>
                              </button>
                            </div>

                            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar whitespace-pre-line">
                              {stdAnswer}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Bottom Flashcard Actions */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                      <button
                        onClick={handlePrevIelts}
                        disabled={ieltsIndex === 0}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Trước</span>
                      </button>

                      <button
                        onClick={() => {
                          const stdAnswer = getStandardizedSpeakingAnswer(
                            activePart,
                            currentIeltsItem.question,
                            currentIeltsItem.answer,
                            currentIeltsItem.vocab,
                            currentIeltsItem.cueCardPrompt,
                            typeof currentIeltsItem.id === 'number' ? currentIeltsItem.id : undefined
                          );
                          if (onSelectIeltsQuestion) {
                            onSelectIeltsQuestion({ ...currentIeltsItem, answer: stdAnswer });
                            audioService.playBeep('decision');
                            onClose();
                          } else {
                            handleCopyText('ans_all', `${currentIeltsItem.question}\n\n${stdAnswer}`);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold shadow hover:scale-105 active:scale-95 transition"
                      >
                        {onSelectIeltsQuestion ? 'Học Câu Này' : 'Sao Chép'}
                      </button>

                      <button
                        onClick={handleNextIelts}
                        disabled={ieltsIndex >= filteredIelts.length - 1}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition"
                      >
                        <span>Sau</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Không tìm thấy câu hỏi phù hợp.
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB WRITING: 600 ĐỀ IELTS WRITING (TASK 1 & TASK 2) TRÊN MOBILE */}
            {/* ========================================================= */}
            {activeTab === 'writing' && (
              <div className="space-y-3 pb-6 animate-fadeIn">
                {/* Task 1 vs Task 2 Switcher */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setWritingSubTask('task1');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-center transition ${
                      writingSubTask === 'task1'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Task 1: Biểu Đồ (300)
                  </button>
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setWritingSubTask('task2');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-center transition ${
                      writingSubTask === 'task2'
                        ? 'bg-amber-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Task 2: Nghị Luận (300)
                  </button>
                </div>

                {writingSubTask === 'task1' ? (
                  /* Task 1 Mobile View */
                  (() => {
                    const item = ieltsWritingTask1Bank[writingTask1Index] || ieltsWritingTask1Bank[0];
                    return (
                      <div className="space-y-3">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                            #{item.id} • {item.chartType.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-amber-400 font-bold">Band {item.bandScore}</span>
                        </div>

                        {/* Title & Prompt */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <h4 className="text-xs font-extrabold text-white leading-snug">{item.title}</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                            {item.prompt}
                          </p>
                        </div>

                        {/* Visual Chart for Mobile */}
                        <IeltsTask1ChartViewer chartData={item.chartData} title={item.title} />

                        {/* Overview */}
                        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-[11px] text-indigo-200 italic leading-relaxed">
                          <strong className="block text-[10px] font-bold uppercase not-italic text-indigo-400 mb-1">
                            Điểm Nhấn (Overview):
                          </strong>
                          {item.overview}
                        </div>

                        {/* Model Answer */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-emerald-400">
                              Bài Mẫu ({item.wordCount} words)
                            </span>
                            <button
                              onClick={() => {
                                handleCopyText(`m_t1_${item.id}`, `${item.title}\n\n${item.sampleAnswerBand8}`);
                              }}
                              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedId === `m_t1_${item.id}` ? 'Đã chép!' : 'Chép'}</span>
                            </button>
                          </div>
                          <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed max-h-52 overflow-y-auto custom-scrollbar p-1">
                            {item.sampleAnswerBand8.split('\n\n').map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}
                          </div>
                        </div>

                        {/* Prev / Next Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setWritingTask1Index((i) => Math.max(0, i - 1));
                            }}
                            disabled={writingTask1Index === 0}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Trước
                          </button>
                          <span className="font-mono text-purple-300 text-xs">
                            {writingTask1Index + 1} / {ieltsWritingTask1Bank.length}
                          </span>
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setWritingTask1Index((i) => Math.min(ieltsWritingTask1Bank.length - 1, i + 1));
                            }}
                            disabled={writingTask1Index >= ieltsWritingTask1Bank.length - 1}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Sau
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  /* Task 2 Mobile View */
                  (() => {
                    const item = ieltsWritingTask2Bank[writingTask2Index] || ieltsWritingTask2Bank[0];
                    return (
                      <div className="space-y-3">
                        {/* Header Badge */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                            #{item.id} • {item.essayType.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">Band {item.bandScore}</span>
                        </div>

                        {/* Title & Prompt */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <h4 className="text-xs font-extrabold text-white leading-snug">{item.topic}</h4>
                          <p className="text-[11px] text-amber-200 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                            {item.prompt}
                          </p>
                        </div>

                        {/* 4-Step Outline */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px]">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Dàn Ý 4 Đoạn:</span>
                          <p className="text-slate-300">
                            <strong className="text-amber-400">Intro:</strong> {item.outline.introduction}
                          </p>
                          <p className="text-slate-300">
                            <strong className="text-indigo-400">Body 1:</strong> {item.outline.bodyParagraph1}
                          </p>
                          <p className="text-slate-300">
                            <strong className="text-cyan-400">Body 2:</strong> {item.outline.bodyParagraph2}
                          </p>
                          <p className="text-slate-300">
                            <strong className="text-emerald-400">Concl:</strong> {item.outline.conclusion}
                          </p>
                        </div>

                        {/* Model Essay */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-amber-400">
                              Bài Viết Mẫu ({item.wordCount} words)
                            </span>
                            <button
                              onClick={() => {
                                handleCopyText(`m_t2_${item.id}`, `${item.topic}\n\n${item.sampleAnswerBand8}`);
                              }}
                              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedId === `m_t2_${item.id}` ? 'Đã chép!' : 'Chép'}</span>
                            </button>
                          </div>
                          <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed max-h-52 overflow-y-auto custom-scrollbar p-1">
                            {item.sampleAnswerBand8.split('\n\n').map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}
                          </div>
                        </div>

                        {/* Prev / Next Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setWritingTask2Index((i) => Math.max(0, i - 1));
                            }}
                            disabled={writingTask2Index === 0}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Trước
                          </button>
                          <span className="font-mono text-amber-300 text-xs">
                            {writingTask2Index + 1} / {ieltsWritingTask2Bank.length}
                          </span>
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setWritingTask2Index((i) => Math.min(ieltsWritingTask2Bank.length - 1, i + 1));
                            }}
                            disabled={writingTask2Index >= ieltsWritingTask2Bank.length - 1}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Sau
                          </button>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: SƠ ĐỒ XƯƠNG CÁ FISHBONE TRÊN ĐIỆN THOẠI (ROADMAP & 3000 TỪ) */}
            {/* ========================================================= */}
            {activeTab === 'fishbone' && (
              <div className="space-y-3 pb-6 animate-fadeIn">
                {/* Sub-mode switcher */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setFishboneSubMode('roadmap');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-center transition ${
                      fishboneSubMode === 'roadmap'
                        ? 'bg-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lộ Trình Cấp Độ
                  </button>
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setFishboneSubMode('vocab');
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-center transition ${
                      fishboneSubMode === 'vocab'
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🦴 3000 Từ 7.5+
                  </button>
                </div>

                {fishboneSubMode === 'roadmap' ? (
                  <>
                    <div className="p-3 bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">🐟</span>
                        <h3 className="text-xs font-extrabold text-white truncate">{fishboneProject.name}</h3>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{fishboneProject.description}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-cyan-300">Level Hiện Tại: Lvl {fishboneProject.currentLevelNumber}</span>
                        <span className="text-purple-300">Mục Tiêu: Lvl {fishboneProject.targetLevelNumber}</span>
                      </div>
                    </div>

                    {/* Vertical Evolution Roadmap for Mobile */}
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Lộ Trình Tiến Hóa Từng Cấp Độ (Mobile Roadmap)
                      </h4>

                  {fishboneProject.levels.map((level) => {
                    const isCurrent = level.number === fishboneProject.currentLevelNumber;
                    return (
                      <div
                        key={level.id}
                        className={`p-3 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-b from-cyan-950/40 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-900/60 border-slate-800 opacity-90'
                        }`}
                      >
                        {/* Level Header */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-extrabold ${
                                isCurrent
                                  ? 'bg-cyan-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              LVL {level.number}
                            </span>
                            <h5 className="text-xs font-bold text-white">{level.name}</h5>
                          </div>
                          <span className="text-[10px] font-mono font-extrabold text-cyan-400">
                            {level.maturityScore}%
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">{level.tagline}</p>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                            style={{ width: `${level.maturityScore}%` }}
                          />
                        </div>

                        {/* Key Requirements Checklist */}
                        {level.requirements && level.requirements.length > 0 && (
                          <div className="space-y-1.5 pt-1 border-t border-slate-800">
                            <span className="text-[10px] font-bold text-slate-400">Hạng mục chính:</span>
                            {level.requirements.slice(0, 3).map((r) => (
                              <div
                                key={r.id}
                                className="flex items-start gap-1.5 text-[11px] text-slate-300"
                              >
                                <span className={r.status === 'done' ? 'text-emerald-400' : 'text-amber-400'}>
                                  {r.status === 'done' ? '✓' : '○'}
                                </span>
                                <span className="flex-1 leading-snug">{r.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                </>
                ) : (
                  /* Mobile 3000 Vocab View */
                  (() => {
                    const item = fishboneVocab3000Bank[fishboneVocabIndex] || fishboneVocab3000Bank[0];
                    return (
                      <div className="space-y-3">
                        {/* Word Card */}
                        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-3 shadow-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl filter drop-shadow">{item.icon}</span>
                              <div>
                                <h3 className="text-base font-extrabold text-white">{item.word}</h3>
                                <span className="text-xs font-mono text-cyan-400">{item.phonetic}</span>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Band {item.band}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] font-bold">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-mono">
                              {item.pos}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Lvl {item.levelNumber}
                            </span>
                            <span className="text-slate-400 truncate max-w-[140px]">
                              {item.boneName}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Nghĩa Tiếng Việt:</span>
                            <p className="text-xs font-bold text-emerald-300">{item.meaning}</p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-cyan-400 block font-mono">Collocation:</span>
                            <p className="text-xs font-medium text-slate-200 italic">{item.collocation}</p>
                          </div>

                          <p className="text-[11px] text-slate-300 italic leading-relaxed">
                            "{item.example}"
                          </p>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() => {
                                const clean = `${item.word}. ${item.example}`;
                                if ('speechSynthesis' in window) {
                                  window.speechSynthesis.cancel();
                                  const u = new SpeechSynthesisUtterance(clean);
                                  u.lang = 'en-US';
                                  window.speechSynthesis.speak(u);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-cyan-300 hover:text-white text-xs font-bold flex items-center gap-1 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe</span>
                            </button>

                            <button
                              onClick={() => {
                                handleCopyText(`mb_voc_${item.id}`, `${item.icon} ${item.word} (${item.pos})\nNghĩa: ${item.meaning}\nCollocation: ${item.collocation}\nVí dụ: ${item.example}`);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1 transition"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>{copiedId === `mb_voc_${item.id}` ? 'Đã chép!' : 'Chép'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Prev / Next Nav */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setFishboneVocabIndex((i) => Math.max(0, i - 1));
                            }}
                            disabled={fishboneVocabIndex === 0}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Trước
                          </button>
                          <span className="font-mono text-cyan-300 text-xs">
                            {fishboneVocabIndex + 1} / {fishboneVocab3000Bank.length}
                          </span>
                          <button
                            onClick={() => {
                              audioService.playBeep('click');
                              setFishboneVocabIndex((i) => Math.min(fishboneVocab3000Bank.length - 1, i + 1));
                            }}
                            disabled={fishboneVocabIndex >= fishboneVocab3000Bank.length - 1}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 text-xs font-bold"
                          >
                            Sau
                          </button>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: THƯ VIỆN GEN Z TRÊN ĐIỆN THOẠI (STORY QUOTES) */}
            {/* ========================================================= */}
            {activeTab === 'genz' && (
              <div className="space-y-3 pb-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                    <span>💖 Thư Viện Câu Gen Z ({genzPhrases.length})</span>
                  </h4>
                </div>

                {genzPhrases.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Chưa có câu nói Gen Z nào được lưu. Hãy sang tab Gen Z Studio để lưu câu yêu thích!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {genzPhrases.map((phrase) => (
                      <div
                        key={phrase.id}
                        className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-pink-950/20 to-slate-900 border border-pink-500/30 space-y-2 shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                            {phrase.tone}
                          </span>
                          <button
                            onClick={() => handleCopyText(phrase.id, phrase.generatedText)}
                            className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition active:scale-95"
                            title="Sao chép"
                          >
                            {copiedId === phrase.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {phrase.context && (
                          <div className="text-[10px] text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20 truncate">
                            🏷️ {phrase.context}
                          </div>
                        )}

                        <p className="text-xs font-extrabold text-white leading-relaxed">
                          "{phrase.generatedText}"
                        </p>

                        {phrase.usageImpact && (
                          <div className="p-2 rounded-lg bg-slate-950/80 border border-indigo-500/30 text-[10px] text-slate-300">
                            <span className="text-amber-300 font-bold block mb-0.5">✨ Tác dụng:</span>
                            {phrase.usageImpact}
                          </div>
                        )}

                        <p className="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 truncate">
                          Gốc: {phrase.originalText}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: BÀI HỌC IELTS HIỆN TẠI TRÊN ĐIỆN THOẠI */}
            {/* ========================================================= */}
            {activeTab === 'current_lesson' && (
              <div className="space-y-3 pb-6 animate-fadeIn">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {currentLesson.part || 'Part 1'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 truncate max-w-[160px]">
                      {currentLesson.topic}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white leading-snug">
                    {currentLesson.question}
                  </h3>
                </div>

                {/* Sơ đồ Visual Master Map & Từ Vựng Mobile Preview */}
                {((currentLesson.vocabList && currentLesson.vocabList.length > 0) || (currentLesson.visualMasterMap && currentLesson.visualMasterMap.length > 0)) && (
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                      🗺️ Sơ Đồ Nhớ & Từ Vựng (Visual Map)
                    </h4>
                    {/* Emoji chain */}
                    {currentLesson.visualMasterMap && currentLesson.visualMasterMap.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-wrap gap-1.5 text-base">
                        {currentLesson.visualMasterMap.map((emoji, idx) => (
                          <span key={idx} className="p-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm leading-none">
                            {emoji}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Vocab Items */}
                    {currentLesson.vocabList && currentLesson.vocabList.length > 0 && (
                      <div className="grid grid-cols-2 gap-1.5">
                        {currentLesson.vocabList.map((item, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2"
                          >
                            <span className="text-base">{item.icon || '📌'}</span>
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold text-white truncate">{item.word}</p>
                              <p className="text-[9px] text-slate-400 truncate">{item.meaning}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Model Speaking Answer Mobile */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                      🎙️ Bài Nói Mẫu
                    </h4>
                    <button
                      onClick={() => handleSpeak(currentLesson.fullSpeakingAnswer)}
                      className="p-1 px-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isSpeaking ? 'Dừng' : 'Phát'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentLesson.fullSpeakingAnswer}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* iPhone Home Indicator Bar */}
          {isPhoneFrame && (
            <div className="py-1.5 flex justify-center shrink-0 bg-slate-950">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
