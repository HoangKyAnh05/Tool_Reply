import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Code, 
  Sparkles, 
  Zap, 
  Maximize2, 
  Minimize2, 
  Smartphone,
  Copy,
  FileJson,
  Send,
  ArrowDownUp,
  Bookmark
} from 'lucide-react';
import { CascadeScenario } from '../../types/fishboneCascade';
import { DEFAULT_CASCADE_PRESETS } from '../../data/defaultCascadePresets';
import { FishboneCascadeCanvas } from './FishboneCascadeCanvas';
import { PasteCascadeJsonModal } from './PasteCascadeJsonModal';
import { FishboneVocabExplorer } from './FishboneVocabExplorer';
import { MobileProjectSimulatorModal } from '../common/MobileProjectSimulatorModal';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { audioService } from '../../services/audioService';

export const FishboneWorkspace: React.FC = () => {
  // Active Workspace Tab: 'cascade' (Xương Cá Truyền Tin Đa Tầng) vs 'vocab3000' (Bản Đồ Xương Cá IELTS)
  const [activeTab, setActiveTab] = useState<'cascade' | 'vocab3000'>('cascade');

  // Cascade Scenario State
  const [activeScenario, setActiveScenario] = useState<CascadeScenario>(() => DEFAULT_CASCADE_PRESETS[0]);
  const [customTopicInput, setCustomTopicInput] = useState('Công ty bán cá, cần nhập một lô hàng 5 tấn cá hồi Na Uy tươi');
  const [isPasteJsonModalOpen, setIsPasteJsonModalOpen] = useState(false);

  // Fullscreen & Mobile Simulator State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    await toggleNativeFullscreen();
  };

  const handleSelectPreset = (scenario: CascadeScenario) => {
    audioService.playBeep('click');
    setActiveScenario(scenario);
    setCustomTopicInput(scenario.topicTitle);
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen overflow-hidden animate-fadeIn'
          : 'flex-1 overflow-hidden'
      }`}
    >
      {/* 1. Main Header Toolbar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 z-10 shrink-0">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 border border-cyan-500/30 flex items-center justify-center text-xl font-bold shadow-md shadow-cyan-500/20 text-white">
            {activeTab === 'cascade' ? '🏢' : '🦴'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                FISHBONE PROTOCOL
              </span>
              <h2 className="text-sm font-extrabold text-white">
                {activeTab === 'cascade'
                  ? 'Sơ Đồ Xương Cá Truyền Tin Đa Tầng (Sếp ⇄ Cấp Dưới ⇄ Bên Bán)'
                  : 'Bản Đồ Xương Cá IELTS (Từ Vựng, Ngữ Pháp & Cấu Trúc)'}
              </h2>
              {isFullscreen && (
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                  TOÀN MÀN HÌNH
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              {activeTab === 'cascade'
                ? 'Luồng chỉ đạo từ Sếp xuống cấp thấp nhất & bên bán ➔ Báo tin ngược lên cấp cao tới Sếp'
                : '20 Bộ Xương Cá học thuật • Đường ray uốn lượn zíc zắc vô tận từ trên xuống dưới'}
            </p>
          </div>
        </div>

        {/* Center: Main 2 Tabs Switcher (Clean, no legacy 3 tabs) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold shadow-inner">
          <button
            onClick={() => {
              audioService.playBeep('click');
              setActiveTab('cascade');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'cascade'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🏢</span>
            <span>Xương Cá Truyền Tin Đa Tầng</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              setActiveTab('vocab3000');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'vocab3000'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🦴</span>
            <span>Bản Đồ Xương Cá IELTS (20 Bộ)</span>
          </button>
        </div>

        {/* Right Tools: Mobile Phone Simulator & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Mobile Phone Mode Button */}
          <button
            onClick={() => {
              audioService.playBeep('click');
              setIsMobileModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm"
            title="Xem giao diện điện thoại thoại di động"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">📱 Chế độ Điện Thoại</span>
            <span className="sm:hidden">📱 Mobile</span>
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={handleToggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
              isFullscreen
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isFullscreen ? 'Thu nhỏ giao diện (Esc)' : 'Mở to toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isFullscreen ? 'Thu nhỏ (Esc)' : 'Toàn màn hình'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Sub-Bar for Cascade Scenario Presets & Topic Input (When in 'cascade' tab) */}
      {activeTab === 'cascade' && (
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Topic Input Box with Quick Action */}
          <div className="flex-1 min-w-[280px] max-w-xl flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 shrink-0">
              📌 Chủ đề:
            </span>
            <div className="relative flex-1">
              <input
                type="text"
                value={customTopicInput}
                onChange={(e) => setCustomTopicInput(e.target.value)}
                placeholder="Nhập chủ đề (VD: Công ty bán cá, cần nhập một lô hàng cá hồi...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={() => setIsPasteJsonModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow transition active:scale-95 shrink-0"
              title="Mở prompt để tạo JSON cho chủ đề này"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tạo Prompt AI</span>
            </button>
          </div>

          {/* Preset Scenario Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              Kịch bản mẫu:
            </span>

            {DEFAULT_CASCADE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 border ${
                  activeScenario.id === preset.id
                    ? 'bg-slate-800 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{preset.icon}</span>
                <span>{preset.topicTitle.split(':')[0]}</span>
              </button>
            ))}

            {/* Dán JSON Nhanh */}
            <button
              onClick={() => setIsPasteJsonModalOpen(true)}
              className="px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/50 text-indigo-300 hover:bg-indigo-600 hover:text-white"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>📥 Dán JSON</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Body */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'cascade' ? (
          <FishboneCascadeCanvas
            scenario={activeScenario}
            onOpenPasteModal={() => setIsPasteJsonModalOpen(true)}
          />
        ) : (
          <FishboneVocabExplorer />
        )}
      </main>

      {/* Paste JSON / AI Prompt Modal */}
      <PasteCascadeJsonModal
        isOpen={isPasteJsonModalOpen}
        onClose={() => setIsPasteJsonModalOpen(false)}
        currentTopicTitle={customTopicInput}
        onApplyScenario={(newScenario) => {
          setActiveScenario(newScenario);
          setCustomTopicInput(newScenario.topicTitle);
        }}
      />

      {/* Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        initialTab="fishbone"
      />
    </div>
  );
};
