import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Orbit,
  BookOpen,
  Settings,
  Layers,
  Volume2,
  VolumeX,
  Flame,
  RotateCcw,
  RefreshCw,
  Power,
  HelpCircle,
  BookMarked,
  Bot,
  Globe
} from 'lucide-react';
import { AppSettings } from '../../types/settings';
import { audioService } from '../../services/audioService';

export type ActiveTab = 'ielts' | 'genz' | 'universe' | 'action' | 'fishbone' | 'miniweb' | 'library' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  settings: AppSettings;
  onToggleSound: () => void;
  openSettingsModal: () => void;
  openGuideModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  settings,
  onToggleSound,
  openSettingsModal,
  openGuideModal
}) => {
  const [isRestarting, setIsRestarting] = useState(false);

  const handleRestart = async () => {
    setIsRestarting(true);
    audioService.playBeep('decision');

    if (window.electronAPI?.restartApp) {
      try {
        await window.electronAPI.restartApp();
      } catch {
        window.location.reload();
      }
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 flex items-center justify-between z-50 shrink-0 select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Orbit className="w-5 h-5 text-indigo-400 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-sm md:text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              IMAGINE STUDIO
            </h1>
            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-extrabold border border-indigo-500/30">
              ULTIMATE
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Gemini • ChatGPT • FB • Insta • Zalo • IELTS</p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="flex items-center bg-slate-900/80 p-1 rounded-2xl border border-slate-800/80 shadow-inner gap-1">
        {/* 1. MiniWeb Browser */}
        <button
          onClick={() => onTabChange('miniweb')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'miniweb'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-600/40 scale-[1.03] ring-1 ring-white/30'
              : 'text-cyan-300 hover:text-white hover:bg-slate-800/80 bg-blue-950/30 border border-blue-500/30'
            }`}
        >
          <span className="text-sm">🌐</span>
          <span>Mini Browser (AI & Social)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>

        {/* 2. IELTS Visual Map */}
        <button
          onClick={() => onTabChange('ielts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'ielts'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-300" />
          <span>IELTS Map</span>
        </button>

        {/* 3. GenZify Meme */}
        <button
          onClick={() => onTabChange('genz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'genz'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>GenZify</span>
        </button>

        {/* 4. Parallel Universe */}
        <button
          onClick={() => onTabChange('universe')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'universe'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <Orbit className="w-3.5 h-3.5 text-cyan-300" />
          <span>Universes</span>
        </button>

        {/* 5. Action Engine */}
        <button
          onClick={() => onTabChange('action')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'action'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <Flame className="w-3.5 h-3.5 text-rose-300" />
          <span>Action Engine</span>
        </button>

        {/* 6. Fishbone Evolution */}
        <button
          onClick={() => onTabChange('fishbone')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'fishbone'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <span className="text-sm">🐟</span>
          <span>Fishbone</span>
        </button>

        {/* 7. Library */}
        <button
          onClick={() => onTabChange('library')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'library'
              ? 'bg-slate-800 text-amber-300 shadow-md scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Thư Viện</span>
        </button>
      </nav>

      {/* Action utilities */}
      <div className="flex items-center gap-2">
        {/* Guide Button */}
        <button
          onClick={openGuideModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 hover:text-white text-xs font-bold transition shadow-sm"
          title="Hướng dẫn sử dụng chi tiết & mẹo nạp dữ liệu"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>Hướng Dẫn</span>
        </button>

        {/* Restart App Button */}
        <button
          onClick={handleRestart}
          disabled={isRestarting}
          title="Khởi động lại ứng dụng (Restart App)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition active:scale-95 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRestarting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isRestarting ? 'Đang restart...' : 'Restart'}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEffects ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
        >
          {settings.soundEffects ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={openSettingsModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-medium transition"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Cấu hình</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </div>
    </header>
  );
};
