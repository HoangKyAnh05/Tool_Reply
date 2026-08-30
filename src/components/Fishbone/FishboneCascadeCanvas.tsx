import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Volume2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  FileText,
  Clock,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CascadeScenario, CascadeMessageNode } from '../../types/fishboneCascade';
import { audioService } from '../../services/audioService';

interface FishboneCascadeCanvasProps {
  scenario: CascadeScenario;
  onOpenPasteModal: () => void;
}

export const FishboneCascadeCanvas: React.FC<FishboneCascadeCanvasProps> = ({
  scenario,
  onOpenPasteModal
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'top_down' | 'bottom_up'>('both');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const handleCopyMessage = (node: CascadeMessageNode) => {
    const text = `[${node.roleIcon} ${node.roleName} - ${node.department}]\nTiêu đề: ${node.messageTitle}\nLời nhắn: "${node.exactMessage}"\nHành động: ${node.actionRequired}\nRàng buộc: ${node.keyConstraints}\nChứng từ/Kết quả: ${node.evidenceOrOutput}`;
    navigator.clipboard.writeText(text);
    setCopiedId(node.id);
    audioService.playBeep('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakMessage = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    if (activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }
    const clean = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);
    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  const renderFishboneChain = (
    nodes: CascadeMessageNode[],
    type: 'top_down' | 'bottom_up',
    title: string,
    badgeText: string,
    description: string,
    themeColor: string
  ) => {
    const isTopDown = type === 'top_down';

    return (
      <div className="space-y-4 bg-slate-900/40 p-4 sm:p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
        {/* Chain Header */}
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
            style={{ backgroundColor: `${themeColor}30`, border: `1px solid ${themeColor}60` }}
          >
            {isTopDown ? <ArrowDown className="w-5 h-5" style={{ color: themeColor }} /> : <ArrowUp className="w-5 h-5" style={{ color: themeColor }} />}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>{title}</span>
              <span 
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border"
                style={{ backgroundColor: `${themeColor}20`, color: themeColor, borderColor: `${themeColor}40` }}
              >
                {badgeText}
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        {/* Horizontal Scrollable Fishbone Spine Container */}
        <div className="overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
          <div className="min-w-[1350px] flex flex-col space-y-3 px-2">
            
            {/* ------------------------------------------------------------- */}
            {/* TIER 1: TOP RIBS (Xương Nhánh Trên: Cấp Bậc, Phòng Ban, Tiêu Đề) */}
            {/* ------------------------------------------------------------- */}
            <div className="grid grid-cols-5 gap-4">
              {nodes.map((node) => (
                <div 
                  key={`top_${node.id}`}
                  className="bg-slate-900/95 border border-slate-800 hover:border-cyan-500/60 rounded-2xl p-4 shadow-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Badge & Department (No truncate, full display) */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span 
                        className="text-[10px] font-mono font-black px-2 py-0.5 rounded border"
                        style={{ backgroundColor: `${themeColor}20`, color: themeColor, borderColor: `${themeColor}40` }}
                      >
                        {isTopDown ? `CẤP ${node.stageOrder}` : `BƯỚC ${node.stageOrder}`}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 text-right leading-tight">
                        {node.department}
                      </span>
                    </div>

                    {/* Role Name */}
                    <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 mb-1.5">
                      <span className="text-base">{node.roleIcon}</span>
                      <span className="leading-snug">{node.roleName}</span>
                    </div>

                    {/* Message Title */}
                    <div 
                      className="text-xs font-bold leading-snug"
                      style={{ color: isTopDown ? '#f59e0b' : '#34d399' }}
                    >
                      {node.messageTitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TIER 2: CENTRAL SPINE BEAM & STATION NODES (Trục Xương Sống)  */}
            {/* ------------------------------------------------------------- */}
            <div className="relative py-4 my-2">
              {/* Central Glowing Horizontal Rail Beam running strictly behind the nodes */}
              <div 
                className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-3.5 rounded-full z-0 shadow-lg"
                style={{
                  background: isTopDown 
                    ? 'linear-gradient(90deg, #06b6d4, #6366f1, #a855f7)' 
                    : 'linear-gradient(90deg, #10b981, #06b6d4, #f59e0b)',
                  boxShadow: `0 0 20px ${themeColor}40`
                }}
              >
                {/* Sleepers / Tie texture */}
                <div className="w-full h-full opacity-30 flex items-center justify-around px-6">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="w-1 h-full bg-slate-950 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Station Circle Nodes */}
              <div className="grid grid-cols-5 gap-4 relative z-10">
                {nodes.map((node) => (
                  <div key={`node_${node.id}`} className="flex flex-col items-center justify-center">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-slate-950 border-2 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
                      style={{
                        borderColor: themeColor,
                        boxShadow: `0 0 25px ${themeColor}50`
                      }}
                    >
                      <span className="text-2xl">{node.roleIcon}</span>
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono font-extrabold text-slate-300 shadow">
                      #{node.stageOrder}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TIER 3: BOTTOM RIBS (Xương Nhánh Dưới: Lời Dặn, Action, Chứng Từ) */}
            {/* ------------------------------------------------------------- */}
            <div className="grid grid-cols-5 gap-4">
              {nodes.map((node) => (
                <div 
                  key={`bot_${node.id}`}
                  className="bg-slate-900/95 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-3 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {/* Message Title & Action Toolbar */}
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span 
                        className="text-[11px] font-mono font-bold uppercase flex items-center gap-1"
                        style={{ color: themeColor }}
                      >
                        <span>💬</span>
                        <span>{isTopDown ? 'Lời Dặn / Chỉ Đạo:' : 'Lời Báo Tin:'}</span>
                      </span>

                      <div className="flex items-center gap-1">
                        {/* Audio TTS Button */}
                        <button
                          onClick={() => handleSpeakMessage(node.exactMessage, node.id)}
                          className={`p-1.5 rounded-lg transition ${
                            activeSpeechId === node.id 
                              ? 'bg-cyan-500 text-white animate-pulse' 
                              : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
                          }`}
                          title="Nghe đọc lời nhắn"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyMessage(node)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          title="Sao chép toàn bộ lời dặn"
                        >
                          {copiedId === node.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Verbatim Message Text (Full text, no cutting off) */}
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed italic select-text">
                      "{node.exactMessage}"
                    </div>
                  </div>

                  {/* Action Required, Constraints & Evidence */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    {/* Action */}
                    <div className="text-slate-300 leading-snug">
                      <strong className="text-indigo-400 block text-[11px] uppercase font-mono mb-0.5">
                        ⚡ Hành Động:
                      </strong>
                      <span>{node.actionRequired}</span>
                    </div>

                    {/* Constraints / QA */}
                    <div className="text-slate-300 leading-snug">
                      <strong className="text-teal-400 block text-[11px] uppercase font-mono mb-0.5">
                        🎯 Tiêu Chuẩn / Ràng Buộc:
                      </strong>
                      <span className="text-slate-300 font-medium">{node.keyConstraints}</span>
                    </div>

                    {/* Output / Evidence */}
                    <div className="text-slate-300 leading-snug">
                      <strong className="text-amber-400 block text-[11px] uppercase font-mono mb-0.5">
                        📜 Chứng Từ / Kết Quả:
                      </strong>
                      <span className="text-amber-200/90 font-medium">{node.evidenceOrOutput}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Header Overview & Action Tools */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border shrink-0"
              style={{
                backgroundColor: `${scenario.color}20`,
                borderColor: `${scenario.color}50`,
                boxShadow: `0 0 20px ${scenario.color}30`
              }}
            >
              {scenario.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  {scenario.topicTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  2 CHIỀU (SẾP ⇄ BÊN BÁN)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                🏢 <strong className="text-slate-300">{scenario.companyType}</strong> • 💰 {scenario.budgetAndDeadline}
              </p>
            </div>
          </div>

          {/* View Filter & AI JSON Tools */}
          <div className="flex items-center gap-2">
            {/* View Direction Filter */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold shadow-inner">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === 'both'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔄 Toàn Bộ 2 Chiều
              </button>

              <button
                onClick={() => setActiveTab('top_down')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  activeTab === 'top_down'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-cyan-300 hover:text-white'
                }`}
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Chiều Sếp Chỉ Đạo</span>
              </button>

              <button
                onClick={() => setActiveTab('bottom_up')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  activeTab === 'bottom_up'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Chiều Báo Tin Ngược Lên</span>
              </button>
            </div>

            {/* Paste / AI Prompt Modal Button */}
            <button
              onClick={onOpenPasteModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Copy Prompt / Dán JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
        
        {/* TOP-DOWN CHAIN */}
        {(activeTab === 'both' || activeTab === 'top_down') && (
          renderFishboneChain(
            scenario.topDownDirectives,
            'top_down',
            'LUỒNG 1: CHIỀU CHỈ ĐẠO TỪ SẾP TỔNG XUỐNG CÁC BAN BỆ & BÊN BÁN',
            'TOP-DOWN DIRECTIVE',
            'Chỉ đạo chiến lược, phê duyệt ngân sách và tiêu chuẩn kỹ thuật truyền dần xuống Nhà cung ứng',
            '#06b6d4'
          )
        )}

        {/* BOTTOM-UP CHAIN */}
        {(activeTab === 'both' || activeTab === 'bottom_up') && (
          renderFishboneChain(
            scenario.bottomUpFeedback,
            'bottom_up',
            'LUỒNG 2: CHIỀU BÁO TIN / NGHIỆM THU NGƯỢC LÊN CẤP CAO DẦN ĐẾN SẾP TỔNG',
            'BOTTOM-UP FEEDBACK LOOP',
            'Bên bán xuất hàng ➔ Nhân viên kiểm kho ➔ Trưởng phòng nghiệm thu ➔ Giám đốc báo cáo ➔ Sếp ký lệnh mở bán & khen thưởng',
            '#10b981'
          )
        )}

      </div>
    </div>
  );
};
