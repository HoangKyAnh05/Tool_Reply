import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Languages, 
  HelpCircle 
} from 'lucide-react';
import { audioService } from '../../services/audioService';

interface IeltsSpeakingAnswerProps {
  topic: string;
  question: string;
  part: 'Part 2' | 'Part 3';
  fullAnswer: string;
  bilingualSummary: {
    english: string;
    vietnamese: string;
  };
}

export const IeltsSpeakingAnswer: React.FC<IeltsSpeakingAnswerProps> = ({
  topic,
  question,
  part,
  fullAnswer,
  bilingualSummary
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${question}\n\n${fullAnswer}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioService.speakText(fullAnswer, 'en', () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
      {/* Header with Question */}
      <div className="border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {part}
            </span>
            <span className="text-xs font-semibold text-slate-400">Band 7.5 - 8.5 Model Answer</span>
          </div>

          <div className="flex items-center gap-2">
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

        <h2 className="text-lg font-bold text-slate-100 leading-snug">
          {question}
        </h2>
      </div>

      {/* Answer Paragraphs with Highlighted Inline Anchor Icons */}
      <div className="space-y-4 text-slate-200 text-sm leading-relaxed font-sans select-text">
        {fullAnswer.split('\n\n').map((para, pIdx) => (
          <p key={pIdx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition">
            {para}
          </p>
        ))}
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

        {showSummary && (
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
    </div>
  );
};
