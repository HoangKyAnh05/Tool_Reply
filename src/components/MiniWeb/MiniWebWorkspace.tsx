import React, { useState, useRef, useEffect } from 'react';
import { 
  RefreshCw, 
  ExternalLink, 
  Maximize2, 
  Sparkles, 
  Bot, 
  Music, 
  Compass, 
  Globe, 
  Layout, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Key, 
  Home, 
  Zap, 
  Search, 
  CheckCircle2, 
  Columns2, 
  Send, 
  BrainCircuit, 
  Fish, 
  Orbit, 
  Play, 
  Copy, 
  Check, 
  Code, 
  FileText, 
  Camera, 
  MessageSquareHeart, 
  ImageUp, 
  Bug, 
  Plus,
  FolderOpen,
  ClipboardPaste
} from 'lucide-react';
import { audioService } from '../../services/audioService';
import { storageService } from '../../services/storageService';
import { aiService } from '../../services/aiService';
import { fishboneService } from '../../services/fishboneService';
import { ChatScreenshotAnalyzerModal } from './ChatScreenshotAnalyzerModal';
import { ScreenshotGalleryDrawer } from './ScreenshotGalleryDrawer';

const CHROME_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

const FIREFOX_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) rv:128.0) Gecko/20100101 Firefox/128.0';

export interface MiniWebService {
  id: string;
  name: string;
  url: string;
  icon: string;
  themeColor: string;
  badge?: string;
}

export const MINI_WEB_SERVICES: MiniWebService[] = [
  {
    id: 'gemini',
    name: 'Gemini Web',
    url: 'https://gemini.google.com',
    icon: '✨',
    themeColor: 'from-blue-600 to-indigo-600',
    badge: 'Google AI'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Web',
    url: 'https://chatgpt.com',
    icon: '🤖',
    themeColor: 'from-emerald-600 to-teal-600',
    badge: 'OpenAI'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com',
    icon: '📘',
    themeColor: 'from-blue-600 to-sky-600',
    badge: 'Meta'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com',
    icon: '📸',
    themeColor: 'from-pink-600 via-rose-600 to-amber-600',
    badge: 'Meta'
  },
  {
    id: 'zalo',
    name: 'Zalo Web',
    url: 'https://chat.zalo.me',
    icon: '💬',
    themeColor: 'from-blue-500 to-cyan-500',
    badge: 'Zalo'
  },
  {
    id: 'claude',
    name: 'Claude AI',
    url: 'https://claude.ai',
    icon: '🧠',
    themeColor: 'from-amber-600 to-orange-600',
    badge: 'Anthropic'
  },
  {
    id: 'suno',
    name: 'Suno Music',
    url: 'https://suno.com',
    icon: '🎵',
    themeColor: 'from-purple-600 to-pink-600',
    badge: 'Suno AI'
  },
  {
    id: 'imagine_web',
    name: 'Tool Imagine Web',
    url: 'https://hoangkyanh05.github.io/Tool_Reply/',
    icon: '✨',
    themeColor: 'from-violet-600 via-indigo-600 to-pink-600',
    badge: 'GitHub Page'
  }
];

interface MiniWebWorkspaceProps {
  initialServiceId?: string;
  activeServiceId?: string;
  onServiceChange?: (serviceId: string) => void;
  autoInjectPrompt?: string;
  targetUrl?: string;
  switchToken?: number;
}

export const MiniWebWorkspace: React.FC<MiniWebWorkspaceProps> = ({
  initialServiceId = 'gemini',
  activeServiceId: controlledServiceId,
  onServiceChange,
  autoInjectPrompt,
  targetUrl,
  switchToken
}) => {
  const [internalServiceId, setInternalServiceId] = useState<string>(controlledServiceId || initialServiceId);
  const activeServiceId = controlledServiceId || internalServiceId;
  const [loadedServiceIds, setLoadedServiceIds] = useState<string[]>(() => [activeServiceId || 'gemini']);
  const [quickPromptText, setQuickPromptText] = useState<string>('');
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState<boolean>(false);
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState<boolean>(false);
  const [latestScreenshotPath, setLatestScreenshotPath] = useState<string | null>(null);
  const webviewRefs = useRef<Record<string, any>>({});
  const quickImageInputRef = useRef<HTMLInputElement>(null);
  const activeService = MINI_WEB_SERVICES.find((s) => s.id === activeServiceId) || MINI_WEB_SERVICES[0];

  // Sync active service when navigating from notification or navbar
  useEffect(() => {
    const target = (controlledServiceId || initialServiceId || 'gemini').toLowerCase();
    setInternalServiceId(target);
    setLoadedServiceIds((prev) => (prev.includes(target) ? prev : [...prev, target]));

    if (targetUrl) {
      setTimeout(() => {
        const wv = webviewRefs.current[target];
        if (wv && typeof wv.loadURL === 'function') {
          wv.loadURL(targetUrl);
        }
      }, 100);
    }
  }, [controlledServiceId, initialServiceId, switchToken, targetUrl]);

  // Handle F12 shortcut for DevTools Console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        handleToggleDevTools();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Automatically trigger Auto Ctrl+V into Gemini whenever a new screenshot is taken (Instant!)
  useEffect(() => {
    if (window.electronAPI?.onFolderUpdated) {
      window.electronAPI.onFolderUpdated(async (folder: string) => {
        if (window.electronAPI?.scanFolderImages) {
          try {
            const res = await window.electronAPI.scanFolderImages(folder);
            if (res.files && res.files.length > 0) {
              const newestImg = res.files[0];
              setLatestScreenshotPath(newestImg.fullPath);

              // Auto switch to Gemini & paste instantly
              setInternalServiceId('gemini');
              onServiceChange?.('gemini');
              setLoadedServiceIds((prev) => (prev.includes('gemini') ? prev : [...prev, 'gemini']));
              
              setTimeout(() => {
                handleInjectAndSend('', undefined, false, newestImg.name, newestImg.fullPath);
                audioService.playBeep('success');
                setCopiedStatus(`⚡ Đã tự động dán ảnh chụp vào Gemini!`);
                setTimeout(() => setCopiedStatus(null), 3000);
              }, 50);
            }
          } catch (err) {
            console.error('Auto paste error on screenshot capture:', err);
          }
        }
      });
    }
  }, []);

  const handleToggleDevTools = () => {
    audioService.playBeep('click');
    const wv = webviewRefs.current[activeServiceId];
    if (wv && typeof wv.openDevTools === 'function') {
      if (wv.isDevToolsOpened && wv.isDevToolsOpened()) {
        wv.closeDevTools();
      } else {
        wv.openDevTools({ mode: 'detach' });
      }
    } else if (window.electronAPI?.toggleDevTools) {
      window.electronAPI.toggleDevTools();
    }
  };

  const handleQuickDirectImageUpload = async () => {
    audioService.playBeep('click');
    if (window.electronAPI?.selectImageFile) {
      const res = await window.electronAPI.selectImageFile();
      if (res && (res.filePath || res.base64)) {
        handleInjectAndSend('', undefined, false, res.fileName, res.filePath);
        setCopiedStatus(`✓ Đã nạp ảnh: ${res.fileName}`);
        setTimeout(() => setCopiedStatus(null), 3000);
      }
    } else {
      quickImageInputRef.current?.click();
    }
  };

  // Dedicated 1-Click: Auto Ctrl+V Latest Screenshot into Gemini (Super-Fast)
  const handlePasteLatestScreenshotToGemini = async () => {
    audioService.playBeep('decision');
    setInternalServiceId('gemini');
    onServiceChange?.('gemini');
    setLoadedServiceIds((prev) => (prev.includes('gemini') ? prev : [...prev, 'gemini']));

    let targetFile = latestScreenshotPath;

    if (!targetFile && window.electronAPI?.scanFolderImages) {
      const res = await window.electronAPI.scanFolderImages();
      if (res.files && res.files.length > 0) {
        targetFile = res.files[0].fullPath;
        setLatestScreenshotPath(targetFile);
      }
    }

    if (targetFile) {
      handleInjectAndSend('', undefined, false, 'latest_screenshot.png', targetFile);
      setCopiedStatus('✓ Đã dán ảnh mới chụp vào Gemini!');
      setTimeout(() => setCopiedStatus(null), 3000);
    } else {
      setCopiedStatus('Chưa có ảnh chụp nào trong thư mục.');
      setTimeout(() => setCopiedStatus(null), 2500);
    }
  };

  const handleFallbackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          handleInjectAndSend('', dataUrl, false, file.name);
          setCopiedStatus(`✓ Đã nạp ảnh: ${file.name}`);
          setTimeout(() => setCopiedStatus(null), 3500);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  // Script to scrape the latest AI response text & isolated code blocks from Gemini or ChatGPT
  const generateExtractLatestResponseScript = () => {
    return `
      (function() {
        let responseText = '';
        let codeBlocks = [];

        // 1. Check for Gemini Web responses
        const geminiResponses = document.querySelectorAll('message-content, .model-response-text, .response-container, model-response, [data-test-id="model-response"]');
        if (geminiResponses.length > 0) {
          const lastEl = geminiResponses[geminiResponses.length - 1];
          responseText = lastEl.innerText || lastEl.textContent || '';
          const codes = lastEl.querySelectorAll('pre code, pre, code-block');
          codes.forEach((c) => {
            if (c.innerText) codeBlocks.push(c.innerText.trim());
          });
        }

        // 2. Check for ChatGPT responses
        if (!responseText) {
          const chatgptResponses = document.querySelectorAll('[data-message-author-role="assistant"], .agent-turn');
          if (chatgptResponses.length > 0) {
            const lastEl = chatgptResponses[chatgptResponses.length - 1];
            responseText = lastEl.innerText || lastEl.textContent || '';
            const codes = lastEl.querySelectorAll('pre code, pre');
            codes.forEach((c) => {
              if (c.innerText) codeBlocks.push(c.innerText.trim());
            });
          }
        }

        // Fallback: Check general markdown content
        if (!responseText) {
          const generalMarkdown = document.querySelectorAll('.markdown');
          if (generalMarkdown.length > 0) {
            const lastEl = generalMarkdown[generalMarkdown.length - 1];
            responseText = lastEl.innerText || lastEl.textContent || '';
          }
        }

        return JSON.stringify({
          text: responseText.trim(),
          codeBlocks: codeBlocks
        });
      })();
    `;
  };

  // 100% Reliable Image & Prompt Injection
  const handleInjectAndSend = async (
    promptToSend: string, 
    imageBase64?: string, 
    autoSend: boolean = true,
    fileName: string = 'image.png',
    filePath?: string
  ) => {
    setIsInjecting(true);
    audioService.playBeep('decision');

    const wv = webviewRefs.current[activeServiceId];
    const wcId = (wv && typeof wv.getWebContentsId === 'function') ? wv.getWebContentsId() : undefined;

    if (window.electronAPI?.injectImageToWebview) {
      const success = await window.electronAPI.injectImageToWebview({
        webContentsId: wcId,
        filePath,
        dataUrl: imageBase64,
        promptText: promptToSend,
        autoSend
      });

      if (success) {
        setTimeout(() => {
          setIsInjecting(false);
          if (imageBase64 || filePath) {
            setCopiedStatus(`✓ Đã tự động Ctrl+V ảnh vào ô chat!`);
            setTimeout(() => setCopiedStatus(null), 4000);
          }
        }, autoSend ? 1200 : 400);
        return;
      }
    }

    if (imageBase64 && window.electronAPI?.copyImageToClipboard) {
      await window.electronAPI.copyImageToClipboard(imageBase64);
    }
    if (wv && typeof wv.paste === 'function') {
      wv.focus();
      wv.paste();
    }
    setIsInjecting(false);
  };

  const handleCopyLatestResponse = (extractOnlyCode = false) => {
    setIsCopying(true);
    audioService.playBeep('click');

    const wv = webviewRefs.current[activeServiceId];
    if (wv && typeof wv.executeJavaScript === 'function') {
      const script = generateExtractLatestResponseScript();
      wv.executeJavaScript(script)
        .then((rawResult: string) => {
          setIsCopying(false);
          try {
            const data = JSON.parse(rawResult);
            let contentToCopy = data.text;

            if (extractOnlyCode && data.codeBlocks?.length > 0) {
              contentToCopy = data.codeBlocks.join('\n\n// ──────────────\n\n');
            }

            if (contentToCopy) {
              navigator.clipboard.writeText(contentToCopy);
              audioService.playBeep('success');
              setCopiedStatus(extractOnlyCode ? 'Đã sao chép khối Code/JSON!' : 'Đã sao chép câu trả lời AI mới nhất!');
              setTimeout(() => setCopiedStatus(null), 3000);
            } else {
              setCopiedStatus('Chưa tìm thấy câu trả lời AI nào.');
              setTimeout(() => setCopiedStatus(null), 2500);
            }
          } catch {
            setCopiedStatus('Lỗi khi đọc câu trả lời.');
            setTimeout(() => setCopiedStatus(null), 2500);
          }
        })
        .catch(() => {
          setIsCopying(false);
          setCopiedStatus('Không thể trích xuất DOM.');
          setTimeout(() => setCopiedStatus(null), 2500);
        });
    } else {
      setIsCopying(false);
    }
  };

  useEffect(() => {
    if (autoInjectPrompt) {
      setTimeout(() => {
        handleInjectAndSend(autoInjectPrompt, undefined, true);
      }, 2500);
    }
  }, [autoInjectPrompt]);

  const handleSelectService = (serviceId: string) => {
    audioService.playBeep('click');
    setInternalServiceId(serviceId);
    onServiceChange?.(serviceId);
    setLoadedServiceIds((prev) => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
  };

  const handleReload = () => {
    audioService.playBeep('click');
    setIsLoading(true);
    const wv = webviewRefs.current[activeServiceId];
    if (wv && typeof wv.reload === 'function') {
      wv.reload();
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleGoBack = () => {
    const wv = webviewRefs.current[activeServiceId];
    if (wv && typeof wv.goBack === 'function') {
      wv.goBack();
    }
  };

  const handleGoForward = () => {
    const wv = webviewRefs.current[activeServiceId];
    if (wv && typeof wv.goForward === 'function') {
      wv.goForward();
    }
  };

  const handleOpenGoogleLogin = async () => {
    audioService.playBeep('decision');
    if (window.electronAPI?.openGoogleLogin) {
      await window.electronAPI.openGoogleLogin('https://accounts.google.com');
    } else {
      window.open('https://accounts.google.com', '_blank');
    }
  };

  const handleOpenSeparateWindow = async () => {
    audioService.playBeep('decision');
    if (window.electronAPI?.openSeparateWindow) {
      await window.electronAPI.openSeparateWindow({
        url: activeService.url,
        title: `${activeService.name} - Mini Browser`,
        width: 1280,
        height: 850
      });
    } else {
      window.open(activeService.url, '_blank', 'width=1280,height=850');
    }
  };

  // Preset Prompt Injections from other tabs
  const handleInjectIeltsPrompt = () => {
    const lesson = storageService.getCurrentIeltsLesson();
    const prompt = aiService.generateIeltsMasterPrompt({
      vocabListText: lesson.vocabList.map((v) => `${v.word} - ${v.meaning}`).join('\n'),
      readingText: lesson.topic,
      noOldVocab: false,
      partPreference: lesson.part
    });
    handleInjectAndSend(prompt, undefined, true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Top Browser Navigation Toolbar */}
      <div className="h-14 border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-md px-4 flex items-center justify-between z-20 shrink-0 gap-3">
        {/* Navigation & Bookmarks */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-0.5">
            <button
              onClick={handleGoBack}
              title="Quay lại (Back)"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleGoForward}
              title="Tiến tới (Forward)"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReload}
              title="Tải lại trang (Reload)"
              className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>

          {/* Social & AI Web Tabs (Gemini, ChatGPT, Facebook, Instagram, Zalo, Claude, Suno) */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar max-w-xl">
            {MINI_WEB_SERVICES.map((svc) => {
              const isSelected = svc.id === activeServiceId;
              return (
                <button
                  key={svc.id}
                  onClick={() => handleSelectService(svc.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r ' + svc.themeColor + ' text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{svc.icon}</span>
                  <span className="hidden sm:inline">{svc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Prompt Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInjectAndSend(quickPromptText, undefined, true);
            setQuickPromptText('');
          }}
          className="flex-1 max-w-xs mx-1 hidden md:block"
        >
          <div className="flex items-center bg-slate-950 border border-slate-800 hover:border-indigo-500/50 focus-within:border-indigo-500 rounded-xl px-2.5 py-1 text-xs text-slate-200 transition shadow-inner">
            <Zap className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0 animate-pulse" />
            <input
              type="text"
              value={quickPromptText}
              onChange={(e) => setQuickPromptText(e.target.value)}
              placeholder="Bắn prompt vào chat..."
              className="w-full bg-transparent border-0 outline-none text-slate-100 text-xs placeholder-slate-500 font-medium"
            />
            <button
              type="submit"
              disabled={isInjecting || !quickPromptText.trim()}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] shrink-0 transition disabled:opacity-40"
            >
              <Send className="w-2.5 h-2.5" />
              <span>Gửi</span>
            </button>
          </div>
        </form>

        {/* Right Tools: Copy Response Buttons & DevTools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* DevTools Button */}
          <button
            onClick={handleToggleDevTools}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-300 transition"
            title="Mở bảng kiểm tra lỗi Console / DevTools (Phím tắt F12)"
          >
            <Bug className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Copy Latest Response Button */}
          <button
            onClick={() => handleCopyLatestResponse(false)}
            disabled={isCopying}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition shadow-sm active:scale-95"
            title="Quét và sao chép câu trả lời AI mới nhất vào Clipboard"
          >
            {copiedStatus?.includes('AI') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden lg:inline">Sao Chép</span>
          </button>

          <button
            onClick={handleOpenGoogleLogin}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-600/20 border border-amber-500/40 hover:bg-amber-600 text-amber-300 hover:text-white text-xs font-bold transition shadow-sm"
            title="Đăng nhập tài khoản"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Đăng Nhập</span>
          </button>

          <button
            onClick={handleOpenSeparateWindow}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/30 hover:scale-105 active:scale-95 transition"
            title="Mở cửa sổ riêng"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Cửa Sổ Riêng</span>
          </button>
        </div>
      </div>

      {/* Quick Auto-Send Action Ribbons & Screenshot Gallery Button */}
      <div className="h-9 bg-slate-900/60 border-b border-slate-800/80 px-4 flex items-center justify-between text-xs shrink-0 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            ⚡ TIỆN ÍCH TIN NHẮN & PROMPT:
          </span>

          {/* DEDICATED BUTTON: TỰ ĐỘNG CTRL+V ẢNH VÀO GEMINI */}
          <button
            onClick={handlePasteLatestScreenshotToGemini}
            className="flex items-center gap-1 px-3 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-[11px] shadow-md hover:scale-105 active:scale-95 transition animate-pulse"
            title="Tự động lấy ảnh vừa chụp và dán (Ctrl+V) ngay vào ô chat Gemini"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-yellow-200" />
            <span>⚡ Dán Ngay Vào Gemini (Auto Ctrl+V)</span>
          </button>

          {/* BUTTON: Screenshot Analyzer & Message Generator */}
          <button
            onClick={() => setIsScreenshotModalOpen(true)}
            className="flex items-center gap-1 px-3 py-0.5 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm hover:scale-105 transition"
          >
            <Camera className="w-3.5 h-3.5 text-pink-200" />
            <span>📸 Phân Tích Tin Nhắn Zalo/FB & Gen Lời Đối Đáp</span>
          </button>

          {/* DEDICATED BUTTON: Bắn Ảnh Riêng (Chỉ Dán Ảnh Vào Chat) */}
          <button
            onClick={handleQuickDirectImageUpload}
            className="flex items-center gap-1 px-3 py-0.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 border border-amber-500/50 text-amber-200 hover:text-white font-bold text-[11px] shadow-sm hover:scale-105 transition"
            title="Mở hộp thoại Windows để chọn đúng file ảnh từ ổ cứng"
          >
            <ImageUp className="w-3.5 h-3.5 text-amber-400" />
            <span>📷 Chọn Ảnh Từ Máy</span>
          </button>

          {/* BUTTON: LIVE SCREENSHOT FOLDER GALLERY */}
          <button
            onClick={() => setIsGalleryDrawerOpen(!isGalleryDrawerOpen)}
            className={`flex items-center gap-1 px-3 py-0.5 rounded-lg font-bold text-[11px] shadow-sm hover:scale-105 transition ${
              isGalleryDrawerOpen
                ? 'bg-cyan-600 text-white'
                : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80'
            }`}
            title="Mở thanh xem trước toàn bộ ảnh chụp màn hình trong thư mục (Tự động cập nhật)"
          >
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>📂 Quét Thư Mục Ảnh (Live Sync)</span>
          </button>

          <button
            onClick={handleInjectIeltsPrompt}
            disabled={isInjecting}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-950 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/80 hover:text-white text-[11px] font-semibold transition"
          >
            <BrainCircuit className="w-3 h-3 text-indigo-400" />
            <span>🧠 Master IELTS</span>
          </button>

          <input
            type="file"
            ref={quickImageInputRef}
            accept="image/*"
            onChange={handleFallbackFileChange}
            className="hidden"
          />
        </div>

        {/* Dynamic Toast feedback */}
        {copiedStatus ? (
          <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-md animate-bounce">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{copiedStatus}</span>
          </span>
        ) : isInjecting ? (
          <span className="text-[11px] font-bold text-emerald-400 animate-pulse flex items-center gap-1 font-mono">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Đang dán ảnh vào Gemini...</span>
          </span>
        ) : null}
      </div>

      {/* Main Webview Multi-Instance Container (Lazy Loaded on Demand) */}
      <div className="flex-1 w-full h-full relative bg-slate-950 overflow-hidden">
        {MINI_WEB_SERVICES.map((svc) => {
          const isLoaded = loadedServiceIds.includes(svc.id);
          if (!isLoaded) return null;

          const isCurrent = svc.id === activeServiceId;
          const isGoogleService = svc.id === 'gemini';
          const uaToUse = isGoogleService ? FIREFOX_UA : CHROME_UA;

          return (
            <div
              key={svc.id}
              className={`w-full h-full absolute inset-0 ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none -z-10'
              }`}
            >
              <webview
                ref={(el) => {
                  if (el) webviewRefs.current[svc.id] = el;
                }}
                src={svc.url}
                partition="persist:ai_miniweb_session"
                allowpopups={true}
                useragent={uaToUse}
                className="w-full h-full border-0 bg-slate-950"
                style={{ width: '100%', height: '100%', display: 'flex' }}
              />
            </div>
          );
        })}
      </div>

      {/* Live Screenshot Folder Gallery Drawer */}
      <ScreenshotGalleryDrawer
        isOpen={isGalleryDrawerOpen}
        onClose={() => setIsGalleryDrawerOpen(false)}
        onSelectImage={(base64, fileName, filePath) => {
          handleInjectAndSend('', base64, false, fileName, filePath);
          setCopiedStatus(`✓ Đã nạp ảnh: ${fileName}`);
          setTimeout(() => setCopiedStatus(null), 3500);
        }}
        onAnalyzeImage={(base64, fileName) => {
          setIsGalleryDrawerOpen(false);
          setIsScreenshotModalOpen(true);
        }}
      />

      {/* Chat Screenshot Analyzer Modal */}
      <ChatScreenshotAnalyzerModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        onSendToChat={(prompt, imageBase64, autoSend = true) => {
          handleInjectAndSend(prompt, imageBase64, autoSend);
        }}
      />
    </div>
  );
};
