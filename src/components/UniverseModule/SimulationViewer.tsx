import React, { useState } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  Share2, 
  Save, 
  GitFork, 
  RotateCcw, 
  FileCode, 
  BarChart3, 
  Zap, 
  Layers,
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  DollarSign,
  Heart
} from 'lucide-react';
import { ParallelUniverseSimulation, CriticalDecision } from '../../types/universe';
import { UniverseTimeline } from './UniverseTimeline';
import { SceneCard } from './SceneCard';
import { CriticalDecisionModal } from './CriticalDecisionModal';
import { UniverseComparison } from './UniverseComparison';
import { AiImprovementView } from './AiImprovementView';
import { UniverseExportImportModal } from './UniverseExportImportModal';
import { storageService } from '../../services/storageService';
import { audioService } from '../../services/audioService';

interface SimulationViewerProps {
  simulation: ParallelUniverseSimulation;
  onUpdateSimulation: (sim: ParallelUniverseSimulation) => void;
  onBackToHome: () => void;
}

export const SimulationViewer: React.FC<SimulationViewerProps> = ({
  simulation,
  onUpdateSimulation,
  onBackToHome
}) => {
  const [activeUniverseId, setActiveUniverseId] = useState<string>(
    simulation.activeUniverseId || simulation.universes[0]?.id
  );
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scenes' | 'compare' | 'improvement'>('scenes');
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeDecision, setActiveDecision] = useState<CriticalDecision | null>(null);

  const activeUniverse =
    simulation.universes.find((u) => u.id === activeUniverseId) || simulation.universes[0];
  const activeScene = activeUniverse?.scenes[activeSceneIndex] || activeUniverse?.scenes[0];

  const handleOpenDecisionForScene = (scene = activeScene) => {
    if (scene?.decisionPoint) {
      setActiveDecision(scene.decisionPoint);
      setIsDecisionModalOpen(true);
    }
  };

  const handleSelectDecisionOption = (optionId: string) => {
    // When user chooses an option, branch to alternative universe or update timeline
    if (optionId === 'opt_a') {
      // Branch to Best or Alternative case
      const altUniv = simulation.universes.find((u) => u.type === 'ALTERNATIVE') || simulation.universes[0];
      setActiveUniverseId(altUniv.id);
      setActiveSceneIndex(0);
    } else if (optionId === 'opt_c') {
      // Sang nhượng
      const worstUniv = simulation.universes.find((u) => u.type === 'WORST_CASE') || simulation.universes[0];
      setActiveUniverseId(worstUniv.id);
      setActiveSceneIndex(0);
    }
  };

  const handleForkUniverse = () => {
    const forkedId = `${activeUniverse.id}_fork_${Date.now()}`;
    const forkedUniverse = {
      ...activeUniverse,
      id: forkedId,
      name: `${activeUniverse.name} (Forked)`,
      tagline: `Nhánh vũ trụ sao chép từ ${activeUniverse.name}`,
      parentUniverseId: activeUniverse.id,
      createdAt: Date.now()
    };

    const updated = {
      ...simulation,
      universes: [...simulation.universes, forkedUniverse],
      activeUniverseId: forkedId
    };
    onUpdateSimulation(updated);
    storageService.saveSimulation(updated);
    setActiveUniverseId(forkedId);
    audioService.playBeep('success');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Top Header Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Quay về trang chủ mô phỏng"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                SIMULATION ACTIVE
              </span>
              <h2 className="text-sm font-extrabold text-white truncate max-w-md">
                {simulation.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400">
              Vũ trụ đang xem: <strong className="text-slate-200">{activeUniverse.name}</strong>
            </p>
          </div>
        </div>

        {/* View Switchers & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('scenes')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'scenes'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Diễn Biến Scenes</span>
            </button>

            <button
              onClick={() => setViewMode('compare')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'compare'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>So Sánh Đa Vũ Trụ</span>
            </button>

            <button
              onClick={() => setViewMode('improvement')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'improvement'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Đòn Bẩy Chiến Lược</span>
            </button>
          </div>

          <button
            onClick={handleForkUniverse}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
            title="Nhân bản vũ trụ hiện tại"
          >
            <GitFork className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fork Universe</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-cyan-600/30 hover:scale-105 active:scale-95 transition"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Xuất JSON / AI Prompt</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout or Alternate Full Views */}
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'scenes' && (
          <>
            {/* 1. LEFT COLUMN: Visual Timeline & Universe Nodes */}
            <UniverseTimeline
              universes={simulation.universes}
              activeUniverseId={activeUniverseId}
              onSelectUniverse={(id) => {
                setActiveUniverseId(id);
                setActiveSceneIndex(0);
              }}
              activeSceneIndex={activeSceneIndex}
              onSelectScene={(idx) => setActiveSceneIndex(idx)}
            />

            {/* 2. CENTER COLUMN: Visual Scene & Narration */}
            {activeScene ? (
              <SceneCard
                scene={activeScene}
                universeName={activeUniverse.name}
                onOpenDecision={() => handleOpenDecisionForScene(activeScene)}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                Chưa có sự kiện nào trong vũ trụ này.
              </div>
            )}

            {/* 3. RIGHT COLUMN: Variables, Entity States & Decision Console (w-80) */}
            <aside className="w-80 border-l border-slate-800/80 bg-slate-900/40 p-5 flex flex-col overflow-y-auto space-y-4 shrink-0 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Trạng Thái Thực Thể (Live States):
                </span>
                <div className="space-y-2">
                  {simulation.entities.map((ent) => (
                    <div key={ent.entityId} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                        <span>{ent.entityName}</span>
                        <span className="text-cyan-400 font-mono text-[11px]">{ent.currentState}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {ent.stateHistory[ent.stateHistory.length - 1]?.cause || 'Đang vận hành'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Variables */}
              <div className="border-t border-slate-800 pt-3">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Biến Số Quyết Định:
                </span>
                <div className="space-y-2">
                  {simulation.variables.map((v) => (
                    <div key={v.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300 font-medium">{v.name}:</span>
                      <span className="font-bold text-cyan-300 font-mono">{v.currentValue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Continuity Bibles */}
              <div className="border-t border-slate-800 pt-3">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Visual Continuity Bible:
                </span>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                  <p className="text-purple-300 font-semibold">
                    👤 {simulation.visualBibles.characterBible[0]?.name}
                  </p>
                  <p className="text-slate-400 leading-tight">
                    {simulation.visualBibles.characterBible[0]?.description}
                  </p>
                </div>
              </div>
            </aside>
          </>
        )}

        {viewMode === 'compare' && (
          <UniverseComparison
            universes={simulation.universes}
            onSelectUniverse={(id) => {
              setActiveUniverseId(id);
              setActiveSceneIndex(0);
              setViewMode('scenes');
            }}
          />
        )}

        {viewMode === 'improvement' && simulation.aiImprovementReport && (
          <AiImprovementView
            report={simulation.aiImprovementReport}
          />
        )}
      </div>

      {/* Critical Decision Modal */}
      <CriticalDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        decision={activeDecision}
        onSelectOption={handleSelectDecisionOption}
      />

      {/* Export / Import Modal */}
      <UniverseExportImportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        simulation={simulation}
        onImportSimulation={(imported) => {
          onUpdateSimulation(imported);
          storageService.saveSimulation(imported);
          setActiveUniverseId(imported.activeUniverseId || imported.universes[0]?.id);
          setActiveSceneIndex(0);
        }}
      />
    </div>
  );
};
