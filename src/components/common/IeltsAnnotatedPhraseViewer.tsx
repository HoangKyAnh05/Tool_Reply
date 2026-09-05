import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  BookOpen,
  Info,
  RotateCcw,
  Bot,
  MessageSquare,
  MessagesSquare,
  Users
} from 'lucide-react';
import { AnnotatedPhraseChunk } from '../../utils/ieltsTextAnnotator';
import { audioService } from '../../services/audioService';
import { repetitionService, RepetitionTier } from '../../utils/repetitionTracker';
import {
  buildExplanationPromptForChunk,
  buildAllExplanationPromptForChunks,
  buildDialoguePromptForChunk,
  buildDialoguePromptForChunks
} from '../../utils/ieltsConversationPrompts';

export interface IeltsAnnotatedPhraseViewerProps {
  chunks: AnnotatedPhraseChunk[];
  title?: string;
  defaultExpandFirst?: boolean;
  className?: string;
  questionContext?: string;
  onSendToGemini?: (prompt: string) => void;
}

// Re-export prompt builders for backwards compatibility
export const buildAnnotatedChunkPrompt = buildExplanationPromptForChunk;
export const buildAllAnnotatedChunksPrompt = buildAllExplanationPromptForChunks;

export const IeltsAnnotatedPhraseViewer: React.FC<IeltsAnnotatedPhraseViewerProps> = ({
  chunks,
  title,
  defaultExpandFirst = false,
  className = '',
  questionContext = '',
  onSendToGemini
}) => {
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(
    defaultExpandFirst && chunks.length > 0 ? chunks[0].id : null
  );
  const [speakingChunkId, setSpeakingChunkId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedAllPrompt, setCopiedAllPrompt] = useState(false);
  const [copiedAllGemini, setCopiedAllGemini] = useState(false);

  // States for 20-turn dialogue prompt
  const [copiedDialogueId, setCopiedDialogueId] = useState<string | null>(null);
  const [copiedDialogueGeminiId, setCopiedDialogueGeminiId] = useState<string | null>(null);
  const [copiedAllDialoguePrompt, setCopiedAllDialoguePrompt] = useState(false);
  const [copiedAllDialogueGemini, setCopiedAllDialogueGemini] = useState(false);

  const [viewMode, setViewMode] = useState<'cards' | 'inline'>('cards');
  const [repetitionCounts, setRepetitionCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const all = repetitionService.getAllCounts();
    setRepetitionCounts(all);
  }, []);

  const getChunkKey = (chunk: AnnotatedPhraseChunk) => {
    return `chunk_${chunk.englishText.trim().toLowerCase().replace(/[^a-z0-9]/gi, '_')}`;
  };

  const handleIncrementChunkRepetition = (chunk: AnnotatedPhraseChunk, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playBeep('click');
    const key = getChunkKey(chunk);
    const newCount = repetitionService.incrementCount(key);
    setRepetitionCounts((prev) => ({ ...prev, [key]: newCount }));
  };

  const handleCopyGeminiPrompt = (chunk: AnnotatedPhraseChunk, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playBeep('click');
    const prompt = buildExplanationPromptForChunk(chunk, questionContext);

    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedPromptId(chunk.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleCopyAllChunksPrompt = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!chunks || chunks.length === 0) return;
    audioService.playBeep('click');
    const combinedPrompt = buildAllExplanationPromptForChunks(chunks, questionContext);
    navigator.clipboard.writeText(combinedPrompt);
    setCopiedAllPrompt(true);
    setTimeout(() => setCopiedAllPrompt(false), 2500);
  };

  const handleSendAllChunksToGemini = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!chunks || chunks.length === 0) return;
    audioService.playBeep('decision');
    const combinedPrompt = buildAllExplanationPromptForChunks(chunks, questionContext);
    if (onSendToGemini) {
      onSendToGemini(combinedPrompt);
    } else {
      navigator.clipboard.writeText(combinedPrompt);
    }
    setCopiedAllGemini(true);
    setTimeout(() => setCopiedAllGemini(false), 2500);
  };

  // Dedicated Dialogue Prompt Handlers (20 short turns)
  const handleCopyChunkDialoguePrompt = (chunk: AnnotatedPhraseChunk, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playBeep('click');
    const prompt = buildDialoguePromptForChunk(chunk, questionContext);
    navigator.clipboard.writeText(prompt);
    setCopiedDialogueId(chunk.id);
    setTimeout(() => setCopiedDialogueId(null), 2000);
  };

  const handleSendChunkDialogueToGemini = (chunk: AnnotatedPhraseChunk, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playBeep('decision');
    const prompt = buildDialoguePromptForChunk(chunk, questionContext);
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedDialogueGeminiId(chunk.id);
    setTimeout(() => setCopiedDialogueGeminiId(null), 2500);
  };

  const handleCopyAllDialoguePrompt = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!chunks || chunks.length === 0) return;
    audioService.playBeep('click');
    const prompt = buildDialoguePromptForChunks(chunks, questionContext);
    navigator.clipboard.writeText(prompt);
    setCopiedAllDialoguePrompt(true);
    setTimeout(() => setCopiedAllDialoguePrompt(false), 2500);
  };

  const handleSendAllDialogueToGemini = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!chunks || chunks.length === 0) return;
    audioService.playBeep('decision');
    const prompt = buildDialoguePromptForChunks(chunks, questionContext);
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedAllDialogueGemini(true);
    setTimeout(() => setCopiedAllDialogueGemini(false), 2500);
  };

  const handleSpeak = (chunk: AnnotatedPhraseChunk, e: React.MouseEvent) => {
    e.stopPropagation();
    if (speakingChunkId === chunk.id) {
      audioService.stopSpeaking();
      setSpeakingChunkId(null);
      return;
    }
    setSpeakingChunkId(chunk.id);
    audioService.speakText(chunk.englishText, 'en', () => {
      setSpeakingChunkId(null);
    });
  };

  const handleCopy = (chunk: AnnotatedPhraseChunk, e: React.MouseEvent) => {
    e.stopPropagation();
    const prompt = buildExplanationPromptForChunk(chunk, questionContext);
    navigator.clipboard.writeText(prompt);
    setCopiedId(chunk.id);
    audioService.playBeep('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTagColor = (tag: AnnotatedPhraseChunk['categoryTag']) => {
    switch (tag) {
      case 'Lexical':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Cohesion':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Overview':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'DataHighlight':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Grammar':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Fluency':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const selectedChunk = chunks.find((c) => c.id === selectedChunkId);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Toolbar with Explanation Prompts & Dedicated 20-Turn Dialogue Prompt buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-xs font-bold text-slate-300">
            {title || `Tách Từng Từ & Cụm Từ (${chunks.length} cụm)`}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline">
            {chunks.length} cụm từ
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* NÚT COPY PROMPT GIẢI THÍCH TỪNG TỪ TRONG CÂU (KÈM CỘT ĐỐI TƯỢNG GIAO TIẾP) */}
          <button
            type="button"
            onClick={handleCopyAllChunksPrompt}
            title="Sao chép prompt phân tích giải thích TẤT CẢ các từ trong cả câu (kèm cột Đối tượng giao tiếp thường nói với ai)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllPrompt
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border-indigo-500/50 text-indigo-200 hover:from-indigo-600 hover:to-purple-600 hover:text-white'
            }`}
          >
            {copiedAllPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã Copy Prompt Cả Câu!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-indigo-300" />
                <span>Copy Prompt Cả Câu (Có Cột Đối Tượng)</span>
              </>
            )}
          </button>

          {/* NÚT GỬI PROMPT GIẢI THÍCH SANG GEMINI */}
          <button
            type="button"
            onClick={handleSendAllChunksToGemini}
            title="Gửi prompt phân tích giải thích TẤT CẢ từ trong cả câu sang Gemini MiniWeb"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllGemini
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-blue-600/30 border-blue-500/40 text-blue-200 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {copiedAllGemini ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã gửi Gemini!</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden sm:inline">Gửi Cả Câu Sang Gemini</span>
                <span className="sm:hidden">Gemini</span>
              </>
            )}
          </button>

          {/* NÚT RIÊNG: PROMPT TẠO KỊCH BẢN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN (CẢ CÂU) */}
          <button
            type="button"
            onClick={handleCopyAllDialoguePrompt}
            title="Sao chép Prompt tạo đoạn hội thoại ~20 câu ngắn tự nhiên (chào hỏi, đặt vấn đề, trao đổi dùng từ, kết thúc) giữa 2 nhân vật phù hợp"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllDialoguePrompt
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border-emerald-500/50 text-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:text-white'
            }`}
          >
            {copiedAllDialoguePrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã Copy Prompt Hội Thoại!</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>💬 Prompt Hội Thoại 20 Câu (Cả Câu)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendAllDialogueToGemini}
            title="Gửi Prompt kịch bản hội thoại 20 câu ngắn tự nhiên cả câu sang Gemini MiniWeb"
            className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition shadow-sm ${
              copiedAllDialogueGemini
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-teal-600/30 border-teal-500/40 text-teal-200 hover:bg-teal-600 hover:text-white'
            }`}
          >
            {copiedAllDialogueGemini ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã gửi Gemini!</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-teal-300" />
                <span>Hội Thoại Sang Gemini</span>
              </>
            )}
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2 py-0.5 rounded-md font-medium transition ${
                viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thẻ Học (Cards)
            </button>
            <button
              onClick={() => setViewMode('inline')}
              className={`px-2 py-0.5 rounded-md font-medium transition ${
                viewMode === 'inline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Nối Dòng (Flow)
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-2.5">
          {chunks.map((chunk, idx) => {
            const isSelected = selectedChunkId === chunk.id;
            const isSpeaking = speakingChunkId === chunk.id;
            const chunkKey = getChunkKey(chunk);
            const repCount = repetitionCounts[chunkKey] || 0;
            const tier = repetitionService.getTier(repCount);

            return (
              <div
                key={chunk.id || idx}
                onClick={() => {
                  audioService.playBeep('click');
                  setSelectedChunkId(isSelected ? null : chunk.id);
                }}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  repCount > 0
                    ? `${tier.bgClass} ${tier.borderClass} ${tier.glowClass}`
                    : isSelected
                    ? 'bg-slate-900/95 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    {/* Click icon to advance repetition color */}
                    <button
                      type="button"
                      onClick={(e) => handleIncrementChunkRepetition(chunk, e)}
                      title="Bấm vào icon để chuyển mức màu học tập (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                      className={`text-xl p-2 rounded-xl border shrink-0 select-none shadow-sm transition hover:scale-110 active:scale-95 ${
                        repCount > 0
                          ? `${tier.badgeClass} ring-2 ring-white/30`
                          : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    >
                      {chunk.icon}
                    </button>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>

                        {/* Category Tag - Click to cycle color! */}
                        <button
                          type="button"
                          onClick={(e) => handleIncrementChunkRepetition(chunk, e)}
                          title="Bấm để đổi màu ghi nhớ số lần học (Xanh biển -> Vàng -> Đỏ -> Tím -> Xanh lá -> ...)"
                          className={`text-[10px] px-2.5 py-0.5 rounded-md border font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-sm ${
                            repCount > 0
                              ? tier.badgeClass
                              : getTagColor(chunk.categoryTag)
                          }`}
                        >
                          <span>{tier.emoji}</span>
                          <span>{chunk.categoryTag}</span>
                          {repCount > 0 && <span className="underline font-black">({tier.name.split(':')[0]})</span>}
                        </button>

                        {/* Dedicated color pill button */}
                        <button
                          type="button"
                          onClick={(e) => handleIncrementChunkRepetition(chunk, e)}
                          title="Bấm để chuyển mức màu tiếp theo"
                          className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-bold transition hover:scale-105 active:scale-95 shadow-sm ${
                            repCount > 0
                              ? tier.badgeClass
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200'
                          }`}
                        >
                          <span>{tier.emoji}</span>
                          <span>{repCount > 0 ? `Lần ${repCount}` : 'Đổi mức màu'}</span>
                        </button>

                        {chunk.vietnameseMeaning && (
                          <span className="text-xs text-amber-300/90 font-medium">
                            ({chunk.vietnameseMeaning})
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-semibold leading-relaxed select-text ${repCount > 0 ? tier.textClass : 'text-white'}`}>
                        {chunk.englishText}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end" onClick={(e) => e.stopPropagation()}>
                    {/* Gemini Prompt Button (Phân tích có cột Đối tượng giao tiếp) */}
                    <button
                      onClick={(e) => handleCopyGeminiPrompt(chunk, e)}
                      title="Mở/Gửi sang Gemini: Bảng 5 cột giải thích từ và đối tượng giao tiếp phù hợp (người trẻ, bạn bè, thầy cô...)"
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition shadow-sm ${
                        copiedPromptId === chunk.id
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500/40 text-blue-300 hover:text-white hover:from-blue-600 hover:to-indigo-600'
                      }`}
                    >
                      {copiedPromptId === chunk.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[10px] font-bold hidden sm:inline">
                        {copiedPromptId === chunk.id ? 'Đã copy Prompt' : 'Prompt Phân Tích'}
                      </span>
                    </button>

                    {/* Nút Prompt Riêng: Tạo Hội Thoại 20 Câu Cho Riêng Từ Này */}
                    <button
                      onClick={(e) => handleSendChunkDialogueToGemini(chunk, e)}
                      title="Tạo kịch bản đối thoại 20 câu ngắn tự nhiên (chào hỏi, đặt vấn đề, dùng từ, kết thúc) với đối tượng phù hợp và gửi sang Gemini"
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition shadow-sm ${
                        copiedDialogueGeminiId === chunk.id
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-emerald-500/40 text-emerald-300 hover:text-white hover:from-emerald-600 hover:to-teal-600'
                      }`}
                    >
                      {copiedDialogueGeminiId === chunk.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span className="text-[10px] font-bold hidden sm:inline">
                        {copiedDialogueGeminiId === chunk.id ? 'Đã gửi Gemini' : '💬 Hội Thoại 20c'}
                      </span>
                    </button>

                    {/* Copy prompt hội thoại 20 câu ngắn riêng từ này */}
                    <button
                      onClick={(e) => handleCopyChunkDialoguePrompt(chunk, e)}
                      title="Sao chép prompt kịch bản hội thoại 20 câu ngắn cho riêng từ này vào Clipboard"
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        copiedDialogueId === chunk.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-300 hover:bg-slate-800'
                      }`}
                    >
                      {copiedDialogueId === chunk.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-emerald-400/80" />
                      )}
                    </button>

                    {/* Audio Listen */}
                    <button
                      onClick={(e) => handleSpeak(chunk, e)}
                      title="Nghe phát âm cụm này"
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        isSpeaking
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Copy Standard Prompt Button (ko gửi Gemini) */}
                    <button
                      onClick={(e) => handleCopy(chunk, e)}
                      title="Sao chép Prompt phân tích thường (kèm đối tượng giao tiếp và dịch nghĩa theo ngữ cảnh)"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
                    >
                      {copiedId === chunk.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                    </button>
                  </div>
                </div>

                {/* Expanded explanation box showing the reason for writing this word into the essay */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/90 -mx-3.5 -mb-3.5 p-3.5 rounded-b-2xl space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ý NGHĨA VIẾT / NÓI TỪ NÀY VÀO BÀI (BAND 8.0+ IMPACT):</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleIncrementChunkRepetition(chunk, e)}
                        className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-bold transition shadow-sm ${
                          repCount > 0 ? tier.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        <span>{tier.emoji}</span>
                        <span>{tier.name}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans bg-indigo-950/20 border border-indigo-500/20 p-2.5 rounded-xl">
                      {chunk.purpose}
                    </p>

                    {/* Dedicated 20-Turn Conversational Dialogue Box for this word */}
                    <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 p-3 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>KỊCH BẢN HỘI THOẠI 20 CÂU NGẮN TỰ NHIÊN (TRA TỪ NÀY):</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={(e) => handleCopyChunkDialoguePrompt(chunk, e)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition shadow-sm ${
                              copiedDialogueId === chunk.id
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-emerald-600/30 border-emerald-500/40 text-emerald-200 hover:bg-emerald-600 hover:text-white'
                            }`}
                            title="Sao chép prompt tạo kịch bản hội thoại 20 câu ngắn tự nhiên cho từ này"
                          >
                            {copiedDialogueId === chunk.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedDialogueId === chunk.id ? 'Đã copy' : 'Copy Prompt Hội Thoại'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleSendChunkDialogueToGemini(chunk, e)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition shadow-sm ${
                              copiedDialogueGeminiId === chunk.id
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-teal-600/30 border-teal-500/40 text-teal-200 hover:bg-teal-600 hover:text-white'
                            }`}
                            title="Gửi prompt tạo kịch bản hội thoại 20 câu ngắn sang Gemini"
                          >
                            {copiedDialogueGeminiId === chunk.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
                            <span>Gửi Gemini Hội Thoại</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        🌿 AI sẽ đóng vai 2 nhân vật phù hợp (người trẻ/bạn bè, người cùng tuổi, hoặc thầy cô giáo) trò chuyện tự nhiên từ chào hỏi, mở đầu/đặt vấn đề, trao đổi dùng từ <strong className="text-emerald-300">"{chunk.englishText}"</strong>, đến kết thúc mượt mà (~20 câu ngắn, song ngữ Anh - Việt).
                      </p>
                    </div>

                    {/* Contextual & Meaning Table Drawer */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-2.5 space-y-1">
                          <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                            <span>🇻🇳 Dịch nghĩa trong ngữ cảnh:</span>
                          </div>
                          <p className="text-white font-medium">{chunk.vietnameseMeaning || 'Dịch theo ngữ cảnh câu'}</p>
                        </div>
                        <div className="p-2.5 space-y-1">
                          <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                            <span>🎯 Ngữ cảnh áp dụng:</span>
                          </div>
                          <p className="text-slate-300">{questionContext || 'IELTS Speaking / Writing'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Mode 2: Inline Flow with clickable chips */
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap gap-2 leading-loose">
            {chunks.map((chunk, idx) => {
              const isSelected = selectedChunkId === chunk.id;
              const chunkKey = getChunkKey(chunk);
              const repCount = repetitionCounts[chunkKey] || 0;
              const tier = repetitionService.getTier(repCount);

              return (
                <button
                  key={chunk.id || idx}
                  onClick={() => {
                    audioService.playBeep('click');
                    setSelectedChunkId(isSelected ? null : chunk.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition ${
                    repCount > 0
                      ? `${tier.bgClass} ${tier.borderClass} ${tier.textClass}`
                      : isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-105'
                      : 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:border-slate-500 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-sm">{chunk.icon}</span>
                  <span>{chunk.englishText}</span>
                  {repCount > 0 && <span className="text-[10px]">{tier.emoji}</span>}
                  {idx < chunks.length - 1 && <span className="text-slate-500 text-[10px] ml-1">→</span>}
                </button>
              );
            })}
          </div>

          {/* Details Drawer for selected chunk in inline mode */}
          {selectedChunk && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/50 shadow-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedChunk.icon}</span>
                  <span className="text-sm font-bold text-white">{selectedChunk.englishText}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={(e) => handleSendChunkDialogueToGemini(selectedChunk, e)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                    title="Gửi sang Gemini kịch bản đối thoại 20 câu"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hội Thoại 20c</span>
                  </button>
                  <button
                    onClick={(e) => handleCopyGeminiPrompt(selectedChunk, e)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-200 hover:bg-blue-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                    title="Gửi sang Gemini Prompt phân tích có cột đối tượng"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Prompt Phân Tích</span>
                  </button>
                  <button
                    onClick={(e) => handleCopy(selectedChunk, e)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                    title="Sao chép prompt thường (ko gửi Gemini)"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={(e) => handleSpeak(selectedChunk, e)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe đọc</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ý NGHĨA VIẾT VÀO BÀI (MỤC ĐÍCH HỌC THUẬT):</span>
                </div>
                <p className="leading-relaxed text-slate-200">{selectedChunk.purpose}</p>

                {selectedChunk.vietnameseMeaning && (
                  <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-slate-400">
                    <span className="font-semibold text-amber-300">🇻🇳 Dịch nghĩa trong ngữ cảnh:</span>
                    <span className="text-white font-medium">{selectedChunk.vietnameseMeaning}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
