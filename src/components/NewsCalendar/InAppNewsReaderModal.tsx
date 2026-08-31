import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Eye, 
  Share2, 
  BookOpen,
  Type,
  Globe
} from 'lucide-react';
import { DailyNewsItem } from '../../types/newsCalendar';
import { audioService } from '../../services/audioService';

interface InAppNewsReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: DailyNewsItem | null;
  allArticles: DailyNewsItem[];
  onSelectArticle: (article: DailyNewsItem) => void;
}

export const InAppNewsReaderModal: React.FC<InAppNewsReaderModalProps> = ({
  isOpen,
  onClose,
  article,
  allArticles,
  onSelectArticle
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  if (!isOpen || !article) return null;

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      audioService.playBeep('click');
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onSelectArticle(allArticles[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allArticles.length - 1) {
      audioService.playBeep('click');
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onSelectArticle(allArticles[currentIndex + 1]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${article.title}\n\n${article.summary}\n\n${article.content}\n\nNguồn: ${article.sourceName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    audioService.playBeep('click');
  };

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = `${article.title}. ${article.summary}. ${article.content}`;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-base sm:text-lg leading-relaxed';
      case 'xl':
        return 'text-lg sm:text-xl leading-loose';
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{article.topicIcon}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {article.topicLabel}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              • {article.sourceName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => {
                setFontSize((curr) => (curr === 'normal' ? 'large' : curr === 'large' ? 'xl' : 'normal'));
                audioService.playBeep('click');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition"
              title="Chỉnh cỡ chữ đọc"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>{fontSize === 'normal' ? 'Chữ vừa' : fontSize === 'large' ? 'Chữ to' : 'Chữ lớn'}</span>
            </button>

            {/* Audio Speech */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition shadow-sm ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Dừng đọc' : 'Nghe Audio'}</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              title="Sao chép bài báo"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* External Link to Real Web */}
            {article.sourceUrl && (
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  if (window.electronAPI?.openExternal) {
                    window.electronAPI.openExternal(article.sourceUrl);
                  } else {
                    window.open(article.sourceUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm"
                title="Mở bài báo gốc trên web báo thật"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden sm:inline">Mở Web Thật</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => {
                if (isSpeaking) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 custom-scrollbar select-text">
          {/* Article Header */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Tác giả: {article.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.publishedAt} ({article.readTime})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Eye className="w-3.5 h-3.5" />
                {article.viewsCount.toLocaleString()} lượt đọc
              </span>
            </div>
          </div>

          {/* Sapo / Quick Summary */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border-l-4 border-amber-500 text-slate-200 font-medium italic text-sm sm:text-base leading-relaxed">
            "{article.summary}"
          </div>

          {/* 3 Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>3 ĐIỂM CỐT LÕI BẠN CẦN NẮM RÕ (KEY TAKEAWAYS):</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {article.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Article Content */}
          <div className={`text-slate-300 space-y-4 font-normal ${getFontSizeClass()}`}>
            {article.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Footer Insights Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>GÓC NHÌN PHÂN TÍCH & BÀI HỌC ỨNG DỤNG:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Thông tin này mang ý nghĩa chiến lược cho các cá nhân và doanh nghiệp trong việc đón đầu làn sóng mới của chủ đề <b>{article.topicLabel}</b>. Việc theo dõi sát sao tin tức hàng ngày giúp bạn nắm bắt cơ hội trước đám đông.
            </p>
          </div>

          {/* Direct CTA to Real Web Article */}
          {article.sourceUrl && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Bài viết gốc từ tòa soạn: {article.sourceName}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Được xuất bản lúc {article.publishedAt}. Truy cập trang web chính thức để đọc thêm ảnh và bình luận độc giả.
                </p>
              </div>
              <button
                onClick={() => {
                  audioService.playBeep('click');
                  if (window.electronAPI?.openExternal) {
                    window.electronAPI.openExternal(article.sourceUrl);
                  } else {
                    window.open(article.sourceUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md shadow-cyan-600/30 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Mở Bài Báo Trên {article.sourceName}</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Pagination Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/80 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bài Trước</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            Bài {currentIndex + 1} / {allArticles.length} (Ngày: {article.date})
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex >= allArticles.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white text-xs font-bold transition"
          >
            <span>Bài Tiếp Theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
