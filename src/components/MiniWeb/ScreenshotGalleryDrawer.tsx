import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  RefreshCw, 
  Image as ImageIcon, 
  Zap, 
  Camera, 
  Copy, 
  Check, 
  X, 
  Clock, 
  ExternalLink,
  FolderSearch,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { audioService } from '../../services/audioService';

const DEFAULT_TARGET_DIR = 'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video';

export interface ScannedImage {
  name: string;
  fullPath: string;
  mtime: number;
  size: number;
  base64: string;
}

interface ScreenshotGalleryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (base64: string, fileName: string) => void;
  onAnalyzeImage: (base64: string, fileName: string) => void;
}

export const ScreenshotGalleryDrawer: React.FC<ScreenshotGalleryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  onAnalyzeImage
}) => {
  const [currentFolder, setCurrentFolder] = useState<string>(() => {
    return localStorage.getItem('imagine_screenshot_folder') || DEFAULT_TARGET_DIR;
  });
  const [inputFolder, setInputFolder] = useState<string>(() => {
    return localStorage.getItem('imagine_screenshot_folder') || DEFAULT_TARGET_DIR;
  });
  const [images, setImages] = useState<ScannedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const loadImages = async (folderToScan?: string) => {
    setIsLoading(true);
    const target = folderToScan || currentFolder || DEFAULT_TARGET_DIR;
    if (window.electronAPI?.scanFolderImages) {
      try {
        const res = await window.electronAPI.scanFolderImages(target);
        const activeDir = res.folder || target;
        setCurrentFolder(activeDir);
        setInputFolder(activeDir);
        localStorage.setItem('imagine_screenshot_folder', activeDir);
        setImages(res.files || []);
      } catch (e) {
        console.error('Scan folder error:', e);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadImages(currentFolder);
    }
  }, [isOpen]);

  useEffect(() => {
    if (window.electronAPI?.onFolderUpdated) {
      window.electronAPI.onFolderUpdated((folder: string) => {
        loadImages(folder);
        audioService.playBeep('success');
      });
    }
  }, []);

  const handleChangeFolder = async () => {
    audioService.playBeep('click');
    if (window.electronAPI?.selectScreenshotFolder) {
      const folder = await window.electronAPI.selectScreenshotFolder();
      if (folder) {
        setCurrentFolder(folder);
        setInputFolder(folder);
        localStorage.setItem('imagine_screenshot_folder', folder);
        loadImages(folder);
      }
    }
  };

  const handleManualFolderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputFolder.trim()) {
      audioService.playBeep('click');
      loadImages(inputFolder.trim());
    }
  };

  const handleCopyImageToClipboard = async (img: ScannedImage, index: number) => {
    audioService.playBeep('click');
    if (window.electronAPI?.copyImageToClipboard) {
      await window.electronAPI.copyImageToClipboard(img.base64);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-64 border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl flex flex-col z-30 shrink-0 shadow-2xl transition-all">
      {/* Header with Direct Path Input & Native Picker */}
      <div className="h-11 border-b border-slate-800/80 px-4 flex items-center justify-between text-xs shrink-0 gap-2">
        <form onSubmit={handleManualFolderSubmit} className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 shrink-0">
            <Folder className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Thư Mục Ảnh:</span>
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 focus-within:border-cyan-500 rounded-lg px-2 py-1 flex-1 max-w-xl">
            <input
              type="text"
              value={inputFolder}
              onChange={(e) => setInputFolder(e.target.value)}
              placeholder="Nhập đường dẫn thư mục ảnh..."
              className="w-full bg-transparent border-0 outline-none text-slate-200 text-xs font-mono placeholder-slate-600"
            />
            <button
              type="submit"
              className="px-2.5 py-0.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] ml-1.5 shrink-0 transition"
            >
              Quét
            </button>
          </div>

          <button
            type="button"
            onClick={handleChangeFolder}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white text-[11px] font-bold transition shrink-0 shadow-sm"
            title="Mở cửa sổ chọn thư mục của Windows"
          >
            <FolderSearch className="w-3.5 h-3.5" />
            <span>📁 Chọn Thư Mục</span>
          </button>
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => loadImages(currentFolder)}
            disabled={isLoading}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3 h-3 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Làm Mới</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of scanned images */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-3 flex items-center gap-3 no-scrollbar">
        {isLoading ? (
          <div className="w-full flex items-center justify-center text-cyan-400 gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-xs font-bold font-mono">Đang quét ảnh trong thư mục...</span>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <ImageIcon className="w-8 h-8 opacity-40 text-cyan-400" />
            <p className="text-xs font-semibold">
              Chưa tìm thấy ảnh trong thư mục này. Hãy chụp màn hình mới (Win + Shift + S) để tự động xuất hiện tại đây!
            </p>
          </div>
        ) : (
          images.map((img, idx) => {
            const timeAgo = new Date(img.mtime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            return (
              <div
                key={img.fullPath + idx}
                className="w-44 h-full bg-slate-950 rounded-2xl border border-slate-800 hover:border-indigo-500/50 p-2 flex flex-col justify-between shrink-0 group transition-all hover:scale-[1.02] shadow-md"
              >
                {/* Thumbnail */}
                <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                  <img
                    src={img.base64}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] text-slate-300 font-mono">
                    {timeAgo}
                  </span>
                </div>

                {/* File info */}
                <p className="text-[10px] text-slate-300 font-medium truncate mt-1" title={img.name}>
                  {img.name}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-1">
                  <button
                    onClick={() => onSelectImage(img.base64, img.name)}
                    className="flex-1 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600 border border-amber-500/40 text-amber-200 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 transition"
                    title="Bắn thẳng ảnh này vào ô chat"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Dán Vào Chat</span>
                  </button>

                  <button
                    onClick={() => onAnalyzeImage(img.base64, img.name)}
                    className="p-1 rounded-lg bg-pink-600/30 hover:bg-pink-600 border border-pink-500/40 text-pink-200 hover:text-white transition"
                    title="Phân tích đối đáp tin nhắn"
                  >
                    <Camera className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleCopyImageToClipboard(img, idx)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Sao chép ảnh vào Clipboard"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
