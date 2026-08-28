import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Cpu, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Globe, 
  Volume2, 
  Palette,
  RefreshCw,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { AppSettings, AiProvider } from '../../types/settings';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [form, setForm] = useState<AppSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(form);
    onSaveSettings(form);
    setSaved(true);
    audioService.playBeep('success');
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleRestart = async () => {
    setIsRestarting(true);
    audioService.playBeep('decision');
    if (window.electronAPI?.restartApp) {
      await window.electronAPI.restartApp();
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ cài đặt về mặc định ban đầu?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">Cấu Hình AI & Hệ Thống</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Provider Selection */}
          <div className="space-y-2">
            <label className="font-bold text-slate-300 block">Chọn Động Cơ AI (AI Provider):</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'builtin', name: 'Built-in Engine (Offline/Miễn Phí)', desc: 'Tự động 100%, không cần API key' },
                { id: 'gemini', name: 'Google Gemini AI', desc: 'Gemini 1.5 Flash / Pro' },
                { id: 'openai', name: 'OpenAI GPT-4o', desc: 'GPT-4o / GPT-4o-mini' },
                { id: 'custom', name: 'Custom OpenAI Endpoint', desc: 'Local LLM / LMStudio / Ollama' }
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setForm({ ...form, aiProvider: p.id as AiProvider })}
                  className={`p-3 rounded-xl border text-left transition flex flex-col gap-0.5 ${
                    form.aiProvider === p.id
                      ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950/30'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-bold text-xs">{p.name}</span>
                  <span className="text-[10px] text-slate-500">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gemini API key */}
          {form.aiProvider === 'gemini' && (
            <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Google Gemini API Key:</span>
              </label>
              <input
                type="password"
                value={form.geminiApiKey}
                onChange={(e) => setForm({ ...form, geminiApiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500"
              />
            </div>
          )}

          {/* OpenAI API key */}
          {form.aiProvider === 'openai' && (
            <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>OpenAI API Key:</span>
              </label>
              <input
                type="password"
                value={form.openaiApiKey}
                onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Custom Endpoint */}
          {form.aiProvider === 'custom' && (
            <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-300">Custom Base URL:</label>
              <input
                type="text"
                value={form.customApiUrl}
                onChange={(e) => setForm({ ...form, customApiUrl: e.target.value })}
                placeholder="http://localhost:11434/v1"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Sound & Notifications */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <span className="font-bold text-slate-300 block">Hiệu ứng âm thanh (Sound Effects):</span>
              <span className="text-[11px] text-slate-500">Phát âm thanh nhẹ khi hoàn thành và đưa ra quyết định</span>
            </div>
            <input
              type="checkbox"
              checked={form.soundEffects}
              onChange={(e) => setForm({ ...form, soundEffects: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Restart & Reset System Options */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
              Quản Trị Hệ Thống:
            </span>

            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-200 block">Khởi Động Lại Ứng Dụng:</span>
                <span className="text-[11px] text-slate-500">Reload lại toàn bộ state và bộ nhớ cache</span>
              </div>
              <button
                type="button"
                onClick={handleRestart}
                disabled={isRestarting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRestarting ? 'animate-spin' : ''}`} />
                <span>{isRestarting ? 'Đang restart...' : 'Restart App'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <span className="font-bold text-rose-400 block">Xóa Cache & Reset Về Mặc Định:</span>
                <span className="text-[11px] text-slate-500">Khôi phục toàn bộ bài học, tasks, và dự án</span>
              </div>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-semibold transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Đóng
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>{saved ? 'Đã Lưu Cấu Hình!' : 'Lưu Cấu Hình'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
