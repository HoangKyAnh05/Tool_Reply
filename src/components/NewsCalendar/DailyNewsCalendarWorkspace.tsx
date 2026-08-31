import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Volume2, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Filter, 
  Flame, 
  ArrowUpRight, 
  Target, 
  Lightbulb, 
  Clock, 
  Eye, 
  Share2, 
  RefreshCw,
  Columns,
  BarChart2,
  Globe
} from 'lucide-react';
import { DailyNewsItem, DailySurgeDemand, DayNewsBundle } from '../../types/newsCalendar';
import { newsCalendarService } from '../../services/newsCalendarService';
import { InAppNewsReaderModal } from './InAppNewsReaderModal';
import { audioService } from '../../services/audioService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';

// Helper to format Date to YYYY-MM-DD
function formatDateToISO(d: Date): string {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to get formatted Vietnamese weekday
function getVietnameseWeekday(dateStr: string): string {
  const d = new Date(dateStr);
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[d.getDay()];
}

export const DailyNewsCalendarWorkspace: React.FC = () => {
  const todayISO = useMemo(() => formatDateToISO(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [activeViewMode, setActiveViewMode] = useState<'news' | 'demands' | 'dual'>('news');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingArticle, setReadingArticle] = useState<DailyNewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSyncingRss, setIsSyncingRss] = useState(false);
  const [isLoadingDate, setIsLoadingDate] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Bundle of the selected date
  const [bundle, setBundle] = useState<DayNewsBundle>(() => newsCalendarService.getBundleForDate(todayISO));

  // Tự động nạp tin tức bài báo của ngày được chọn và cập nhật danh sách ngay lập tức
  const handleSelectDate = (newDateIso: string) => {
    if (!newDateIso) return;
    audioService.playBeep('click');
    setIsLoadingDate(true);
    setSelectedDate(newDateIso);

    // Cuộn danh sách lên đầu
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Tải ngay bộ tin tức thật của ngày đó
    const newBundle = newsCalendarService.getBundleForDate(newDateIso);
    setBundle(newBundle);

    setTimeout(() => {
      setIsLoadingDate(false);
    }, 180);
  };

  // Sync bundle khi selectedDate thay đổi
  React.useEffect(() => {
    setBundle(newsCalendarService.getBundleForDate(selectedDate));
  }, [selectedDate]);

  // Generate 14-day date strip centered around selectedDate or today
  const dateStrip = useMemo(() => {
    const dates: Array<{ iso: string; dayNum: number; weekday: string; isToday: boolean }> = [];
    const base = new Date(selectedDate);
    for (let i = -7; i <= 6; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = formatDateToISO(d);
      dates.push({
        iso,
        dayNum: d.getDate(),
        weekday: getVietnameseWeekday(iso),
        isToday: iso === todayISO
      });
    }
    return dates;
  }, [selectedDate, todayISO]);

  // Filtered News
  const filteredNews = useMemo(() => {
    return bundle.news.filter((item) => {
      const matchTopic = selectedTopicFilter === 'all' || item.topic === selectedTopicFilter;
      const s = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(s) ||
        item.summary.toLowerCase().includes(s) ||
        item.topicLabel.toLowerCase().includes(s) ||
        item.sourceName.toLowerCase().includes(s);
      return matchTopic && matchSearch;
    });
  }, [bundle.news, selectedTopicFilter, searchTerm]);

  // Filtered Surge Demands
  const filteredDemands = useMemo(() => {
    return bundle.surgeDemands.filter((item) => {
      const s = searchTerm.toLowerCase();
      return (
        !searchTerm ||
        item.demandTitle.toLowerCase().includes(s) ||
        item.field.toLowerCase().includes(s) ||
        item.triggerReason.toLowerCase().includes(s) ||
        item.actionOpportunity.toLowerCase().includes(s) ||
        item.statSource.toLowerCase().includes(s) ||
        item.statProof.toLowerCase().includes(s)
      );
    });
  }, [bundle.surgeDemands, searchTerm]);

  const handleOpenExternal = (url: string) => {
    audioService.playBeep('click');
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    audioService.playBeep('click');
  };

  const handleSpeakShort = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleJumpDay = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    handleSelectDate(formatDateToISO(d));
  };

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    setIsFullscreen(!isFullscreen);
    await toggleNativeFullscreen();
  };

  const handleSyncLiveRss = async () => {
    setIsSyncingRss(true);
    audioService.playBeep('click');
    try {
      const updated = await newsCalendarService.syncLiveRssFeeds(selectedDate);
      setBundle(updated);
      audioService.playBeep('success');
    } catch (e) {
      console.error('Error syncing live RSS:', e);
    } finally {
      setIsSyncingRss(false);
    }
  };

  // Distinct topics list with count of real articles
  const topicList = useMemo(() => {
    const map = new Map<string, { id: string; label: string; icon: string; count: number }>();
    bundle.news.forEach((n) => {
      if (!map.has(n.topic)) {
        map.set(n.topic, { id: n.topic, label: n.topicLabel, icon: n.topicIcon, count: 0 });
      }
      map.get(n.topic)!.count++;
    });
    return Array.from(map.values());
  }, [bundle.news]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Bar: Title & Global Actions */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <CalendarIcon className="w-5 h-5 text-amber-400" />
            </span>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>Lịch Báo Tin Tức Thật & Radar Nhu Cầu Có Số Liệu Thật</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30 uppercase">
                100% Real Link & Data
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bấm chọn từng ngày: Mỗi chủ đề có <b>10 bài báo thật kèm link gốc mở web</b> (VnExpress, CafeF, Tuổi Trẻ) và <b>10 nhu cầu có số liệu thống kê thật</b> (Google Trends, Metric.vn, YouNet Media).
          </p>
        </div>

        {/* Action Buttons: Live RSS Sync, Mode Switcher, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Sync Live RSS Feed Button */}
          <button
            onClick={handleSyncLiveRss}
            disabled={isSyncingRss}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/40 hover:bg-blue-600 hover:text-white text-blue-200 text-xs font-bold transition shadow-sm"
            title="Đồng bộ trực tiếp RSS từ các tòa soạn báo lớn"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSyncingRss ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncingRss ? 'Đang tải RSS...' : 'Cập Nhật RSS Thật'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                audioService.playBeep('click');
                setActiveViewMode('news');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeViewMode === 'news'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Báo Thật (10 Bài/Chủ Đề)</span>
            </button>

            <button
              onClick={() => {
                audioService.playBeep('click');
                setActiveViewMode('demands');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeViewMode === 'demands'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Nhu Cầu Có Số Liệu Thật</span>
            </button>

            <button
              onClick={() => {
                audioService.playBeep('click');
                setActiveViewMode('dual');
              }}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeViewMode === 'dual'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xem song song cả 2 cột"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Song Song</span>
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Date Navigation & Horizontal Date Strip */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        {/* Fast Day Jump & Calendar Input */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleJumpDay(-1)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Hôm trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-extrabold text-amber-300 shadow-inner">
            <span>📅 {getVietnameseWeekday(selectedDate)}, {selectedDate}</span>
            {selectedDate === todayISO && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Hôm Nay
              </span>
            )}
          </div>

          <button
            onClick={() => handleJumpDay(1)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Hôm sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Quick Jump Today Button */}
          {selectedDate !== todayISO && (
            <button
              onClick={() => handleSelectDate(todayISO)}
              className="px-2.5 py-1.5 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-200 text-xs font-bold hover:bg-rose-600 hover:text-white transition cursor-pointer"
            >
              Về Hôm Nay
            </button>
          )}

          {/* Native HTML5 Date Picker for selecting any past or future date */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) {
                handleSelectDate(e.target.value);
              }
            }}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2 py-1 focus:outline-none cursor-pointer"
            title="Bấm để chọn bất kỳ ngày nào trong lịch"
          />
        </div>

        {/* Scrollable Horizontal 14-Day Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {dateStrip.map((item) => {
            const isSelected = item.iso === selectedDate;
            return (
              <button
                key={item.iso}
                onClick={() => handleSelectDate(item.iso)}
                className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-xl transition text-center shrink-0 min-w-[54px] border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-md ring-1 ring-amber-400/40 scale-105'
                    : item.isToday
                    ? 'bg-slate-900 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{item.weekday.slice(0, 5)}</span>
                <span className={`text-xs font-black ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                  {item.dayNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Topic Pill Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-950 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm bài báo thật, báo chí (VnExpress, CafeF), nguồn thống kê (Google Trends, Metric)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Topic filter for news: Each topic has 10 real articles */}
        {activeViewMode !== 'demands' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setSelectedTopicFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                selectedTopicFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({bundle.news.length} bài)
            </button>
            {topicList.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicFilter(t.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedTopicFilter === t.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label} ({t.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area: Tab Views or Dual View */}
      <div 
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar ${isFullscreen ? 'max-w-7xl mx-auto w-full' : ''}`}
      >
        {isLoadingDate ? (
          <div className="flex flex-col items-center justify-center py-28 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <RefreshCw className="w-7 h-7 text-amber-400 animate-spin" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-extrabold text-white">
                Đang tải dữ liệu bài báo thật ngày {selectedDate}...
              </h3>
              <p className="text-xs text-slate-400">
                Tự động đồng bộ tin tức thời sự chính thống từ tòa soạn VnExpress, CafeF, Tuổi Trẻ
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================= */}
            {/* DUAL VIEW (SONG SONG CẢ 2 CỘT TRÊN MÀN HÌNH LỚN) */}
            {/* ========================================================= */}
            {activeViewMode === 'dual' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: News Articles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-500/30">
                    <h3 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Bài Báo Thật Kèm Link Web ({filteredNews.length} bài)</span>
                    </h3>
                    <span className="text-xs text-slate-400">10 bài/chủ đề • Link VnExpress, CafeF</span>
                  </div>
                  <div className="space-y-3">
                    {filteredNews.map((article) => (
                      <NewsCard
                        key={article.id}
                        article={article}
                        onOpenReader={() => setReadingArticle(article)}
                        onOpenExternal={() => handleOpenExternal(article.sourceUrl)}
                        onCopy={() => handleCopy(article.id, `${article.title}\nLink: ${article.sourceUrl}`)}
                        isCopied={copiedId === article.id}
                        onSpeak={() => handleSpeakShort(article.id, `${article.title}. ${article.summary}`)}
                        isSpeaking={speakingId === article.id}
                      />
                    ))}
                  </div>
                </div>

                {/* Column 2: Surge Demands */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                    <h3 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Nhu Cầu Thật Có Số Liệu Thống Kê ({filteredDemands.length} nhu cầu)</span>
                    </h3>
                    <span className="text-xs text-slate-400">Link Google Trends, Metric, YouNet</span>
                  </div>
                  <div className="space-y-3">
                    {filteredDemands.map((demand) => (
                      <SurgeDemandCard
                        key={demand.id}
                        demand={demand}
                        onOpenExternal={() => handleOpenExternal(demand.statUrl)}
                        onCopy={() => handleCopy(demand.id, `${demand.demandTitle} (${demand.surgeRate})\nSố liệu: ${demand.statProof}\nNguồn: ${demand.statUrl}`)}
                        isCopied={copiedId === demand.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 1: BÀI BÁO TIN HOT (10 BÀI MỖI CHỦ ĐỀ KÈM LINK THẬT) */}
            {/* ========================================================= */}
            {activeViewMode === 'news' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <h2 className="text-base font-extrabold text-white">
                      Danh Sách Bài Báo Thật Ngày {selectedDate} ({filteredNews.length} bài báo kèm link web)
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:block">
                    Mỗi chủ đề có đủ 10 bài báo thật • Link báo chính thống VnExpress, CafeF, Tuổi Trẻ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredNews.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      onOpenReader={() => setReadingArticle(article)}
                      onOpenExternal={() => handleOpenExternal(article.sourceUrl)}
                      onCopy={() => handleCopy(article.id, `${article.title}\nLink: ${article.sourceUrl}`)}
                      isCopied={copiedId === article.id}
                      onSpeak={() => handleSpeakShort(article.id, `${article.title}. ${article.summary}`)}
                      isSpeaking={speakingId === article.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 2: 10 NHU CẦU CÓ SỐ LIỆU THỐNG KÊ THẬT */}
            {/* ========================================================= */}
            {activeViewMode === 'demands' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <h2 className="text-base font-extrabold text-white">
                      10 Nhu Cầu Thị Trường Tăng Đột Biến Có Thật ({filteredDemands.length} nhu cầu)
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:block">
                    Có bằng chứng số liệu thống kê & đường dẫn web thật từ Google Trends, Metric.vn, YouNet Media, GSO
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDemands.map((demand) => (
                    <SurgeDemandCard
                      key={demand.id}
                      demand={demand}
                      onOpenExternal={() => handleOpenExternal(demand.statUrl)}
                      onCopy={() => handleCopy(demand.id, `${demand.demandTitle} (${demand.surgeRate})\nSố liệu: ${demand.statProof}\nNguồn: ${demand.statUrl}`)}
                      isCopied={copiedId === demand.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* IN-APP FULL ARTICLE READER MODAL */}
      <InAppNewsReaderModal
        isOpen={Boolean(readingArticle)}
        onClose={() => setReadingArticle(null)}
        article={readingArticle}
        allArticles={bundle.news}
        onSelectArticle={(art) => setReadingArticle(art)}
      />
    </div>
  );
};

// ======================================================================
// SUB-COMPONENT: NEWS CARD (BÀI BÁO THẬT KÈM LINK GỐC MỞ WEB)
// ======================================================================
interface NewsCardProps {
  article: DailyNewsItem;
  onOpenReader: () => void;
  onOpenExternal: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onSpeak: () => void;
  isSpeaking: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onOpenReader,
  onOpenExternal,
  onCopy,
  isCopied,
  onSpeak,
  isSpeaking
}) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between space-y-3 group shadow-lg">
      <div className="space-y-2.5">
        {/* Top Tag & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">{article.topicIcon}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {article.topicLabel}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold truncate max-w-[140px]">
              • {article.sourceName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <button
              onClick={onSpeak}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isSpeaking
                  ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Nghe tóm tắt audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Sao chép tiêu đề và link"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Thumbnail & Title */}
        <div className="flex gap-3 items-start">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-20 h-20 object-cover rounded-xl border border-slate-800 shrink-0 group-hover:scale-105 transition duration-200"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          )}
          <div className="min-w-0 flex-1 space-y-1">
            <h3
              onClick={onOpenReader}
              className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition cursor-pointer leading-snug select-text line-clamp-2"
            >
              {article.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 select-text">
              {article.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info & Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs truncate max-w-[180px]">
          <Clock className="w-3 h-3 text-amber-400/80 shrink-0" />
          <span className="text-[11px] font-bold text-amber-200/90">
            {article.publishedAt}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Link mở web thật */}
          <button
            onClick={onOpenExternal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm"
            title={`Mở bài báo gốc trên ${article.sourceName}`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>Mở Web Thật</span>
            <ExternalLink className="w-3 h-3 text-cyan-300/80" />
          </button>

          {/* Đọc trong app */}
          <button
            onClick={onOpenReader}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition hover:scale-105 active:scale-95 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc Trong App</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================================
// SUB-COMPONENT: SURGE DEMAND CARD (NHU CẦU CÓ SỐ LIỆU THỐNG KÊ THẬT)
// ======================================================================
interface SurgeDemandCardProps {
  demand: DailySurgeDemand;
  onOpenExternal: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

const SurgeDemandCard: React.FC<SurgeDemandCardProps> = ({ demand, onOpenExternal, onCopy, isCopied }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-lg group">
      <div className="space-y-2.5">
        {/* Top Field & Surge Rate */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{demand.fieldIcon}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
              {demand.field}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-black text-xs flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {demand.surgeRate}
            </span>
            <button
              onClick={onCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Sao chép nhu cầu"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Demand Title */}
        <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition leading-snug select-text">
          {demand.demandTitle}
        </h3>

        {/* REAL STATISTICAL PROOF BOX */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-amber-300 font-extrabold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
              <span>SỐ LIỆU THỐNG KÊ THẬT:</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Nguồn: <b>{demand.statSource}</b>
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed font-semibold select-text">
            {demand.statProof}
          </p>
        </div>

        {/* Trigger Reason Box */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <Target className="w-3 h-3 text-emerald-400" />
            <span>NGUYÊN NHÂN TĂNG ĐỘT BIẾN:</span>
          </div>
          <p className="text-slate-300 leading-relaxed select-text">
            {demand.triggerReason}
          </p>
        </div>

        {/* Actionable Opportunity */}
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
            <Lightbulb className="w-3 h-3 text-emerald-400" />
            <span>CƠ HỘI HÀNH ĐỘNG / KINH DOANH:</span>
          </div>
          <p className="text-slate-200 leading-relaxed select-text">
            {demand.actionOpportunity}
          </p>
        </div>
      </div>

      {/* Footer Demographics & Direct Link to Real Statistic Source */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <span className="truncate max-w-[180px] text-[11px] text-slate-400">
          Đối tượng: <b className="text-slate-300">{demand.targetDemographic}</b>
        </span>

        {/* Real Source Link Button */}
        <button
          onClick={onOpenExternal}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white text-emerald-200 text-xs font-bold transition shadow-sm"
          title={`Xem nguồn số liệu thật trên ${demand.statSource}`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-300" />
          <span>Xem Nguồn Số Liệu</span>
          <ExternalLink className="w-3 h-3 text-emerald-300/80" />
        </button>
      </div>
    </div>
  );
};
