import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { GenzSavedPhrase, GenzTone } from '../../types/genz';
import { storageService } from '../../services/storageService';

interface GenzSavedLibraryProps {
  onOpenImageModal?: (idea: any) => void;
}

export const GenzSavedLibrary: React.FC<GenzSavedLibraryProps> = ({ onOpenImageModal }) => {
  const [phrases, setPhrases] = useState<GenzSavedPhrase[]>(() => storageService.getGenzSaved());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    storageService.deleteGenzPhrase(id);
    setPhrases(storageService.getGenzSaved());
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Thư Viện Câu Gen Z Đã Lưu</h2>
            <p className="text-xs text-slate-400">
              Quản lý, tìm kiếm và xuất khẩu danh sách các câu nói yêu thích
            </p>
          </div>
        </div>

        <button
          onClick={handleExportJson}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
        >
          <Download className="w-4 h-4" />
          <span>Xuất JSON</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
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
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
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
              className="bg-slate-900/80 border border-slate-800 hover:border-pink-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
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
    </div>
  );
};
