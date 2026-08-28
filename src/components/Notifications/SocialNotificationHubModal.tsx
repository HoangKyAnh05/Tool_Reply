import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  Trash2, 
  CheckCheck, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  Filter, 
  Share2, 
  Heart, 
  Camera, 
  Send
} from 'lucide-react';
import { notificationService, SocialNotification } from '../../services/notificationService';
import { audioService } from '../../services/audioService';

interface SocialNotificationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToService: (platformId: string, link?: string) => void;
  onOpenAIReply: (initialMessage: string) => void;
}

export const SocialNotificationHubModal: React.FC<SocialNotificationHubModalProps> = ({
  isOpen,
  onClose,
  onNavigateToService,
  onOpenAIReply
}) => {
  const [notifications, setNotifications] = useState<SocialNotification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'facebook' | 'instagram' | 'zalo'>('all');

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((list) => {
      setNotifications(list);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'all') return true;
    return n.platform === selectedFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    audioService.playBeep('click');
    notificationService.markAllAsRead();
  };

  const handleClearAll = () => {
    audioService.playBeep('click');
    notificationService.clearAll();
  };

  const handleItemClick = (item: SocialNotification) => {
    audioService.playBeep('click');
    notificationService.markAsRead(item.id);
    onNavigateToService(item.platform, item.link);
    onClose();
  };

  const handleAIReplyClick = (e: React.MouseEvent, item: SocialNotification) => {
    e.stopPropagation();
    audioService.playBeep('decision');
    notificationService.markAsRead(item.id);
    onOpenAIReply(item.message || item.title);
    onClose();
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-500/50 text-blue-300 text-[10px] font-bold flex items-center gap-1">
            <span>📘</span> Facebook
          </span>
        );
      case 'instagram':
        return (
          <span className="px-2 py-0.5 rounded-full bg-pink-600/30 border border-pink-500/50 text-pink-300 text-[10px] font-bold flex items-center gap-1">
            <span>📸</span> Instagram
          </span>
        );
      case 'zalo':
        return (
          <span className="px-2 py-0.5 rounded-full bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 text-[10px] font-bold flex items-center gap-1">
            <span>💬</span> Zalo Web
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold">
            Hệ Thống
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Trung Tâm Thông Báo Đa Mạng Xã Hội
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-bounce">
                    {unreadCount} mới
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Tổng hợp tin nhắn, tương tác và bài viết mới từ Facebook, Instagram, Zalo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                title="Đánh dấu tất cả đã đọc"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Đã đọc tất cả</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition"
                title="Xóa tất cả thông báo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Platform Tabs Filter */}
        <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-950/30 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tất Cả ({notifications.length})
            </button>

            <button
              onClick={() => setSelectedFilter('facebook')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                selectedFilter === 'facebook'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📘</span> Facebook
            </button>

            <button
              onClick={() => setSelectedFilter('instagram')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                selectedFilter === 'instagram'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📸</span> Instagram
            </button>

            <button
              onClick={() => setSelectedFilter('zalo')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                selectedFilter === 'zalo'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>💬</span> Zalo
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Tự động đồng bộ theo thời gian thực
          </span>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-[55vh]">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-2">
              <Bell className="w-10 h-10 opacity-30 text-indigo-400" />
              <p className="text-sm font-semibold">Chưa có thông báo nào mới</p>
              <p className="text-xs text-slate-600">
                Các tin nhắn, bình luận và bài viết mới trên Facebook, Insta, Zalo sẽ tự động xuất hiện tại đây
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const timeString = new Date(item.timestamp).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 group relative hover:scale-[1.01] ${
                    item.isRead
                      ? 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700'
                      : 'bg-slate-950/90 border-indigo-500/40 shadow-lg shadow-indigo-950/50 hover:border-indigo-400'
                  }`}
                >
                  {!item.isRead && (
                    <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}

                  {/* Icon Avatar */}
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition shadow-inner">
                    {item.platform === 'facebook' ? '📘' : item.platform === 'instagram' ? '📸' : '💬'}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {getPlatformBadge(item.platform)}
                      <h4 className="text-xs font-bold text-white truncate max-w-sm">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono ml-auto">
                        {timeString}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.message || 'Bạn có thông báo mới.'}
                    </p>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/40">
                      <button
                        onClick={(e) => handleAIReplyClick(e, item)}
                        className="px-2.5 py-1 rounded-lg bg-pink-600/20 hover:bg-pink-600 border border-pink-500/40 text-pink-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
                        title="Dùng AI phân tích và tạo ngay lời nhắn đối đáp lại"
                      >
                        <Sparkles className="w-3 h-3 text-pink-400" />
                        <span>AI Gen Lời Đối Đáp</span>
                      </button>

                      <button
                        onClick={() => handleItemClick(item)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition"
                      >
                        <ExternalLink className="w-3 h-3 text-indigo-400" />
                        <span>Mở Trang</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-center text-[11px] text-slate-500 flex items-center justify-between px-6">
          <span>🔔 Tự động gom tin nhắn, tương tác từ các tab Facebook, Instagram, Zalo Web</span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
