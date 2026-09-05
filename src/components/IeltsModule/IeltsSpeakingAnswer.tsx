import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Languages, 
  HelpCircle, 
  Image as ImageIcon,
  Maximize2,
  X,
  MessageSquare,
  Bot
} from 'lucide-react';
import { audioService } from '../../services/audioService';
import { IeltsQuestionPartType, IeltsVocabItem } from '../../types/ielts';
import { IeltsAnnotatedPhraseViewer } from '../common/IeltsAnnotatedPhraseViewer';
import { annotateSpeakingAnswer, annotateWritingParagraph } from '../../utils/ieltsTextAnnotator';
import { getStandardizedSpeakingAnswer } from '../../utils/ieltsSpeakingExpander';
import { buildDialoguePromptForLesson } from '../../utils/ieltsConversationPrompts';

interface IeltsSpeakingAnswerProps {
  topic: string;
  question: string;
  part: IeltsQuestionPartType | string;
  fullAnswer: string;
  vocabList?: IeltsVocabItem[];
  imageUrl?: string;
  bilingualSummary?: {
    english: string;
    vietnamese: string;
  };
  onSendToGemini?: (prompt: string) => void;
}

export const IeltsSpeakingAnswer: React.FC<IeltsSpeakingAnswerProps> = ({
  topic,
  question,
  part,
  fullAnswer,
  vocabList,
  imageUrl,
  bilingualSummary,
  onSendToGemini
}) => {
  const [viewMode, setViewMode] = useState<'annotated' | 'plain'>('annotated');
  const [copied, setCopied] = useState(false);
  const [copiedDialogue, setCopiedDialogue] = useState(false);
  const [copiedDialogueGemini, setCopiedDialogueGemini] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const vocabRaw = vocabList?.map((v) => `${v.word} - ${v.meaning}`).join('\n') || '';
  const isWriting = part.includes('Writing');
  const standardizedAnswer = isWriting
    ? fullAnswer
    : getStandardizedSpeakingAnswer(part, question, fullAnswer, vocabRaw);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${question}\n\n${standardizedAnswer}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDialoguePrompt = () => {
    audioService.playBeep('click');
    const prompt = buildDialoguePromptForLesson({
      topic,
      question,
      part,
      fullAnswer: standardizedAnswer,
      vocabList
    });
    navigator.clipboard.writeText(prompt);
    setCopiedDialogue(true);
    setTimeout(() => setCopiedDialogue(false), 2500);
  };

  const handleSendDialogueToGemini = () => {
    audioService.playBeep('decision');
    const prompt = buildDialoguePromptForLesson({
      topic,
      question,
      part,
      fullAnswer: standardizedAnswer,
      vocabList
    });
    if (onSendToGemini) {
      onSendToGemini(prompt);
    } else {
      navigator.clipboard.writeText(prompt);
    }
    setCopiedDialogueGemini(true);
    setTimeout(() => setCopiedDialogueGemini(false), 2500);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioService.speakText(standardizedAnswer, 'en', () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
      {/* Header with Question */}
      <div className="border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              part === 'Writing Task 1'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : part === 'Writing Task 2'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
            }`}>
              {part}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {part.includes('Writing') ? 'Band 8.0+ Model Essay / Report' : 'Band 7.5 - 8.5 Model Answer'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* NÚT RIÊNG: PROMPT KỊCH BẢN HỘI THOẠI 20 CÂU NGẮN (CHO CẢ ĐỀ BÀI & BÀI MẪU) */}
            <button
              onClick={handleCopyDialoguePrompt}
              title="Sao chép prompt kịch bản hội thoại tự nhiên ~20 câu ngắn (chào hỏi, đặt vấn đề, thảo luận quan điểm, kết thúc) giữa 2 nhân vật phù hợp với đề bài này"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition shadow-sm ${
                copiedDialogue
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                  : 'bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border-emerald-500/50 text-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:text-white'
              }`}
            >
              {copiedDialogue ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />}
              <span>{copiedDialogue ? 'Đã copy Prompt!' : '💬 Prompt Hội Thoại 20 Câu (Đề & Bài)'}</span>
            </button>

            <button
              onClick={handleSendDialogueToGemini}
              title="Gửi prompt tạo kịch bản đối thoại tự nhiên 20 câu sang Gemini MiniWeb"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition shadow-sm ${
                copiedDialogueGemini
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                  : 'bg-teal-600/30 border-teal-500/40 text-teal-200 hover:bg-teal-600 hover:text-white'
              }`}
            >
              {copiedDialogueGemini ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5 text-teal-300" />}
              <span>Hội Thoại Gemini</span>
            </button>

            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                isPlaying 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{isPlaying ? 'Dừng đọc' : 'Đọc mẫu (Audio)'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 text-indigo-100 shadow-md">
          <h2 className="text-base font-bold leading-snug flex items-center gap-2">
            <span>{question}</span>
          </h2>
        </div>

        {/* Task 1 Attached Chart Image Viewer */}
        {imageUrl && (
          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>📊 Biểu đồ đề bài Writing Task 1:</span>
              </span>
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="text-[11px] text-purple-300 hover:text-white px-2 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 flex items-center gap-1 transition"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Xem ảnh lớn</span>
              </button>
            </div>
            <div className="flex justify-center bg-slate-900/60 rounded-lg p-2 overflow-hidden max-h-72">
              <img
                src={imageUrl}
                alt="Biểu đồ đề bài"
                onClick={() => setIsZoomOpen(true)}
                className="max-h-72 w-auto object-contain rounded-md cursor-pointer hover:opacity-95 transition"
              />
            </div>
          </div>
        )}
      </div>

      {/* Answer Paragraphs with Highlighted Inline Anchor Icons & Deep Learning Breakdown */}
      <div className="space-y-4 text-slate-200 text-sm leading-relaxed font-sans select-text">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Phân Tích Chi Tiết Câu Trả Lời:</span>
          </span>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                audioService.playBeep('click');
                setViewMode('annotated');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition ${
                viewMode === 'annotated'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tách Icon & Giải Thích Từng Từ (Học Sâu)</span>
            </button>
            <button
              onClick={() => {
                audioService.playBeep('click');
                setViewMode('plain');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                viewMode === 'plain'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Đọc Liền Mạch</span>
            </button>
          </div>
        </div>

        {viewMode === 'annotated' ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            {(() => {
              const chunks = isWriting
                ? annotateWritingParagraph(standardizedAnswer)
                : annotateSpeakingAnswer(standardizedAnswer, vocabRaw);
              return (
                <IeltsAnnotatedPhraseViewer
                  chunks={chunks}
                  defaultExpandFirst={false}
                  questionContext={question}
                  onSendToGemini={onSendToGemini}
                />
              );
            })()}
          </div>
        ) : (
          standardizedAnswer.split('\n\n').map((para, pIdx) => (
            <p key={pIdx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition">
              {para}
            </p>
          ))
        )}
      </div>

      {/* Bilingual Summary Drawer */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center justify-between w-full p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/50 transition text-xs font-semibold"
        >
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-400" />
            <span>Tóm tắt Song Ngữ (Bilingual Final Summary with Icons)</span>
          </div>
          <span>{showSummary ? '▲ Thu gọn' : '▼ Mở rộng'}</span>
        </button>

        {showSummary && bilingualSummary && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-300">
                <span>🇬🇧 ENGLISH SUMMARY</span>
                <button
                  onClick={() => audioService.speakText(bilingualSummary.english, 'en')}
                  className="text-slate-500 hover:text-indigo-400"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {bilingualSummary.english}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-300">
                <span>🇻🇳 VIETNAMESE SUMMARY</span>
                <button
                  onClick={() => audioService.speakText(bilingualSummary.vietnamese, 'vi')}
                  className="text-slate-500 hover:text-indigo-400"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {bilingualSummary.vietnamese}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Zooming Task 1 Chart */}
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
