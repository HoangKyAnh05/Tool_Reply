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
  PenTool,
  Calendar
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
  isSplitMode?: boolean;
  onToggleSplitMode?: () => void;
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
  isSplitMode = false,
  onToggleSplitMode,
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
    <header className="h-16 min-h-[4rem] max-h-16 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-2.5 sm:px-3 flex items-center justify-between z-50 shrink-0 select-none gap-2 w-full">
      {/* Scrollable Left & Middle Container (Brand + Tabs + Quick Links) */}
      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto no-scrollbar py-1">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Orbit className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-1">
              <h1 className="font-extrabold text-xs sm:text-sm tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent whitespace-nowrap">
                IMAGINE STUDIO
              </h1>
              <span className="text-[8px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono font-extrabold border border-indigo-500/30">
                ULTIMATE
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 shadow-inner gap-0.5 shrink-0">
          {/* 1. MiniWeb Browser */}
          <button
            onClick={() => onTabChange('miniweb')}
            title="Mini Browser (AI & Social Hub)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'miniweb'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-600/40 ring-1 ring-white/30'
                : 'text-cyan-300 hover:text-white hover:bg-slate-800/80 bg-blue-950/30 border border-blue-500/30'
              }`}
          >
            <span className="text-xs">🌐</span>
            <span>Mini Browser</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>

          {/* 2. IELTS Visual Map */}
          <button
            onClick={() => onTabChange('ielts')}
            title="IELTS Speaking Map (Visual Vocabulary)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'ielts'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>IELTS Map</span>
          </button>

          {/* 2.5 IELTS Writing */}
          <button
            onClick={() => onTabChange('writing')}
            title="IELTS Writing Task 1 & Task 2 (600 Đề Cam)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${
              activeTab === 'writing'
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 text-white shadow-md shadow-amber-600/30'
                : 'text-amber-400/90 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span>Writing (600 Đề)</span>
          </button>

          {/* 3. GenZ Studio */}
          <button
            onClick={() => onTabChange('genz')}
            title="Gen Z Studio"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'genz'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Gen Z</span>
          </button>

          {/* 4. Lịch Báo & Radar Nhu Cầu */}
          <button
            onClick={() => onTabChange('action')}
            title="Lịch Báo Tin Tức Hot & Radar Nhu Cầu Đột Biến"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'action'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Lịch Báo & Radar</span>
          </button>

          {/* 5. Fishbone */}
          <button
            onClick={() => onTabChange('fishbone')}
            title="Sơ Đồ Xương Cá Fishbone"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'fishbone'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
          >
            <span className="text-xs">🐟</span>
            <span>Fishbone</span>
          </button>

          {/* 6. Library */}
          <button
            onClick={() => onTabChange('library')}
            title="Thư Viện Dữ Liệu Lưu Trữ"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 whitespace-nowrap shrink-0 ${activeTab === 'library'
                ? 'bg-slate-800 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Thư Viện</span>
          </button>
        </nav>

        {/* Quick Open 300 Questions Button */}
        {onOpen300Questions && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpen300Questions();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:bg-purple-600 hover:text-white text-purple-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
            title="Mở kho 300 câu hỏi IELTS Speaking"
          >
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>300 Speaking</span>
          </button>
        )}

        {/* Quick Open Writing Bank Button */}
        {onOpenWritingBank && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpenWritingBank();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:bg-amber-600 hover:text-white text-amber-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
            title="Mở Thư Viện 600 Đề IELTS Writing Task 1 & 2"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span>600 Writing</span>
          </button>
        )}

        {/* Quick Open Mobile Simulator Button */}
        {onOpenMobileSimulator && (
          <button
            onClick={() => {
              audioService.playBeep('click');
              onOpenMobileSimulator();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-pink-950/40 border border-pink-500/40 hover:bg-pink-600 hover:text-white text-pink-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0"
            title="Mở Chế Độ Xem Điện Thoại Di Động"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-300" />
            <span>Mobile</span>
          </button>
        )}

        {/* Toggle Split Mode: Left Learning Workspace, Right MiniWeb Gemini */}
        <button
          onClick={() => {
            audioService.playBeep('decision');
            onToggleSplitMode?.();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer ${
            isSplitMode
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/30'
              : 'bg-blue-950/60 border-blue-500/40 text-blue-300 hover:text-white hover:bg-blue-600'
          }`}
          title="Chia đôi màn hình: 1 bên Học từ vựng / Đề bài, 1 bên MiniWeb Gemini"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-300" />
          <span>{isSplitMode ? '🌐 Đang Chia Đôi' : '🌐 Chia Đôi Gemini'}</span>
        </button>

        {/* Tool Imagine GitHub Web Page Button */}
        <button
          onClick={handleOpenGitHubPage}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs font-extrabold transition shadow-md shadow-indigo-600/30 whitespace-nowrap shrink-0 cursor-pointer ring-1 ring-white/20"
          title="Mở ứng dụng Web trên GitHub Pages"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>Web App</span>
          <ExternalLink className="w-3 h-3 text-white/80" />
        </button>
      </div>

      {/* PINNED RIGHT UTILITY BAR - NEVER OVERFLOWS, ALWAYS VISIBLE */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-2 border-l border-slate-800 bg-slate-950 z-30">
        {/* Quick Social Switchers */}
        <div className="hidden xl:flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800/80 gap-0.5 shrink-0">
          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('zalo');
            }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-lg hover:bg-cyan-950/80 text-cyan-300 text-xs font-bold transition"
            title="Mở ngay Zalo Web"
          >
            <span>💬</span>
            <span className="text-[11px] hidden 2xl:inline">Zalo</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('facebook');
            }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-lg hover:bg-blue-950/80 text-blue-300 text-xs font-bold transition"
            title="Mở ngay Facebook"
          >
            <span>📘</span>
            <span className="text-[11px] hidden 2xl:inline">FB</span>
          </button>

          <button
            onClick={() => {
              audioService.playBeep('click');
              onNavigateToMiniWeb?.('instagram');
            }}
            className="flex items-center gap-1 px-1.5 py-1 rounded-lg hover:bg-pink-950/80 text-pink-300 text-xs font-bold transition"
            title="Mở ngay Instagram"
          >
            <span>📸</span>
            <span className="text-[11px] hidden 2xl:inline">Insta</span>
          </button>
        </div>

        {/* Social Notification Hub Bell Button */}
        <button
          onClick={() => {
            audioService.playBeep('click');
            openNotificationHub();
          }}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 transition shadow-sm shrink-0"
          title="Trung Tâm Thông Báo (FB, Insta, Zalo)"
        >
          <Bell className="w-3.5 h-3.5 text-indigo-400" />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-rose-500 text-white text-[8px] font-extrabold shadow-md animate-bounce">
              {unreadNotifs > 99 ? '99+' : unreadNotifs}
            </span>
          )}
        </button>

        {/* HƯỚNG DẪN SỬ DỤNG - ALWAYS VISIBLE */}
        <button
          onClick={openGuideModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/50 hover:bg-indigo-600 hover:text-white text-indigo-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          title="Hướng dẫn sử dụng toàn bộ tính năng"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>Hướng Dẫn</span>
        </button>

        {/* RESTART APP BUTTON - ALWAYS VISIBLE */}
        <button
          onClick={handleRestart}
          disabled={isRestarting}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          title="Khởi động lại ứng dụng (Restart App)"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRestarting ? 'animate-spin' : ''}`} />
          <span>Restart</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={settings.soundEffects ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 shrink-0 transition cursor-pointer"
        >
          {settings.soundEffects ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={openSettingsModal}
          title="Cấu hình hệ thống"
          className="flex items-center gap-1 p-2 xl:px-2.5 xl:py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition shrink-0 cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Cài đặt</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </div>
    </header>
  );
};
