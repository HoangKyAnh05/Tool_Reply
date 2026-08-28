import React, { useState } from 'react';
import { 
  ParallelUniverseSimulation, 
  ScenarioModel, 
  AdaptiveQuestion, 
  QuestionAnswer 
} from '../../types/universe';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storageService';
import { UniverseHome } from './UniverseHome';
import { UniverseCreator } from './UniverseCreator';
import { AdaptiveInterview } from './AdaptiveInterview';
import { ScenarioReview } from './ScenarioReview';
import { SimulationViewer } from './SimulationViewer';
import { UniverseExportImportModal } from './UniverseExportImportModal';
import { audioService } from '../../services/audioService';
import { Zap, Orbit, Code, Plus } from 'lucide-react';

type WorkspaceState = 'home' | 'create' | 'interview' | 'review' | 'simulation';

export const UniverseWorkspace: React.FC = () => {
  const [viewState, setViewState] = useState<WorkspaceState>('home');
  const [scenarioModel, setScenarioModel] = useState<ScenarioModel | null>(null);
  const [extractedVariables, setExtractedVariables] = useState<any[]>([]);
  const [interviewQuestions, setInterviewQuestions] = useState<AdaptiveQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<QuestionAnswer[]>([]);
  const [currentSimulation, setCurrentSimulation] = useState<ParallelUniverseSimulation | null>(() => {
    const list = storageService.getSimulations();
    const activeId = storageService.getActiveSimulationId();
    if (activeId) {
      return list.find((s) => s.simulation_id === activeId) || list[0] || null;
    }
    return list[0] || null;
  });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartNew = () => {
    setViewState('create');
  };

  const handleAnalyzeScenario = async (rawText: string) => {
    setIsAnalyzing(true);
    try {
      const analyzed = await aiService.analyzeScenarioInput(rawText);
      setScenarioModel(analyzed.scenario);
      setExtractedVariables(analyzed.variables);
      setInterviewQuestions(analyzed.questions);
      setViewState('interview');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuickLoadPreset = (type: 'startup' | 'study' | 'finance') => {
    audioService.playBeep('click');
    if (type === 'startup') {
      handleAnalyzeScenario(`Năm nay tôi 28 tuổi, đang làm Senior Backend Engineer tại một công ty công nghệ lớn với mức lương 60 triệu/tháng. Tôi đang đứng trước quyết định có nên nghỉ việc để cùng 2 người bạn đồng sáng lập một Startup AI SaaS hay tiếp tục ở lại để thăng tiến lên Engineering Manager.`);
    } else if (type === 'study') {
      handleAnalyzeScenario(`Tôi vừa nhận được học bổng Thạc sĩ AI tại Đức trị giá 80% học phí, nhưng nếu đi tôi sẽ phải chia tay người yêu hiện tại và từ bỏ công việc ổn định ở Việt Nam.`);
    } else {
      handleAnalyzeScenario(`Tôi có một khoản tiết kiệm 1.5 tỷ đồng và đang phân vân giữa việc mua một căn hộ chung cư trả góp hay dồn toàn bộ vốn để đầu tư vào chuỗi cửa hàng F&B tự động.`);
    }
  };

  const handleFinishInterview = (answers: QuestionAnswer[]) => {
    setUserAnswers(answers);
    setViewState('review');
  };

  const handleStartSimulation = async () => {
    if (!scenarioModel) return;
    setIsAnalyzing(true);
    try {
      const sim = await aiService.simulateUniverses(scenarioModel, userAnswers);
      setCurrentSimulation(sim);
      storageService.saveSimulation(sim);
      setViewState('simulation');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* Top Header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Orbit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              Parallel Universe Decision Simulator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Multiverse 5.0
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Mô phỏng 5 dòng thời gian tương lai song song cho mọi quyết định lớn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Preset Fill Button */}
          <button
            onClick={() => handleQuickLoadPreset('startup')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Kịch Bản Mẫu (Startup AI)</span>
          </button>

          <button
            onClick={() => setViewState('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              viewState === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Danh Sách Vũ Trụ
          </button>

          <button
            onClick={handleStartNew}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tạo Kịch Bản Mới</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition"
            title="Import / Export JSON & AI Prompt"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace content */}
      <main className="flex-1 flex overflow-hidden">
        {viewState === 'home' && (
          <UniverseHome
            onStartNew={handleStartNew}
            onOpenImport={() => setIsExportModalOpen(true)}
            onLoadPreset={(presetText) => {
              handleAnalyzeScenario(presetText);
            }}
          />
        )}

        {viewState === 'create' && (
          <UniverseCreator
            onAnalyze={handleAnalyzeScenario}
            onCancel={() => setViewState('home')}
          />
        )}

        {viewState === 'interview' && scenarioModel && (
          <AdaptiveInterview
            questions={interviewQuestions}
            scenario={scenarioModel}
            onFinishInterview={handleFinishInterview}
            onSkipToSimulation={handleStartSimulation}
          />
        )}

        {viewState === 'review' && scenarioModel && (
          <ScenarioReview
            scenario={scenarioModel}
            variables={extractedVariables}
            onStartSimulation={handleStartSimulation}
            onBackToInterview={() => setViewState('interview')}
          />
        )}

        {viewState === 'simulation' && currentSimulation && (
          <SimulationViewer
            simulation={currentSimulation}
            onUpdateSimulation={(updatedSim) => {
              setCurrentSimulation(updatedSim);
              storageService.saveSimulation(updatedSim);
            }}
            onBackToHome={() => setViewState('home')}
          />
        )}
      </main>

      {/* Export / Import Modal */}
      <UniverseExportImportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        simulation={currentSimulation}
        onImportSimulation={(sim: ParallelUniverseSimulation) => {
          setCurrentSimulation(sim);
          storageService.saveSimulation(sim);
          setViewState('simulation');
        }}
      />
    </div>
  );
};
