import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  MessageSquare, 
  Image as ImageIcon, 
  Heart, 
  SlidersHorizontal,
  Flame,
  Laugh,
  Skull,
  Ghost,
  Smile,
  Snowflake,
  Zap
} from 'lucide-react';
import { GenzTone, GenzToneOption, GenzGenerationResult, GenzVisualIdea } from '../../types/genz';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storageService';
import { GenzCard } from './GenzCard';
import { GenzMemeModal } from './GenzMemeModal';
import { PasteGenzJsonModal } from './PasteGenzJsonModal';
import { audioService } from '../../services/audioService';
import { Copy, FileJson } from 'lucide-react';

const TONE_OPTIONS: { id: GenzTone; label: string; icon: string; desc: string }[] = [
  { id: 'cool', label: 'Cool / Tự nhiên', icon: '😎', desc: 'Chill, gần gũi như bạn bè' },
  { id: 'hai', label: 'Hài / Tấu hề', icon: '😂', desc: 'Hài hước, thả miếng chuồng gà' },
  { id: 'cakhia', label: 'Cà khịa', icon: '💀', desc: 'Savage, dí deadline nhẹ nhàng' },
  { id: 'drama', label: 'Drama / Căng cực', icon: '😭', desc: 'Hít hà drama, tới công chuyện' },
  { id: 'deadpan', label: 'Deadpan / Vô cảm', icon: '🗿', desc: 'Bất biến, tối giản, ngắn gọn' },
  { id: 'ngong', label: 'Ngông / Tay to', icon: '🔥', desc: 'Flexing, gánh team, tự tin' },
  { id: 'thathinh', label: 'Thả thính', icon: '❤️', desc: 'Ngọt ngào, đốn tim crush' },
  { id: 'meme', label: 'Meme TikTok', icon: '🤡', desc: '10 điểm không nhưng, cười ẻ' },
  { id: 'lanhlung', label: 'Lạnh lùng', icon: '🧊', desc: 'Kiệm lời, tổng tài seen' },
];

const SAMPLE_CHATS = [
  { label: 'Đi làm muộn / Kẹt xe', text: 'Hôm nay em bị kẹt xe nên xin phép đến muộn 15 phút ạ', tone: 'hai' as GenzTone },
  { label: 'Rủ đi ăn lẩu tối nay', text: 'Tối nay tan làm có ai đi ăn lẩu Haidilao không?', tone: 'cool' as GenzTone },
  { label: 'Bị crush seen tin nhắn', text: 'Nhắn tin hỏi thăm mà người ta xem xong không thèm trả lời', tone: 'drama' as GenzTone },
  { label: 'Giục nộp deadline gấp', text: 'Nhớ nộp báo cáo trước 5 giờ chiều nay giúp mình nha', tone: 'cakhia' as GenzTone },
];

export const GenzWorkspace: React.FC = () => {
  const [inputText, setInputText] = useState('Cay vl');
  const [contextText, setContextText] = useState('');
  const [showContext, setShowContext] = useState(false);
  const [selectedTone, setSelectedTone] = useState<GenzTone>('cakhia');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenzGenerationResult | null>(null);
  const [activeMemeIdea, setActiveMemeIdea] = useState<GenzVisualIdea | null>(null);
  const [isMemeModalOpen, setIsMemeModalOpen] = useState(false);
  const [isPasteJsonModalOpen, setIsPasteJsonModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    try {
      const res = await aiService.generateGenzVersions({
        originalText: inputText,
        tone: selectedTone,
        conversationContext: showContext ? contextText : undefined
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadSampleChat = (sample: { text: string; tone: GenzTone }) => {
    audioService.playBeep('click');
    setInputText(sample.text);
    setSelectedTone(sample.tone);
  };

  const handleOpenMemeModal = (idea: GenzVisualIdea) => {
    setActiveMemeIdea(idea);
    setIsMemeModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Top Header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              GenZify Engine
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono">
                Meme & Slang AI
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Biến đổi câu từ thông thường sang năng lượng Gen Z tự nhiên & gợi ý Meme hài hước
            </p>
          </div>
        </div>

        {/* Right Tools: Copy Prompt & Paste JSON */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPasteJsonModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm"
            title="Mở prompt để tạo JSON cho câu này"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>📋 Copy Prompt AI</span>
          </button>

          <button
            onClick={() => setIsPasteJsonModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500 text-slate-200 text-xs font-bold transition shadow-sm"
            title="Dán kết quả JSON từ AI vào đây"
          >
            <FileJson className="w-3.5 h-3.5 text-pink-400" />
            <span>📥 Dán JSON</span>
          </button>

          <button
            onClick={() => handleLoadSampleChat(SAMPLE_CHATS[0])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/30 border border-pink-500/50 hover:bg-pink-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Mẫu Chat</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form: Input & Tone Selector */}
        <aside className="w-96 border-r border-slate-800/80 bg-slate-900/40 p-5 flex flex-col overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                1. Nhập câu bạn muốn biến tấu:
              </label>
            </div>

            {/* Quick Sample chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {SAMPLE_CHATS.map((sc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadSampleChat(sc)}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 hover:border-pink-500/40 text-[10px] text-slate-400 hover:text-pink-300 transition"
                >
                  {sc.label}
                </button>
              ))}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ví dụ: Bác kia quên chưa thêm bạn này vào..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Context Option */}
          <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Bối cảnh hội thoại (Context):</span>
              <button
                type="button"
                onClick={() => setShowContext(!showContext)}
                className="text-[11px] text-pink-400 font-semibold hover:underline"
              >
                {showContext ? 'Ẩn' : '+ Thêm bối cảnh'}
              </button>
            </div>
            {showContext && (
              <textarea
                value={contextText}
                onChange={(e) => setContextText(e.target.value)}
                placeholder="Ví dụ: Nhóm chat lớp học / Chat với sếp / Nhóm bạn thân..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-pink-500"
              />
            )}
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              2. Chọn Tone giọng ({TONE_OPTIONS.length} phong cách):
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {TONE_OPTIONS.map((tone) => (
                <button
                  type="button"
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    selectedTone === tone.id
                      ? 'bg-pink-950/40 border-pink-500 text-pink-200 shadow-md shadow-pink-950/20'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-base">{tone.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{tone.label}</p>
                    <p className="text-[10px] text-slate-500 truncate">{tone.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-pink-600/30 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang bắt trend Gen Z...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>BIẾN ĐỔI GEN Z & MEME</span>
              </>
            )}
          </button>
        </aside>

        {/* Right Output Area */}
        <section className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          {!result && !isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Sẵn Sàng Biến Hóa Ngôn Từ</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Bấm vào các gợi ý mẫu ở cột bên trái hoặc bấm nút "⚡ Nạp Mẫu Chat" để bắt đầu!
              </p>
            </div>
          ) : isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center animate-bounce">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-pink-300">
                Đang tạo các câu Gen Z cực slay và ý tưởng Meme hài hước...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Original sentence banner */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">Câu gốc ban đầu:</span>
                  <p className="text-slate-200 font-semibold text-sm mt-0.5">"{result.originalText}"</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-mono font-bold text-xs">
                  {result.versions?.length || 0} Phiên bản
                </span>
              </div>

              {/* Variations Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Các Phiên Bản Gen Z Được Sinh Ra ({result.versions?.length || 0}):
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.versions?.map((v) => (
                    <GenzCard
                      key={v.id}
                      originalText={result.originalText}
                      version={v}
                      visualIdea={result.visualIdea}
                      onOpenImageModal={(idea) => handleOpenMemeModal(idea)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {/* Meme Modal */}
      {activeMemeIdea && (
        <GenzMemeModal
          isOpen={isMemeModalOpen}
          onClose={() => setIsMemeModalOpen(false)}
          idea={activeMemeIdea}
        />
      )}

      {/* Paste JSON / AI Prompt Modal */}
      <PasteGenzJsonModal
        isOpen={isPasteJsonModalOpen}
        onClose={() => setIsPasteJsonModalOpen(false)}
        currentInputText={inputText}
        selectedTone={selectedTone}
        onApplyVersions={(newResult) => {
          setResult(newResult);
        }}
      />
    </div>
  );
};
