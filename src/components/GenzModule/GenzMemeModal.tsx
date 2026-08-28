import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Image as ImageIcon,
  Palette
} from 'lucide-react';
import { GenzVisualIdea } from '../../types/genz';
import { imageService } from '../../services/imageService';

interface GenzMemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: GenzVisualIdea | null;
}

export const GenzMemeModal: React.FC<GenzMemeModalProps> = ({
  isOpen,
  onClose,
  idea
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(idea?.generatedImageUrl || '');
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!isOpen || !idea) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(idea.imagePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleRegenerateImage = () => {
    setIsRegenerating(true);
    const newSeed = Math.floor(Math.random() * 999999);
    const newUrl = imageService.getPollinationsUrl(idea.imagePrompt, 1024, 768, newSeed);
    setTimeout(() => {
      setImageUrl(newUrl);
      setIsRegenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <h3 className="font-bold text-base text-white">{idea.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto space-y-4 pr-1">
          {/* Image Preview Canvas / Image */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center group shadow-inner">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={idea.title}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback
                  (e.target as HTMLImageElement).src = imageService.getSvgPlaceholder(idea.title, idea.suggestedCaption);
                }}
              />
            ) : (
              <div className="text-center p-6">
                <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Chưa có ảnh</p>
              </div>
            )}

            {/* Quick action overlay on image */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={handleRegenerateImage}
                disabled={isRegenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition shadow-lg"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Đang tạo...' : 'Tạo Lại Ảnh'}</span>
              </button>

              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="genz_meme.jpg"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-semibold hover:bg-pink-500 transition shadow-lg shadow-pink-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Về</span>
                </a>
              )}
            </div>

            {/* Caption bar bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
              <p className="text-xs text-pink-300 font-bold uppercase tracking-wider mb-0.5">
                Caption Đề Xuất:
              </p>
              <p className="text-sm font-semibold text-white">
                "{idea.suggestedCaption}"
              </p>
            </div>
          </div>

          {/* Details & Prompt */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-slate-400 mb-1">
                <strong className="text-slate-300">Mô tả bối cảnh & Phân tích Subtext:</strong>
              </p>
              <p className="text-slate-200 leading-relaxed">{idea.explanation}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  Style: {idea.visualStyle}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-300">
                <span>AI Generation Prompt (Dùng cho Midjourney, DALL-E, Flux):</span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Đã copy Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={idea.imagePrompt}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 resize-none select-all"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
