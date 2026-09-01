import React, { useState } from 'react';
import { BookMarked, Volume2, Copy, Check, Bot } from 'lucide-react';
import { IeltsVocabItem } from '../../types/ielts';
import { audioService } from '../../services/audioService';

interface IeltsVocabTableProps {
  vocabList: IeltsVocabItem[];
  onSendToGemini?: (prompt: string) => void;
}

export const buildAllVocabListPrompt = (vocabList: IeltsVocabItem[]): string => {
  const itemsFormatted = vocabList
    .map((item, idx) => {
      const meaning = item.meaning ? `"${item.meaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh';
      const sentence = item.visualSentence ? `\n  - Câu ví dụ: "${item.visualSentence}"` : '';
      const sentenceTrans = item.sentenceMeaning ? `\n  - Dịch nghĩa ví dụ: "${item.sentenceMeaning}"` : '';
      return `### [TỪ VỰNG #${idx + 1}] ${item.icon} "${item.word}"
- Nghĩa trong ngữ cảnh: ${meaning}${sentence}${sentenceTrans}`;
    })
    .join('\n\n');

  return `[📖 TỔNG HỢP PROMPT PHÂN TÍCH TOÀN BỘ BẢNG TỪ VỰNG]
- Tổng số từ vựng: ${vocabList.length} từ

DANH SÁCH CHI TIẾT TỪ VỰNG CẦN PHÂN TÍCH:
${itemsFormatted}

================================================================================
YÊU CẦU ĐỐI VỚI GIẢNG VIÊN IELTS BAND 9.0:
Đối với TỪNG từ / cụm từ trong danh sách trên:
1. Giải thích chi tiết ý nghĩa và cách dùng trong ngữ cảnh câu văn / ví dụ.
2. Tạo các tình huống và câu hỏi thực tế trong phòng thi IELTS (Speaking & Writing) mà tôi nên dùng từ này.
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm 4 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)

Hãy giải thích lần lượt từng từ/cụm từ thật chi tiết, trực quan và đầy đủ!`;
};

export const IeltsVocabTable: React.FC<IeltsVocabTableProps> = ({ vocabList, onSendToGemini }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedAllPrompt, setCopiedAllPrompt] = useState(false);
  const [copiedAllGemini, setCopiedAllGemini] = useState(false);

  const buildVocabRowPrompt = (item: IeltsVocabItem): string => {
    const meaning = item.meaning ? `"${item.meaning}"` : 'Dịch nghĩa chính xác theo ngữ cảnh';
    const sentence = item.visualSentence ? `\n- Câu ví dụ: "${item.visualSentence}"` : '';
    const sentenceTrans = item.sentenceMeaning ? `\n- Dịch nghĩa ví dụ: "${item.sentenceMeaning}"` : '';

    return `[${item.icon}] Từ / Cụm từ: "${item.word}"
- Dịch nghĩa trong ngữ cảnh của câu: ${meaning}${sentence}${sentenceTrans}

Hãy đóng vai là Giảng viên IELTS Band 9.0:
1. Giải thích chi tiết ý nghĩa và cách dùng của từ/cụm từ này trong ngữ cảnh câu văn trên.
2. Tạo các tình huống và câu hỏi thực tế trong phòng thi IELTS (Speaking & Writing) mà tôi nên dùng từ này.
3. Trình bày dưới dạng BẢNG GIẢI THÍCH rõ ràng, có icon sinh động, bắt buộc gồm 4 CỘT:
   - 🎯 Tình huống / Ngữ cảnh sử dụng (Context & Situation)
   - 💬 Câu hỏi / Câu đối thoại mẫu chứa từ này (Example Sentence)
   - 🇻🇳 Dịch nghĩa của ví dụ giải thích theo các ngữ cảnh sử dụng (Vietnamese Translation)
   - 💡 Phân tích lý do dùng & Điểm cộng từ vựng (Vocabulary Impact & Band Boost)`;
  };

  const handleCopyGeminiPrompt = (item: IeltsVocabItem) => {
    audioService.playBeep('click');
    const prompt = buildVocabRowPrompt(item);
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
    const prompt = buildVocabRowPrompt(item);
    navigator.clipboard.writeText(prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllVocabPrompt = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('click');
    const combinedPrompt = buildAllVocabListPrompt(vocabList);
    navigator.clipboard.writeText(combinedPrompt);
    setCopiedAllPrompt(true);
    setTimeout(() => setCopiedAllPrompt(false), 2500);
  };

  const handleSendAllVocabToGemini = () => {
    if (!vocabList || vocabList.length === 0) return;
    audioService.playBeep('decision');
    const combinedPrompt = buildAllVocabListPrompt(vocabList);
    if (onSendToGemini) {
      onSendToGemini(combinedPrompt);
    } else {
      navigator.clipboard.writeText(combinedPrompt);
    }
    setCopiedAllGemini(true);
    setTimeout(() => setCopiedAllGemini(false), 2500);
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
              Từ vựng Band 7.5 - 8.5+ kèm câu ví dụ trực quan và cột dịch nghĩa theo từng ngữ cảnh sử dụng
            </p>
          </div>
        </div>

        {/* Nút Copy tất cả từ vựng & Gửi sang Gemini */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCopyAllVocabPrompt}
            title="Sao chép prompt của TẤT CẢ từ vựng trong bảng này (ghép các prompt nhỏ lại)"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition shadow-sm ${
              copiedAllPrompt
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                : 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-purple-500/50 text-purple-200 hover:from-purple-600 hover:to-indigo-600 hover:text-white'
            }`}
          >
            {copiedAllPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã Copy Prompt Tất Cả Từ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-purple-300" />
                <span>Copy Prompt Toàn Bộ Từ Vựng ({vocabList.length})</span>
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
                <span>Gửi Toàn Bộ Sang Gemini</span>
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
              <th className="py-3 px-2 w-28 text-center">Hành Động</th>
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
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleCopyGeminiPrompt(item)}
                      title="Gửi Prompt sang Gemini: Bảng câu hỏi & dịch nghĩa ví dụ theo ngữ cảnh"
                      className={`p-1.5 rounded-lg border transition ${
                        copiedPromptId === item.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {copiedPromptId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => audioService.speakText(item.word, 'en')}
                      title="Nghe phát âm"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyStandardPrompt(item)}
                      title="Sao chép prompt thường (ko gửi Gemini)"
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
