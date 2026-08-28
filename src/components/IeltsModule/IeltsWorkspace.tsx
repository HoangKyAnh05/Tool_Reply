import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Layers, 
  BookMarked, 
  Award, 
  Copy, 
  RefreshCw, 
  SlidersHorizontal,
  Code,
  ToggleLeft,
  ToggleRight,
  Zap
} from 'lucide-react';
import { IeltsSpeakingLesson } from '../../types/ielts';
import { aiService } from '../../services/aiService';
import { storageService, defaultIeltsLesson } from '../../services/storageService';
import { IeltsVisualMasterMap } from './IeltsVisualMasterMap';
import { IeltsSpeakingAnswer } from './IeltsSpeakingAnswer';
import { IeltsVocabTable } from './IeltsVocabTable';
import { IeltsConnectorTable } from './IeltsConnectorTable';
import { IeltsRecallQuiz } from './IeltsRecallQuiz';
import { IeltsPromptModal } from './IeltsPromptModal';
import { audioService } from '../../services/audioService';

export const IeltsWorkspace: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<IeltsSpeakingLesson>(() =>
    storageService.getCurrentIeltsLesson()
  );

  // Input states
  const [vocabInput, setVocabInput] = useState('');
  const [readingInput, setReadingInput] = useState('');
  const [noOldVocab, setNoOldVocab] = useState(false);
  const [partPreference, setPartPreference] = useState<'Part 2' | 'Part 3'>('Part 3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'answer' | 'vocab' | 'connectors' | 'test'>('answer');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newLesson = await aiService.generateIeltsLesson({
        vocabListText: vocabInput,
        readingText: readingInput,
        noOldVocab,
        partPreference
      });
      setCurrentLesson(newLesson);
      storageService.saveIeltsLesson(newLesson);
      setActiveSubTab('answer');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadSample = (type: 'wage' | 'environment' | 'ai') => {
    audioService.playBeep('click');
    if (type === 'wage') {
      setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
      setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
    } else if (type === 'environment') {
      setVocabInput(`carbon footprint - dấu chân carbon\nrenewable energy - năng lượng tái tạo\nphase out - loại bỏ dần dần\nenvironmental degradation - sự suy thoái môi trường\nsustainable practice - thực hành bền vững`);
      setReadingInput('Global transition toward green technologies and reduction of single-use plastics.');
    } else {
      setVocabInput(`breakthrough - bước đột phá\nautomate routine tasks - tự động hóa tác vụ lặp lại\njob displacement - sự mất việc làm do công nghệ\nethical dilemma - thế tiến thoái lưỡng nan về đạo đức\nadopt agile mindset - thích ứng tư duy linh hoạt`);
      setReadingInput('Artificial intelligence and future workforce transformation.');
    }
  };

  const handleLoadFullDefault = () => {
    audioService.playBeep('success');
    setCurrentLesson(defaultIeltsLesson);
    storageService.saveIeltsLesson(defaultIeltsLesson);
    setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
    setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
  };

  const masterPrompt = aiService.generateIeltsMasterPrompt({
    vocabListText: vocabInput || 'pinch pennies - tằn tiện từng đồng\nripple effect - hiệu ứng lan tỏa',
    readingText: readingInput || 'Economic impact of minimum wage increase',
    noOldVocab,
    partPreference
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Top action header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">Visual Vocabulary Speaking System</h2>
            <p className="text-xs text-slate-400">
              Ghi nhớ ý tưởng bằng Visual Icons & Phản xạ Band 7–8+ IELTS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Sample Fill Button */}
          <button
            onClick={handleLoadFullDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600 hover:text-white text-indigo-200 text-xs font-bold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Dữ Liệu Mẫu (Fill Demo)</span>
          </button>

          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>Master Prompt / Paste JSON</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form: Input & Controls */}
        <aside className="w-96 border-r border-slate-800/80 bg-slate-900/40 p-5 flex flex-col overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">
                1. Danh sách từ vựng & Nghĩa:
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleLoadSample('wage')}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-semibold"
                >
                  Mẫu 1
                </button>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('environment')}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-semibold"
                >
                  Mẫu 2
                </button>
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('ai')}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-semibold"
                >
                  Mẫu 3
                </button>
              </div>
            </div>
            <textarea
              value={vocabInput}
              onChange={(e) => setVocabInput(e.target.value)}
              placeholder="pinch pennies - tằn tiện từng đồng&#10;ripple effect - hiệu ứng lan tỏa&#10;purchasing power - sức mua..."
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              2. Đoạn văn đọc / Key takeaways (Tùy chọn):
            </label>
            <textarea
              value={readingInput}
              onChange={(e) => setReadingInput(e.target.value)}
              placeholder="Nhập thông tin bối cảnh hoặc bài đọc liên quan..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Dạng câu hỏi:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPartPreference('Part 2')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    partPreference === 'Part 2'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Part 2
                </button>
                <button
                  type="button"
                  onClick={() => setPartPreference('Part 3')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    partPreference === 'Part 3'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Part 3
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="font-semibold text-slate-300">Không dùng từ vựng cũ:</span>
              <button
                type="button"
                onClick={() => setNoOldVocab(!noOldVocab)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                {noOldVocab ? (
                  <ToggleRight className="w-6 h-6 text-indigo-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!vocabInput.trim() && !readingInput.trim())}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang kiến tạo Visual Story...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>TẠO VISUAL MASTER MAP</span>
              </>
            )}
          </button>
        </aside>

        {/* Right Preview Area */}
        <section className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          {/* Sub Navigation Bar */}
          <div className="border-b border-slate-800/80 bg-slate-900/40 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSubTab('answer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeSubTab === 'answer'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📝 Bài Nói Mẫu & Anchor
              </button>
              <button
                onClick={() => setActiveSubTab('vocab')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeSubTab === 'vocab'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📖 Bảng Từ Vựng ({currentLesson.vocabList.length})
              </button>
              <button
                onClick={() => setActiveSubTab('connectors')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeSubTab === 'connectors'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔗 Liên Từ Giao Tiếp ({currentLesson.connectorTable.length})
              </button>
              <button
                onClick={() => setActiveSubTab('test')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeSubTab === 'test'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'text-amber-400/80 hover:text-amber-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Interactive Recall Quiz</span>
              </button>
            </div>
          </div>

          {/* Sub Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Visual Master Map Ribbon */}
            <IeltsVisualMasterMap
              icons={currentLesson.visualMasterMap}
              explanations={currentLesson.thirtySecondMemory?.explanations}
            />

            {activeSubTab === 'answer' && (
              <IeltsSpeakingAnswer
                topic={currentLesson.topic}
                question={currentLesson.question}
                part={currentLesson.part}
                fullAnswer={currentLesson.fullSpeakingAnswer}
                bilingualSummary={currentLesson.bilingualSummary}
              />
            )}

            {activeSubTab === 'vocab' && (
              <IeltsVocabTable vocabList={currentLesson.vocabList} />
            )}

            {activeSubTab === 'connectors' && (
              <IeltsConnectorTable connectorTable={currentLesson.connectorTable} />
            )}

            {activeSubTab === 'test' && (
              <IeltsRecallQuiz lesson={currentLesson} />
            )}
          </div>
        </section>
      </div>

      {/* Master Prompt / Paste JSON Modal */}
      <IeltsPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        masterPrompt={masterPrompt}
        onImportJson={(importedLesson: IeltsSpeakingLesson) => {
          setCurrentLesson(importedLesson);
          storageService.saveIeltsLesson(importedLesson);
          setActiveSubTab('answer');
        }}
      />
    </div>
  );
};
