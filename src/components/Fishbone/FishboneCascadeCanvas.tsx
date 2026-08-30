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
  CheckCircle2
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

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* 1. Header Overview & Actions */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0 space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
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
              <p className="text-[11px] text-slate-400">
                {scenario.companyType} • {scenario.budgetAndDeadline}
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

      {/* 2. Main Fishbone Spine Canvas Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-950">
        
        {/* ========================================================================= */}
        {/* LUỒNG 1: CHIỀU CHỈ ĐẠO XUỐNG (TOP-DOWN DIRECTIVES: SẾP -> BÊN BÁN)       */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'top_down') && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>LUỒNG 1: CHIỀU CHỈ ĐẠO TỪ SẾP TỔNG XUỐNG CẤP DƯỚI & BÊN BÁN</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    TOP-DOWN DIRECTIVE
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Lời dặn, ngân sách và yêu cầu kỹ thuật truyền đạt từ Ban Giám Đốc qua các phòng ban đến Nhà cung ứng
                </p>
              </div>
            </div>

            {/* Fishbone Horizontal Train Track for Top-Down */}
            <div className="relative py-6 overflow-x-auto pb-6">
              {/* Central Spine Beam */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 z-0 shadow-lg shadow-cyan-500/30" />

              <div className="min-w-[1000px] flex items-center justify-between relative z-10 px-4 gap-4">
                {scenario.topDownDirectives.map((node, idx) => (
                  <div key={node.id} className="flex-1 flex flex-col items-center group relative">
                    
                    {/* Top Rib (Xương Nhánh Trên: Role & Tiêu Đề Chỉ Đạo) */}
                    <div className="w-full mb-3 flex flex-col items-center">
                      <div className="w-full bg-slate-900/95 border border-slate-800 group-hover:border-cyan-500/60 rounded-2xl p-3 shadow-xl backdrop-blur-md transition">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            CẤP {node.stageOrder}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                            {node.department}
                          </span>
                        </div>

                        <div className="text-xs font-black text-white flex items-center gap-1 mb-1">
                          <span>{node.roleIcon}</span>
                          <span className="truncate">{node.roleName}</span>
                        </div>

                        <div className="text-[11px] font-bold text-amber-300 leading-snug line-clamp-2">
                          {node.messageTitle}
                        </div>
                      </div>

                      {/* Rib connecting line */}
                      <div className="w-0.5 h-4 bg-cyan-500/60" />
                    </div>

                    {/* Central Node on Spine */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-xl shadow-xl shadow-cyan-500/40 group-hover:scale-110 transition duration-300">
                        {node.roleIcon}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                        #{node.stageOrder}
                      </div>
                    </div>

                    {/* Bottom Rib (Xương Nhánh Dưới: Lời Nhắn Nguyên Văn & Hành Động) */}
                    <div className="w-full mt-3 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-indigo-500/60" />

                      <div className="w-full bg-slate-900/95 border border-slate-800 group-hover:border-indigo-500/60 rounded-2xl p-3.5 shadow-xl backdrop-blur-md transition space-y-2">
                        {/* Verbatim message with audio & copy */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                              💬 Lời Dặn / Chỉ Đạo:
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSpeakMessage(node.exactMessage, node.id)}
                                className={`p-1 rounded-lg transition ${
                                  activeSpeechId === node.id 
                                    ? 'bg-cyan-500 text-white animate-pulse' 
                                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
                                }`}
                                title="Nghe đọc lời dặn"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleCopyMessage(node)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                                title="Sao chép lời nhắn"
                              >
                                {copiedId === node.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-200 italic line-clamp-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                            "{node.exactMessage}"
                          </p>
                        </div>

                        {/* Action Required & Evidence */}
                        <div className="space-y-1 pt-1 border-t border-slate-800/60 text-[10px]">
                          <div className="text-slate-300 flex items-start gap-1">
                            <strong className="text-indigo-400 shrink-0">⚡ Hành động:</strong>
                            <span className="line-clamp-2">{node.actionRequired}</span>
                          </div>
                          <div className="text-slate-400 flex items-start gap-1">
                            <strong className="text-amber-400 shrink-0">📋 Chứng từ:</strong>
                            <span className="truncate text-slate-300">{node.evidenceOrOutput}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LUỒNG 2: CHIỀU BÁO TIN NGƯỢC LẠI (BOTTOM-UP FEEDBACK: BÊN BÁN -> SẾP)    */}
        {/* ========================================================================= */}
        {(activeTab === 'both' || activeTab === 'bottom_up') && (
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <ArrowUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>LUỒNG 2: CHIỀU BÁO TIN / NGHIỆM THU NGƯỢC LÊN CẤP CAO DẦN ĐẾN SẾP</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    BOTTOM-UP FEEDBACK LOOP
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Bên bán xuất hàng $\rightarrow$ Nhân viên kiểm kho $\rightarrow$ Trưởng phòng nghiệm thu $\rightarrow$ Giám đốc $\rightarrow$ Sếp phê duyệt mở bán & khen thưởng
                </p>
              </div>
            </div>

            {/* Fishbone Horizontal Train Track for Bottom-Up */}
            <div className="relative py-6 overflow-x-auto pb-6">
              {/* Central Spine Beam (Reverse Gradient) */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 z-0 shadow-lg shadow-emerald-500/30" />

              <div className="min-w-[1000px] flex items-center justify-between relative z-10 px-4 gap-4">
                {scenario.bottomUpFeedback.map((node, idx) => (
                  <div key={node.id} className="flex-1 flex flex-col items-center group relative">
                    
                    {/* Top Rib (Role & Tiêu Đề Báo Cáo) */}
                    <div className="w-full mb-3 flex flex-col items-center">
                      <div className="w-full bg-slate-900/95 border border-slate-800 group-hover:border-emerald-500/60 rounded-2xl p-3 shadow-xl backdrop-blur-md transition">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            BƯỚC {node.stageOrder}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                            {node.department}
                          </span>
                        </div>

                        <div className="text-xs font-black text-white flex items-center gap-1 mb-1">
                          <span>{node.roleIcon}</span>
                          <span className="truncate">{node.roleName}</span>
                        </div>

                        <div className="text-[11px] font-bold text-emerald-300 leading-snug line-clamp-2">
                          {node.messageTitle}
                        </div>
                      </div>

                      {/* Rib connecting line */}
                      <div className="w-0.5 h-4 bg-emerald-500/60" />
                    </div>

                    {/* Central Node on Spine */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-xl shadow-xl shadow-emerald-500/40 group-hover:scale-110 transition duration-300">
                        {node.roleIcon}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-emerald-300">
                        #{node.stageOrder}
                      </div>
                    </div>

                    {/* Bottom Rib (Lời Báo Tin & Kết Quả Bàn Giao) */}
                    <div className="w-full mt-3 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-teal-500/60" />

                      <div className="w-full bg-slate-900/95 border border-slate-800 group-hover:border-teal-500/60 rounded-2xl p-3.5 shadow-xl backdrop-blur-md transition space-y-2">
                        {/* Verbatim report message */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                              📢 Lời Báo Cáo:
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSpeakMessage(node.exactMessage, node.id)}
                                className={`p-1 rounded-lg transition ${
                                  activeSpeechId === node.id 
                                    ? 'bg-emerald-500 text-white animate-pulse' 
                                    : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800'
                                }`}
                                title="Nghe đọc lời báo cáo"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleCopyMessage(node)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                                title="Sao chép báo cáo"
                              >
                                {copiedId === node.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-200 italic line-clamp-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                            "{node.exactMessage}"
                          </p>
                        </div>

                        {/* Constraints Met & Final Output */}
                        <div className="space-y-1 pt-1 border-t border-slate-800/60 text-[10px]">
                          <div className="text-slate-300 flex items-start gap-1">
                            <strong className="text-teal-400 shrink-0">✓ Nghiệm thu:</strong>
                            <span className="line-clamp-2 text-emerald-300 font-semibold">{node.keyConstraints}</span>
                          </div>
                          <div className="text-slate-400 flex items-start gap-1">
                            <strong className="text-amber-400 shrink-0">📜 Hồ sơ bàn giao:</strong>
                            <span className="truncate text-slate-300">{node.evidenceOrOutput}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
