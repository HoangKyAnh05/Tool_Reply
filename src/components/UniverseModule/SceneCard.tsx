import React, { useState } from 'react';
import { 
  Eye, 
  MapPin, 
  Users, 
  Heart, 
  RefreshCw, 
  Maximize2, 
  Copy, 
  Check, 
  Volume2, 
  SlidersHorizontal,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { TimelineScene, SceneImage } from '../../types/universe';
import { imageService } from '../../services/imageService';
import { audioService } from '../../services/audioService';

interface SceneCardProps {
  scene: TimelineScene;
  universeName: string;
  onOpenDecision: () => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  universeName,
  onOpenDecision
}) => {
  const [selectedImage, setSelectedImage] = useState<SceneImage>(scene.images[0] || null);
  const [activeTab, setActiveTab] = useState<'visuals' | 'causal' | 'states'>('visuals');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 bg-slate-950">
      {/* Scene Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SCENE {String(scene.sceneNumber).padStart(2, '0')} • {scene.dayOrTime}
            </span>
            <span className="text-xs font-semibold text-slate-400 font-mono">
              {universeName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const narration = `${scene.title}. ${scene.whatHappened}. ${scene.consequence}`;
                audioService.speakText(narration, 'vi');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nghe Diễn Biến</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white">{scene.title}</h2>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Địa điểm: <strong className="text-slate-200">{scene.location}</strong></span>
          </span>
          {scene.characters.length > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Nhân vật: <strong className="text-slate-200">{scene.characters.join(', ')}</strong></span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Cảm xúc: <strong className="text-slate-200">{scene.emotionalState}</strong></span>
          </span>
        </div>
      </div>

      {/* Primary Visual Showcase (Context-Aware 1-2 Images) */}
      <div className="space-y-4">
        {/* Main Stage Image */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video flex items-center justify-center group shadow-2xl">
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = imageService.getSvgPlaceholder(scene.title, selectedImage.caption);
              }}
            />
          )}

          {/* Fullscreen Trigger */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition shadow-lg opacity-0 group-hover:opacity-100"
            title="Xem toàn màn hình"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Caption & Label Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 uppercase tracking-wider">
                {selectedImage?.label || 'Ảnh Ngữ Cảnh'}
              </span>
              <button
                onClick={() => selectedImage && handleCopyPrompt(selectedImage.prompt)}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Đã copy prompt' : 'Copy Prompt AI'}</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {selectedImage?.caption}
            </p>
          </div>
        </div>

        {/* 1 or 2 Image Selector Thumbnails */}
        {scene.images.length > 1 && (
          <div className="flex items-center gap-3">
            {scene.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className={`flex-1 p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                  selectedImage?.id === img.id
                    ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{img.label}</p>
                  <p className="text-[11px] text-slate-500 truncate">{img.caption}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Causal Chain & Narration Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <span className="font-bold text-cyan-400 uppercase tracking-wider block">
            1. Chuyện Gì Đã Xảy Ra? (Event)
          </span>
          <p className="text-slate-200 leading-relaxed">{scene.whatHappened}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <span className="font-bold text-amber-400 uppercase tracking-wider block">
            2. Tại Sao Nó Xảy Ra? (Causal Reason)
          </span>
          <p className="text-slate-200 leading-relaxed">{scene.whyItHappened}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <span className="font-bold text-emerald-400 uppercase tracking-wider block">
            3. Hệ Quả & Trạng Thái Mới (Consequence)
          </span>
          <p className="text-slate-200 leading-relaxed">{scene.consequence}</p>
        </div>
      </div>

      {/* State Transitions Tracker */}
      {scene.stateChanges.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Biến Đổi Trạng Thái Thực Thể (State Changes):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {scene.stateChanges.map((st, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-slate-300">{st.entity}:</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-slate-500 line-through">{st.from}</span>
                  <span className="text-cyan-400">→</span>
                  <span className="text-emerald-400 font-bold">{st.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Decision Point Banner if present */}
      {scene.decisionPoint && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 shadow-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 animate-pulse" />
              <h4 className="font-extrabold text-white text-base">
                ĐIỂM RẼ NHÁNH: {scene.decisionPoint.title}
              </h4>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              {scene.decisionPoint.situation}
            </p>
          </div>

          <button
            onClick={onOpenDecision}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/30 whitespace-nowrap hover:scale-105 active:scale-95 transition"
          >
            ĐƯA RA QUYẾT ĐỊNH →
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.caption}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
          <p className="text-white text-sm mt-4 font-semibold text-center max-w-2xl">
            {selectedImage.caption}
          </p>
          <p className="text-slate-500 text-xs mt-1">Click bất kỳ đâu để đóng</p>
        </div>
      )}
    </div>
  );
};
