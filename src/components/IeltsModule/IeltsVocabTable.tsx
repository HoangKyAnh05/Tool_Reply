import React, { useState } from 'react';
import { BookMarked, Volume2, Copy, Check, Bot, MessageSquare } from 'lucide-react';
import { IeltsVocabItem } from '../../types/ielts';
import { audioService } from '../../services/audioService';
import {
  buildExplanationPromptForVocabItem,
  buildAllExplanationPromptForVocabList,
  buildDialoguePromptForVocabItem,
  buildDialoguePromptForVocabList
} from '../../utils/ieltsConversationPrompts';

interface IeltsVocabTableProps {
  vocabList: IeltsVocabItem[];
  topicOrQuestion?: string;
  onSendToGemini?: (prompt: string) => void;
}

// Re-export for backwards compatibility
export const buildAllVocabListPrompt = buildAllExplanationPromptForVocabList;
export const buildVocabRowPrompt = buildExplanationPromptForVocabItem;

export const IeltsVocabTable: React.FC<IeltsVocabTableProps> = ({ vocabList, topicOrQuestion, onSendToGemini }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedAllPrompt, setCopiedAllPrompt] = useState(false);
  const [copiedAllGemini, setCopiedAllGemini] = useState(false);

  // States for 20-turn dialogue prompt
  const [copiedDialogueId, setCopiedDialogueId] = useState<string | null>(null);
  const [copiedDialogueGeminiId, setCopiedDialogueGeminiId] = useState<string | null>(null);
  const [copiedAllDialoguePrompt, setCopiedAllDialoguePrompt] = useState(false);
  const [copiedAllDialogueGemini, setCopiedAllDialogueGemini] = useState(false);

  const handleCopyGeminiPrompt = (item: IeltsVocabItem) => {
    audioService.playBeep('click');
    const prompt = buildExplanationPromptForVocabItem(item);
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedPromptId(item.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleCopyStandardPrompt = (item: IeltsVocabItem) => {
    audioService.playBeep('click');
    const prompt = buildExplanationPromptForVocabItem(item);
    navigator.clipboard.writeText(prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllVocabPrompt = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('click');
    const combinedPrompt = buildAllExplanationPromptForVocabList(vocabList);
    navigator.clipboard.writeText(combinedPrompt);
    setCopiedAllPrompt(true);
    setTimeout(() => setCopiedAllPrompt(false), 2500);
  };

  const handleSendAllVocabToGemini = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('decision');
    const combinedPrompt = buildAllExplanationPromptForVocabList(vocabList);
    if (onSendToGemini) {
      onSendToGemini(combinedPrompt);
    } else {
      navigator.clipboard.writeText(combinedPrompt);
    }
    setCopiedAllGemini(true);
    setTimeout(() => setCopiedAllGemini(false), 2500);
  };

  // Dedicated Dialogue Prompt Handlers (20 short turns)
  const handleCopyItemDialoguePrompt = (item: IeltsVocabItem) => {
    audioService.playBeep('click');
    const prompt = buildDialoguePromptForVocabItem(item);
    navigator.clipboard.writeText(prompt);
    setCopiedDialogueId(item.id);
    setTimeout(() => setCopiedDialogueId(null), 2000);
  };

  const handleSendItemDialogueToGemini = (item: IeltsVocabItem) => {
    audioService.playBeep('decision');
    const prompt = buildDialoguePromptForVocabItem(item);
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedDialogueGeminiId(item.id);
    setTimeout(() => setCopiedDialogueGeminiId(null), 2500);
  };

  const handleCopyAllDialoguePrompt = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('click');
    const prompt = buildDialoguePromptForVocabList(vocabList, topicOrQuestion);
    navigator.clipboard.writeText(prompt);
    setCopiedAllDialoguePrompt(true);
    setTimeout(() => setCopiedAllDialoguePrompt(false), 2500);
  };

  const handleSendAllDialogueToGemini = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('decision');
    const prompt = buildDialoguePromptForVocabList(vocabList, topicOrQuestion);
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedAllDialogueGemini(true);
    setTimeout(() => setCopiedAllDialogueGemini(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Vocabulary Integration (Bảng Giải Thích Từ Vựng & Dịch Nghĩa Ngữ Cảnh)
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {vocabList.length} từ
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Từ vựng Band 7.5 - 8.5+ kèm câu ví dụ trực quan, đối tượng giao tiếp phù hợp và kịch bản đối thoại 20 câu tự nhiên
            </p>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Nút Copy tất cả từ vựng giải thích (có cột Đối tượng giao tiếp) */}
          <button
            type="button"
            onClick={handleCopyAllVocabPrompt}
            title="Sao chép prompt phân tích của TẤT CẢ từ vựng trong bảng này (kèm cột Đối tượng giao tiếp thường nói với ai)"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllPrompt
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-purple-500/50 text-purple-200 hover:from-purple-600 hover:to-indigo-600 hover:text-white'
            }`}
          >
            {copiedAllPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã Copy Prompt Phân Tích!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-purple-300" />
                <span>Copy Prompt Tất Cả ({vocabList.length} từ)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendAllVocabToGemini}
            title="Gửi prompt phân tích TẤT CẢ từ vựng sang Gemini MiniWeb"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllGemini
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-blue-600/30 border-blue-500/40 text-blue-200 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {copiedAllGemini ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã gửi Gemini!</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-cyan-300" />
                <span>Gửi Gemini Phân Tích</span>
              </>
            )}
          </button>

          {/* NÚT RIÊNG: PROMPT KỊCH BẢN HỘI THOẠI 20 CÂU TỰ NHIÊN (TOÀN BỘ TỪ VỰNG) */}
          <button
            type="button"
            onClick={handleCopyAllDialoguePrompt}
            title="Sao chép prompt tạo cuộc trò chuyện tự nhiên ~20 câu ngắn (chào hỏi, đặt vấn đề, thảo luận lồng ghép từ vựng, kết thúc) giữa 2 nhân vật phù hợp"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllDialoguePrompt
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border-emerald-500/50 text-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:text-white'
            }`}
          >
            {copiedAllDialoguePrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã Copy Prompt Hội Thoại!</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>💬 Prompt Hội Thoại 20 Câu ({vocabList.length} từ)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendAllDialogueToGemini}
            title="Gửi prompt kịch bản hội thoại 20 câu ngắn tự nhiên lồng ghép toàn bộ từ vựng sang Gemini MiniWeb"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllDialogueGemini
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-teal-600/30 border-teal-500/40 text-teal-200 hover:bg-teal-600 hover:text-white'
            }`}
          >
            {copiedAllDialogueGemini ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã gửi Gemini!</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-teal-300" />
                <span>Hội Thoại Sang Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/60">
              <th className="py-3 px-3 w-12 text-center">Icon</th>
              <th className="py-3 px-3 w-40">Từ Vựng (Vocab)</th>
              <th className="py-3 px-3 w-48">Nghĩa Từ Trong Ngữ Cảnh</th>
              <th className="py-3 px-3">Câu Ví Dụ Trực Quan (Visual Sentence)</th>
              <th className="py-3 px-3 text-amber-300">🇻🇳 Dịch Nghĩa Ví Dụ Theo Ngữ Cảnh</th>
              <th className="py-3 px-2 w-36 text-center">Hành Động & Tra Hội Thoại</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {vocabList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 text-center text-xl bg-slate-950/40">
                  {item.icon}
                </td>
                <td className="py-3 px-3 font-bold text-indigo-300">
                  {item.word}
                </td>
                <td className="py-3 px-3 text-slate-300 font-medium">
                  {item.meaning}
                </td>
                <td className="py-3 px-3 text-slate-200 select-text leading-relaxed font-sans">
                  {item.visualSentence}
                </td>
                <td className="py-3 px-3 text-amber-200/90 select-text leading-relaxed font-medium">
                  {item.sentenceMeaning || 'Được giải thích và dịch chi tiết theo ngữ cảnh câu'}
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-1 flex-wrap">
                    {/* Nút Phân Tích (có cột đối tượng) */}
                    <button
                      onClick={() => handleCopyGeminiPrompt(item)}
                      title="Gửi Prompt sang Gemini: Bảng 5 cột giải thích từ và đối tượng giao tiếp phù hợp"
                      className={`p-1.5 rounded-lg border transition ${
                        copiedPromptId === item.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {copiedPromptId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
                    </button>

                    {/* Nút Riêng: Kịch Bản Hội Thoại 20 Câu Cho Riêng Từ Này */}
                    <button
                      onClick={() => handleSendItemDialogueToGemini(item)}
                      title="Gửi Prompt sang Gemini tạo kịch bản đối thoại ~20 câu ngắn tự nhiên áp dụng riêng từ này với đối tượng phù hợp"
                      className={`p-1.5 rounded-lg border transition ${
                        copiedDialogueGeminiId === item.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {copiedDialogueGeminiId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <MessageSquare className="w-3.5 h-3.5" />}
                    </button>

                    {/* Copy prompt hội thoại riêng từ này */}
                    <button
                      onClick={() => handleCopyItemDialoguePrompt(item)}
                      title="Sao chép prompt kịch bản hội thoại 20 câu ngắn của từ này vào Clipboard"
                      className={`p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition ${
                        copiedDialogueId === item.id ? 'text-emerald-400 border border-emerald-500/40' : ''
                      }`}
                    >
                      {copiedDialogueId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-300/80" />}
                    </button>

                    {/* Nghe đọc từ */}
                    <button
                      onClick={() => audioService.speakText(item.word, 'en')}
                      title="Nghe phát âm"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Sao chép prompt phân tích thường */}
                    <button
                      onClick={() => handleCopyStandardPrompt(item)}
                      title="Sao chép prompt phân tích thường (ko gửi Gemini)"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-400 transition"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
