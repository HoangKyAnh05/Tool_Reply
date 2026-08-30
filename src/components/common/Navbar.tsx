import React, { useState, useEffect } from 'react';
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
  Globe,
  Bell,
  ExternalLink,
  Smartphone,
  PenTool
} from 'lucide-react';
import { AppSettings } from '../../types/settings';
import { audioService } from '../../services/audioService';
import { notificationService } from '../../services/notificationService';

export type ActiveTab = 'ielts' | 'writing' | 'genz' | 'universe' | 'action' | 'fishbone' | 'miniweb' | 'library' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onNavigateToMiniWeb?: (serviceId: string) => void;
  onOpen300Questions?: () => void;
  onOpenWritingBank?: () => void;
  onOpenMobileSimulator?: () => void;
  settings: AppSettings;
  onToggleSound: () => void;
  openSettingsModal: () => void;
  openGuideModal: () => void;
  openNotificationHub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onNavigateToMiniWeb,
  onOpen300Questions,
  onOpenWritingBank,
  onOpenMobileSimulator,
  settings,
  onToggleSound,
  openSettingsModal,
  openGuideModal,
  openNotificationHub
}) => {
  const [isRestarting, setIsRestarting] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((list) => {
      setUnreadNotifs(list.filter((n) => !n.isRead).length);
    });
    return () => unsubscribe();
  }, []);

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

  const handleOpenGitHubPage = () => {
    audioService.playBeep('click');
    const url = 'https://hoangkyanh05.github.io/Tool_Reply/';
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
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
          <p className="text-[10px] text-slate-400 font-medium">Gemini • ChatGPT • FB • Insta • Zalo • Hub</p>
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
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
          <span>IELTS Map</span>
        </button>

        {/* 2.5 IELTS Writing */}
        <button
          onClick={() => onTabChange('writing')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            activeTab === 'writing'
              ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 text-white shadow-md shadow-amber-600/30 scale-[1.02]'
              : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/60'
          }`}
        >
          <PenTool className="w-3.5 h-3.5 text-amber-400" />
          <span>Writing (600 Đề)</span>
        </button>

        {/* 3. GenZ Studio */}
        <button
          onClick={() => onTabChange('genz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'genz'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Gen Z Studio</span>
        </button>

        {/* 4. Action Engine */}
        <button
          onClick={() => onTabChange('action')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === 'action'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>Action Engine</span>
        </button>

        {/* 5. Fishbone */}
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

        {/* 6. Library */}
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
        {/* Quick Direct 1-Click Social Switchers */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('zalo');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-cyan-950/80 border border-transparent hover:border-cyan-500/40 text-cyan-300 text-xs font-bold transition hover:scale-105 active:scale-95"
            title="Mở ngay màn hình Zalo Web"
          >
            <span>💬</span>
            <span className="text-[11px]">Zalo</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('facebook');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-blue-950/80 border border-transparent hover:border-blue-500/40 text-blue-300 text-xs font-bold transition hover:scale-105 active:scale-95"
            title="Mở ngay màn hình Facebook"
          >
            <span>📘</span>
            <span className="text-[11px]">Facebook</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('instagram');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-pink-950/80 border border-transparent hover:border-pink-500/40 text-pink-300 text-xs font-bold transition hover:scale-105 active:scale-95"
            title="Mở ngay màn hình Instagram"
          >
            <span>📸</span>
            <span className="text-[11px]">Instagram</span>
          </button>
        </div>

        {/* Social Notification Hub Bell Button */}
        <button
          onClick={() => {
            audioService.playBeep('click');
            openNotificationHub();
          }}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 transition shadow-sm"
          title="Mở Trung Tâm Thông Báo Tập Trung (Facebook, Instagram, Zalo)"
        >
          <Bell className="w-4 h-4 text-indigo-400" />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-extrabold shadow-md animate-bounce">
              {unreadNotifs > 99 ? '99+' : unreadNotifs}
            </span>
          )}
        </button>

        {/* Quick Open 300 Questions Fullscreen Button */}
        {onOpen300Questions && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpen300Questions();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/40 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm hover:scale-105 active:scale-95"
            title="Mở to toàn màn hình Thư Viện 300 Câu Hỏi IELTS Speaking (Focus Mode)"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">📚 300 Câu Hỏi (Full)</span>
            <span className="xl:hidden">300 Câu</span>
          </button>
        )}

        {/* Quick Open Writing Bank Button */}
        {onOpenWritingBank && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpenWritingBank();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-purple-600/30 border border-amber-500/40 hover:bg-amber-600 hover:text-white text-amber-200 text-xs font-bold transition shadow-sm hover:scale-105 active:scale-95"
            title="Mở Thư Viện 600 Đề IELTS Writing Task 1 & 2"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">✍️ 600 Writing</span>
            <span className="xl:hidden">Writing</span>
          </button>
        )}

        {/* Quick Open Mobile Simulator for Projects Button */}
        {onOpenMobileSimulator && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpenMobileSimulator();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-indigo-600/30 border border-pink-500/40 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm hover:scale-105 active:scale-95"
            title="Mở Chế Độ Xem Điện Thoại Cho Các Dự Án (300 Từ, Sơ Đồ Xương Cá, Gen Z)"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-300" />
            <span className="hidden xl:inline">📱 Chế Độ Mobile</span>
            <span className="xl:hidden">📱 Mobile</span>
          </button>
        )}

        {/* Tool Imagine GitHub Page Button */}
        <button
          onClick={handleOpenGitHubPage}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs font-extrabold transition shadow-md shadow-indigo-600/30 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/20"
          title="Mở ứng dụng Tool Imagine trên GitHub Page (Web Version)"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Tool Imagine Web</span>
          <ExternalLink className="w-3 h-3 text-white/90" />
        </button>

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
