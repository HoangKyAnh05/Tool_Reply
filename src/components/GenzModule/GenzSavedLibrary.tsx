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
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Eye, 
  X, 
  Smartphone,
  Volume2,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  Tag
} from 'lucide-react';
import { GenzSavedPhrase, GenzTone } from '../../types/genz';
import { storageService } from '../../services/storageService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { MobileProjectSimulatorModal } from '../common/MobileProjectSimulatorModal';
import { audioService } from '../../services/audioService';

interface GenzSavedLibraryProps {
  onOpenImageModal?: (idea: any) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất Cả', icon: '🌟' },
  { id: 'slang_en', label: 'Slang Tiếng Anh (English)', icon: '🔥' },
  { id: 'music_trend', label: 'Nhạc Trend TikTok', icon: '🎵' },
  { id: 'cakhia_office', label: 'Cà Khịa Công Sở', icon: '💀' },
  { id: 'thathinh_dating', label: 'Thả Thính Triệu Tim', icon: '❤️' },
  { id: 'hai_meme', label: 'Meme Viral Tấu Hề', icon: '🤡' },
  { id: 'cool_ngong', label: 'Ngông & Tay To', icon: '⚡' },
  { id: 'deadpan_lanhlung', label: 'Deadpan Lạnh Lùng', icon: '🗿' },
  { id: 'drama_cangcuc', label: 'Drama Căng Cực', icon: '😭' },
];

const TONES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất Cả Tone' },
  { id: 'cakhia', label: 'Cà khịa' },
  { id: 'hai', label: 'Hài hước' },
  { id: 'cool', label: 'Cool ngầu' },
  { id: 'drama', label: 'Drama' },
  { id: 'thathinh', label: 'Thả thính' },
  { id: 'ngong', label: 'Ngông' },
  { id: 'deadpan', label: 'Deadpan' },
  { id: 'meme', label: 'Meme' },
  { id: 'lanhlung', label: 'Lạnh lùng' },
];

export const GenzSavedLibrary: React.FC<GenzSavedLibraryProps> = ({ onOpenImageModal }) => {
  const [phrases, setPhrases] = useState<GenzSavedPhrase[]>(() => storageService.getGenzSaved());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [focusPhrase, setFocusPhrase] = useState<GenzSavedPhrase | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(40);

  // Sync data whenever user switches or focuses
  useEffect(() => {
    setPhrases(storageService.getGenzSaved());
  }, []);

  // Keyboard shortcut listener
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
    if (confirm('Bạn có chắc chắn muốn xóa câu này khỏi thư viện?')) {
      storageService.deleteGenzPhrase(id);
      setPhrases(storageService.getGenzSaved());
      if (focusPhrase && focusPhrase.id === id) {
        setFocusPhrase(null);
      }
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    audioService.playBeep('click');
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    // Detect if predominantly English or Vietnamese
    const isEn = /[a-zA-Z]{4,}/.test(clean) && !/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(clean);
    utterance.lang = isEn ? 'en-US' : 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
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
    downloadAnchor.setAttribute('download', `genz_library_1000_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered dataset
  const filtered = phrases.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchTone = selectedTone === 'all' || item.tone === selectedTone;
    const s = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm ||
      item.generatedText.toLowerCase().includes(s) ||
      item.originalText.toLowerCase().includes(s) ||
      (item.context && item.context.toLowerCase().includes(s)) ||
      (item.usageImpact && item.usageImpact.toLowerCase().includes(s)) ||
      (item.styleTag && item.styleTag.toLowerCase().includes(s));

    return matchCategory && matchTone && matchSearch;
  });

  const displayedPhrases = filtered.slice(0, visibleCount);

  // Focus phrase navigation
  const currentFocusIndex = focusPhrase ? filtered.findIndex((p) => p.id === focusPhrase.id) : -1;

  const handlePrevFocus = () => {
    if (currentFocusIndex > 0) {
      audioService.playBeep('click');
      setFocusPhrase(filtered[currentFocusIndex - 1]);
    }
  };

  const handleNextFocus = () => {
    if (currentFocusIndex >= 0 && currentFocusIndex < filtered.length - 1) {
      audioService.playBeep('click');
      setFocusPhrase(filtered[currentFocusIndex + 1]);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 p-4 sm:p-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Heart className="w-5 h-5 fill-pink-500 text-pink-400" />
            </span>
            <span>Thư Viện Câu Gen Z & Slang Đã Lưu ({phrases.length} Câu)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quản lý kho 1000+ từ vựng, câu nói viral, nhạc hot trend TikTok, slang tiếng Anh theo bối cảnh & tác dụng sử dụng.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Simulator Mode */}
          <button
            onClick={() => {
              audioService.playBeep('click');
              setIsMobileModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/40 hover:bg-pink-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm"
            title="Xem giao diện điện thoại thoại"
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
            <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Xuất JSON</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar (9 Major Themes) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-3 shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              audioService.playBeep('click');
              setSelectedCategory(cat.id);
              setVisibleCount(40);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30 ring-1 ring-white/20'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Tone Filter Bar */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4 shrink-0">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo câu Gen Z, câu gốc, từ vựng slang, bối cảnh hoặc tác dụng..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Tone Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                audioService.playBeep('click');
                setSelectedTone(t.id);
                setVisibleCount(40);
              }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap shrink-0 ${
                selectedTone === t.id
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1 shrink-0">
        <span>Tìm thấy <b>{filtered.length}</b> câu phù hợp</span>
        <span>Hiển thị <b>{Math.min(displayedPhrases.length, filtered.length)}</b> / {filtered.length}</span>
      </div>

      {/* Phrases Grid */}
      <div className={`flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar ${isFullscreen ? 'max-w-6xl mx-auto w-full' : ''}`}>
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60">
            <Heart className="w-10 h-10 text-slate-700 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-400">Chưa tìm thấy câu nào phù hợp với bộ lọc này</p>
            <p className="text-xs text-slate-500 mt-1">
              Thử xóa ô tìm kiếm hoặc chuyển sang danh mục khác để xem nhé!
            </p>
          </div>
        ) : (
          displayedPhrases.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/85 border border-slate-800 hover:border-pink-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition group shadow-lg"
            >
              <div className="space-y-2">
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-pink-500/20 text-pink-300 text-[10px] font-extrabold uppercase border border-pink-500/30">
                      {item.tone}
                    </span>
                    {item.styleTag && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-[10px] font-bold border border-purple-500/20">
                        {item.styleTag}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">
                      #{item.id}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* TTS Audio Speak */}
                    <button
                      onClick={() => handleSpeak(item.id, item.generatedText)}
                      className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                        speakingId === item.id
                          ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                      title="Nghe phát âm audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Focus Single Phrase */}
                    <button
                      onClick={() => setFocusPhrase(item)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-600/20 border border-pink-500/30 hover:bg-pink-600 hover:text-white text-pink-300 text-xs font-semibold transition"
                      title="Phóng to chỉ xem câu này"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Phóng to</span>
                    </button>

                    {item.generatedImageUrl && onOpenImageModal && (
                      <button
                        onClick={() => onOpenImageModal(item.imageIdea)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 text-xs font-semibold transition"
                        title="Xem Meme"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleCopy(item.id, item.generatedText)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
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
                      title="Xóa khỏi thư viện"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bối cảnh sử dụng (Context Badge) */}
                {item.context && (
                  <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-xl">
                    <span className="text-xs">🏷️</span>
                    <span className="font-semibold">Bối cảnh sử dụng: {item.context}</span>
                  </div>
                )}

                {/* Gen Z Punchline Phrase */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 group-hover:border-pink-500/40 transition">
                  <p className="text-base sm:text-lg font-bold text-slate-100 select-text leading-relaxed">
                    {item.generatedText}
                  </p>
                </div>

                {/* Original Meaning */}
                <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
                  <span className="text-slate-500 font-semibold">Ý nghĩa gốc:</span>
                  <span className="italic select-text">"{item.originalText}"</span>
                </div>

                {/* TÁC DỤNG & CÔNG NĂNG SỬ DỤNG (GEN Z IMPACT - Giống IELTS) */}
                {item.usageImpact && (
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-indigo-500/30 space-y-1 mt-1">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tác dụng & Công năng sử dụng (Gen Z Impact):</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal select-text">
                      {item.usageImpact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {/* Load more button if items exceed visibleCount */}
        {displayedPhrases.length < filtered.length && (
          <div className="py-4 text-center">
            <button
              onClick={() => {
                audioService.playBeep('click');
                setVisibleCount((prev) => prev + 40);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 border border-pink-500/40 hover:bg-pink-600 hover:text-white text-pink-300 text-xs font-extrabold transition shadow-lg"
            >
              ⚡ Xem Thêm 40 Câu Nữa (Đã tải {displayedPhrases.length} / {filtered.length} câu)
            </button>
          </div>
        )}
      </div>

      {/* ZEN FOCUS SINGLE PHRASE MODAL */}
      {focusPhrase && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-pink-500/40 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Top Navigation & Close */}
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

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevFocus}
                  disabled={currentFocusIndex <= 0}
                  className="p-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition"
                  title="Câu trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextFocus}
                  disabled={currentFocusIndex >= filtered.length - 1}
                  className="p-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition"
                  title="Câu tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setFocusPhrase(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Context Badge in Focus */}
            {focusPhrase.context && (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
                <span>🏷️</span>
                <span className="font-semibold">Bối cảnh sử dụng: {focusPhrase.context}</span>
              </div>
            )}

            {/* Big Punchline */}
            <div className="space-y-2 p-5 rounded-2xl bg-slate-950 border border-pink-500/30">
              <span className="text-xs font-bold text-pink-400 block uppercase tracking-wider">
                🌟 Câu Nói Gen Z (Phóng To):
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed select-text">
                "{focusPhrase.generatedText}"
              </h1>
            </div>

            {/* Original Text */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                💬 Ý nghĩa gốc ban đầu:
              </span>
              <p className="text-sm text-slate-300 italic select-text">
                "{focusPhrase.originalText}"
              </p>
            </div>

            {/* Tác dụng & Hiệu quả sử dụng (Gen Z Impact) */}
            {focusPhrase.usageImpact && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>TÁC DỤNG & HIỆU QUẢ SỬ DỤNG (GEN Z IMPACT):</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed select-text">
                  {focusPhrase.usageImpact}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => handleSpeak(focusPhrase.id, focusPhrase.generatedText)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                  speakingId === focusPhrase.id
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{speakingId === focusPhrase.id ? 'Dừng đọc' : 'Nghe Phát Âm'}</span>
              </button>

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
                    <span>Xem Meme</span>
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
