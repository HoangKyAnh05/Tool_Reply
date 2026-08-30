import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  Filter, 
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Maximize2,
  Minimize2,
  Eye,
  X,
  Smartphone
} from 'lucide-react';
import { GenzSavedPhrase, GenzTone } from '../../types/genz';
import { storageService } from '../../services/storageService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { MobileProjectSimulatorModal } from '../common/MobileProjectSimulatorModal';
import { audioService } from '../../services/audioService';

interface GenzSavedLibraryProps {
  onOpenImageModal?: (idea: any) => void;
}

export const GenzSavedLibrary: React.FC<GenzSavedLibraryProps> = ({ onOpenImageModal }) => {
  const [phrases, setPhrases] = useState<GenzSavedPhrase[]>(() => storageService.getGenzSaved());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [focusPhrase, setFocusPhrase] = useState<GenzSavedPhrase | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (focusPhrase) {
          setFocusPhrase(null);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusPhrase, isFullscreen]);

  const handleDelete = (id: string) => {
    storageService.deleteGenzPhrase(id);
    setPhrases(storageService.getGenzSaved());
    if (focusPhrase && focusPhrase.id === id) {
      setFocusPhrase(null);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    await toggleNativeFullscreen();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(phrases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `genz_phrases_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filtered = phrases.filter((p) => {
    const matchSearch =
      p.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.generatedText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTone = selectedTone === 'all' || p.tone === selectedTone;
    return matchSearch && matchTone;
  });

  return (
    <div
      className={`flex flex-col bg-slate-950 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen p-6 overflow-hidden animate-fadeIn'
          : 'flex-1 p-6 overflow-hidden'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">Thư Viện Câu Gen Z Đã Lưu</h2>
              {isFullscreen && (
                <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-[10px] font-bold border border-pink-500/30">
                  TOÀN MÀN HÌNH
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Quản lý, tìm kiếm và phóng to xem các câu nói yêu thích đã lưu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Phone Mode Button */}
          <button
            onClick={() => {
              audioService.playBeep('click');
              setIsMobileModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/50 hover:bg-pink-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm"
            title="Xem thư viện Gen Z trên giao diện điện thoại (Mobile Phone View)"
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
                ? 'bg-pink-600 border-pink-400 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isFullscreen ? 'Thu nhỏ giao diện (Esc)' : 'Mở to toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-pink-400" />}
            <span>{isFullscreen ? 'Thu nhỏ (Esc)' : 'Toàn màn hình'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
          >
            <Download className="w-4 h-4" />
            <span>Xuất JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 shrink-0">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm câu gốc hoặc câu Gen Z..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTone('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedTone === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả ({phrases.length})
          </button>
          {['cakhia', 'hai', 'cool', 'drama', 'thathinh', 'ngong', 'deadpan', 'meme'].map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition ${
                selectedTone === tone
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className={`flex-1 overflow-y-auto space-y-3 pr-1 ${isFullscreen ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60">
            <Heart className="w-10 h-10 text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-400">Chưa có câu nào được lưu trong bộ lọc này</p>
            <p className="text-xs text-slate-500 mt-1">
              Hãy sang tab "GenZify Meme" và nhấn Lưu vào câu bạn thích nhé!
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-pink-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition group"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold uppercase">
                    {item.tone}
                  </span>
                  {item.styleTag && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      • {item.styleTag}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-100 select-text leading-snug">
                  {item.generatedText}
                </p>

                <p className="text-xs text-slate-400 italic truncate">
                  Gốc: "{item.originalText}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Focus / Enlarge button for single phrase */}
                <button
                  onClick={() => setFocusPhrase(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-600/20 border border-pink-500/30 hover:bg-pink-600 hover:text-white text-pink-300 text-xs font-semibold transition"
                  title="Phóng to chỉ xem câu này"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Phóng to</span>
                </button>

                {item.generatedImageUrl && onOpenImageModal && (
                  <button
                    onClick={() => onOpenImageModal(item.imageIdea)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 text-xs font-semibold transition"
                    title="Xem Meme"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleCopy(item.id, item.generatedText)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === item.id ? 'Đã chép' : 'Chép'}</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ZEN FOCUS SINGLE PHRASE MODAL */}
      {focusPhrase && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-pink-500/30 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase border border-pink-500/40">
                  {focusPhrase.tone}
                </span>
                {focusPhrase.styleTag && (
                  <span className="text-xs text-slate-400 font-medium">
                    {focusPhrase.styleTag}
                  </span>
                )}
              </div>
              <button
                onClick={() => setFocusPhrase(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big Punchline */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-pink-400 block uppercase tracking-wider">
                🌟 Câu Nói Gen Z (Phóng To):
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-relaxed select-text">
                "{focusPhrase.generatedText}"
              </h1>
            </div>

            {/* Original Text */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                💬 Câu gốc ban đầu:
              </span>
              <p className="text-sm text-slate-300 italic select-text">
                "{focusPhrase.originalText}"
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-500">
                Lưu ngày: {new Date(focusPhrase.createdAt).toLocaleString('vi-VN')}
              </span>
              <div className="flex items-center gap-2">
                {focusPhrase.generatedImageUrl && onOpenImageModal && (
                  <button
                    onClick={() => {
                      onOpenImageModal(focusPhrase.imageIdea);
                      setFocusPhrase(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold shadow-md transition"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Xem Meme Visual</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopy(focusPhrase.id, focusPhrase.generatedText)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedId === focusPhrase.id ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        initialTab="genz"
      />
    </div>
  );
};
