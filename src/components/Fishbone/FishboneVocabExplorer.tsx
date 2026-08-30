import React, { useState, useMemo, useEffect } from 'react';
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
  Filter,
  Plus,
  Compass,
  TrainTrack
} from 'lucide-react';
import { fishboneVocab3000Bank, FISHBONE_BONE_THEMES } from '../../data/fishboneVocab3000Bank';
import { FishboneVocabItem, FishboneBoneTheme } from '../../types/fishboneVocab';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { FishboneCanvas } from './FishboneCanvas';
import { FishboneAddVocabModal } from './FishboneAddVocabModal';

interface FishboneVocabExplorerProps {
  onClose?: () => void;
}

export const FishboneVocabExplorer: React.FC<FishboneVocabExplorerProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedBone, setSelectedBone] = useState<string | 'all'>('all');
  const [selectedPos, setSelectedPos] = useState<string | 'all'>('all');
  const [selectedCategoryType, setSelectedCategoryType] = useState<'all' | 'structure' | 'vocabulary'>('all');
  const [viewMode, setViewMode] = useState<'rail' | 'grid' | 'flashcard'>('rail');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Custom user items stored in localStorage
  const [customItems, setCustomItems] = useState<FishboneVocabItem[]>(() => {
    return storageService.getCustomFishboneItems();
  });

  // Combine static bank with custom items
  const allVocabBank = useMemo(() => {
    return [...customItems, ...fishboneVocab3000Bank];
  }, [customItems]);

  // Flashcard mode index & flip state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Pagination for grid
  const [page, setPage] = useState<number>(1);
  const pageSize = 48; // 48 items per page

  // Audio and copy state
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filtered themes by category type
  const displayedThemes = useMemo(() => {
    if (selectedCategoryType === 'all') return FISHBONE_BONE_THEMES;
    if (selectedCategoryType === 'structure') {
      return FISHBONE_BONE_THEMES.filter(
        (t) => t.categoryType === 'grammar' || t.categoryType === 'speaking' || t.categoryType === 'writing'
      );
    }
    return FISHBONE_BONE_THEMES.filter((t) => t.categoryType === 'vocabulary');
  }, [selectedCategoryType]);

  // Filtered dataset
  const filteredWords = useMemo(() => {
    return allVocabBank.filter((item) => {
      const matchLevel = selectedLevel === 'all' || item.levelNumber === selectedLevel;
      const matchBone = selectedBone === 'all' || item.boneId === selectedBone;
      const matchPos = selectedPos === 'all' || item.pos === selectedPos;
      
      let matchCat = true;
      if (selectedCategoryType === 'structure') {
        matchCat = item.boneId.startsWith('bone_grammar') || 
                   item.boneId.startsWith('bone_speaking') || 
                   item.boneId.startsWith('bone_writing');
      } else if (selectedCategoryType === 'vocabulary') {
        matchCat = !item.boneId.startsWith('bone_grammar') && 
                   !item.boneId.startsWith('bone_speaking') && 
                   !item.boneId.startsWith('bone_writing');
      }

      const s = searchTerm.toLowerCase().trim();
      const matchSearch =
        !s ||
        item.word.toLowerCase().includes(s) ||
        item.meaning.toLowerCase().includes(s) ||
        (item.collocation && item.collocation.toLowerCase().includes(s)) ||
        (item.formula && item.formula.toLowerCase().includes(s)) ||
        item.boneName.toLowerCase().includes(s);

      return matchLevel && matchBone && matchPos && matchCat && matchSearch;
    });
  }, [allVocabBank, selectedLevel, selectedBone, selectedPos, selectedCategoryType, searchTerm]);

  // Paginated words for grid
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / pageSize));
  const currentWords = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredWords.slice(start, start + pageSize);
  }, [filteredWords, page, pageSize]);

  // Flashcard active item
  const currentFlashcard: FishboneVocabItem = filteredWords[flashcardIndex] || filteredWords[0] || allVocabBank[0];

  const handleCopy = (item: FishboneVocabItem) => {
    const text = `${item.icon} ${item.word} ${item.phonetic ? item.phonetic : ''} (${item.pos})\nNghĩa: ${item.meaning}\n${item.formula ? `Công thức: ${item.formula}\n` : ''}Collocation: ${item.collocation}\nVí dụ: ${item.example}`;
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

  const activeTheme = FISHBONE_BONE_THEMES.find((t) => t.id === selectedBone);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* 1. Header Toolbar & Fishbone Level Filter */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-2xl">🦴</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Bản Đồ Xương Cá IELTS (Từ Vựng, Ngữ Pháp & Cấu Trúc)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {filteredWords.length} / {allVocabBank.length} MỤC
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                10 Xương Cá Ngữ Pháp & Cấu Trúc Speaking/Writing + 10 Xương Cá Từ Vựng Học Thuật • Vuốt đường ray zíc zắc vô tận
              </p>
            </div>
          </div>

          {/* Action Tools & View Mode Switcher */}
          <div className="flex items-center gap-2">
            {/* Add Custom Vocab / Structure */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Từ / Cấu Trúc</span>
            </button>

            {viewMode === 'flashcard' && (
              <button
                onClick={handleRandomFlashcard}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-bold transition active:scale-95 border border-slate-700"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Ngẫu Nhiên</span>
              </button>
            )}

            {/* 3 View Modes: Rail (Đường Ray Zíc Zắc), Grid (Lưới), Flashcard (Lật Thẻ) */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold shadow-inner">
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setViewMode('rail');
                }}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  viewMode === 'rail'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🚂</span>
                <span>Đường Ray Uốn Lượn</span>
              </button>

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
                Lưới Thẻ (Grid)
              </button>

              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setViewMode('flashcard');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'flashcard'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lật Thẻ (Flashcard)
              </button>
            </div>
          </div>
        </div>

        {/* Category Switcher: All vs 10 Ngữ Pháp / Cấu Trúc vs 10 Từ Vựng */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Nhóm Xương Cá:
          </span>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setSelectedCategoryType('all');
                setSelectedBone('all');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedCategoryType === 'all'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🌟 Tất Cả 20 Xương Cá
            </button>

            <button
              onClick={() => {
                setSelectedCategoryType('structure');
                setSelectedBone('all');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                selectedCategoryType === 'structure'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <span>🎓</span>
              <span>10 Xương Cá Ngữ Pháp & Cấu Trúc IELTS</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategoryType('vocabulary');
                setSelectedBone('all');
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                selectedCategoryType === 'vocabulary'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              <span>🌱</span>
              <span>10 Xương Cá Từ Vựng Học Thuật</span>
            </button>
          </div>
        </div>

        {/* 2. Fishbone 20 Ribs Selector (Nhánh Chủ Đề Xương Cá) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => {
              setSelectedBone('all');
              setPage(1);
              setFlashcardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedBone === 'all'
                ? 'bg-cyan-500 text-white shadow'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả chủ đề
          </button>

          {displayedThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedBone(theme.id);
                setPage(1);
                setFlashcardIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 border ${
                selectedBone === theme.id
                  ? 'bg-slate-800 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{theme.icon}</span>
              <span>{theme.vietnameseName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area based on viewMode */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* VIEW MODE 1: SERPENTINE ENDLESS TRAIN TRACK (ĐƯỜNG TÀU UỐN LƯỢN) */}
        {viewMode === 'rail' && (
          <div className="flex-1 overflow-hidden p-4 sm:p-6 flex flex-col">
            <FishboneCanvas
              items={filteredWords}
              theme={activeTheme}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW MODE 2: GRID (LƯỚI THẺ TỪ) */}
        {viewMode === 'grid' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentWords.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-4 shadow-xl flex flex-col justify-between transition duration-200 hover:-translate-y-0.5 group"
                >
                  <div>
                    {/* Header: Icon, Pos, Band */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Band {item.band}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {item.pos}
                      </span>
                    </div>

                    {/* Word / Title */}
                    <h4 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition">
                      {item.word}
                    </h4>

                    {/* Meaning */}
                    <p className="text-xs font-semibold text-amber-300 mt-1 mb-2">
                      {item.meaning}
                    </p>

                    {/* Formula if present */}
                    {item.formula && (
                      <div className="text-[11px] font-mono text-cyan-200 bg-cyan-950/40 p-2 rounded-xl border border-cyan-800/40 mb-2">
                        📐 {item.formula}
                      </div>
                    )}

                    {/* Collocation */}
                    {item.collocation && (
                      <div className="text-[11px] text-slate-300 mb-2 font-medium">
                        🔑 {item.collocation}
                      </div>
                    )}

                    {/* Example */}
                    <p className="text-[11px] text-slate-400 italic line-clamp-3 border-l-2 border-slate-700 pl-2">
                      "{item.example}"
                    </p>
                  </div>

                  {/* Actions: Speak, Copy */}
                  <div className="flex items-center justify-end gap-1.5 mt-3 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleSpeak(item.word)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Sao chép"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 pb-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Trang {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 3: FLASHCARD (LẬT THẺ PHẢN XẠ) */}
        {viewMode === 'flashcard' && currentFlashcard && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-xl min-h-[320px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-indigo-500/40 hover:border-cyan-400 rounded-3xl p-8 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] relative select-none"
            >
              {/* Card top info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentFlashcard.icon}</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Band {currentFlashcard.band} • L{currentFlashcard.levelNumber}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">
                  {flashcardIndex + 1} / {filteredWords.length}
                </span>
              </div>

              {/* Card Center Content */}
              <div className="my-auto text-center py-6 space-y-3">
                {!isFlipped ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                      {currentFlashcard.word}
                    </h3>
                    {currentFlashcard.phonetic && (
                      <p className="text-sm font-mono text-cyan-300">
                        {currentFlashcard.phonetic}
                      </p>
                    )}
                    <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full uppercase font-mono">
                      {currentFlashcard.pos} • {currentFlashcard.boneName}
                    </span>
                    <p className="text-xs text-slate-500 mt-4">
                      (Nhấp vào thẻ để lật xem nghĩa, công thức và ví dụ)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-extrabold text-amber-300">
                      {currentFlashcard.meaning}
                    </div>

                    {currentFlashcard.formula && (
                      <div className="text-xs font-mono text-cyan-200 bg-cyan-950/60 p-3 rounded-2xl border border-cyan-800/60 max-w-md mx-auto">
                        📐 <span className="font-bold">{currentFlashcard.formula}</span>
                      </div>
                    )}

                    <div className="text-sm font-bold text-slate-200">
                      🔑 {currentFlashcard.collocation}
                    </div>

                    <p className="text-xs text-slate-300 italic max-w-md mx-auto border-l-2 border-cyan-500 pl-3 text-left">
                      "{currentFlashcard.example}"
                    </p>
                  </>
                )}
              </div>

              {/* Card Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentFlashcard.word);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Phát âm</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-bold transition"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Lật Thẻ</span>
                </button>
              </div>
            </div>

            {/* Flashcard Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevFlashcard}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white hover:bg-slate-800 transition shadow"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trước</span>
              </button>

              <button
                onClick={handleNextFlashcard}
                className="flex items-center gap-1 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-xs font-bold text-white hover:from-cyan-500 hover:to-indigo-500 transition shadow-lg shadow-cyan-500/20"
              >
                <span>Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Item Modal */}
      <FishboneAddVocabModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdded={(newItem) => {
          setCustomItems((prev) => [newItem, ...prev]);
        }}
        themes={FISHBONE_BONE_THEMES}
        defaultBoneId={selectedBone !== 'all' ? selectedBone : undefined}
      />
    </div>
  );
};
