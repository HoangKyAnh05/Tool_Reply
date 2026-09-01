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
  Bot
} from 'lucide-react';
import { AnnotatedPhraseChunk } from '../../utils/ieltsTextAnnotator';
import { audioService } from '../../services/audioService';
import { repetitionService, RepetitionTier } from '../../utils/repetitionTracker';

interface IeltsAnnotatedPhraseViewerProps {
  chunks: AnnotatedPhraseChunk[];
  title?: string;
  defaultExpandFirst?: boolean;
  className?: string;
  questionContext?: string;
  onSendToGemini?: (prompt: string) => void;
}

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
    // Prompt format requested by user:
    // [👥] attendance figures
    // Tạo các câu hỏi, tình huống mà tôi phải dùng từ vựng này, viết có icon, chia bảng tôi dễ đọc
    const prompt = `[${chunk.icon}] ${chunk.englishText}\n\nTạo các câu hỏi, tình huống mà tôi phải dùng từ vựng này, viết có icon, chia bảng tôi dễ đọc`;

    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedPromptId(chunk.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
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
    const prompt = `[${chunk.icon}] ${chunk.englishText}\n\nTạo các câu hỏi, tình huống mà tôi phải dùng từ vựng này, viết có icon, chia bảng tôi dễ đọc`;
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
      {/* Header controls if title provided */}
      {title && (
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>{title}</span>
          </span>
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2 py-0.5 rounded-md font-medium transition ${
                viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dạng Thẻ Học (Cards)
            </button>
            <button
              onClick={() => setViewMode('inline')}
              className={`px-2 py-0.5 rounded-md font-medium transition ${
                viewMode === 'inline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dạng Nối Dòng (Flow)
            </button>
          </div>
        </div>
      )}

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
                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Gemini Prompt Copy Button */}
                    <button
                      onClick={(e) => handleCopyGeminiPrompt(chunk, e)}
                      title="Sao chép Prompt Gemini hỏi tình huống và câu hỏi nên dùng cụm này"
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
                        {copiedPromptId === chunk.id ? 'Đã copy Prompt' : 'Prompt Gemini'}
                      </span>
                    </button>

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
                    <button
                      onClick={(e) => handleCopy(chunk, e)}
                      title="Sao chép cụm và prompt"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
                    >
                      {copiedId === chunk.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                    </button>
                  </div>
                </div>

                {/* Expanded explanation box showing the reason for writing this word into the essay */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/90 -mx-3.5 -mb-3.5 p-3.5 rounded-b-2xl space-y-2 animate-fadeIn">
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
                    {chunk.vietnameseMeaning && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span className="font-semibold text-slate-300">Bản dịch nghĩa:</span>
                        <span className="text-amber-200">{chunk.vietnameseMeaning}</span>
                      </div>
                    )}
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
            <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/50 shadow-xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedChunk.icon}</span>
                  <span className="text-sm font-bold text-white">{selectedChunk.englishText}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCopyGeminiPrompt(selectedChunk, e)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-200 hover:bg-blue-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Copy Prompt Gemini</span>
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
              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ý NGHĨA VIẾT VÀO BÀI (MỤC ĐÍCH HỌC THUẬT):</span>
                </div>
                <p className="leading-relaxed text-slate-200">{selectedChunk.purpose}</p>
                {selectedChunk.vietnameseMeaning && (
                  <div className="pt-1 text-slate-400">
                    Nghĩa dịch: <span className="text-white font-medium">{selectedChunk.vietnameseMeaning}</span>
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
