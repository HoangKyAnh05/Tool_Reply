import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { AnnotatedPhraseChunk } from '../../utils/ieltsTextAnnotator';
import { audioService } from '../../services/audioService';

interface IeltsAnnotatedPhraseViewerProps {
  chunks: AnnotatedPhraseChunk[];
  title?: string;
  defaultExpandFirst?: boolean;
  className?: string;
}

export const IeltsAnnotatedPhraseViewer: React.FC<IeltsAnnotatedPhraseViewerProps> = ({
  chunks,
  title,
  defaultExpandFirst = false,
  className = ''
}) => {
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(
    defaultExpandFirst && chunks.length > 0 ? chunks[0].id : null
  );
  const [speakingChunkId, setSpeakingChunkId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'inline'>('cards');

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
    const content = `[${chunk.icon}] ${chunk.englishText}\n• Nghĩa: ${chunk.vietnameseMeaning || 'N/A'}\n• Tác dụng: ${chunk.purpose}`;
    navigator.clipboard.writeText(content);
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

            return (
              <div
                key={chunk.id}
                onClick={() => {
                  audioService.playBeep('click');
                  setSelectedChunkId(isSelected ? null : chunk.id);
                }}
                className={`p-3 sm:p-3.5 rounded-2xl border transition cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/95 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <span className="text-xl p-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 shrink-0 select-none shadow-sm">
                      {chunk.icon}
                    </span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${getTagColor(chunk.categoryTag)}`}>
                          {chunk.categoryTag}
                        </span>
                        {chunk.vietnameseMeaning && (
                          <span className="text-xs text-amber-300/90 font-medium">
                            ({chunk.vietnameseMeaning})
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white leading-relaxed select-text">
                        {chunk.englishText}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
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
                      title="Sao chép cụm và ý nghĩa"
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
                    >
                      {copiedId === chunk.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded explanation box showing the reason for writing this word into the essay */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/90 -mx-3.5 -mb-3.5 p-3.5 rounded-b-2xl space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ý NGHĨA VIẾT / NÓI TỪ NÀY VÀO BÀI (BAND 8.0+ IMPACT):</span>
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
              return (
                <button
                  key={chunk.id}
                  onClick={() => {
                    audioService.playBeep('click');
                    setSelectedChunkId(isSelected ? null : chunk.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-105'
                      : 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:border-slate-500 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-sm">{chunk.icon}</span>
                  <span>{chunk.englishText}</span>
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
                <button
                  onClick={(e) => handleSpeak(selectedChunk, e)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
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
