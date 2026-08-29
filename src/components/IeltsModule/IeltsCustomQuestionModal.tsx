import React, { useState } from 'react';
import { X, Plus, Save, Sparkles, Folder, HelpCircle, BookOpen, Layers } from 'lucide-react';
import { IeltsCustomQuestion } from '../../types/ielts';
import { storageService } from '../../services/storageService';
import { aiService, convertTextToVisualIconChain } from '../../services/aiService';
import { audioService } from '../../services/audioService';

interface IeltsCustomQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPart?: 'Part 1' | 'Part 2' | 'Part 3';
  initialValues?: {
    question?: string;
    vocab?: string;
    answer?: string;
    category?: string;
    part?: 'Part 1' | 'Part 2' | 'Part 3';
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
  const [part, setPart] = useState<'Part 1' | 'Part 2' | 'Part 3'>(
    initialValues?.part || defaultPart
  );
  const [category, setCategory] = useState(initialValues?.category || 'Chủ đề của tôi');
  const [question, setQuestion] = useState(initialValues?.question || '');
  const [cueCardPrompt, setCueCardPrompt] = useState('');
  const [vocab, setVocab] = useState(initialValues?.vocab || '');
  const [answer, setAnswer] = useState(initialValues?.answer || '');

  React.useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        setPart(initialValues.part || defaultPart);
        setCategory(initialValues.category || 'Chủ đề của tôi');
        setQuestion(initialValues.question || '');
        setVocab(initialValues.vocab || '');
        setAnswer(initialValues.answer || '');
      } else {
        setPart(defaultPart);
        setCategory('Chủ đề của tôi');
        setQuestion('');
        setCueCardPrompt('');
        setVocab('');
        setAnswer('');
      }
    }
  }, [isOpen, defaultPart, initialValues]);

  if (!isOpen) return null;

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
      answer: finalAnswer || '✨ Đang chuẩn bị bài nói mẫu...',
    });

    audioService.playBeep('success');
    onSaved(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>➕ Tạo & Lưu Câu Hỏi Mới Vào Kho</span>
              </h2>
              <p className="text-xs text-slate-400">
                Thêm câu hỏi cá nhân vào thư mục để lưu trữ và luyện tập mọi lúc
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                1. Dạng câu hỏi (Part):
              </label>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['Part 1', 'Part 2', 'Part 3'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPart(p)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      part === p
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
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
                placeholder="VD: Technology, Travel, Work..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              3. Câu hỏi / Đề bài (Question Prompt):
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="VD: Do you think remote work is more productive than working in an office? Why?"
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
            />
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
              4. Từ vựng mấu chốt (Band 7-8 Vocab - Tùy chọn):
            </label>
            <textarea
              value={vocab}
              onChange={(e) => setVocab(e.target.value)}
              placeholder="deeply passionate - cực kỳ đam mê&#10;breakthrough - bước đột phá&#10;streamline workflow - tối ưu hóa quy trình..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Model Answer / Takeaways */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                5. Câu trả lời mẫu (Model Answer với Icon):
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
              placeholder="Nhập đoạn văn trả lời của bạn, hoặc bấm 'Tự động gán Icon' để tạo chuỗi mũi tên..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
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
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Vào Kho (Save)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
