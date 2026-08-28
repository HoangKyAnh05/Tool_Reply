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
  ChevronUp,
  ChevronDown,
  Sparkles,
  FolderSearch
} from 'lucide-react';
import { audioService } from '../../services/audioService';

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
  const [currentFolder, setCurrentFolder] = useState<string>('Tự động quét toàn bộ thư mục ảnh...');
  const [images, setImages] = useState<ScannedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const loadImages = async (folder?: string) => {
    setIsLoading(true);
    if (window.electronAPI?.scanFolderImages) {
      try {
        const res = await window.electronAPI.scanFolderImages(folder);
        if (res.folder) {
          setCurrentFolder(res.folder);
        }
        setImages(res.files || []);
      } catch (e) {
        console.error('Scan folder error:', e);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadImages();
    }
  }, [isOpen]);

  // Auto update when new screenshot is saved
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
        loadImages(folder);
      }
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
      {/* Header */}
      <div className="h-10 border-b border-slate-800/80 px-4 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Thư Mục Ảnh Trên Máy:</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono truncate max-w-sm bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800" title={currentFolder}>
            {currentFolder}
          </span>
          <button
            onClick={handleChangeFolder}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white text-[11px] font-bold transition shrink-0"
          >
            <FolderSearch className="w-3.5 h-3.5" />
            <span>Đổi Thư Mục</span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => loadImages()}
            disabled={isLoading}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3 h-3 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Quét Lại</span>
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
        {images.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <ImageIcon className="w-8 h-8 opacity-40 text-cyan-400" />
            <p className="text-xs font-semibold">Chưa tìm thấy ảnh trong thư mục này. Bấm <span className="text-amber-300 font-bold">"Đổi Thư Mục"</span> ở trên để trỏ đúng vào thư mục bạn đang lưu ảnh trên máy tính!</p>
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
