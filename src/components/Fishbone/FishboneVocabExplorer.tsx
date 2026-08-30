import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shuffle,
  Award,
  BookOpen,
  Filter
} from 'lucide-react';
import { fishboneVocab3000Bank, FISHBONE_BONE_THEMES } from '../../data/fishboneVocab3000Bank';
import { FishboneVocabItem } from '../../types/fishboneVocab';
import { audioService } from '../../services/audioService';

interface FishboneVocabExplorerProps {
  onClose?: () => void;
}

export const FishboneVocabExplorer: React.FC<FishboneVocabExplorerProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedBone, setSelectedBone] = useState<string | 'all'>('all');
  const [selectedPos, setSelectedPos] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');

  // Flashcard mode index & flip state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Pagination for grid
  const [page, setPage] = useState<number>(1);
  const pageSize = 48; // 48 items per page

  // Audio and copy state
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filtered dataset
  const filteredWords = useMemo(() => {
    return fishboneVocab3000Bank.filter((item) => {
      const matchLevel = selectedLevel === 'all' || item.levelNumber === selectedLevel;
      const matchBone = selectedBone === 'all' || item.boneId === selectedBone;
      const matchPos = selectedPos === 'all' || item.pos === selectedPos;
      const s = searchTerm.toLowerCase().trim();
      const matchSearch =
        !s ||
        item.word.toLowerCase().includes(s) ||
        item.meaning.toLowerCase().includes(s) ||
        item.collocation.toLowerCase().includes(s) ||
        item.boneName.toLowerCase().includes(s);
      return matchLevel && matchBone && matchPos && matchSearch;
    });
  }, [selectedLevel, selectedBone, selectedPos, searchTerm]);

  // Paginated words
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / pageSize));
  const currentWords = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredWords.slice(start, start + pageSize);
  }, [filteredWords, page, pageSize]);

  // Flashcard active item
  const currentFlashcard: FishboneVocabItem = filteredWords[flashcardIndex] || filteredWords[0] || fishboneVocab3000Bank[0];

  const handleCopy = (item: FishboneVocabItem) => {
    const text = `${item.icon} ${item.word} ${item.phonetic} (${item.pos})\nNghĩa: ${item.meaning}\nCollocation: ${item.collocation}\nVí dụ: ${item.example}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
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
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleNextFlashcard = () => {
    audioService.playBeep('click');
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
  };

  const handlePrevFlashcard = () => {
    audioService.playBeep('click');
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
  };

  const handleRandomFlashcard = () => {
    audioService.playBeep('decision');
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * filteredWords.length);
    setFlashcardIndex(rand);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* 1. Header Toolbar & Fishbone Level Filter */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl">🦴</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Kho 3000 Từ Vựng IELTS 7.5+ Sơ Đồ Xương Cá
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {filteredWords.length} / 3,000 TỪ
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Phân bổ theo 5 Cấp Độ Xương Cá và 10 Nhánh Chủ Đề Học Thuật • Kèm Icon sinh động cho từng từ
              </p>
            </div>
          </div>

          {/* View Mode & Random Controls */}
          <div className="flex items-center gap-2">
            {viewMode === 'flashcard' && (
              <button
                onClick={handleRandomFlashcard}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-bold transition active:scale-95 border border-slate-700"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Ngẫu Nhiên</span>
              </button>
            )}

            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold shadow-inner">
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setViewMode('grid');
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lưới Thẻ Từ (Grid)
              </button>
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setViewMode('flashcard');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'flashcard'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lật Thẻ (Flashcard)
              </button>
            </div>
          </div>
        </div>

        {/* 2. Fishbone Spine Levels Selector (Level 1 - 5) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => {
              setSelectedLevel('all');
              setPage(1);
              setFlashcardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedLevel === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🦴 Toàn Cột Sống (3000 Từ)
          </button>

          {[
            { lvl: 1, label: 'Lvl 1: Core 7.0 (600 từ)', color: 'from-emerald-600 to-teal-600' },
            { lvl: 2, label: 'Lvl 2: High 7.5 (600 từ)', color: 'from-cyan-600 to-blue-600' },
            { lvl: 3, label: 'Lvl 3: Master 8.0 (600 từ)', color: 'from-indigo-600 to-purple-600' },
            { lvl: 4, label: 'Lvl 4: Advanced 8.5 (600 từ)', color: 'from-purple-600 to-pink-600' },
            { lvl: 5, label: 'Lvl 5: Expert 9.0 (600 từ)', color: 'from-amber-600 to-rose-600' }
          ].map((item) => (
            <button
              key={item.lvl}
              onClick={() => {
                setSelectedLevel(item.lvl);
                setPage(1);
                setFlashcardIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedLevel === item.lvl
                  ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3. Fishbone 10 Ribs Selector (Nhánh Chủ Đề Xương Cá) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => {
              setSelectedBone('all');
              setPage(1);
              setFlashcardIndex(0);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition ${
              selectedBone === 'all'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            Tất cả nhánh
          </button>

          {FISHBONE_BONE_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedBone(theme.id);
                setPage(1);
                setFlashcardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1.5 transition ${
                selectedBone === theme.id
                  ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{theme.icon}</span>
              <span>{theme.vietnameseName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Secondary Filter Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm từ vựng tiếng Anh, nghĩa tiếng Việt, collocation..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
              setFlashcardIndex(0);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Part of Speech Filter */}
        <div className="flex items-center gap-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {['all', 'noun', 'verb', 'adj', 'adv'].map((pos) => (
            <button
              key={pos}
              onClick={() => {
                setSelectedPos(pos);
                setPage(1);
                setFlashcardIndex(0);
              }}
              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition ${
                selectedPos === pos
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {pos === 'all' ? 'Tất Cả Loại' : pos}
            </button>
          ))}
        </div>

        {/* Pagination Controls in Grid Mode */}
        {viewMode === 'grid' && (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-cyan-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1 rounded-lg bg-slate-950 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-slate-950">
        {/* ========================================================= */}
        {/* VIEW MODE 1: GRID VIEW (48 CARDS PER PAGE) */}
        {/* ========================================================= */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {currentWords.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-cyan-500/10 group"
                >
                  <div className="space-y-2.5">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl filter drop-shadow">{item.icon}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                          {item.pos}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Lvl {item.levelNumber}
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        Band {item.band}
                      </span>
                    </div>

                    {/* Word & Phonetic */}
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                        <span>{item.word}</span>
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">{item.phonetic}</p>
                    </div>

                    {/* Vietnamese Meaning */}
                    <p className="text-xs font-semibold text-slate-200 leading-snug">
                      {item.meaning}
                    </p>

                    {/* Collocation */}
                    <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase font-bold text-cyan-400 block">
                        Collocation 7.5+:
                      </span>
                      <p className="text-[11px] font-medium text-slate-300 italic">{item.collocation}</p>
                    </div>

                    {/* Context Sentence */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      "{item.example}"
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-bold truncate max-w-[120px]">
                      {item.boneName}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(`${item.word}. ${item.example}`)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition"
                        title="Nghe phát âm chuẩn"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleCopy(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white transition"
                        title="Sao chép từ & ví dụ"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pagination */}
            <div className="flex items-center justify-center gap-2 py-4">
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page <= 1}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold"
              >
                Trang Trước
              </button>
              <span className="text-xs font-mono text-cyan-300 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold"
              >
                Trang Sau
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW MODE 2: ZEN FLASHCARD STUDY MODE */}
        {/* ========================================================= */}
        {viewMode === 'flashcard' && currentFlashcard && (
          <div className="max-w-xl mx-auto py-6 flex flex-col items-center justify-center space-y-6">
            {/* Flashcard Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-80 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 hover:border-cyan-500/60 rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-2xl transition-all duration-300 relative select-none group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    #{currentFlashcard.id} • Level {currentFlashcard.levelNumber}
                  </span>
                  <span className="text-xs font-bold text-amber-400">Band {currentFlashcard.band}</span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition duration-300" />
                  <span>Chạm để lật</span>
                </span>
              </div>

              {/* Front or Back Content */}
              {!isFlipped ? (
                <div className="text-center space-y-3 my-auto">
                  <span className="text-6xl block filter drop-shadow">{currentFlashcard.icon}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {currentFlashcard.word}
                  </h2>
                  <p className="text-sm font-mono text-cyan-400">{currentFlashcard.phonetic}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono uppercase font-bold bg-slate-800 text-slate-300">
                    {currentFlashcard.pos}
                  </span>
                </div>
              ) : (
                <div className="text-center space-y-4 my-auto animate-fadeIn">
                  <h3 className="text-xl font-bold text-emerald-300 leading-snug">
                    {currentFlashcard.meaning}
                  </h3>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1">
                      Collocation:
                    </span>
                    <span className="text-slate-200 italic font-semibold">{currentFlashcard.collocation}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    "{currentFlashcard.example}"
                  </p>
                </div>
              )}

              {/* Card Footer */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                <span>Nhánh: {currentFlashcard.boneName}</span>
                <span className="font-mono text-cyan-400">
                  {flashcardIndex + 1} / {filteredWords.length}
                </span>
              </div>
            </div>

            {/* Flashcard Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevFlashcard}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trước</span>
              </button>

              <button
                onClick={() => handleSpeak(`${currentFlashcard.word}. ${currentFlashcard.example}`)}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát Âm</span>
              </button>

              <button
                onClick={() => handleCopy(currentFlashcard)}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-purple-300 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
              >
                {copiedId === currentFlashcard.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>Sao Chép</span>
              </button>

              <button
                onClick={handleNextFlashcard}
                className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-cyan-600/30"
              >
                <span>Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
