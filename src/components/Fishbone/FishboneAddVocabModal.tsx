import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Check, 
  Smile, 
  BookOpen, 
  Bookmark, 
  Volume2,
  Tag,
  Hash
} from 'lucide-react';
import { FishboneVocabItem, FishboneBoneTheme, VocabPartOfSpeech } from '../../types/fishboneVocab';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface FishboneAddVocabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (newItem: FishboneVocabItem) => void;
  themes: FishboneBoneTheme[];
  defaultBoneId?: string;
}

const PRESET_ICONS = [
  '⚡', '💎', '🔑', '🎯', '🔥', '🌟', '🧠', '💡', '📈', '🚀', 
  '🛡️', '⚖️', '🌱', '💻', '🎓', '🏥', '🏛️', '🎨', '🌐', '✍️',
  '☕', '📚', '💬', '🎬', '🏆', '🌿', '🌊', '🔗', '⏳', '✂️'
];

export const FishboneAddVocabModal: React.FC<FishboneAddVocabModalProps> = ({
  isOpen,
  onClose,
  onAdded,
  themes,
  defaultBoneId
}) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [pos, setPos] = useState<VocabPartOfSpeech>('phrase');
  const [selectedBoneId, setSelectedBoneId] = useState<string>(defaultBoneId || themes[0]?.id || 'bone_grammar_advanced');
  const [selectedIcon, setSelectedIcon] = useState<string>('⚡');
  const [phonetic, setPhonetic] = useState('');
  const [formula, setFormula] = useState('');
  const [collocation, setCollocation] = useState('');
  const [example, setExample] = useState('');
  const [band, setBand] = useState<'7.5' | '8.0' | '8.5' | '9.0'>('8.5');
  const [levelNumber, setLevelNumber] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) {
      setError('Vui lòng nhập Từ/Cấu trúc và Nghĩa tiếng Việt.');
      return;
    }

    const matchedTheme = themes.find((t) => t.id === selectedBoneId);

    const newItem: FishboneVocabItem = {
      id: `custom_${Date.now()}`,
      word: word.trim(),
      meaning: meaning.trim(),
      pos,
      icon: selectedIcon,
      boneId: selectedBoneId,
      boneName: matchedTheme ? matchedTheme.vietnameseName : 'Tự Định Nghĩa',
      phonetic: phonetic.trim() || undefined,
      formula: formula.trim() || undefined,
      collocation: collocation.trim() || word.trim(),
      example: example.trim() || `Example sentence for "${word.trim()}".`,
      band,
      levelNumber,
      isCustom: true
    };

    storageService.saveCustomFishboneItem(newItem);
    audioService.playBeep('success');
    onAdded(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl shadow-md shadow-cyan-500/20">
              {selectedIcon}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                Thêm Từ Vựng / Cấu Trúc Vào Xương Cá
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LƯU BỀN VỮNG
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Lưu trữ từ vựng, collocation, ngữ pháp kèm icon trực quan theo chủ đề xương cá
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* 1. Chọn Xương Cá & Cấp độ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chủ Đề Xương Cá</span>
              </label>
              <select
                value={selectedBoneId}
                onChange={(e) => setSelectedBoneId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.vietnameseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Loại Từ / Cấu Trúc</span>
              </label>
              <select
                value={pos}
                onChange={(e) => setPos(e.target.value as VocabPartOfSpeech)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="phrase">Cụm từ (Collocation / Phrase)</option>
                <option value="structure">Cấu trúc IELTS (Structure)</option>
                <option value="grammar">Ngữ pháp cao cấp (Grammar)</option>
                <option value="verb">Động từ (Verb)</option>
                <option value="noun">Danh từ (Noun)</option>
                <option value="adj">Tính từ (Adjective)</option>
                <option value="adv">Trạng từ (Adverb)</option>
              </select>
            </div>
          </div>

          {/* 2. Chọn Icon Sinh Động */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              <span>Chọn Icon Đại Diện (Icon Kèm Từ)</span>
            </label>
            <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-950 rounded-2xl border border-slate-800 max-h-24 overflow-y-auto">
              {PRESET_ICONS.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setSelectedIcon(ic)}
                  className={`w-8 h-8 rounded-xl text-base flex items-center justify-center transition ${
                    selectedIcon === ic
                      ? 'bg-cyan-500 text-white ring-2 ring-cyan-400 scale-110'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Từ / Cấu trúc & Nghĩa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Từ Vựng / Tên Cấu Trúc <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: Negative Inversion / Precipitous drop..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Giải Nghĩa Tiếng Việt <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: Đảo ngữ phủ định / Sụt giảm dốc đứng..."
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* 4. Công thức (Formula) & Collocation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Công Thức Áp Dụng (Formula - Tùy Chọn)
              </label>
              <input
                type="text"
                placeholder="VD: Seldom + Aux + S + V..."
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Cụm Từ Đi Kèm (Collocation)
              </label>
              <input
                type="text"
                placeholder="VD: Seldom does society witness..."
                value={collocation}
                onChange={(e) => setCollocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* 5. Câu ví dụ mẫu (Example) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Câu Ví Dụ Chuẩn Band 8.0+
            </label>
            <textarea
              rows={2}
              placeholder="VD: Seldom does a single technological breakthrough reshape global labor markets so profoundly."
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* 6. Band Score & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Mục Tiêu Band Score
              </label>
              <div className="flex gap-2">
                {(['7.5', '8.0', '8.5', '9.0'] as const).map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBand(b)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      band === b
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Band {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Vị Trí Đốt Xương (Level)
              </label>
              <div className="flex gap-1.5">
                {([1, 2, 3, 4, 5] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setLevelNumber(lvl)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      levelNumber === lvl
                        ? 'bg-cyan-500 text-white font-black shadow'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Hủy Bỏ
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Lưu Vào Xương Cá</span>
          </button>
        </div>
      </div>
    </div>
  );
};
