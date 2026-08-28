import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Send,
  Copy,
  Check,
  MessageSquare,
  SlidersHorizontal,
  Flame,
  Laugh,
  Skull,
  Heart,
  Briefcase,
  Zap,
  HelpCircle,
  Camera,
  ImageUp
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface ChatScreenshotAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (promptWithContext: string, imageBase64?: string, autoSend?: boolean) => void;
}

const REPLY_TONES = [
  { id: 'cool', name: 'Gen Z Cool / Tự nhiên', icon: '😎', desc: 'Gần gũi, chill, không sượng' },
  { id: 'hai', name: 'Hài hước / Tấu hề', icon: '😂', desc: 'Thả miếng chuồng gà, dí dỏm' },
  { id: 'cakhia', name: 'Cà khịa / Savage', icon: '💀', desc: 'Bắt bẻ nhẹ nhàng, dí deadline' },
  { id: 'thathinh', name: 'Thả thính / Ngọt ngào', icon: '❤️', desc: 'Đốn tim, tinh tế' },
  { id: 'lichsu', name: 'Lịch sự / Công việc', icon: '💼', desc: 'Chuẩn mực với sếp, đối tác' },
  { id: 'lanhlung', name: 'Lạnh lùng / Ngắn gọn', icon: '🗿', desc: 'Tối giản, kiệm lời, dứt khoát' },
];

export const ChatScreenshotAnalyzerModal: React.FC<ChatScreenshotAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onSendToChat
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string>('cool');
  const [extraNote, setExtraNote] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        audioService.playBeep('click');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasteFromClipboard = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
            audioService.playBeep('success');
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  // 1. NÚT BẮN ẢNH RIÊNG: Chỉ dán ảnh vào ô chat (không gửi chữ, không bấm gửi để người dùng tự gõ)
  const handlePasteImageOnly = () => {
    if (!selectedImage) {
      fileInputRef.current?.click();
      return;
    }
    audioService.playBeep('click');
    onSendToChat('', selectedImage, false);
    onClose();
  };

  // 2. Bắn ảnh kèm prompt phân tích và tự động gửi
  const handleApplyAndSend = () => {
    audioService.playBeep('decision');
    const toneObj = REPLY_TONES.find((t) => t.id === selectedTone) || REPLY_TONES[0];

    const promptText = `Bạn là chuyên gia tâm lý giao tiếp và Bậc Thầy Đối Đáp Tin Nhắn.

NHIỆM VỤ CỦA BẠN:
1. Đọc và phân tích bức ảnh chụp màn hình tin nhắn / đoạn hội thoại này (hoặc nội dung tin nhắn tôi vừa cung cấp).
2. Phân tích tâm lý & cảm xúc của đối phương: Người đó đang có ý gì, thái độ ra sao, có đang giận dỗi, đùa cợt, hay có ẩn ý gì không?
3. Gợi ý 4-5 câu trả lời cực hay theo phong cách: "${toneObj.name} (${toneObj.desc})"
${extraNote ? `Lưu ý thêm: "${extraNote}"` : ''}

HÃY ĐƯA RA CÁC PHƯƠNG ÁN TRẢ LỜI ĐÍCH ĐÁNG KÈM GIẢI THÍCH TẠI SAO NÊN CHỌN CÂU ĐÓ!`;

    onSendToChat(promptText, selectedImage || undefined, true);
    onClose();
  };

  return (
    <div
      onPaste={handlePasteFromClipboard}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Phân Tích Ảnh Tin Nhắn & Gợi Ý Lời Nhắn Đáp Trả
              </h3>
              <p className="text-xs text-slate-400">
                Tải ảnh chụp màn hình tin nhắn từ Zalo/Messenger/Instagram và nhận ngay câu đối đáp đỉnh cao
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Upload Dropzone */}
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">
              1. Tải ảnh hoặc Dán ảnh chụp tin nhắn (Ctrl + V):
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-pink-500/50 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-200">
                  Click để chọn ảnh chụp tin nhắn hoặc bấm <kbd className="px-2 py-0.5 rounded bg-slate-800 text-pink-300 font-mono text-[10px]">Ctrl + V</kbd> để dán ảnh trực tiếp
                </p>
                <p className="text-[11px] text-slate-500">Hỗ trợ PNG, JPG, WebP ảnh chụp từ điện thoại hoặc máy tính</p>
              </div>
            ) : (
              <div className="relative p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={selectedImage}
                    alt="Screenshot"
                    className="w-20 h-20 object-cover rounded-xl border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã nhận ảnh chụp màn hình</span>
                    </span>
                    <p className="text-[11px] text-slate-400 truncate">Sẵn sàng dán vào Gemini / ChatGPT</p>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-[11px] text-rose-400 hover:underline font-semibold"
                    >
                      Xóa và chọn ảnh khác
                    </button>
                  </div>
                </div>

                {/* Nút Bắn Ảnh Riêng */}
                <button
                  type="button"
                  onClick={handlePasteImageOnly}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0 shadow-md shadow-amber-600/30 active:scale-95"
                  title="Chỉ nạp ảnh vào ô chat và focus con trỏ để bạn tự gõ"
                >
                  <ImageUp className="w-4 h-4 text-white" />
                  <span>📷 Bắn Ảnh Vào AI (Chỉ Dán Ảnh)</span>
                </button>
              </div>
            )}
          </div>

          {/* Tone Selector */}
          <div>
            <label className="font-bold text-slate-300 block mb-2">
              2. Chọn phong cách trả lời bạn muốn (Tone):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {REPLY_TONES.map((tone) => (
                <button
                  type="button"
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition ${selectedTone === tone.id
                      ? 'bg-pink-950/50 border-pink-500 text-pink-200 shadow-md shadow-pink-950/30'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <span className="text-lg">{tone.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs truncate">{tone.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{tone.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Notes */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              3. Ghi chú thêm cho AI (Tùy chọn):
            </label>
            <input
              type="text"
              value={extraNote}
              onChange={(e) => setExtraNote(e.target.value)}
              placeholder="Ví dụ: Bạn này là bạn thân đại học / Người yêu cũ / Sếp trực tiếp..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer with Dedicated Action Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>

          <div className="flex items-center gap-2">
            {/* NÚT BẮN ẢNH RIÊNG BIỆT */}
            <button
              type="button"
              onClick={handlePasteImageOnly}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${selectedImage
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-slate-700'
                }`}
            >
              <ImageUp className="w-4 h-4 text-amber-300" />
              <span>📷 Bắn Ảnh Riêng (Chỉ Dán Ảnh)</span>
            </button>

            {/* NÚT BẮN CẢ ẢNH + PROMPT */}
            <button
              type="button"
              onClick={handleApplyAndSend}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-pink-600/30 hover:scale-105 active:scale-95 transition"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>🚀 Bắn Cả Ảnh + Prompt Tự Động</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
