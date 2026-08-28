import React, { useState } from 'react';
import { Copy, Check, Code, ArrowRight, X, AlertCircle } from 'lucide-react';
import { IeltsSpeakingLesson } from '../../types/ielts';

interface IeltsPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  masterPrompt: string;
  onImportJson: (lesson: IeltsSpeakingLesson) => void;
}

export const IeltsPromptModal: React.FC<IeltsPromptModalProps> = ({
  isOpen,
  onClose,
  masterPrompt,
  onImportJson
}) => {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      if (!parsed.topic || !parsed.fullSpeakingAnswer) {
        throw new Error('JSON thiếu trường bắt buộc (topic, fullSpeakingAnswer)');
      }
      const lesson: IeltsSpeakingLesson = {
        id: `ielts_${Date.now()}`,
        topic: parsed.topic || 'Custom Topic',
        question: parsed.question || 'Part 3 Question',
        part: parsed.part || 'Part 3',
        visualMasterMap: parsed.visualMasterMap || ['💵⬆️', '🌊', '🎯'],
        fullSpeakingAnswer: parsed.fullSpeakingAnswer,
        vocabList: parsed.vocabList || [],
        connectorTable: parsed.connectorTable || [],
        bilingualSummary: parsed.bilingualSummary || { english: '', vietnamese: '' },
        thirtySecondMemory: parsed.thirtySecondMemory || { iconChain: '', explanations: [] },
        vocabMemoryMap: parsed.vocabMemoryMap || [],
        recallTest: parsed.recallTest || { iconSequence: [], targetConcepts: [], hintWords: [] },
        createdAt: Date.now()
      };
      onImportJson(lesson);
      onClose();
    } catch (err: any) {
      setError(`Lỗi phân tích JSON: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">IELTS Master Prompt & Paste JSON</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-300">
              <span>1. Copy Master Prompt (Gửi vào ChatGPT, Claude hoặc Gemini)</span>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép Prompt!' : 'Sao chép Prompt'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={masterPrompt}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 resize-none select-all"
            />
          </div>

          <div>
            <div className="font-semibold text-slate-300 mb-1.5">
              <span>2. Dán JSON kết quả trả về từ AI</span>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Dán kết quả dạng { "topic": "...", "fullSpeakingAnswer": "..." } vào đây...'
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-100 placeholder-slate-600 resize-none focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>
          <button
            onClick={handleApplyJson}
            disabled={!jsonInput.trim()}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 disabled:opacity-40"
          >
            <span>Nhập Vào Ứng Dụng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
