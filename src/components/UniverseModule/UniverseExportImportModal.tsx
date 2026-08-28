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
  ArrowRight
} from 'lucide-react';
import { ParallelUniverseSimulation } from '../../types/universe';

interface UniverseExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulation: ParallelUniverseSimulation | null;
  onImportSimulation: (sim: ParallelUniverseSimulation) => void;
}

export const UniverseExportImportModal: React.FC<UniverseExportImportModalProps> = ({
  isOpen,
  onClose,
  simulation,
  onImportSimulation
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const jsonString = simulation ? JSON.stringify(simulation, null, 2) : '';

  const aiContinuePrompt = simulation
    ? `You are continuing an existing Parallel Universe simulation.

Do not restart the story.
Do not change established facts.
Do not alter previous events.
Continue from the exact current state.

SIMULATION TITLE: ${simulation.title}
CURRENT ACTIVE UNIVERSE: ${simulation.universes.find((u) => u.id === simulation.activeUniverseId)?.name || 'Universe Alpha'}
CURRENT STATE: Business operating / Decision needed

SCENARIO SUMMARY:
${simulation.scenario.currentSituation}

CRITICAL VARIABLES:
${simulation.variables.map((v) => `- ${v.name}: ${v.currentValue} (${v.impact})`).join('\n')}

VISUAL CONTINUITY BIBLE:
- Character: ${simulation.visualBibles.characterBible.map((c) => `${c.name}: ${c.description}`).join('; ')}
- Location: ${simulation.visualBibles.locationBible.map((l) => `${l.name}: ${l.description}`).join('; ')}
- Style: ${simulation.visualBibles.globalStyle}

TASK:
Continue the simulation from this exact point. For every new event:
1. Explain what happens and why it happens.
2. Update relevant states and causal chains.
3. Create 1–2 context-matched visual descriptions (Wide context + Human detail).
4. Identify important decision points and pause to ask the user.

FULL SIMULATION DATA:
${jsonString}`
    : '';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonString);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `simulation_${simulation?.simulation_id || 'export'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleApplyImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.simulation_id || !parsed.universes || !parsed.scenario) {
        throw new Error('Dữ liệu JSON không đúng cấu trúc Schema 1.0 (thiếu simulation_id, universes hoặc scenario).');
      }
      onImportSimulation(parsed);
      onClose();
    } catch (err: any) {
      setImportError(`Lỗi Import: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white">Xuất / Nhập Mô Phỏng Đa Vũ Trụ</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('export')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'export' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                Xuất (Export)
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'import' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                Nhập (Import)
              </button>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 pr-1 text-xs">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleCopy(jsonString, 'json')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-md shadow-cyan-600/30"
                >
                  {copiedType === 'json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'json' ? 'Đã chép JSON!' : '1. COPY JSON'}</span>
                </button>

                <button
                  onClick={() => handleCopy(aiContinuePrompt, 'prompt')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-md shadow-purple-600/30"
                >
                  {copiedType === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'prompt' ? 'Đã chép Prompt!' : '2. COPY AI CONTINUE PROMPT'}</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File .JSON</span>
                </button>
              </div>

              {/* JSON preview */}
              <div>
                <span className="font-semibold text-slate-300 mb-1.5 block">
                  Cấu trúc JSON tự chứa đầy đủ (Self-Contained Schema 1.0):
                </span>
                <textarea
                  readOnly
                  value={jsonString}
                  rows={10}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 resize-none select-all"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-300 mb-1.5 block">
                  Dán chuỗi JSON mô phỏng để khôi phục chính xác trạng thái:
                </span>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='Dán chuỗi JSON đã xuất trước đó vào đây...'
                  rows={10}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-100 placeholder-slate-600 resize-none focus:outline-none focus:border-cyan-500"
                />
              </div>

              {importError && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <button
                onClick={handleApplyImport}
                disabled={!importJsonText.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-lg shadow-cyan-600/30 disabled:opacity-40"
              >
                <Upload className="w-4 h-4" />
                <span>Khôi Phục & Tiếp Tục Mô Phỏng</span>
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
