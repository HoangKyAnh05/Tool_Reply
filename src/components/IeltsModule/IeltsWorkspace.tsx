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
import { IeltsPart1BankModal } from './IeltsPart1BankModal';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';
import { audioService } from '../../services/audioService';

export const IeltsWorkspace: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<IeltsSpeakingLesson>(() =>
    storageService.getCurrentIeltsLesson()
  );

  // Input states
  const [vocabInput, setVocabInput] = useState('');
  const [readingInput, setReadingInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [selectedPart1Id, setSelectedPart1Id] = useState<number | null>(null);
  const [noOldVocab, setNoOldVocab] = useState(false);
  const [partPreference, setPartPreference] = useState<'Part 1' | 'Part 2' | 'Part 3'>('Part 1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isPart1BankOpen, setIsPart1BankOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'answer' | 'vocab' | 'connectors' | 'test'>('answer');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newLesson = await aiService.generateIeltsLesson({
        vocabListText: vocabInput,
        readingText: readingInput,
        questionText: questionInput,
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

  const handleLoadSample = (type: 'wage' | 'environment' | 'ai' | 'music') => {
    audioService.playBeep('click');
    setSelectedPart1Id(null);
    if (type === 'wage') {
      setQuestionInput('Do you believe increasing the minimum wage benefits or harms the national economy? Why?');
      setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
      setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
    } else if (type === 'environment') {
      setQuestionInput('How do green technologies and reduction of single-use plastics protect the environment?');
      setVocabInput(`carbon footprint - dấu chân carbon\nrenewable energy - năng lượng tái tạo\nphase out - loại bỏ dần dần\nenvironmental degradation - sự suy thoái môi trường\nsustainable practice - thực hành bền vững`);
      setReadingInput('Global transition toward green technologies and reduction of single-use plastics.');
    } else if (type === 'ai') {
      setQuestionInput('How is artificial intelligence transforming the workforce and everyday routine tasks?');
      setVocabInput(`breakthrough - bước đột phá\nautomate routine tasks - tự động hóa tác vụ lặp lại\njob displacement - sự mất việc làm do công nghệ\nethical dilemma - thế tiến thoái lưỡng nan về đạo đức\nadopt agile mindset - thích ứng tư duy linh hoạt`);
      setReadingInput('Artificial intelligence and future workforce transformation.');
    } else {
      setQuestionInput('Do you enjoy listening to music? Why or why not?');
      setVocabInput(`huge music lover - người rất yêu âm nhạc\nbackground noise - âm thanh nền\nnecessity in daily life - nhu cầu thiết yếu hàng ngày\npowerful effect on mood - tác động mạnh mẽ tới tâm trạng\nrelax and unwind - thư giãn và xả stress\nget adrenaline going - kích thích adrenaline bùng nổ`);
      setReadingInput(`🎶 Absolutely yes → ❤️ I'm a huge music lover → 🎧 For me, it's not just background noise → 🔥 it's more like a necessity → 📅 in my daily life.

💡 I think the main reason is → 🎵 music has a powerful effect → 😊 on my mood.

📌 For instance → 😔 when I'm feeling a bit down → 😫 or stressed → 💼 after a long day at work → 🎶 I tend to listen to soft pop → 🎸 or acoustic songs → 😌 to relax and unwind.

🔄 On the flip side → 🏋️ if I'm heading to the gym → 🚀 or need to get pumped up → 📋 for a project → 🥁 I'll put on some upbeat rock → 💃 or EDM → ⚡ to get my adrenaline going.

🎯 So, yeah → 🙏 I honestly can't imagine → 🌅 a day without it.`);
    }
  };

  const handleLoadFullDefault = () => {
    audioService.playBeep('success');
    setSelectedPart1Id(null);
    setCurrentLesson(defaultIeltsLesson);
    storageService.saveIeltsLesson(defaultIeltsLesson);
    setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
    setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
  };

  const handleSelectPart1ById = (id: number) => {
    const item = ieltsPart1Bank.find((q) => q.id === id);
    if (item) {
      audioService.playBeep('click');
      setSelectedPart1Id(item.id);
      setQuestionInput(item.question);
      setVocabInput(item.vocab);
      setReadingInput(item.answer);
      setPartPreference('Part 1');
    }
  };

  const handleNextPart1 = () => {
    const currentId = selectedPart1Id || 1;
    const nextId = currentId < 100 ? currentId + 1 : 1;
    handleSelectPart1ById(nextId);
  };

  const handlePrevPart1 = () => {
    const currentId = selectedPart1Id || 1;
    const prevId = currentId > 1 ? currentId - 1 : 100;
    handleSelectPart1ById(prevId);
  };

  const handleSelectPart1Question = async (item: IeltsPart1Item) => {
    audioService.playBeep('click');
    setSelectedPart1Id(item.id);
    setQuestionInput(item.question);
    setVocabInput(item.vocab);
    setReadingInput(item.answer);
    setPartPreference('Part 1');

    try {
      const newLesson = await aiService.generateIeltsLesson({
        vocabListText: item.vocab,
        readingText: item.answer,
        questionText: item.question,
        noOldVocab,
        partPreference: 'Part 1'
      });
      setCurrentLesson(newLesson);
      storageService.saveIeltsLesson(newLesson);
      setActiveSubTab('answer');
    } catch (err) {
      console.error(err);
    }
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
          {/* 100 Part 1 Bank Button */}
          <button
            onClick={() => setIsPart1BankOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>📚 Kho 100 Câu Part 1 (Bank)</span>
          </button>

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
                <span className="text-slate-600">•</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample('music')}
                  className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold"
                >
                  Mẫu 4 (Music 🎵)
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

          {/* Section 3: Question / Prompt with 100 Bank Integration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>3. Câu hỏi / Đề bài (Prompt):</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  100 Part 1 Bank
                </span>
              </label>
              <button
                type="button"
                onClick={() => setIsPart1BankOpen(true)}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-bold underline flex items-center gap-1"
              >
                <BookMarked className="w-3 h-3" />
                <span>Xem kho 100 câu ▾</span>
              </button>
            </div>

            {/* Direct 100 Question Dropdown & Prev/Next Controls */}
            <div className="flex items-center gap-1.5">
              <select
                value={selectedPart1Id || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val) handleSelectPart1ById(val);
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-indigo-300 font-medium focus:outline-none focus:border-indigo-500 truncate"
              >
                <option value="">-- Chọn 1 trong 100 câu Part 1 --</option>
                {Array.from(new Set(ieltsPart1Bank.map((i: IeltsPart1Item) => i.category))).map((cat: string) => (
                  <optgroup key={cat} label={`📁 ${cat}`} className="bg-slate-900 text-slate-300 font-bold">
                    {ieltsPart1Bank
                      .filter((i: IeltsPart1Item) => i.category === cat)
                      .map((i: IeltsPart1Item) => (
                        <option key={i.id} value={i.id} className="bg-slate-950 text-slate-100 font-normal">
                          #{i.id}. {i.question}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>

              <button
                type="button"
                onClick={handlePrevPart1}
                title="Câu trước"
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs text-slate-300 font-bold transition"
              >
                ◀
              </button>

              <button
                type="button"
                onClick={handleNextPart1}
                title="Câu tiếp theo"
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs text-slate-300 font-bold transition"
              >
                ▶
              </button>
            </div>

            {selectedPart1Id && (
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                <span className="text-indigo-300 font-medium truncate">
                  📌 #{selectedPart1Id}: {ieltsPart1Bank.find((q) => q.id === selectedPart1Id)?.category}
                </span>
                <span className="text-slate-500 font-mono text-[10px] shrink-0">
                  {selectedPart1Id}/100 câu
                </span>
              </div>
            )}

            <textarea
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="Nhập hoặc chọn câu hỏi từ danh sách 100 câu ở trên..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Dạng câu hỏi:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPartPreference('Part 1')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    partPreference === 'Part 1'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Part 1
                </button>
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

      {/* 100 Part 1 Bank Modal */}
      <IeltsPart1BankModal
        isOpen={isPart1BankOpen}
        onClose={() => setIsPart1BankOpen(false)}
        onSelectQuestion={handleSelectPart1Question}
      />
    </div>
  );
};
