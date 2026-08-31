import React, { useState, useEffect } from 'react';
import {
  PenTool,
  TrendingUp,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Smartphone,
  Sparkles,
  BookOpen,
  Shuffle,
  Award,
  Layers,
  BarChart3,
  PieChart as PieIcon,
  Table as TableIcon,
  MapPin
} from 'lucide-react';
import { ieltsWritingTask1Bank } from '../../data/ieltsWritingTask1Bank';
import { ieltsWritingTask2Bank } from '../../data/ieltsWritingTask2Bank';
import { IeltsTask1Item, IeltsTask2Item, IeltsTask1ChartType, IeltsTask2EssayType } from '../../types/ieltsWriting';
import { IeltsTask1ChartViewer } from './IeltsTask1ChartViewer';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { MobileProjectSimulatorModal } from '../common/MobileProjectSimulatorModal';
import { IeltsAnnotatedPhraseViewer } from '../common/IeltsAnnotatedPhraseViewer';
import { annotateWritingParagraph } from '../../utils/ieltsTextAnnotator';

export const IeltsWritingWorkspace: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<'annotated' | 'plain'>('annotated');
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [task1Index, setTask1Index] = useState<number>(0);
  const [task2Index, setTask2Index] = useState<number>(0);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask1Type, setSelectedTask1Type] = useState<string>('all');
  const [selectedTask2Type, setSelectedTask2Type] = useState<string>('all');

  // UI States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Handle ESC for Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Filter Task 1
  const filteredTask1 = ieltsWritingTask1Bank.filter((item) => {
    const matchType = selectedTask1Type === 'all' || item.chartType === selectedTask1Type;
    const s = searchTerm.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(s) ||
      item.prompt.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s) ||
      item.sampleAnswerBand8.toLowerCase().includes(s);
    return matchType && matchSearch;
  });

  // Filter Task 2
  const filteredTask2 = ieltsWritingTask2Bank.filter((item) => {
    const matchType = selectedTask2Type === 'all' || item.essayType === selectedTask2Type;
    const s = searchTerm.toLowerCase();
    const matchSearch =
      item.topic.toLowerCase().includes(s) ||
      item.prompt.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s) ||
      item.sampleAnswerBand8.toLowerCase().includes(s);
    return matchType && matchSearch;
  });

  const currentTask1: IeltsTask1Item = filteredTask1[task1Index] || filteredTask1[0] || ieltsWritingTask1Bank[0];
  const currentTask2: IeltsTask2Item = filteredTask2[task2Index] || filteredTask2[0] || ieltsWritingTask2Bank[0];

  const handleCopy = (id: string, text: string) => {
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

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    await toggleNativeFullscreen();
  };

  const handleRandomItem = () => {
    audioService.playBeep('decision');
    if (activeTask === 'task1') {
      const rand = Math.floor(Math.random() * filteredTask1.length);
      setTask1Index(rand);
    } else {
      const rand = Math.floor(Math.random() * filteredTask2.length);
      setTask2Index(rand);
    }
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 text-slate-100 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen animate-fadeIn' : 'flex-1'
      }`}
    >
      {/* Top Main Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
        {/* Left Title & Segmented Task Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-500 p-0.5 shadow-md shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <PenTool className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-white">IELTS Writing Master Bank</h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🏛️ BỘ ĐỀ CAMBRIDGE 10 – 19 ({ieltsWritingTask1Bank.length + ieltsWritingTask2Bank.length} ĐỀ THẬT)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              100% Đề thi thật Cambridge IELTS (Cam 10 - 19) • Số liệu chuẩn xác • Biểu đồ trực quan • Bài mẫu Band 8.5+
            </p>
          </div>
        </div>

        {/* Center: Task 1 vs Task 2 Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold shadow-inner">
          <button
            onClick={() => {
              audioService.playBeep('click');
              setActiveTask('task1');
              setSearchTerm('');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTask === 'task1'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-300" />
            <span>Task 1: Biểu Đồ ({filteredTask1.length} Đề Cam)</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              setActiveTask('task2');
              setSearchTerm('');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTask === 'task2'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Task 2: Nghị Luận ({filteredTask2.length} Đề Cam)</span>
          </button>
        </div>

        {/* Right Tools: Random, Mobile View, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Random Prompt Button */}
          <button
            onClick={handleRandomItem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Đổi ngẫu nhiên một đề bài khác"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Ngẫu Nhiên</span>
          </button>

          {/* Mobile Simulator Mode */}
          <button
            onClick={() => {
              audioService.playBeep('click');
              setIsMobileModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/40 hover:bg-pink-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm"
            title="Xem bài viết trên giao diện điện thoại thoại di động"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-300" />
            <span className="hidden sm:inline">📱 Chế độ Điện Thoại</span>
            <span className="sm:hidden">📱 Mobile</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
              isFullscreen
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isFullscreen ? 'Thu nhỏ giao diện (Esc)' : 'Mở to toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-purple-400" />}
            <span>{isFullscreen ? 'Thu nhỏ (Esc)' : 'Toàn màn hình'}</span>
          </button>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeTask === 'task1' ? 'Tìm biểu đồ, chủ đề, từ vựng...' : 'Tìm đề thi task 2, chủ đề...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Category / Type Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {activeTask === 'task1' ? (
            [
              { id: 'all', label: `Tất Cả Dạng (${ieltsWritingTask1Bank.length})` },
              { id: 'line', label: '📈 Line Graph' },
              { id: 'bar', label: '📊 Bar Chart' },
              { id: 'pie', label: '🥧 Pie Chart' },
              { id: 'table', label: '📋 Table' },
              { id: 'map', label: '🗺️ Map' },
              { id: 'process', label: '⚙️ Process' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTask1Type(t.id);
                  setTask1Index(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedTask1Type === t.id
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))
          ) : (
            [
              { id: 'all', label: `Tất Cả Dạng (${ieltsWritingTask2Bank.length})` },
              { id: 'opinion', label: 'Agree / Disagree' },
              { id: 'discussion', label: 'Discuss Both Views' },
              { id: 'advantages_disadvantages', label: 'Adv / Disadv' },
              { id: 'problem_solution', label: 'Problem & Solution' },
              { id: 'two_part_question', label: 'Two-part Question' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTask2Type(t.id);
                  setTask2Index(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedTask2Type === t.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))
          )}
        </div>

        {/* Index Navigator */}
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => {
              if (activeTask === 'task1' && task1Index > 0) setTask1Index((i) => i - 1);
              if (activeTask === 'task2' && task2Index > 0) setTask2Index((i) => i - 1);
            }}
            disabled={(activeTask === 'task1' ? task1Index : task2Index) === 0}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-purple-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
            #{(activeTask === 'task1' ? task1Index : task2Index) + 1} /{' '}
            {activeTask === 'task1' ? filteredTask1.length : filteredTask2.length}
          </span>
          <button
            onClick={() => {
              if (activeTask === 'task1' && task1Index < filteredTask1.length - 1) setTask1Index((i) => i + 1);
              if (activeTask === 'task2' && task2Index < filteredTask2.length - 1) setTask2Index((i) => i + 1);
            }}
            disabled={
              (activeTask === 'task1' ? task1Index : task2Index) >=
              (activeTask === 'task1' ? filteredTask1.length : filteredTask2.length) - 1
            }
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ========================================================= */}
        {/* LEFT PANEL: PROMPT + CHART (TASK 1) / OUTLINE (TASK 2) */}
        {/* ========================================================= */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-slate-800/80 space-y-4">
          {activeTask === 'task1' ? (
            <>
              {/* Task 1 Prompt Card */}
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                    IELTS WRITING TASK 1 • {currentTask1.chartType.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-amber-400">🏷️ {currentTask1.category}</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {currentTask1.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {currentTask1.prompt}
                  </p>
                </div>
              </div>

              {/* Dynamic Interactive Chart Viewer */}
              <IeltsTask1ChartViewer chartData={currentTask1.chartData} title={currentTask1.title} imageUrl={currentTask1.imageUrl} />

              {/* Band 8 Overview Breakdown */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                    Điểm Nhấn Tổng Quan (Band 8 Overview)
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">{currentTask1.overview}</p>
              </div>

              {/* Key Trend Vocabulary */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Từ Vựng Miêu Tả Xu Hướng & Cột Mốc:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentTask1.keyVocabulary.map((v, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-xs font-bold text-emerald-300 block">{v.word}</span>
                      <span className="text-[11px] text-slate-400">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Task 2 Prompt Card */}
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    IELTS WRITING TASK 2 • {currentTask2.essayType.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-purple-400">🏷️ {currentTask2.category}</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {currentTask2.topic}
                  </h3>
                  <div className="mt-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
                    {currentTask2.prompt}
                  </div>
                </div>
              </div>

              {/* 4-Paragraph Essay Outline */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Dàn Ý Chi Tiết 4 Đoạn (Essay Outline)
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">
                      1. MỞ BÀI (Introduction):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{currentTask2.outline.introduction}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono">
                      2. THÂN BÀI 1 (Body 1):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{currentTask2.outline.bodyParagraph1}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">
                      3. THÂN BÀI 2 (Body 2):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{currentTask2.outline.bodyParagraph2}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">
                      4. KẾT BÀI (Conclusion):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{currentTask2.outline.conclusion}</p>
                  </div>
                </div>
              </div>

              {/* Band 8+ Lexical Resource */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Từ Vựng & Cụm Từ Học Thuật Đắt Giá (Lexical Resource):</span>
                </h4>
                <div className="space-y-2">
                  {currentTask2.lexicalResource.map((lex, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-pink-300">{lex.term}</span>
                        <span className="text-[10px] text-slate-400">{lex.explanation}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">Ví dụ: "{lex.example}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: SAMPLE ESSAY (BAND 7.5 - 8.5+) */}
        {/* ========================================================= */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto custom-scrollbar bg-slate-950 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Band {activeTask === 'task1' ? currentTask1.bandScore : currentTask2.bandScore} Sample</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeTask === 'task1' ? currentTask1.wordCount : currentTask2.wordCount} words
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Audio TTS Button */}
                <button
                  onClick={() =>
                    handleSpeak(activeTask === 'task1' ? currentTask1.sampleAnswerBand8 : currentTask2.sampleAnswerBand8)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                    isSpeaking
                      ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                      : 'bg-slate-900 border-slate-800 text-cyan-300 hover:text-white hover:border-cyan-500/50'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Dừng đọc' : 'Nghe Audio'}</span>
                </button>

                {/* Copy Button */}
                <button
                  onClick={() =>
                    handleCopy(
                      activeTask === 'task1' ? `t1_${currentTask1.id}` : `t2_${currentTask2.id}`,
                      activeTask === 'task1'
                        ? `${currentTask1.title}\n${currentTask1.prompt}\n\n${currentTask1.sampleAnswerBand8}`
                        : `${currentTask2.topic}\n${currentTask2.prompt}\n\n${currentTask2.sampleAnswerBand8}`
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition active:scale-95 shadow-sm"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'Đã chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* Model Answer Body with Paragraph Structure & Icon Annotated Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Nội Dung Bài Viết Mẫu (Band 8.0+ Model Answer):</span>
                </h3>

                {/* View Switcher: Deep Learning Icon Mode vs Plain Text */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setDisplayMode('annotated');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition ${
                      displayMode === 'annotated'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tách Icon & Giải Thích Từng Từ (Học Sâu)</span>
                  </button>
                  <button
                    onClick={() => {
                      audioService.playBeep('click');
                      setDisplayMode('plain');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                      displayMode === 'plain'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Văn Bản Hoàn Chỉnh</span>
                  </button>
                </div>
              </div>

              {displayMode === 'annotated' ? (
                /* Annotated Mode with Contextual Icons & Explanations */
                <div className="space-y-6 pt-2">
                  {(activeTask === 'task1' ? currentTask1.sampleAnswerBand8 : currentTask2.sampleAnswerBand8)
                    .split('\n\n')
                    .filter(Boolean)
                    .map((para, pIdx) => {
                      const vocabList = activeTask === 'task1' ? currentTask1.keyVocabulary : currentTask2.lexicalResource;
                      const chunks = annotateWritingParagraph(para, vocabList);
                      
                      const paraTitles = activeTask === 'task1'
                        ? [
                            'Đoạn 1: Mở bài (Introduction & Paraphrase Đề Bài)',
                            'Đoạn 2: Nhìn chung tổng quan (Overview Trend)',
                            'Đoạn 3: Chi tiết nhóm 1 (Body 1 - Key Features)',
                            'Đoạn 4: Chi tiết nhóm 2 (Body 2 - Comparative Data)'
                          ]
                        : [
                            'Đoạn 1: Mở bài & Khẳng định lập trường (Introduction & Thesis Statement)',
                            'Đoạn 2: Thân bài 1 (Body 1 - Argument & Evidence)',
                            'Đoạn 3: Thân bài 2 (Body 2 - In-depth Counter-Analysis)',
                            'Đoạn 4: Kết bài khẳng định lại (Conclusion & Recommendation)'
                          ];

                      return (
                        <div key={pIdx} className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-purple-400" />
                              <span>{paraTitles[pIdx] || `Đoạn văn ${pIdx + 1}`}</span>
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {chunks.length} phân đoạn học thuật
                            </span>
                          </div>

                          <IeltsAnnotatedPhraseViewer
                            chunks={chunks}
                            defaultExpandFirst={false}
                          />
                        </div>
                      );
                    })}
                </div>
              ) : (
                /* Plain Text Mode */
                <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed pt-2">
                  {(activeTask === 'task1' ? currentTask1.sampleAnswerBand8 : currentTask2.sampleAnswerBand8)
                    .split('\n\n')
                    .filter(Boolean)
                    .map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom helper tip */}
          <div className="py-2 text-center text-xs text-slate-500">
            💡 Mẹo thi: Dùng cấu trúc đa dạng (complex sentences), tránh lặp từ bằng các cụm đồng nghĩa học thuật.
          </div>
        </div>
      </main>

      {/* Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        initialTab="ielts300"
      />
    </div>
  );
};
