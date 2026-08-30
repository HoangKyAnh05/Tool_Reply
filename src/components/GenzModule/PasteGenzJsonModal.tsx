import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  FileJson, 
  AlertCircle, 
  Send
} from 'lucide-react';
import { GenzGenerationResult, GenzResultVersion, GenzTone } from '../../types/genz';
import { audioService } from '../../services/audioService';
import { imageService } from '../../services/imageService';

interface PasteGenzJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyVersions: (result: GenzGenerationResult) => void;
  currentInputText: string;
  selectedTone: GenzTone;
}

export const PasteGenzJsonModal: React.FC<PasteGenzJsonModalProps> = ({
  isOpen,
  onClose,
  onApplyVersions,
  currentInputText,
  selectedTone
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const AI_PROMPT_TEMPLATE = `Bạn là Chuyên gia Ngôn ngữ Gen Z Việt Nam đỉnh cao trên TikTok, Threads, Facebook.
Nhiệm vụ của bạn là đọc câu nói sau và tìm 10 CÁCH NÓI GEN Z ĐỘNG, BẮT TREND NHẤT cho câu này:

👉 CÂU CẦN BIẾN TẤU: "${currentInputText || 'Tôi đang bay bổng'}"
👉 TONE GIỌNG YÊU CẦU: ${selectedTone}

YÊU CẦU BẮT BUỘC:
1. BẮT BUỘC PHẢI CÓ ICON / EMOJI: MỖI CÂU GEN Z SINH RA PHẢI KÈM THEO TỐI THIỂU 1 - 3 ICON / EMOJI CỰC CHẤT Ở CUỐI HOẶC GIỮA CÂU (như 🚀, ✨, 💅, 😭, 💀, 🤡, 🗿, 🔥, ❤️, 💣, 🥺, 🌶️, 💸, 🛸, 🌪️, 🧋...) để câu nói sinh động chuẩn vibe Gen Z TikTok / Threads.
2. Phải HIỂU ĐÚNG NGHĨA THỰC TẾ của câu "${currentInputText || 'Tôi đang bay bổng'}" (không bám máy móc từng chữ mà diễn đạt đúng sắc thái cảm xúc, hành động của giới trẻ).
3. Tạo ra ĐÚNG 10 câu biến tấu khác nhau mang năng lượng Gen Z tự nhiên (dùng các từ lóng thịnh hành như: bay màu, phiêu, slay trên tầng mây, out trình, cháy phố, 10 điểm không nhưng, kiếp nạn thứ 82, tới công chuyện, deadpan, cứu bồ, gánh team...).
4. Tuyệt đối KHÔNG dùng các câu mẫu chung chung không liên quan.
5. Trả về DUY NHẤT 1 MÃ JSON ARRAY HỢP LỆ THEO ĐỊNH DẠNG DƯỚI ĐÂY (không kèm lời chào hay giải thích ngoài JSON):

\`\`\`json
[
  { "id": "1", "text": "Tâm hồn đang bay màu khỏi mặt đất, phiêu diêu giữa ngân hà luôn á trời ✨🛸", "styleTag": "Cà khịa nhẹ", "tone": "${selectedTone}" },
  { "id": "2", "text": "Đầu óc đang phiêu, thân xác chỉ là người đi ké thôi nha 🗿🌪️", "styleTag": "Deadpan", "tone": "${selectedTone}" },
  { "id": "3", "text": "Tôi đang slay trên tầng mây, ai gọi xuống tôi không nghe đâu nha bà nội 💅👑", "styleTag": "Slay đỉnh nóc", "tone": "${selectedTone}" },
  { "id": "4", "text": "Não đang out trình mặt đất, xin đừng kéo tôi về thực tại 🚀😎", "styleTag": "Out trình", "tone": "${selectedTone}" },
  { "id": "5", "text": "Tâm trí đang cháy phố trên không, hạ cánh là chuyện của tương lai 🔥🚀", "styleTag": "Cháy phố", "tone": "${selectedTone}" },
  { "id": "6", "text": "Đang bay bổng tí thôi, thực tại cay đỏ mắt quá chưa muốn về 😭💣", "styleTag": "Cay đỏ mắt", "tone": "${selectedTone}" },
  { "id": "7", "text": "10 điểm bay bổng không có nhưng, kiếp nạn thực tại xin phép né xa 🤡✨", "styleTag": "10 điểm không nhưng", "tone": "${selectedTone}" },
  { "id": "8", "text": "Ủa alo, ai cho phép tôi bay bổng dễ thương cỡ này dọ ❤️🥺", "styleTag": "Thả thính ngọt", "tone": "${selectedTone}" },
  { "id": "9", "text": "Tới công chuyện luôn rồi, đang trôi dạt vô tận cùng các vì sao 🌌🪐", "styleTag": "Drama vũ trụ", "tone": "${selectedTone}" },
  { "id": "10", "text": "Cứ chill trên chín tầng mây, việc gì đến sẽ đến =))) 🌤️✨", "styleTag": "Chill tự nhiên", "tone": "${selectedTone}" }
]
\`\`\`
`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(AI_PROMPT_TEMPLATE);
    setCopiedPrompt(true);
    audioService.playBeep('click');
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  const handleApplyJson = () => {
    setErrorMessage(null);
    if (!jsonInput.trim()) {
      setErrorMessage('Vui lòng dán chuỗi JSON từ AI vào ô bên dưới.');
      return;
    }

    try {
      let cleaned = jsonInput.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
      }

      const parsed = JSON.parse(cleaned);

      let versionsList: GenzResultVersion[] = [];

      // Emojis fallback array to enrich sentences if AI missed emojis
      const fallbackEmojis = ['✨', '💅', '🔥', '💀', '😭', '🚀', '🗿', '❤️', '🤡', '🥺', '💣', '👑'];

      const enrichTextWithEmoji = (txt: string, index: number): string => {
        let trimmed = txt.trim();
        const hasEmoji = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu.test(trimmed);
        if (!hasEmoji) {
          const emoji1 = fallbackEmojis[index % fallbackEmojis.length];
          const emoji2 = fallbackEmojis[(index + 3) % fallbackEmojis.length];
          return `${trimmed} ${emoji1}${emoji2}`;
        }
        return trimmed;
      };

      if (Array.isArray(parsed)) {
        versionsList = parsed.map((item, idx) => ({
          id: item.id || String(idx + 1),
          text: enrichTextWithEmoji(item.text || String(item), idx),
          styleTag: item.styleTag || `Phiên bản #${idx + 1}`,
          tone: item.tone || selectedTone
        }));
      } else if (parsed.versions && Array.isArray(parsed.versions)) {
        versionsList = parsed.versions.map((item: any, idx: number) => ({
          ...item,
          text: enrichTextWithEmoji(item.text, idx)
        }));
      } else {
        setErrorMessage('Dữ liệu JSON không đúng định dạng danh sách câu Gen Z.');
        return;
      }

      if (versionsList.length === 0) {
        setErrorMessage('Không tìm thấy câu Gen Z nào trong chuỗi JSON.');
        return;
      }

      const result: GenzGenerationResult = {
        id: `genz_custom_${Date.now()}`,
        originalText: currentInputText,
        versions: versionsList,
        visualIdea: {
          title: `Meme Gen Z: "${currentInputText.slice(0, 30)}"`,
          explanation: `Phản ứng thị giác hài hước của Gen Z về câu nói: "${currentInputText}"`,
          imagePrompt: `A funny Vietnamese viral meme photo representing "${currentInputText}", high quality internet comedy`,
          suggestedCaption: `Khi nghe bảo "${currentInputText}" và đây là thực tế =)))`,
          visualStyle: 'Viral Internet Meme',
          generatedImageUrl: imageService.getPollinationsUrl(`Vietnamese Gen Z meme for ${encodeURIComponent(currentInputText)}`)
        },
        createdAt: Date.now()
      };

      audioService.playBeep('success');
      onApplyVersions(result);
      onClose();
    } catch (err: any) {
      setErrorMessage(`Lỗi phân tích cú pháp JSON: ${err.message}.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-md text-white font-bold">
              📥
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                Copy Prompt AI & Dán JSON Gen Z
              </h3>
              <p className="text-xs text-slate-400">
                Tạo 10 phiên bản Gen Z trực tiếp từ ChatGPT / Gemini / Claude theo thời gian thực
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 font-mono text-xs font-black flex items-center justify-center border border-pink-500/30">
                  1
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Copy Prompt chuẩn đưa lên mạng (ChatGPT / Gemini / Claude)
                </h4>
              </div>

              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold transition shadow-md shadow-pink-500/20 active:scale-95"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Đã Copy Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt AI</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Prompt đã tự động gắn câu: <strong className="text-pink-300">"{currentInputText || 'Cay vl'}"</strong>. Bạn chỉ cần nhấn copy, dán vào AI và copy mảng JSON trả về.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-black flex items-center justify-center border border-purple-500/30">
                  2
                </span>
                <label className="text-xs sm:text-sm font-bold text-white">
                  Dán mảng JSON kết quả từ AI vào đây:
                </label>
              </div>

              {jsonInput && (
                <button
                  onClick={() => setJsonInput('')}
                  className="text-[11px] text-slate-400 hover:text-red-400 transition"
                >
                  Xóa nội dung
                </button>
              )}
            </div>

            <textarea
              rows={8}
              placeholder='Dán đoạn mã JSON từ AI vào đây (ví dụ: [ { "id": "1", "text": "...", "styleTag": "..." }, ... ])'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-2xl p-4 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
            />

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>10 Phiên bản Gen Z sẽ cập nhật ngay khi áp dụng</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Đóng
            </button>

            <button
              onClick={handleApplyJson}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition"
            >
              <Check className="w-4 h-4" />
              <span>Áp Dụng Vào Danh Sách</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
