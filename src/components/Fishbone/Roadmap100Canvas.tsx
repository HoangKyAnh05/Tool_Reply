import React, { useState, useMemo, useRef } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Upload,
  Video,
  Image as ImageIcon,
  Play,
  CheckCircle2,
  Circle,
  FileJson,
  Download,
  RotateCcw,
  SlidersHorizontal,
  Search,
  ExternalLink,
  Trash2,
  Maximize2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  Compass,
  Camera,
  Film
} from 'lucide-react';
import { RoadmapDayItem, Roadmap100Data } from '../../types/roadmap100';
import { roadmap100Service } from '../../services/roadmap100Service';
import { audioService } from '../../services/audioService';
import { PasteRoadmapJsonModal } from './PasteRoadmapJsonModal';

export const Roadmap100Canvas: React.FC = () => {
  // Main Data State
  const [roadmapData, setRoadmapData] = useState<Roadmap100Data>(() => roadmap100Service.loadRoadmap());
  const [topicInput, setTopicInput] = useState<string>(() => roadmapData.topic || '100 ngày xây kênh TikTok bán nước hoa từ 0 lên 100k follower');
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<'all' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'todo' | 'completed'>('all');
  
  // Modals & Popups
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeMediaModal, setActiveMediaModal] = useState<{ url: string; type: 'image' | 'video'; title: string } | null>(null);

  // Hidden File Inputs references
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const btsFileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetUploadDay, setTargetUploadDay] = useState<number | null>(null);

  // Calculate Progress
  const totalDays = roadmapData.days.length;
  const completedCount = useMemo(() => {
    return roadmapData.days.filter((d) => d.status === 'completed').length;
  }, [roadmapData.days]);
  const progressPercent = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  // Filter items
  const filteredDays = useMemo(() => {
    return roadmapData.days.filter((item) => {
      // Stage filter
      let matchStage = true;
      if (selectedStage === 'stage1') matchStage = item.day >= 1 && item.day <= 25;
      else if (selectedStage === 'stage2') matchStage = item.day >= 26 && item.day <= 50;
      else if (selectedStage === 'stage3') matchStage = item.day >= 51 && item.day <= 75;
      else if (selectedStage === 'stage4') matchStage = item.day >= 76 && item.day <= 100;
      else if (selectedStage === 'todo') matchStage = item.status !== 'completed';
      else if (selectedStage === 'completed') matchStage = item.status === 'completed';

      // Search filter
      const s = searchTerm.toLowerCase().trim();
      const matchSearch =
        !s ||
        item.title.toLowerCase().includes(s) ||
        item.taskAction.toLowerCase().includes(s) ||
        item.bts.description.toLowerCase().includes(s) ||
        item.benefit.toLowerCase().includes(s) ||
        item.day.toString() === s;

      return matchStage && matchSearch;
    });
  }, [roadmapData.days, selectedStage, searchTerm]);

  // Group into Serpentine Rows (3 items per row for comfortable width & spacing)
  const ITEMS_PER_ROW = 3;
  const rows = useMemo(() => {
    const r: RoadmapDayItem[][] = [];
    for (let i = 0; i < filteredDays.length; i += ITEMS_PER_ROW) {
      r.push(filteredDays.slice(i, i + ITEMS_PER_ROW));
    }
    return r;
  }, [filteredDays]);

  // Update Single Day Helper
  const updateDay = (dayNum: number, updater: (prev: RoadmapDayItem) => RoadmapDayItem) => {
    setRoadmapData((prev) => {
      const updatedDays = prev.days.map((d) => (d.day === dayNum ? updater(d) : d));
      const nextData: Roadmap100Data = { ...prev, days: updatedDays, updatedAt: new Date().toISOString() };
      roadmap100Service.saveRoadmap(nextData);
      return nextData;
    });
  };

  // Toggle Status
  const handleToggleStatus = (dayNum: number) => {
    audioService.playBeep('click');
    updateDay(dayNum, (prev) => {
      const nextStatus = prev.status === 'completed' ? 'todo' : 'completed';
      return {
        ...prev,
        status: nextStatus,
        completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined
      };
    });
  };

  // Handle Main Center Media Upload (File upload)
  const handleTriggerUpload = (dayNum: number) => {
    setTargetUploadDay(dayNum);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || targetUploadDay === null) return;

    audioService.playBeep('decision');
    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      updateDay(targetUploadDay, (prev) => ({
        ...prev,
        centerMedia: {
          type: isVideo ? 'video' : 'image',
          url: resultUrl,
          name: file.name
        }
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle BTS Image Upload
  const handleTriggerBtsUpload = (dayNum: number) => {
    setTargetUploadDay(dayNum);
    btsFileInputRef.current?.click();
  };

  const handleBtsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || targetUploadDay === null) return;

    audioService.playBeep('decision');
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      updateDay(targetUploadDay, (prev) => ({
        ...prev,
        bts: {
          ...prev.bts,
          imageUrl: resultUrl
        }
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Copy AI Prompt
  const handleCopyPrompt = () => {
    audioService.playBeep('click');
    const prompt = roadmap100Service.generatePrompt100Days(topicInput);
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Apply JSON from Modal
  const handleApplyJsonDays = (newDays: RoadmapDayItem[]) => {
    const updated: Roadmap100Data = {
      ...roadmapData,
      topic: topicInput,
      days: newDays,
      updatedAt: new Date().toISOString()
    };
    setRoadmapData(updated);
    roadmap100Service.saveRoadmap(updated);
  };

  // Reset to auto-generated sample
  const handleRegenerateSample = () => {
    audioService.playBeep('decision');
    if (window.confirm('Bạn có muốn tạo mới toàn bộ 100 ngày mẫu theo chủ đề hiện tại không?')) {
      const sample = roadmap100Service.generateSample100Days(topicInput);
      setRoadmapData(sample);
      roadmap100Service.saveRoadmap(sample);
    }
  };

  // Export JSON file
  const handleExportJson = () => {
    audioService.playBeep('click');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roadmapData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lo-trinh-100-ngay-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none flex flex-col">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
      <input
        type="file"
        ref={btsFileInputRef}
        onChange={handleBtsFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-96 rounded-full blur-3xl pointer-events-none opacity-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600" />

      {/* ========================================================================= */}
      {/* 1. TOP TOOLBAR: Input Topic & Actions */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-4 pb-5 border-b border-slate-800/80 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 border border-cyan-400/40 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 text-white">
              🛣️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                  <span>Đường Ray Lộ Trình 100 Ngày</span>
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {roadmapData.days.length} NGÀY • {rows.length} TẦNG RAY
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Đường ray uốn lượn zíc zắc: Trên (Nhiệm vụ quay/chụp) • Giữa (Đẩy ảnh/video) • Phải (Hậu trường BTS) • Trái (Lợi ích)
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Prompt AI */}
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition shadow-sm"
              title="Copy Prompt gửi cho ChatGPT / Claude / Gemini để tạo 100 ngày theo chủ đề"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Đã copy Prompt AI!' : '📋 Copy Prompt AI'}</span>
            </button>

            {/* Paste JSON */}
            <button
              onClick={() => {
                audioService.playBeep('click');
                setIsPasteModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition shadow-sm"
              title="Dán kết quả JSON từ AI vào ứng dụng"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>📥 Dán JSON</span>
            </button>

            {/* Regenerate Sample */}
            <button
              onClick={handleRegenerateSample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition shadow-sm"
              title="Tạo lại 100 ngày mẫu sinh động theo chủ đề"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tạo Mẫu Tức Thì</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition shadow-sm"
              title="Tải file JSON lộ trình về máy"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất File</span>
            </button>
          </div>
        </div>

        {/* Topic Input Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-inner">
          <span className="text-xs font-bold text-slate-400 px-2 shrink-0 flex items-center gap-1.5">
            <span>🎯 Chủ đề 100 ngày:</span>
          </span>
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Nhập chủ đề công việc, video, ảnh cần làm trong 100 ngày..."
            className="flex-1 bg-transparent px-2 py-1 text-xs font-semibold text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button
            onClick={() => {
              audioService.playBeep('click');
              const updated = { ...roadmapData, topic: topicInput };
              setRoadmapData(updated);
              roadmap100Service.saveRoadmap(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600 border border-cyan-500/50 text-cyan-200 hover:text-white text-xs font-bold transition"
          >
            Lưu Chủ Đề
          </button>
        </div>

        {/* Progress Bar & Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Progress percentage */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>Tiến độ hoàn thành:</span>
              <span className="text-cyan-400 font-mono">{completedCount}/{totalDays} Ngày ({progressPercent}%)</span>
            </div>
            <div className="w-36 sm:w-48 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stage Filters */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'Tất cả 100 Ngày' },
              { id: 'stage1', label: 'GĐ 1 (1-25)' },
              { id: 'stage2', label: 'GĐ 2 (26-50)' },
              { id: 'stage3', label: 'GĐ 3 (51-75)' },
              { id: 'stage4', label: 'GĐ 4 (76-100)' },
              { id: 'todo', label: 'Chưa làm' },
              { id: 'completed', label: 'Đã xong' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  audioService.playBeep('click');
                  setSelectedStage(tab.id as any);
                }}
                className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
                  selectedStage === tab.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SERPENTINE WINDING ROADMAP TRACK (Đường ray uốn lượn hình sin zíc zắc) */}
      {/* ========================================================================= */}
      <div className="py-6 flex flex-col gap-10 relative z-10">
        {/* Ga Đầu (Start Station) */}
        <div className="w-full flex items-center justify-center">
          <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 border border-cyan-400/40 flex items-center gap-2">
            <span>🏁</span>
            <span>KHỞI ĐẦU HÀNH TRÌNH 100 NGÀY • START LINE</span>
            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-md font-mono">
              Day 01 Baseline
            </span>
          </div>
        </div>

        {/* Winding Rows */}
        {rows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0; // Even rows: Left -> Right, Odd rows: Right -> Left
          const isLastRow = rowIndex === rows.length - 1;
          const displayItems = isEven ? rowItems : [...rowItems].reverse();

          return (
            <div key={rowIndex} className="relative py-4">
              {/* Central Glowing Track Spine Beam (Thanh ray trung tâm) */}
              <div
                className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3.5 rounded-full z-0 shadow-lg"
                style={{
                  background: isEven
                    ? 'linear-gradient(90deg, #06b6d4, #6366f1, #a855f7)'
                    : 'linear-gradient(270deg, #06b6d4, #6366f1, #a855f7)',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                }}
              >
                {/* Railway Sleepers / Ties Texture (Thanh Tà Vẹt Đường Ray) */}
                <div className="w-full h-full opacity-40 flex items-center justify-around px-4">
                  {Array.from({ length: 24 }).map((_, tieIdx) => (
                    <div key={tieIdx} className="w-1 h-full bg-slate-950 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Connecting Half-Circle Track Curve (Khúc cua uốn lượn nối sang tầng tiếp theo) */}
              {!isLastRow &&
                (isEven ? (
                  /* Right Side Half-Circle Turn Curve */
                  <div className="absolute -right-3 top-1/2 w-16 h-36 border-r-4 border-t-4 border-b-4 border-indigo-500/80 rounded-r-full pointer-events-none z-0 shadow-lg shadow-indigo-500/30">
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono font-extrabold text-cyan-300 bg-slate-950 px-1 rounded border border-cyan-500/30">
                      ↷
                    </div>
                  </div>
                ) : (
                  /* Left Side Half-Circle Turn Curve */
                  <div className="absolute -left-3 top-1/2 w-16 h-36 border-l-4 border-t-4 border-b-4 border-indigo-500/80 rounded-l-full pointer-events-none z-0 shadow-lg shadow-indigo-500/30">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-mono font-extrabold text-cyan-300 bg-slate-950 px-1 rounded border border-cyan-500/30">
                      ↶
                    </div>
                  </div>
                ))}

              {/* Items in this row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 px-2 sm:px-4">
                {displayItems.map((item) => {
                  const isCompleted = item.status === 'completed';

                  return (
                    <div
                      key={item.day}
                      className="flex flex-col items-center group relative transition-transform duration-200 hover:scale-[1.01]"
                    >
                      {/* ========================================================= */}
                      {/* 1. TOP RIB: Việc cần quay, chụp, làm gì (BÊN TRÊN)        */}
                      {/* ========================================================= */}
                      <div className="w-full mb-3 flex flex-col items-center">
                        <div className={`w-full bg-slate-950/90 border ${
                          isCompleted ? 'border-emerald-500/50' : 'border-slate-800 group-hover:border-cyan-500/60'
                        } rounded-2xl p-3.5 shadow-xl backdrop-blur-md transition`}>
                          {/* Header: Day Badge & Category */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className={`text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              <span>NGÀY {item.day.toString().padStart(2, '0')}</span>
                            </span>

                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-indigo-300 border border-slate-700">
                              {item.category || 'Video ngắn'}
                            </span>
                          </div>

                          {/* Task Action: Việc cần quay chụp làm gì */}
                          <div className="text-xs font-bold text-white mb-1 leading-snug line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-cyan-200/90 bg-cyan-950/30 p-2 rounded-xl border border-cyan-800/30 leading-relaxed">
                            <span className="font-bold text-amber-300">🎯 Cần quay/chụp: </span>
                            {item.taskAction}
                          </div>
                        </div>

                        {/* Top Rib Bone Link */}
                        <div className="w-0.5 h-3 bg-cyan-500/60 shadow-sm" />
                      </div>

                      {/* ========================================================= */}
                      {/* 2. CENTRAL NODE ON SPINE: Đẩy file ảnh hoặc video (Ở GIỮA) */}
                      {/* ========================================================= */}
                      <div className="relative z-10 w-full flex flex-col items-center my-1">
                        {/* Glowing Station Circle */}
                        <div className="flex items-center gap-2 bg-slate-950/95 border border-indigo-500/60 px-3 py-1.5 rounded-full shadow-lg shadow-indigo-500/20 mb-2">
                          <button
                            onClick={() => handleToggleStatus(item.day)}
                            className="flex items-center gap-1.5 text-xs font-bold transition hover:opacity-80"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                            <span className={isCompleted ? 'text-emerald-300' : 'text-slate-300'}>
                              {isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                            </span>
                          </button>
                        </div>

                        {/* Media Upload & Preview Box (Khung Đẩy Ảnh / Video) */}
                        <div className="w-full max-w-[280px] bg-slate-950 border border-slate-800 group-hover:border-indigo-500/50 rounded-2xl p-2 shadow-2xl flex flex-col items-center">
                          {item.centerMedia && item.centerMedia.url ? (
                            <div className="w-full relative rounded-xl overflow-hidden group/media aspect-video bg-black flex items-center justify-center">
                              {item.centerMedia.type === 'video' ? (
                                <video
                                  src={item.centerMedia.url}
                                  className="w-full h-full object-cover"
                                  controls={false}
                                />
                              ) : (
                                <img
                                  src={item.centerMedia.url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              )}

                              {/* Hover Overlay with Preview and Change Button */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/media:opacity-100 flex items-center justify-center gap-2 transition">
                                <button
                                  onClick={() =>
                                    setActiveMediaModal({
                                      url: item.centerMedia.url,
                                      type: item.centerMedia.type === 'video' ? 'video' : 'image',
                                      title: `Ngày ${item.day}: ${item.title}`
                                    })
                                  }
                                  className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition"
                                  title="Xem toàn màn hình"
                                >
                                  <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleTriggerUpload(item.day)}
                                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
                                  title="Thay đổi file"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() =>
                                    updateDay(item.day, (prev) => ({
                                      ...prev,
                                      centerMedia: { type: 'none', url: '', name: '' }
                                    }))
                                  }
                                  className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition"
                                  title="Xóa file"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Media Type Badge */}
                              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-cyan-300 border border-white/10 flex items-center gap-1">
                                {item.centerMedia.type === 'video' ? <Film className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                                <span>{item.centerMedia.type === 'video' ? 'VIDEO' : 'ẢNH'}</span>
                              </span>
                            </div>
                          ) : (
                            /* Empty state: Upload prompt */
                            <button
                              onClick={() => handleTriggerUpload(item.day)}
                              className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-800 hover:border-cyan-500/60 bg-slate-900/40 hover:bg-cyan-950/20 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-cyan-300 transition"
                            >
                              <Upload className="w-5 h-5 text-cyan-400/80" />
                              <span className="text-[11px] font-bold">+ Đẩy file ảnh hoặc video</span>
                              <span className="text-[9px] text-slate-500">(MP4, WebM, PNG, JPG)</span>
                            </button>
                          )}
                        </div>

                        {/* Bottom Rib Bone Link */}
                        <div className="w-0.5 h-3 bg-indigo-500/60 shadow-sm" />
                      </div>

                      {/* ========================================================= */}
                      {/* 3. WING BOTTOM: Trái (Lợi ích) & Phải (Hậu trường BTS)      */}
                      {/* ========================================================= */}
                      <div className="w-full grid grid-cols-2 gap-2 mt-1">
                        {/* LEFT WING: Lợi ích sau khi hoàn thành (BÊN TRÁI) */}
                        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1 mb-1">
                              <span>💎</span>
                              <span>LỢI ÍCH ĐẠT ĐƯỢC:</span>
                            </div>
                            <div className="text-[10px] text-slate-300 leading-snug line-clamp-3">
                              {item.benefit}
                            </div>
                          </div>
                        </div>

                        {/* RIGHT WING: Mô tả hậu trường & Đẩy ảnh BTS (BÊN PHẢI) */}
                        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] font-extrabold text-purple-400 flex items-center justify-between gap-1 mb-1">
                              <span className="flex items-center gap-1">
                                <span>🎬</span>
                                <span>HẬU TRƯỜNG:</span>
                              </span>
                              <button
                                onClick={() => handleTriggerBtsUpload(item.day)}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 text-purple-200 transition"
                                title="Đẩy ảnh hậu trường làm việc lên"
                              >
                                + Ảnh BTS
                              </button>
                            </div>
                            <div className="text-[10px] text-slate-300 leading-snug line-clamp-3 mb-1">
                              {item.bts.description}
                            </div>
                          </div>

                          {/* BTS Image Thumbnail (nếu có) */}
                          {item.bts.imageUrl && (
                            <div className="mt-1 relative rounded-lg overflow-hidden h-12 bg-black border border-purple-500/40">
                              <img
                                src={item.bts.imageUrl}
                                alt="Hậu trường"
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() =>
                                  setActiveMediaModal({
                                    url: item.bts.imageUrl!,
                                    type: 'image',
                                    title: `Hậu trường Ngày ${item.day}: ${item.title}`
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Ga Cuối (End Station - Day 100 Mastery) */}
        <div className="w-full flex items-center justify-center pt-4">
          <div className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-extrabold text-sm shadow-2xl shadow-amber-500/30 border border-amber-400/40 flex items-center gap-2">
            <span>🏆</span>
            <span>ĐÍCH ĐẾN NGÀY 100 • HOÀN THÀNH LỘ TRÌNH ĐỈNH CAO!</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MEDIA FULLSCREEN PREVIEW MODAL                                         */}
      {/* ========================================================================= */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-white truncate">{activeMediaModal.title}</h4>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                Đóng ✕
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black flex-1 overflow-hidden">
              {activeMediaModal.type === 'video' ? (
                <video src={activeMediaModal.url} controls autoPlay className="max-h-[75vh] w-auto rounded-xl" />
              ) : (
                <img src={activeMediaModal.url} alt="Preview" className="max-h-[75vh] w-auto object-contain rounded-xl" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PASTE JSON MODAL                                                       */}
      {/* ========================================================================= */}
      <PasteRoadmapJsonModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onApplyDays={handleApplyJsonDays}
        currentTopic={topicInput}
      />
    </div>
  );
};
