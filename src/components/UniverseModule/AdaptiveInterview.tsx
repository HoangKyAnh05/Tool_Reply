import React, { useState } from 'react';
import { 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Sliders, 
  CheckSquare, 
  Percent,
  Play
} from 'lucide-react';
import { AdaptiveQuestion, QuestionAnswer, ScenarioModel } from '../../types/universe';
import { audioService } from '../../services/audioService';

interface AdaptiveInterviewProps {
  questions: AdaptiveQuestion[];
  scenario: ScenarioModel;
  onFinishInterview: (answers: QuestionAnswer[]) => void;
  onSkipToSimulation: () => void;
}

export const AdaptiveInterview: React.FC<AdaptiveInterviewProps> = ({
  questions,
  scenario,
  onFinishInterview,
  onSkipToSimulation
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [sliderValue, setSliderValue] = useState<number>(20);

  const currentQ = questions[currentIndex] || questions[0];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Calculate dynamic completeness score
  const answeredCount = Object.keys(answers).length;
  const completeness = Math.min(95, Math.floor(scenario.completenessScore + (answeredCount / Math.max(1, questions.length)) * 20));

  const handleSelectOption = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
    audioService.playBeep('click');
  };

  const handleNext = () => {
    audioService.playBeep('click');
    if (isLastQuestion) {
      const formattedAnswers: QuestionAnswer[] = Object.entries(answers).map(([qId, val]) => {
        const q = questions.find((item) => item.id === qId);
        return {
          questionId: qId,
          questionText: q?.prompt || '',
          answer: val
        };
      });
      onFinishInterview(formattedAnswers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto bg-slate-950">
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Progress & Completeness Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
              CÂU HỎI {String(currentIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 font-medium">Phỏng Vấn Thích Ứng (Impact × Uncertainty)</span>
          </div>

          {/* Completeness gauge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Độ hoàn thiện kịch bản:</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{completeness}%</span>
            </div>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
            {currentQ.prompt}
          </h3>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">Lý do câu hỏi này quan trọng: </strong>
              {currentQ.rationale}
            </p>
          </div>
        </div>

        {/* Dynamic Question Input UI */}
        <div className="py-2">
          {currentQ.type === 'slider' && (
            <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-sm font-bold text-cyan-300">
                <span>Giá trị chọn:</span>
                <span className="text-lg font-extrabold bg-cyan-950 px-3 py-1 rounded-xl border border-cyan-500/30">
                  {sliderValue} {currentQ.unit}
                </span>
              </div>
              <input
                type="range"
                min={currentQ.min || 0}
                max={currentQ.max || 50}
                value={sliderValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSliderValue(val);
                  setAnswers((prev) => ({ ...prev, [currentQ.id]: `${val} ${currentQ.unit}` }));
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{currentQ.min || 0} {currentQ.unit}</span>
                <span>{currentQ.max || 50} {currentQ.unit}</span>
              </div>
            </div>
          )}

          {currentQ.type === 'single_choice' && (
            <div className="space-y-2.5">
              {currentQ.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                    answers[currentQ.id] === opt
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span>{opt}</span>
                  {answers[currentQ.id] === opt && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'yes_no' && (
            <div className="grid grid-cols-2 gap-3">
              {['Đã khảo sát / Đã tính toán kỹ', 'Chưa khảo sát / Mới là dự đoán'].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border text-center text-xs font-bold transition ${
                    answers[currentQ.id] === opt
                      ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          <div className="flex items-center gap-2">
            {completeness >= 70 && (
              <button
                type="button"
                onClick={onSkipToSimulation}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-400" />
                <span>Mô Phỏng Ngay ({completeness}%)</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <span>{isLastQuestion ? 'Hoàn Tất & Xem Kịch Bản' : 'Câu Tiếp Theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
