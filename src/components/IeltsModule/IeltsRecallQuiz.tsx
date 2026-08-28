import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  Award, 
  RefreshCw, 
  Sparkles, 
  Mic, 
  MicOff,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IeltsSpeakingLesson, IeltsRecallTestResult } from '../../types/ielts';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface IeltsRecallQuizProps {
  lesson: IeltsSpeakingLesson;
}

export const IeltsRecallQuiz: React.FC<IeltsRecallQuizProps> = ({ lesson }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<IeltsRecallTestResult | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const evalResult = aiService.evaluateRecallTest(userAnswer, lesson);
      setResult(evalResult);
      storageService.saveRecallTestResult(evalResult);
      setIsEvaluating(false);

      if (evalResult.scoreEstimate >= 7.0) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        audioService.playBeep('success');
      }
    }, 600);
  };

  const handleToggleSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt không hỗ trợ Web Speech Recognition. Bạn hãy nhập text trực tiếp nhé!');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.start();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Visual Recall Test (Kiểm Tra Phản Xạ Qua Chuỗi Icon)
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                No Text Mode
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Tái tạo lại câu trả lời tiếng Anh hoàn chỉnh chỉ bằng cách nhìn vào chuỗi Visual Anchor
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
        >
          {showHints ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-indigo-400" />}
          <span>{showHints ? 'Ẩn gợi ý' : 'Hiện gợi ý'}</span>
        </button>
      </div>

      {/* Visual Sequence Card */}
      <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl mb-5 text-center">
        <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">
          Chuỗi Icon Gợi Ý Cần Tái Hiện (Visual Sequence)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {lesson.recallTest.iconSequence.map((icon, idx) => (
            <React.Fragment key={idx}>
              <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 text-3xl shadow-lg shadow-indigo-950/30">
                {icon}
              </div>
              {idx < lesson.recallTest.iconSequence.length - 1 && (
                <span className="text-indigo-400 font-extrabold text-xl">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {showHints && (
          <div className="mt-4 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg text-xs text-indigo-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>
              Target concepts: <strong>{lesson.recallTest.targetConcepts.join(' • ')}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleTestSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Nhập hoặc bấm Micro để nói câu trả lời tiếng Anh theo chuỗi icon..."
            rows={3}
            className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
          />

          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`absolute bottom-3 right-3 p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-400" />}
            <span>{isRecording ? 'Đang nghe...' : 'Nói (Mic)'}</span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setUserAnswer('');
              setResult(null);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
          >
            Xóa làm lại
          </button>

          <button
            type="submit"
            disabled={!userAnswer.trim() || isEvaluating}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Đang Đánh Giá...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Chấm Điểm & Đánh Giá Band</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Result Card */}
      {result && (
        <div className="mt-6 p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex flex-col items-center justify-center font-bold text-white shadow-lg">
                <span className="text-[10px] leading-none uppercase">Band</span>
                <span className="text-lg leading-none mt-0.5">{result.scoreEstimate.toFixed(1)}</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Đánh Giá Phản Xạ Trực Quan</h4>
                <p className="text-xs text-slate-400">{result.overallReview}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between font-bold text-indigo-300 mb-1">
                <span>1. Vocabulary Accuracy</span>
                <span>{result.vocabularyAccuracy.score} / 9.0</span>
              </div>
              <p className="text-slate-400">{result.vocabularyAccuracy.feedback}</p>
            </div>

            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between font-bold text-purple-300 mb-1">
                <span>2. Grammatical Range</span>
                <span>{result.grammar.score} / 9.0</span>
              </div>
              <p className="text-slate-400">{result.grammar.feedback}</p>
            </div>

            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
                <span>3. Fluency & Coherence</span>
                <span>{result.fluency.score} / 9.0</span>
              </div>
              <p className="text-slate-400">{result.fluency.feedback}</p>
            </div>

            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between font-bold text-amber-300 mb-1">
                <span>4. Naturalness & Anchors</span>
                <span>{result.naturalness.score} / 9.0</span>
              </div>
              <p className="text-slate-400">{result.naturalness.feedback}</p>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-lg text-xs text-slate-300">
            <strong className="text-indigo-300">Gợi ý cải thiện tiếp theo: </strong>
            {result.suggestedImprovement}
          </div>
        </div>
      )}
    </div>
  );
};
