import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Volume2,
  Copy,
  Check,
  Search,
  Filter,
  Plus,
  Compass,
  TrainTrack,
  RotateCcw
} from 'lucide-react';
import { FishboneVocabItem, FishboneBoneTheme } from '../../types/fishboneVocab';
import { audioService } from '../../services/audioService';

interface FishboneCanvasProps {
  items: FishboneVocabItem[];
  theme?: FishboneBoneTheme;
  onOpenAddModal?: () => void;
}

export const FishboneCanvas: React.FC<FishboneCanvasProps> = ({
  items,
  theme,
  onOpenAddModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  const [activeSpeechId, setActiveSpeechId] = useState<number | string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchLevel = selectedLevel === 'all' || item.levelNumber === selectedLevel;
      const s = searchTerm.toLowerCase().trim();
      const matchSearch = 
        !s || 
        item.word.toLowerCase().includes(s) || 
        item.meaning.toLowerCase().includes(s) || 
        (item.collocation && item.collocation.toLowerCase().includes(s)) ||
        (item.formula && item.formula.toLowerCase().includes(s));
      return matchLevel && matchSearch;
    });
  }, [items, selectedLevel, searchTerm]);

  // Group items into Serpentine Rows (3 items per row for optimal readability & spacing)
  const ITEMS_PER_ROW = 3;
  const rows = useMemo(() => {
    const r: FishboneVocabItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += ITEMS_PER_ROW) {
      r.push(filteredItems.slice(i, i + ITEMS_PER_ROW));
    }
    return r;
  }, [filteredItems]);

  const handleCopy = (item: FishboneVocabItem) => {
    const text = `${item.icon} ${item.word}\nNghĩa: ${item.meaning}\n${item.formula ? `Công thức: ${item.formula}\n` : ''}${item.collocation ? `Collocation: ${item.collocation}\n` : ''}Ví dụ: ${item.example}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    audioService.playBeep('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: number | string) => {
    if (!('speechSynthesis' in window)) return;
    if (activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }
    const clean = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);
    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  const themeColor = theme?.color || '#06b6d4';

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none flex flex-col">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-96 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ backgroundColor: themeColor }}
      />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
            style={{ 
              backgroundColor: `${themeColor}20`, 
              borderColor: `${themeColor}40`,
              boxShadow: `0 0 20px ${themeColor}30` 
            }}
          >
            {theme?.icon || '🐟'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>{theme?.vietnameseName || 'Đường Ray Xương Cá Tiến Hóa'}</span>
                <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {filteredItems.length} MỤC ({rows.length} TẦNG RAY)
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {theme?.description || 'Đường tàu xương cá uốn lượn zíc zắc từ trên xuống dưới • Vuốt vô tận để học toàn diện'}
            </p>
          </div>
        </div>

        {/* Action buttons & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[180px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng, cấu trúc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Level Filter Chips */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                selectedLevel === 'all'
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  selectedLevel === lvl
                    ? 'bg-cyan-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                L{lvl}
              </button>
            ))}
          </div>

          {/* Add Word Button */}
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition active:scale-95 shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Từ/Cấu Trúc</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SERPENTINE ENDLESS TRAIN TRACK FISHBONE (ĐƯỜNG TÀU XƯƠNG CÁ UỐN LƯỢN VÔ TẬN) */}
      {/* ========================================================================= */}
      <div className="flex-1 overflow-y-auto pr-1 pt-6 pb-12 space-y-12 max-h-[75vh] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
        
        {/* START OF TRAIN TRACK: FISH HEAD STATION (ĐẦU CÁ) */}
        <div className="flex items-center justify-center relative">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-cyan-500/20 border-2 border-cyan-300">
            <span className="text-2xl animate-bounce">🐟</span>
            <div>
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200">
                ★ KHỞI ĐẦU HÀNH TRÌNH TIẾN HÓA ★
              </div>
              <div className="text-xs font-extrabold">
                GA ĐẦU CÁ (FISH HEAD STATION) • {theme?.name || 'Academic Mastery'}
              </div>
            </div>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-md font-mono font-bold">
              Level 1 Baseline
            </span>
          </div>
        </div>

        {/* Winding Rows */}
        {rows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0; // Even rows: Left -> Right, Odd rows: Right -> Left
          const isLastRow = rowIndex === rows.length - 1;
          const displayItems = isEven ? rowItems : [...rowItems].reverse();

          return (
            <div key={rowIndex} className="relative py-4">
              {/* Central Glowing Track Spine Beam */}
              <div 
                className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3.5 rounded-full z-0 shadow-lg"
                style={{
                  background: isEven 
                    ? `linear-gradient(90deg, #06b6d4, #6366f1, #a855f7)`
                    : `linear-gradient(270deg, #06b6d4, #6366f1, #a855f7)`,
                  boxShadow: `0 0 20px ${themeColor}40`
                }}
              >
                {/* Railway Sleepers / Ties Texture (Thanh Tà Vẹt Đường Ray) */}
                <div className="w-full h-full opacity-40 flex items-center justify-around px-4">
                  {Array.from({ length: 24 }).map((_, tieIdx) => (
                    <div key={tieIdx} className="w-1 h-full bg-slate-950 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Connecting Half-Circle Track Curve (Uốn lượn nối sang tầng tiếp theo) */}
              {!isLastRow && (
                isEven ? (
                  /* Right Side Half-Circle Turn Curve */
                  <div className="absolute -right-2 top-1/2 w-14 h-28 border-r-4 border-t-4 border-b-4 border-indigo-500/80 rounded-r-full pointer-events-none z-0 shadow-lg shadow-indigo-500/30">
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono font-extrabold text-cyan-300 bg-slate-950 px-1 rounded border border-cyan-500/30">
                      ↷
                    </div>
                  </div>
                ) : (
                  /* Left Side Half-Circle Turn Curve */
                  <div className="absolute -left-2 top-1/2 w-14 h-28 border-l-4 border-t-4 border-b-4 border-indigo-500/80 rounded-l-full pointer-events-none z-0 shadow-lg shadow-indigo-500/30">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-mono font-extrabold text-cyan-300 bg-slate-950 px-1 rounded border border-cyan-500/30">
                      ↶
                    </div>
                  </div>
                )
              )}

              {/* Items in this row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 px-4">
                {displayItems.map((item, itemIdx) => {
                  const isTopRib = itemIdx % 2 === 0;

                  return (
                    <div 
                      key={item.id} 
                      className="flex flex-col items-center group relative transition-transform duration-200 hover:scale-[1.02]"
                    >
                      {/* ========================================================= */}
                      {/* TOP RIB (Xương Nhánh Trên: Collocation / Formula / Meaning) */}
                      {/* ========================================================= */}
                      <div className="w-full mb-3 flex flex-col items-center">
                        <div className="w-full bg-slate-950/90 border border-slate-800 group-hover:border-cyan-500/60 rounded-2xl p-3 shadow-xl backdrop-blur-md transition">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                              <span>L{item.levelNumber}</span>
                              <span>•</span>
                              <span>Band {item.band}</span>
                            </span>

                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              {item.pos}
                            </span>
                          </div>

                          {/* Vietnamese Meaning */}
                          <div className="text-xs font-bold text-amber-300 mb-1 leading-snug">
                            {item.meaning}
                          </div>

                          {/* Formula or Collocation */}
                          {item.formula ? (
                            <div className="text-[11px] font-mono text-cyan-200 bg-cyan-950/40 p-1.5 rounded-lg border border-cyan-800/40 leading-tight">
                              📐 <span className="font-bold">{item.formula}</span>
                            </div>
                          ) : (
                            <div className="text-[11px] font-semibold text-slate-300 truncate">
                              🔑 {item.collocation}
                            </div>
                          )}
                        </div>

                        {/* Top Rib Bone Link (Thanh Xương Nhánh Vươn Xuống Trục Chính) */}
                        <div className="w-0.5 h-4 bg-cyan-500/60 shadow-sm" />
                      </div>

                      {/* ========================================================= */}
                      {/* CENTRAL NODE ON SPINE (Đốt Xương / Ga Tàu Chính) */}
                      {/* ========================================================= */}
                      <div className="relative">
                        <div 
                          className="w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center shadow-2xl relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            backgroundColor: '#0f172a',
                            borderColor: themeColor,
                            boxShadow: `0 0 20px ${themeColor}50`
                          }}
                        >
                          <span className="text-2xl">{item.icon}</span>
                        </div>

                        {/* Station Tag below node */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[9px] font-mono font-bold text-slate-300 whitespace-nowrap shadow">
                          #{item.id}
                        </div>
                      </div>

                      {/* ========================================================= */}
                      {/* BOTTOM RIB (Xương Nhánh Dưới: Word Title, Example, Audio & Copy) */}
                      {/* ========================================================= */}
                      <div className="w-full mt-3 flex flex-col items-center">
                        {/* Bottom Rib Bone Link */}
                        <div className="w-0.5 h-4 bg-indigo-500/60 shadow-sm" />

                        <div className="w-full bg-slate-950/90 border border-slate-800 group-hover:border-indigo-500/60 rounded-2xl p-3 shadow-xl backdrop-blur-md transition">
                          {/* English Word / Structure Name */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <h4 className="text-xs sm:text-sm font-extrabold text-white truncate">
                              {item.word}
                            </h4>

                            <div className="flex items-center gap-1 shrink-0">
                              {/* Speak TTS */}
                              <button
                                onClick={() => handleSpeak(item.word, item.id)}
                                className={`p-1 rounded-lg transition ${
                                  activeSpeechId === item.id 
                                    ? 'bg-cyan-500 text-white animate-pulse' 
                                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
                                }`}
                                title="Nghe phát âm chuẩn"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Copy */}
                              <button
                                onClick={() => handleCopy(item)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
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

                          {/* Example Sentence */}
                          <p className="text-[11px] text-slate-400 line-clamp-2 italic border-l-2 border-slate-700 pl-2">
                            "{item.example}"
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* END OF TRAIN TRACK: TARGET STATE / TAIL FIN (ĐUÔI CÁ) */}
        <div className="flex items-center justify-center pt-8">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white shadow-2xl shadow-pink-500/20 border-2 border-pink-300">
            <span className="text-2xl animate-pulse">🎯</span>
            <div>
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-200">
                ★ HOÀN THIỆN XƯƠNG CÁ ★
              </div>
              <div className="text-xs font-extrabold">
                GA ĐUÔI CÁ (TARGET FIN STATION) • BAND 8.5 – 9.0 MASTER
              </div>
            </div>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-md font-mono font-bold">
              ✓ 100% Hoàn Thành
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
