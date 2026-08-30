import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Save, Sparkles, Folder, Image as ImageIcon, Upload, Trash2, Maximize2, FileText, Check } from 'lucide-react';
import { IeltsCustomQuestion, IeltsQuestionPartType } from '../../types/ielts';
import { storageService } from '../../services/storageService';
import { convertTextToVisualIconChain } from '../../services/aiService';
import { audioService } from '../../services/audioService';

interface IeltsCustomQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPart?: IeltsQuestionPartType | string;
  initialValues?: {
    question?: string;
    vocab?: string;
    answer?: string;
    category?: string;
    part?: IeltsQuestionPartType | string;
    imageUrl?: string;
  };
  onSaved: (item: IeltsCustomQuestion) => void;
}

export const IeltsCustomQuestionModal: React.FC<IeltsCustomQuestionModalProps> = ({
  isOpen,
  onClose,
  defaultPart = 'Part 1',
  initialValues,
  onSaved,
}) => {
  const [part, setPart] = useState<IeltsQuestionPartType | string>(
    initialValues?.part || defaultPart
  );
  const [category, setCategory] = useState(initialValues?.category || 'Chủ đề của tôi');
  const [question, setQuestion] = useState(initialValues?.question || '');
  const [cueCardPrompt, setCueCardPrompt] = useState('');
  const [vocab, setVocab] = useState(initialValues?.vocab || '');
  const [answer, setAnswer] = useState(initialValues?.answer || '');
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialValues?.imageUrl || undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setPart(initialValues.part || defaultPart);
        setCategory(initialValues.category || 'Chủ đề của tôi');
        setQuestion(initialValues.question || '');
        setVocab(initialValues.vocab || '');
        setAnswer(initialValues.answer || '');
        setImageUrl(initialValues.imageUrl || undefined);
      } else {
        setPart(defaultPart);
        setCategory('Chủ đề của tôi');
        setQuestion('');
        setCueCardPrompt('');
        setVocab('');
        setAnswer('');
        setImageUrl(undefined);
      }
    }
  }, [isOpen, defaultPart, initialValues]);

  // Handle Ctrl+V paste image from clipboard
  useEffect(() => {
    if (!isOpen) return;
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setImageUrl(event.target.result as string);
                audioService.playBeep('success');
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          audioService.playBeep('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          audioService.playBeep('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFormatIcons = () => {
    if (!answer.trim()) return;
    audioService.playBeep('click');
    const chainData = convertTextToVisualIconChain(answer, vocab);
    setAnswer(chainData.fullAnswer);
  };

  const handleSave = () => {
    if (!question.trim()) {
      alert('Vui lòng nhập câu hỏi / đề bài!');
      return;
    }

    let finalAnswer = answer.trim();
    if (finalAnswer && !finalAnswer.includes('→')) {
      const chainData = convertTextToVisualIconChain(finalAnswer, vocab);
      finalAnswer = chainData.fullAnswer;
    }

    const saved = storageService.saveCustomIeltsQuestion({
      part,
      category: category.trim() || 'Chủ đề của tôi',
      topic: category.trim() || 'Chủ đề của tôi',
      question: question.trim(),
      cueCardPrompt: part === 'Part 2' ? cueCardPrompt.trim() : undefined,
      vocab: vocab.trim(),
      answer: finalAnswer || '✨ Đang chuẩn bị bài viết / bài nói mẫu...',
      imageUrl: imageUrl || undefined,
    });

    audioService.playBeep('success');
    onSaved(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>➕ Tạo & Lưu Câu Hỏi / Đề Bài Mới Vào Kho</span>
              </h2>
              <p className="text-xs text-slate-400">
                Thêm đề Speaking hoặc Writing (Task 1 có kèm biểu đồ) để lưu trữ và luyện tập
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50">
          {/* Part Selection & Category */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                1. Dạng câu hỏi / Đề thi:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {(['Part 1', 'Part 2', 'Part 3', 'Writing Task 1', 'Writing Task 2'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPart(p)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold transition text-center ${
                      part === p
                        ? p === 'Writing Task 1'
                          ? 'bg-purple-600 text-white shadow-md'
                          : p === 'Writing Task 2'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
                <Folder className="w-3.5 h-3.5 text-indigo-400" />
                <span>2. Thư mục / Tên chủ đề:</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="VD: Cambridge 19, Line Graph, Technology, Environment..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              3. Câu hỏi / Đề bài (Prompt):
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                part === 'Writing Task 1'
                  ? 'The line graph / bar chart below shows... Summarise the information by selecting and reporting the main features...'
                  : 'VD: Do you think remote work is more productive than working in an office? Why?'
              }
              rows={part === 'Writing Task 1' ? 3 : 2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Image Upload Zone - Highly Prominent for Writing Task 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>
                  {part === 'Writing Task 1'
                    ? '4. Đẩy ảnh biểu đồ Task 1 (Bắt buộc / Tùy chọn):'
                    : '4. Hình ảnh minh họa đính kèm (Tùy chọn):'}
                </span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl(undefined)}
                  className="text-rose-400 hover:text-rose-300 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Xóa ảnh</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {!imageUrl ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? 'border-purple-400 bg-purple-950/40'
                    : part === 'Writing Task 1'
                    ? 'border-purple-500/50 bg-purple-950/20 hover:border-purple-400 hover:bg-purple-950/30'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">
                    Bấm để tải ảnh biểu đồ lên hoặc Kéo & thả tệp ảnh vào đây
                  </p>
                  <p className="text-[11px] text-purple-300 mt-0.5 font-medium">
                    💡 Mẹo: Bạn có thể sao chép ảnh (Ctrl + C) rồi nhấn <span className="underline font-bold">Ctrl + V</span> trực tiếp để dán ảnh!
                  </p>
                </div>
                <span className="text-[10px] text-slate-500">
                  Hỗ trợ định dạng: PNG, JPG, JPEG, WebP, GIF
                </span>
              </div>
            ) : (
              <div className="relative rounded-xl border border-purple-500/40 bg-slate-950 p-2 group">
                <div className="relative max-h-56 overflow-hidden rounded-lg flex items-center justify-center bg-slate-900">
                  <img
                    src={imageUrl}
                    alt="Biểu đồ Task 1"
                    className="max-h-56 w-auto object-contain cursor-pointer"
                    onClick={() => setIsZoomOpen(true)}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 shadow"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Xem phóng to</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow hover:bg-purple-500"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Đổi ảnh khác</span>
                    </button>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-purple-300 px-1">
                  <span className="font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Đã đính kèm ảnh biểu đồ thành công
                  </span>
                  <span className="text-slate-500 text-[10px]">Nhấn Ctrl+V bất kỳ lúc nào để dán ảnh mới</span>
                </div>
              </div>
            )}
          </div>

          {/* Cue Card Bullets (If Part 2) */}
          {part === 'Part 2' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Gợi ý Cue Card (You should say):
              </label>
              <textarea
                value={cueCardPrompt}
                onChange={(e) => setCueCardPrompt(e.target.value)}
                placeholder="You should say:&#10;- Who this person is&#10;- What you did together&#10;- And explain why..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>
          )}

          {/* Vocabulary List */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              5. Từ vựng mấu chốt (Band 7-8 Vocab - Tùy chọn):
            </label>
            <textarea
              value={vocab}
              onChange={(e) => setVocab(e.target.value)}
              placeholder="witness a significant increase - ghi nhận mức tăng đáng kể&#10;reach a peak of - đạt đỉnh điểm tại&#10;fluctuate mildly - biến động nhẹ nhàng..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Model Answer / Takeaways */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                6. Bài viết mẫu / Gợi ý (Model Answer / Sample Response):
              </label>
              <button
                type="button"
                onClick={handleAutoFormatIcons}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline"
              >
                <Sparkles className="w-3 h-3" />
                <span>Tự động gán Icon & Mũi tên</span>
              </button>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Nhập đoạn văn trả lời của bạn, hoặc bài viết Task 1 mẫu..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Vào Kho (Save)</span>
          </button>
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
      {isZoomOpen && imageUrl && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto">
            <img src={imageUrl} alt="Zoomed Chart" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain mx-auto" />
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

