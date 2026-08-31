import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Zap, 
  Maximize2, 
  Minimize2, 
  Smartphone,
  Plus,
  Save,
  Star,
  Image as ImageIcon,
  Upload,
  Trash2,
  X,
  Check
} from 'lucide-react';
import { IeltsSpeakingLesson, IeltsQuestionPartType } from '../../types/ielts';
import { aiService } from '../../services/aiService';
import { storageService, defaultIeltsLesson } from '../../services/storageService';
import { IeltsVisualMasterMap } from './IeltsVisualMasterMap';
import { IeltsSpeakingAnswer } from './IeltsSpeakingAnswer';
import { IeltsVocabTable } from './IeltsVocabTable';
import { IeltsConnectorTable } from './IeltsConnectorTable';
import { IeltsRecallQuiz } from './IeltsRecallQuiz';
import { IeltsPromptModal } from './IeltsPromptModal';
import { IeltsPartBankModal, SelectedQuestionPayload } from './IeltsPartBankModal';
import { IeltsCustomQuestionModal } from './IeltsCustomQuestionModal';
import { MobileProjectSimulatorModal, MobileProjectTab } from '../common/MobileProjectSimulatorModal';
import { ieltsPart1Bank, IeltsPart1Item } from '../../data/ieltsPart1Bank';
import { ieltsPart2Bank, IeltsPart2Item } from '../../data/ieltsPart2Bank';
import { ieltsPart3Bank, IeltsPart3Item } from '../../data/ieltsPart3Bank';
import { ieltsWritingTask1Bank } from '../../data/ieltsWritingTask1Bank';
import { ieltsWritingTask2Bank } from '../../data/ieltsWritingTask2Bank';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';

interface IeltsWorkspaceProps {
  openPartBankSignal?: number;
}

export const IeltsWorkspace: React.FC<IeltsWorkspaceProps> = ({ openPartBankSignal }) => {
  const [currentLesson, setCurrentLesson] = useState<IeltsSpeakingLesson>(() =>
    storageService.getCurrentIeltsLesson()
  );

  // Input states
  const [vocabInput, setVocabInput] = useState('');
  const [readingInput, setReadingInput] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | string | null>(null);
  const [noOldVocab, setNoOldVocab] = useState(false);
  const [partPreference, setPartPreference] = useState<IeltsQuestionPartType | string>('Part 1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isPartBankOpen, setIsPartBankOpen] = useState(false);
  const [isPartBankFullscreen, setIsPartBankFullscreen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileProjectTab>('ielts300');
  const [customVersion, setCustomVersion] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState<'answer' | 'vocab' | 'connectors' | 'test'>('answer');

  // Handle Ctrl+V paste image from clipboard into the workspace
  useEffect(() => {
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
                setUploadedImage(event.target.result as string);
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
  }, []);

  // Listen to openPartBankSignal from navbar to open directly in fullscreen
  useEffect(() => {
    if (openPartBankSignal && openPartBankSignal > 0) {
      setIsPartBankFullscreen(true);
      setIsPartBankOpen(true);
    }
  }, [openPartBankSignal]);

  // Handle ESC key to exit focus mode or zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomOpen) setIsZoomOpen(false);
        else if (isFocusMode) setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, isZoomOpen]);

  const handleToggleFocusMode = async () => {
    audioService.playBeep('click');
    const nextState = !isFocusMode;
    setIsFocusMode(nextState);
    await toggleNativeFullscreen();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
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
          setUploadedImage(event.target.result as string);
          audioService.playBeep('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom user-created questions for current part
  const customQuestions = storageService.getCustomIeltsQuestions(partPreference).map((q) => ({
    ...q,
    isCustom: true
  }));

  // Active dataset based on current Part preference
  const defaultBank: { id: number | string; category: string; question: string; vocab: string; answer: string; cueCardPrompt?: string; topic?: string; isCustom?: boolean; imageUrl?: string }[] =
    useMemo(() => {
      if (partPreference === 'Part 1') return ieltsPart1Bank;
      if (partPreference === 'Part 2') return ieltsPart2Bank;
      if (partPreference === 'Part 3') return ieltsPart3Bank;
      if (partPreference === 'Writing Task 1') {
        return ieltsWritingTask1Bank.map((item) => ({
          id: item.id,
          category: item.category || 'Writing Task 1',
          question: `${item.title}\n\n${item.prompt}`,
          vocab: item.keyVocabulary?.map((v) => `${v.word} - ${v.meaning}`).join('\n') || '',
          answer: item.sampleAnswerBand8,
          imageUrl: item.imageUrl
        }));
      }
      if (partPreference === 'Writing Task 2') {
        return ieltsWritingTask2Bank.map((item) => ({
          id: item.id,
          category: item.category || 'Writing Task 2',
          question: item.prompt,
          vocab: item.lexicalResource?.map((v) => `${v.term} - ${v.explanation}`).join('\n') || '',
          answer: item.sampleAnswerBand8
        }));
      }
      return ieltsPart1Bank;
    }, [partPreference]);

  const currentBank = [...customQuestions, ...defaultBank];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newLesson = await aiService.generateIeltsLesson({
        vocabListText: vocabInput,
        readingText: readingInput,
        questionText: questionInput,
        noOldVocab,
        partPreference: partPreference as any
      });
      if (uploadedImage) {
        newLesson.imageUrl = uploadedImage;
      }
      setCurrentLesson(newLesson);
      storageService.saveIeltsLesson(newLesson);
      setActiveSubTab('answer');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadSample = (type: 'wage' | 'environment' | 'ai' | 'music' | 'task1') => {
    audioService.playBeep('click');
    setSelectedQuestionId(null);
    if (type === 'task1') {
      setPartPreference('Writing Task 1');
      const cam19 = ieltsWritingTask1Bank[0];
      setQuestionInput(`${cam19.title}\n\n${cam19.prompt}`);
      setVocabInput(cam19.keyVocabulary?.map((v) => `${v.word} - ${v.meaning}`).join('\n') || '');
      setReadingInput(cam19.sampleAnswerBand8);
      setUploadedImage(cam19.imageUrl || null);
    } else if (type === 'wage') {
      setPartPreference('Part 3');
      setQuestionInput('Do you believe increasing the minimum wage benefits or harms the national economy? Why?');
      setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
      setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
      setUploadedImage(null);
    } else if (type === 'environment') {
      setPartPreference('Part 3');
      setQuestionInput('How do green technologies and reduction of single-use plastics protect the environment?');
      setVocabInput(`carbon footprint - dấu chân carbon\nrenewable energy - năng lượng tái tạo\nphase out - loại bỏ dần dần\nenvironmental degradation - sự suy thoái môi trường\nsustainable practice - thực hành bền vững`);
      setReadingInput('Global transition toward green technologies and reduction of single-use plastics.');
      setUploadedImage(null);
    } else if (type === 'ai') {
      setPartPreference('Part 3');
      setQuestionInput('How is artificial intelligence transforming the workforce and everyday routine tasks?');
      setVocabInput(`breakthrough - bước đột phá\nautomate routine tasks - tự động hóa tác vụ lặp lại\njob displacement - sự mất việc làm do công nghệ\nethical dilemma - thế tiến thoái lưỡng nan về đạo đức\nadopt agile mindset - thích ứng tư duy linh hoạt`);
      setReadingInput('Artificial intelligence and future workforce transformation.');
      setUploadedImage(null);
    } else {
      setPartPreference('Part 1');
      setQuestionInput('Do you enjoy listening to music? Why or why not?');
      setVocabInput(`huge music lover - người rất yêu âm nhạc\nbackground noise - âm thanh nền\nnecessity in daily life - nhu cầu thiết yếu hàng ngày\npowerful effect on mood - tác động mạnh mẽ tới tâm trạng\nrelax and unwind - thư giãn và xả stress\nget adrenaline going - kích thích adrenaline bùng nổ`);
      setReadingInput(`🎶 Absolutely yes → ❤️ I'm a huge music lover → 🎧 For me, it's not just background noise → 🔥 it's more like a necessity → 📅 in my daily life.

💡 I think the main reason is → 🎵 music has a powerful effect → 😊 on my mood.

📌 For instance → 😔 when I'm feeling a bit down → 😫 or stressed → 💼 after a long day at work → 🎶 I tend to listen to soft pop → 🎸 or acoustic songs → 😌 to relax and unwind.

🔄 On the flip side → 🏋️ if I'm heading to the gym → 🚀 or need to get pumped up → 📋 for a project → 🥁 I'll put on some upbeat rock → 💃 or EDM → ⚡ to get my adrenaline going.

🎯 So, yeah → 🙏 I honestly can't imagine → 🌅 a day without it.`);
      setUploadedImage(null);
    }
  };

  const handleLoadFullDefault = () => {
    audioService.playBeep('success');
    setSelectedQuestionId(null);
    setCurrentLesson(defaultIeltsLesson);
    storageService.saveIeltsLesson(defaultIeltsLesson);
    setVocabInput(`pinch pennies - tằn tiện từng đồng\nremain stuck in - kẹt cứng trong hoàn cảnh\nripple effect - hiệu ứng lan tỏa\nspur job growth - thúc đẩy tăng trưởng việc làm\npurchasing power - sức mua tiêu dùng\nkeep pace with - bắt kịp đà tăng\nbe indexed to - được điều chỉnh theo chỉ số`);
    setReadingInput('Raising the minimum wage can stimulate broader economic circulation while protecting vulnerable workers.');
    setUploadedImage(null);
  };

  const handleSelectQuestionById = (id: number | string) => {
    const item = currentBank.find((q) => String(q.id) === String(id));
    if (item) {
      audioService.playBeep('click');
      setSelectedQuestionId(item.id);
      const fullQuestionText = item.cueCardPrompt
        ? `${item.question}\n\n${item.cueCardPrompt}`
        : item.question;
      setQuestionInput(fullQuestionText);
      setVocabInput(item.vocab || '');
      setReadingInput(item.answer || '');
      setUploadedImage(item.imageUrl || null);
    }
  };

  const handleNextQuestion = () => {
    if (currentBank.length === 0) return;
    const currentIndex = currentBank.findIndex((q) => String(q.id) === String(selectedQuestionId));
    const nextIndex = currentIndex >= 0 && currentIndex < currentBank.length - 1 ? currentIndex + 1 : 0;
    handleSelectQuestionById(currentBank[nextIndex].id);
  };

  const handlePrevQuestion = () => {
    if (currentBank.length === 0) return;
    const currentIndex = currentBank.findIndex((q) => String(q.id) === String(selectedQuestionId));
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentBank.length - 1;
    handleSelectQuestionById(currentBank[prevIndex].id);
  };

  const handleSaveCurrentToBank = () => {
    if (!questionInput.trim()) {
      alert('Vui lòng nhập câu hỏi / đề bài trước khi lưu vào kho!');
      return;
    }
    const saved = storageService.saveCustomIeltsQuestion({
      part: partPreference,
      category: partPreference === 'Writing Task 1' ? 'Writing Task 1' : 'Chủ đề tự tạo',
      topic: partPreference === 'Writing Task 1' ? 'Writing Task 1' : 'Chủ đề tự tạo',
      question: questionInput.trim(),
      vocab: vocabInput.trim(),
      answer: readingInput.trim() || '✨ Chưa có bài nói/viết mẫu',
      imageUrl: uploadedImage || undefined
    });
    audioService.playBeep('success');
    setSelectedQuestionId(saved.id);
    setCustomVersion((v) => v + 1);
    alert(`✓ Đã lưu thành công bài vào Kho tự tạo (${partPreference}) kèm ảnh đính kèm!`);
  };

  const handleSelectFromModal = async (payload: SelectedQuestionPayload) => {
    audioService.playBeep('click');
    setPartPreference(payload.part);
    setQuestionInput(payload.question);
    setVocabInput(payload.vocab);
    setReadingInput(payload.answer);
    setUploadedImage(payload.imageUrl || null);

    try {
      const newLesson = await aiService.generateIeltsLesson({
        vocabListText: payload.vocab,
        readingText: payload.answer,
        questionText: payload.question,
        noOldVocab,
        partPreference: payload.part as any
      });
      if (payload.imageUrl) {
        newLesson.imageUrl = payload.imageUrl;
      }
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
      <div className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0 select-none">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold text-white whitespace-nowrap">Visual Speaking System</h2>
            <p className="text-[10px] text-slate-400 hidden sm:block whitespace-nowrap">
              Ghi nhớ ý tưởng bằng Visual Icons & Phản xạ Band 7–8+ IELTS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* 300 Questions Master Bank Button */}
          <button
            onClick={() => {
              setIsPartBankFullscreen(false);
              setIsPartBankOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border border-purple-500/50 hover:from-purple-600 hover:to-indigo-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>📚 Kho 300 Câu</span>
          </button>

          {/* Direct Fullscreen 300 Questions Button */}
          <button
            onClick={() => {
              setIsPartBankFullscreen(true);
              setIsPartBankOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
            title="Mở to toàn màn hình kho 300 câu hỏi IELTS"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden md:inline">⛶ Phóng To</span>
          </button>

          {/* Mobile Phone Mode for 300 Questions */}
          <button
            onClick={() => {
              audioService.playBeep('click');
              setMobileTab('ielts300');
              setIsMobileSimulatorOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
            title="Xem kho 300 câu hỏi trên giao diện điện thoại"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-300" />
            <span>📱 Mobile</span>
          </button>

          {/* Quick Sample Fill Button */}
          <button
            onClick={handleLoadFullDefault}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600 hover:text-white text-indigo-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Mẫu</span>
          </button>

          {/* Master Prompt / Paste JSON Button */}
          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition whitespace-nowrap shrink-0"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Master Prompt / JSON</span>
            <span className="lg:hidden">JSON</span>
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

          {/* Section 3: Question / Prompt with 100 Bank Integration for Active Part */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>3. Câu hỏi / Đề bài (Prompt):</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {partPreference} ({currentBank.length} câu)
                </span>
              </label>
              <button
                type="button"
                onClick={() => setIsPartBankOpen(true)}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-bold underline flex items-center gap-1"
              >
                <BookMarked className="w-3 h-3" />
                <span>Kho {currentBank.length} câu ▾</span>
              </button>
            </div>

            {/* Direct Question Dropdown & Prev/Next Controls for Active Part */}
            <div className="flex items-center gap-1.5">
              <select
                value={selectedQuestionId || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) handleSelectQuestionById(val);
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-indigo-300 font-medium focus:outline-none focus:border-indigo-500 truncate"
              >
                <option value="">-- Chọn 1 trong {currentBank.length} câu {partPreference} --</option>
                
                {/* Custom User Questions First */}
                {customQuestions.length > 0 && (
                  <optgroup label="⭐ Câu hỏi tự tạo (Custom)" className="bg-slate-900 text-amber-300 font-bold">
                    {customQuestions.map((i) => (
                      <option key={i.id} value={i.id} className="bg-slate-950 text-amber-200 font-normal">
                        ⭐ [{i.category}] {i.question}
                      </option>
                    ))}
                  </optgroup>
                )}

                {/* Default 20 Categories */}
                {Array.from(new Set(defaultBank.map((i) => i.category))).map((cat: string) => (
                  <optgroup key={cat} label={`📁 ${cat}`} className="bg-slate-900 text-slate-300 font-bold">
                    {defaultBank
                      .filter((i) => i.category === cat)
                      .map((i) => (
                        <option key={i.id} value={i.id} className="bg-slate-950 text-slate-100 font-normal">
                          #{i.id}. {i.topic ? `[${i.topic}]` : i.question}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>

              <button
                type="button"
                onClick={handlePrevQuestion}
                title="Câu trước"
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs text-slate-300 font-bold transition"
              >
                ◀
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                title="Câu tiếp theo"
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs text-slate-300 font-bold transition"
              >
                ▶
              </button>
            </div>

            {selectedQuestionId && (
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                <span className="text-indigo-300 font-medium truncate">
                  📌 {currentBank.find((q) => String(q.id) === String(selectedQuestionId))?.isCustom ? '⭐ [Tự tạo]' : `#${selectedQuestionId}`}: {currentBank.find((q) => String(q.id) === String(selectedQuestionId))?.category}
                </span>
                <span className="text-slate-500 font-mono text-[10px] shrink-0">
                  {selectedQuestionId} ({partPreference})
                </span>
              </div>
            )}

            <textarea
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder={
                partPreference === 'Writing Task 1'
                  ? 'Nhập đề Writing Task 1 (The chart below shows...) - Có thể đẩy ảnh biểu đồ ở bên dưới...'
                  : `Nhập hoặc chọn câu hỏi ${partPreference} từ danh sách ở trên...`
              }
              rows={partPreference === 'Part 2' || partPreference === 'Writing Task 1' ? 4 : 2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium font-sans leading-relaxed"
            />

            {/* Optional Image Upload for Task 1 & other prompts */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ảnh biểu đồ đề bài (Tùy chọn):</span>
                </span>
                {uploadedImage && (
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
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

              {!uploadedImage ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-xl p-2.5 text-center cursor-pointer transition flex items-center justify-center gap-2.5 ${
                    isDragging
                      ? 'border-purple-400 bg-purple-950/40'
                      : partPreference === 'Writing Task 1'
                      ? 'border-purple-500/50 bg-purple-950/20 hover:border-purple-400 hover:bg-purple-950/30'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-200">
                      📸 Đẩy ảnh biểu đồ lên <span className="text-[10px] text-slate-400 font-normal">(Tùy chọn - có thể đẩy hoặc không)</span>
                    </p>
                    <p className="text-[10px] text-purple-300/90">
                      Bấm để chọn file ảnh, kéo thả hoặc bấm <span className="underline font-bold">Ctrl + V</span> để dán ảnh trực tiếp
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl border border-purple-500/40 bg-slate-950 p-2 group">
                  <div className="relative max-h-40 overflow-hidden rounded-lg flex items-center justify-center bg-slate-900">
                    <img
                      src={uploadedImage}
                      alt="Biểu đồ đề bài"
                      className="max-h-40 w-auto object-contain cursor-pointer"
                      onClick={() => setIsZoomOpen(true)}
                    />
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={() => setIsZoomOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold border border-slate-700 flex items-center gap-1 shadow"
                      >
                        <Maximize2 className="w-3 h-3 text-purple-400" />
                        <span>Xem to</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold flex items-center gap-1 shadow hover:bg-purple-500"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-purple-300 px-1">
                    <span className="font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      Đã đính kèm ảnh biểu đồ (Sẽ lưu cùng bài)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsZoomOpen(true)}
                      className="underline text-slate-400 hover:text-white"
                    >
                      Phóng to ảnh
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Question Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                <span>➕ Tạo câu mới vào Kho</span>
              </button>

              <button
                type="button"
                onClick={handleSaveCurrentToBank}
                title="Lưu câu hỏi, câu trả lời và ảnh biểu đồ hiện tại vào Kho tự tạo"
                className="py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>💾 Lưu câu & ảnh</span>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <span className="font-semibold text-slate-300">Dạng câu hỏi / Đề thi:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex-wrap">
                {(['Part 1', 'Part 2', 'Part 3', 'Writing Task 1', 'Writing Task 2'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPartPreference(p);
                      setSelectedQuestionId(null);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                      partPreference === p
                        ? p === 'Writing Task 1'
                          ? 'bg-purple-600 text-white shadow-md'
                          : p === 'Writing Task 2'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
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
        <section
          className={`${
            isFocusMode
              ? 'fixed inset-0 z-50 w-screen h-screen bg-slate-950 flex flex-col overflow-hidden animate-fadeIn'
              : 'flex-1 flex flex-col overflow-hidden bg-slate-950'
          }`}
        >
          {/* Focus Mode Top Bar if active */}
          {isFocusMode && (
            <div className="bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 px-6 py-2.5 border-b border-purple-500/30 flex items-center justify-between shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/30 text-purple-200 border border-purple-500/40 uppercase tracking-wide">
                  ⛶ FOCUS MODE • CHỈ XEM BÀI HỌC
                </span>
                <span className="text-xs font-bold text-slate-200 truncate max-w-xl">
                  {currentLesson.topic || currentLesson.question}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFocusMode}
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
                  title="Thoát chế độ toàn màn hình bài học (Esc)"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Thu nhỏ lại (Esc)</span>
                </button>
              </div>
            </div>
          )}

          {/* Sub Navigation Bar */}
          <div className="border-b border-slate-800/80 bg-slate-900/40 px-6 py-2 flex items-center justify-between shrink-0">
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

            {/* Right Action: Mobile Simulator & Focus / Fullscreen Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  setMobileTab('current_lesson');
                  setIsMobileSimulatorOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-600 hover:text-white text-indigo-200 text-xs font-bold transition shadow-sm"
                title="Xem bài học hiện tại trên giao diện điện thoại"
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-300" />
                <span className="hidden sm:inline">📱 Xem Mobile</span>
              </button>

              <button
                onClick={handleToggleFocusMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                  isFocusMode
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title={isFocusMode ? 'Thu nhỏ lại giao diện bình thường (Esc)' : 'Mở to toàn màn hình chỉ xem riêng bài học (Focus Mode)'}
              >
                {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-purple-400" />}
                <span>{isFocusMode ? 'Thu nhỏ bài học' : 'Toàn màn hình bài học'}</span>
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
                vocabList={currentLesson.vocabList}
                imageUrl={uploadedImage || currentLesson.imageUrl}
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

      {/* 300 Questions Master Bank Modal (Part 1, 2, 3) */}
      <IeltsPartBankModal
        isOpen={isPartBankOpen}
        onClose={() => {
          setIsPartBankOpen(false);
          setIsPartBankFullscreen(false);
        }}
        defaultPart={partPreference}
        defaultFullscreen={isPartBankFullscreen}
        onSelectQuestion={handleSelectFromModal}
      />

      {/* Custom Question Creator Modal */}
      <IeltsCustomQuestionModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        defaultPart={partPreference}
        initialValues={{
          question: questionInput,
          vocab: vocabInput,
          answer: readingInput,
          part: partPreference,
          imageUrl: uploadedImage || undefined
        }}
        onSaved={(saved) => {
          setCustomVersion((v) => v + 1);
          setSelectedQuestionId(saved.id);
          handleSelectQuestionById(saved.id);
        }}
      />

      {/* Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isMobileSimulatorOpen}
        onClose={() => setIsMobileSimulatorOpen(false)}
        initialTab={mobileTab}
        onSelectIeltsQuestion={handleSelectFromModal}
      />

      {/* Lightbox Zoom Image Modal */}
      {isZoomOpen && (uploadedImage || currentLesson.imageUrl) && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto">
            <img
              src={(uploadedImage || currentLesson.imageUrl) as string}
              alt="Zoomed Chart"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain mx-auto"
            />
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
