import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink, 
  Send, 
  Zap, 
  Bot, 
  Copy, 
  Check, 
  X, 
  Maximize2, 
  Sparkles,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { audioService } from '../../services/audioService';

const FIREFOX_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0';

interface GeminiMiniWebPanelProps {
  onClose?: () => void;
  externalPrompt?: string;
  className?: string;
}

export const GeminiMiniWebPanel: React.FC<GeminiMiniWebPanelProps> = ({
  onClose,
  externalPrompt,
  className = ''
}) => {
  const [url, setUrl] = useState('https://gemini.google.com');
  const [activeTab, setActiveTab] = useState<'gemini' | 'chatgpt' | 'claude'>('gemini');
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const webviewRef = useRef<any>(null);

  const isElectron = Boolean(
    window.electronAPI?.isElectron ||
    (typeof window !== 'undefined' && (window as any).process?.versions?.electron) ||
    (typeof navigator !== 'undefined' && /electron/i.test(navigator.userAgent))
  );

  const getServiceUrl = (service: 'gemini' | 'chatgpt' | 'claude') => {
    switch (service) {
      case 'gemini': return 'https://gemini.google.com';
      case 'chatgpt': return 'https://chatgpt.com';
      case 'claude': return 'https://claude.ai';
    }
  };

  const handleSwitchService = (service: 'gemini' | 'chatgpt' | 'claude') => {
    audioService.playBeep('click');
    setActiveTab(service);
    const newUrl = getServiceUrl(service);
    setUrl(newUrl);
    if (webviewRef.current && typeof webviewRef.current.loadURL === 'function') {
      webviewRef.current.loadURL(newUrl);
    }
  };

  const handleInjectPrompt = (textToSend: string) => {
    if (!textToSend.trim()) return;
    audioService.playBeep('click');

    // Copy to clipboard first so user can also Ctrl+V anytime
    navigator.clipboard.writeText(textToSend);
    setCopiedStatus('✓ Đã nạp Prompt vào Clipboard & Webview!');
    setTimeout(() => setCopiedStatus(null), 3000);

    const wv = webviewRef.current;
    if (wv && typeof wv.executeJavaScript === 'function') {
      const escaped = JSON.stringify(textToSend);
      const injectScript = `
        (function() {
          const inputEl = document.querySelector('rich-textarea div.ql-editor, textarea, [contenteditable="true"]');
          if (inputEl) {
            inputEl.focus();
            if (inputEl.tagName.toLowerCase() === 'textarea') {
              inputEl.value = ${escaped};
            } else {
              inputEl.innerHTML = '<p>' + ${escaped}.replace(/\\n/g, '<br>') + '</p>';
            }
            inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          }
        })();
      `;
      wv.executeJavaScript(injectScript).catch(() => {});
      if (typeof wv.paste === 'function') {
        wv.focus();
      }
    }
  };

  // Sync external prompt when triggered from questions/vocabs
  useEffect(() => {
    if (externalPrompt) {
      setPromptInput(externalPrompt);
      handleInjectPrompt(externalPrompt);
    }
  }, [externalPrompt]);

  // Setup webview loading events
  useEffect(() => {
    const wv = webviewRef.current;
    if (!wv) return;

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    try {
      wv.addEventListener('did-start-loading', startLoading);
      wv.addEventListener('did-stop-loading', stopLoading);
    } catch (_) {}

    return () => {
      try {
        wv.removeEventListener('did-start-loading', startLoading);
        wv.removeEventListener('did-stop-loading', stopLoading);
      } catch (_) {}
    };
  }, []);

  const handleReload = () => {
    audioService.playBeep('click');
    setIsLoading(true);
    if (webviewRef.current && typeof webviewRef.current.reload === 'function') {
      webviewRef.current.reload();
    }
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleGoBack = () => {
    if (webviewRef.current && typeof webviewRef.current.goBack === 'function') {
      webviewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (webviewRef.current && typeof webviewRef.current.goForward === 'function') {
      webviewRef.current.goForward();
    }
  };

  const handleCopyCurrentPrompt = () => {
    if (!promptInput.trim()) return;
    navigator.clipboard.writeText(promptInput);
    audioService.playBeep('click');
    setCopiedStatus('✓ Đã chép Prompt!');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleOpenPopup = () => {
    const targetUrl = getServiceUrl(activeTab);
    window.open(targetUrl, '_blank', 'width=1200,height=800,menubar=no,toolbar=no,location=yes');
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 border-l border-slate-800 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Top Header Bar */}
      <div className="px-3 py-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
        {/* Left AI Switcher */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 bg-slate-950 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => handleSwitchService('gemini')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'gemini'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>✨</span>
              <span>Gemini</span>
            </button>

            <button
              onClick={() => handleSwitchService('chatgpt')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'chatgpt'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🤖</span>
              <span>ChatGPT</span>
            </button>

            <button
              onClick={() => handleSwitchService('claude')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'claude'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🧠</span>
              <span>Claude</span>
            </button>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-0.5 text-slate-400 ml-1">
            <button
              onClick={handleGoBack}
              title="Quay lại (Back)"
              className="p-1 hover:text-white rounded-md hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleGoForward}
              title="Tiến tới (Forward)"
              className="p-1 hover:text-white rounded-md hover:bg-slate-800 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReload}
              title="Tải lại trang (Reload)"
              className={`p-1 hover:text-white rounded-md hover:bg-slate-800 transition ${isLoading ? 'animate-spin text-blue-400' : ''}`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Close / Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleOpenPopup}
            title="Mở cửa sổ popup riêng biệt"
            className="px-2 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Cửa sổ Popup</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Tắt chia đôi màn hình Gemini"
              className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Prompt Injection Bar */}
      <div className="px-3 py-2 border-b border-slate-800/80 bg-slate-950/90 flex items-center gap-2 shrink-0">
        <div className="flex-1 relative flex items-center">
          <Zap className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 shrink-0 pointer-events-none" />
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleInjectPrompt(promptInput);
              }
            }}
            placeholder="Nội dung prompt gửi sang Gemini..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-24 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              onClick={handleCopyCurrentPrompt}
              title="Sao chép prompt này"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition text-[10px]"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleInjectPrompt(promptInput)}
              disabled={!promptInput.trim()}
              className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[10px] flex items-center gap-1 transition disabled:opacity-40 shadow-sm"
            >
              <Send className="w-2.5 h-2.5" />
              <span>Gửi Prompt</span>
            </button>
          </div>
        </div>

        {copiedStatus && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-lg shrink-0 animate-fadeIn">
            {copiedStatus}
          </span>
        )}
      </div>

      {/* Webview / Web Container */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-950">
        {isElectron ? (
          <webview
            ref={webviewRef}
            src={url}
            partition="persist:ai_miniweb_session"
            allowpopups={true}
            useragent={FIREFOX_UA}
            className="w-full h-full border-0 bg-slate-950"
            style={{ width: '100%', height: '100%', display: 'flex' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl shadow-xl">
              ✨
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Gemini MiniWeb (Trình duyệt Web)</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Đang chạy trên nền tảng Web. Bạn có thể mở Gemini song song bằng cửa sổ popup riêng biệt.
              </p>
            </div>
            <button
              onClick={handleOpenPopup}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở Gemini trong Cửa sổ Popup</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
