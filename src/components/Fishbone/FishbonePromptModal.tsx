import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  FileCode, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  Code
} from 'lucide-react';
import { FishboneProject } from '../../types/fishbone';
import { fishboneService } from '../../services/fishboneService';
import { audioService } from '../../services/audioService';

interface FishbonePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: FishboneProject;
  onImportProject: (imported: FishboneProject) => void;
}

export const FishbonePromptModal: React.FC<FishbonePromptModalProps> = ({
  isOpen,
  onClose,
  project,
  onImportProject
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'json_export' | 'json_import'>('prompt');
  const [promptMode, setPromptMode] = useState<'current_state' | 'upgrade' | 'full_evolution'>('upgrade');
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generatedPrompt = fishboneService.generateAiPrompt(project, promptMode);
  const jsonString = JSON.stringify(project, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    audioService.playBeep('click');
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fishbone_${project.id}_v${project.projectVersion}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleApplyImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.schemaVersion || !parsed.levels || !parsed.dimensions) {
        throw new Error('Dữ liệu JSON thiếu trường bắt buộc (schemaVersion, levels hoặc dimensions).');
      }
      onImportProject(parsed);
      onClose();
    } catch (err: any) {
      setImportError(`Lỗi Import: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white">AI Evolution Prompt & JSON Engine</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'prompt' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                1. AI Prompts
              </button>
              <button
                onClick={() => setActiveTab('json_export')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'json_export' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                2. Export JSON
              </button>
              <button
                onClick={() => setActiveTab('json_import')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'json_import' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                3. Import JSON
              </button>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {activeTab === 'prompt' && (
            <div className="space-y-3">
              {/* 3 Prompt Modes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPromptMode('upgrade')}
                  className={`flex-1 p-2.5 rounded-xl border text-center font-bold transition ${
                    promptMode === 'upgrade'
                      ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  ⚡ Mode 2: Upgrade Plan Lên Cấp
                </button>
                <button
                  onClick={() => setPromptMode('current_state')}
                  className={`flex-1 p-2.5 rounded-xl border text-center font-bold transition ${
                    promptMode === 'current_state'
                      ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  📋 Mode 1: Hiện Trạng (Current State)
                </button>
                <button
                  onClick={() => setPromptMode('full_evolution')}
                  className={`flex-1 p-2.5 rounded-xl border text-center font-bold transition ${
                    promptMode === 'full_evolution'
                      ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  📈 Mode 3: Toàn Bộ Lịch Sử Tiến Hóa
                </button>
              </div>

              <div className="flex items-center justify-between font-semibold text-slate-300">
                <span>Prompt được tối ưu hóa kèm JSON Schema:</span>
                <button
                  onClick={() => handleCopy(generatedPrompt)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-md shadow-cyan-600/20"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã chép Prompt!' : 'Sao Chép AI Prompt'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={generatedPrompt}
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-slate-300 resize-none select-all"
              />
            </div>
          )}

          {activeTab === 'json_export' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">File cấu trúc Schema 1.0 tự chứa:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(jsonString)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã chép!' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải File</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={jsonString}
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-slate-300 resize-none select-all"
              />
            </div>
          )}

          {activeTab === 'json_import' && (
            <div className="space-y-3">
              <span className="font-semibold text-slate-300 block">
                Dán kết quả JSON từ AI để nâng cấp hoặc khôi phục dự án:
              </span>
              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Dán chuỗi JSON đã xuất hoặc AI trả về vào đây...'
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-slate-100 placeholder-slate-600 resize-none focus:border-cyan-500"
              />

              {importError && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <button
                onClick={handleApplyImport}
                disabled={!importJsonText.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-lg shadow-cyan-600/30 disabled:opacity-40"
              >
                <Upload className="w-4 h-4" />
                <span>Nhập Dữ Liệu & Cập Nhật Fishbone</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
