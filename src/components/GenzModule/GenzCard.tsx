import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Heart, 
  RefreshCw, 
  Sparkles, 
  Image as ImageIcon,
  MessageSquareQuote,
  Share2
} from 'lucide-react';
import { GenzResultVersion, GenzVisualIdea, GenzTone } from '../../types/genz';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface GenzCardProps {
  originalText: string;
  version: GenzResultVersion;
  visualIdea: GenzVisualIdea;
  context?: string;
  onOpenImageModal: (idea: GenzVisualIdea) => void;
}

export const GenzCard: React.FC<GenzCardProps> = ({
  originalText,
  version,
  visualIdea,
  context,
  onOpenImageModal
}) => {
  const [copied, setCopied] = useState(false);
  const activeContext = version.context || context;
  const activeImpact = version.usageImpact || `Tạo ấn tượng ${version.styleTag} độc đáo, bắt trúng tâm lý người nghe và nâng cao năng lượng cuộc trò chuyện.`;

  const [isSaved, setIsSaved] = useState(() => {
    return storageService.getGenzSaved().some((p) => p.generatedText === version.text);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(version.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    audioService.playBeep('click');
  };

  const handleSave = () => {
    storageService.saveGenzPhrase({
      id: `saved_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      originalText,
      generatedText: version.text,
      tone: version.tone,
      styleTag: version.styleTag,
      context: activeContext,
      usageImpact: activeImpact,
      imageIdea: visualIdea,
      imagePrompt: visualIdea.imagePrompt,
      generatedImageUrl: visualIdea.generatedImageUrl,
      createdAt: Date.now()
    });
    setIsSaved(true);
    audioService.playBeep('success');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 group relative flex flex-col justify-between space-y-3">
      <div>
        {/* Top Tag & Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {version.styleTag}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Tone: {version.tone}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã copy' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                isSaved 
                  ? 'bg-rose-600/30 border border-rose-500 text-rose-300' 
                  : 'bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 text-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
            </button>
          </div>
        </div>

        {/* Context badge if provided */}
        {activeContext && (
          <div className="mb-2 px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200 flex items-center gap-1.5">
            <span>🏷️</span>
            <span className="font-semibold truncate">Bối cảnh: {activeContext}</span>
          </div>
        )}

        {/* Generated text */}
        <div className="p-3.5 bg-slate-950/90 rounded-xl border border-slate-800/80 mb-3 group-hover:border-pink-500/30 transition">
          <p className="text-base font-bold text-slate-100 select-text leading-relaxed">
            {version.text}
          </p>
        </div>

        {/* Usage Impact box (Giống IELTS Band 8+ Impact) */}
        {activeImpact && (
          <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tác dụng & Công năng sử dụng (Gen Z Impact):</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              {activeImpact}
            </p>
          </div>
        )}
      </div>

      {/* Original reference snippet */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
        <span className="text-slate-500 font-medium">Gốc:</span>
        <span className="truncate italic">"{originalText}"</span>
      </div>
    </div>
  );
};
