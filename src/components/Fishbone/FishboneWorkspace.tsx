import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  GitCompare, 
  History, 
  Code, 
  Sparkles, 
  FileCheck, 
  Plus, 
  TrendingUp,
  BarChart3,
  Zap,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { FishboneProject, EvolutionLevel } from '../../types/fishbone';
import { storageService, defaultFishboneProject } from '../../services/storageService';
import { fishboneService } from '../../services/fishboneService';
import { toggleNativeFullscreen } from '../../utils/fullscreen';
import { FishboneCanvas } from './FishboneCanvas';
import { LevelDetailView } from './LevelDetailView';
import { LevelComparisonView } from './LevelComparisonView';
import { EvolutionTimelineView } from './EvolutionTimelineView';
import { QualityGateModal } from './QualityGateModal';
import { FishbonePromptModal } from './FishbonePromptModal';
import { audioService } from '../../services/audioService';

const SAAS_FISHBONE_PROJECT: FishboneProject = {
  schemaVersion: '1.0',
  projectVersion: 1,
  id: 'fishbone_saas_product',
  name: 'Tiến Hóa Sản Phẩm SaaS B2B AI',
  industry: 'Enterprise Software & AI Tools',
  description: 'Từ MVP thử nghiệm đến hệ thống Enterprise 99.99% SLA với doanh thu 1 Triệu USD ARR',
  currentLevelNumber: 1,
  targetLevelNumber: 5,
  updatedAt: new Date().toISOString(),
  dimensions: [
    { id: 'dim_code', name: 'Kiến Trúc & Codebase', weight: 25, score: 65, icon: '💻' },
    { id: 'dim_product', name: 'Product Market Fit', weight: 25, score: 55, icon: '🎯' },
    { id: 'dim_security', name: 'Bảo Mật & SOC2', weight: 20, score: 40, icon: '🔒' },
    { id: 'dim_sales', name: 'Bán Hàng B2B Enterprise', weight: 15, score: 50, icon: '📈' },
    { id: 'dim_support', name: 'Chăm Sóc & CSKH', weight: 15, score: 70, icon: '🤝' }
  ],
  levels: [
    {
      id: 'lvl_saas_1',
      number: 1,
      name: 'Level 1: MVP & Early Adopters',
      tagline: 'Giai đoạn thử nghiệm với 100 người dùng đầu tiên',
      description: 'Sản phẩm chạy ổn định trên cloud, có hệ thống ghi log và thu thập phản hồi người dùng.',
      objective: 'Đạt 50 khách hàng trả phí đầu tiên và hoàn thiện hệ thống thanh toán Stripe tự động.',
      status: 'in_progress',
      progress: 70,
      maturityScore: 56,
      currentState: { teamSize: 4, tasksPerWeek: 60, workflowType: 'Scrum 1 tuần', sopCount: 3, qualityScore: 70, automationPercent: 30, revenueMonthlyVnd: '80M' },
      targetState: { teamSize: 8, tasksPerWeek: 120, workflowType: 'CI/CD & DevOps chuẩn', sopCount: 12, qualityScore: 90, automationPercent: 60, revenueMonthlyVnd: '250M' },
      dimensions: [
        { id: 'dim_code', name: 'Kiến Trúc', weight: 25, score: 65 },
        { id: 'dim_product', name: 'PMF', weight: 25, score: 55 },
        { id: 'dim_security', name: 'Bảo Mật', weight: 20, score: 40 },
        { id: 'dim_sales', name: 'Sales B2B', weight: 15, score: 50 },
        { id: 'dim_support', name: 'Support', weight: 15, score: 70 }
      ],
      requirements: [
        {
          id: 'req_saas_1',
          levelId: 'lvl_saas_1',
          dimensionId: 'dim_code',
          dimensionName: 'Kiến Trúc & Codebase',
          title: 'Thiết lập tự động hóa CI/CD GitHub Actions và Test Coverage ≥ 70%',
          description: 'Mọi commit đều phải vượt qua unit test trước khi deploy lên production.',
          priority: 'critical',
          status: 'done',
          owner: 'Tech Lead',
          progress: 100,
          isMandatoryForLevelUp: true,
          acceptanceCriteria: ['Pipeline chạy tự động dưới 3 phút', 'Zero downtime deployment'],
          tasks: []
        },
        {
          id: 'req_saas_2',
          levelId: 'lvl_saas_1',
          dimensionId: 'dim_security',
          dimensionName: 'Bảo Mật & SOC2',
          title: 'Cài đặt mã hóa dữ liệu AES-256 và xác thực 2FA cho tài khoản admin',
          description: 'Đảm bảo dữ liệu khách hàng doanh nghiệp được cô lập và mã hóa tuyệt đối.',
          priority: 'high',
          status: 'in_progress',
          owner: 'Security Eng',
          progress: 60,
          isMandatoryForLevelUp: true,
          acceptanceCriteria: ['Bật 2FA bắt buộc', 'Log audit truy cập đầy đủ'],
          tasks: []
        }
      ],
      kpis: [
        { id: 'kpi_mrr', name: 'Doanh Thu Định Kỳ (MRR)', category: 'Finance', currentValue: 80, targetValue: 200, unit: 'Triệu VND', minThreshold: 60, weight: 35, status: 'on_track' },
        { id: 'kpi_sla', name: 'Tỷ Lệ Uptime SLA', category: 'Tech', currentValue: 99.8, targetValue: 99.9, unit: '%', minThreshold: 99.5, weight: 35, status: 'on_track' },
        { id: 'kpi_nps', name: 'Điểm Hài Lòng NPS', category: 'Quality', currentValue: 45, targetValue: 60, unit: 'Điểm', minThreshold: 40, weight: 30, status: 'on_track' }
      ],
      exitCriteria: [
        { id: 'qc_s1', title: 'Điểm Maturity Score ≥ 50', category: 'Process', targetRequirement: 'Cân bằng các chiều', isSatisfied: true },
        { id: 'qc_s2', title: 'Hoàn thành mã hóa bảo mật 2FA', category: 'Quality', targetRequirement: 'Bảo mật dữ liệu', isSatisfied: false, failureReason: 'Tính năng 2FA đang trong quá trình audit.' }
      ],
      blockers: [],
      nextBestActions: [
        { id: 'nba_s1', title: 'Hoàn thành tính năng xác thực 2FA và mã hóa Database', impact: 'Very High', effort: '2 ngày' }
      ]
    },
    {
      id: 'lvl_saas_2',
      number: 2,
      name: 'Level 2: Scale-Up & Enterprise Ready',
      tagline: 'Mở rộng thị trường quốc tế và chứng nhận SOC2',
      description: 'Hỗ trợ Multi-region, đội ngũ CSKH 24/7 và hệ thống phân tích người dùng thời gian thực.',
      objective: 'Đạt 500 khách hàng doanh nghiệp và 1M$ ARR.',
      status: 'locked',
      progress: 0,
      maturityScore: 25,
      currentState: { teamSize: 8, tasksPerWeek: 120, workflowType: 'DevOps', sopCount: 12, qualityScore: 90, automationPercent: 60, revenueMonthlyVnd: '250M' },
      targetState: { teamSize: 20, tasksPerWeek: 300, workflowType: 'Enterprise Agile', sopCount: 30, qualityScore: 98, automationPercent: 85, revenueMonthlyVnd: '1.2B' },
      dimensions: [],
      requirements: [],
      kpis: [],
      exitCriteria: [],
      blockers: [],
      nextBestActions: []
    }
  ],
  snapshots: []
};

export const FishboneWorkspace: React.FC = () => {
  const [project, setProject] = useState<FishboneProject>(() => storageService.getFishboneProject());
  const [activeLevelId, setActiveLevelId] = useState<string>(() => {
    const p = storageService.getFishboneProject();
    const cur = p.levels.find((l) => l.number === p.currentLevelNumber) || p.levels[0];
    return cur.id;
  });

  const [activeTab, setActiveTab] = useState<'levels' | 'compare' | 'timeline'>('levels');
  const [isQualityGateOpen, setIsQualityGateOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleToggleFullscreen = async () => {
    audioService.playBeep('click');
    const nextState = !isFullscreen;
    setIsFullscreen(nextState);
    await toggleNativeFullscreen();
  };

  const activeLevel = project.levels.find((l) => l.id === activeLevelId) || project.levels[0];

  const handleToggleRequirement = (reqId: string) => {
    const updatedLevels = project.levels.map((lvl) => {
      if (lvl.id === activeLevel.id) {
        const updatedReqs = lvl.requirements.map((r) => {
          if (r.id === reqId) {
            const nextStatus = r.status === 'done' ? 'in_progress' : 'done';
            return {
              ...r,
              status: nextStatus as any,
              progress: nextStatus === 'done' ? 100 : 50
            };
          }
          return r;
        });

        // Recalculate maturity score
        const newMaturity = lvl.maturityScore + 5;
        return {
          ...lvl,
          requirements: updatedReqs,
          maturityScore: Math.min(100, newMaturity)
        };
      }
      return lvl;
    });

    const updatedProject = {
      ...project,
      levels: updatedLevels
    };

    setProject(updatedProject);
    storageService.saveFishboneProject(updatedProject);
    audioService.playBeep('success');
  };

  const handleFillSample = (type: 'fnb' | 'saas') => {
    audioService.playBeep('success');
    const selected = type === 'saas' ? SAAS_FISHBONE_PROJECT : defaultFishboneProject;
    setProject(selected);
    storageService.saveFishboneProject(selected);
    setActiveLevelId(selected.levels[0]?.id || 'lvl_1');
  };

  const handleConfirmLevelUp = () => {
    const updated = fishboneService.executeLevelUp(project, activeLevel);
    setProject(updated);
    storageService.saveFishboneProject(updated);
    const nextLvl = updated.levels.find((l) => l.number === updated.currentLevelNumber);
    if (nextLvl) {
      setActiveLevelId(nextLvl.id);
    }
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen overflow-hidden animate-fadeIn'
          : 'flex-1 overflow-hidden'
      }`}
    >
      {/* Top action header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xl font-bold">
            🐟
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                EVOLUTION ENGINE
              </span>
              <h2 className="text-sm font-extrabold text-white">{project.name}</h2>
              {isFullscreen && (
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                  TOÀN MÀN HÌNH
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Cấp độ hiện tại: <strong className="text-cyan-300">Level {project.currentLevelNumber}</strong> • Mục tiêu: <strong className="text-purple-300">Level {project.targetLevelNumber}</strong>
            </p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          {/* Fill Sample Presets Button */}
          <button
            onClick={() => handleFillSample(project.id === 'fishbone_company_growth' ? 'saas' : 'fnb')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white text-cyan-200 text-xs font-bold transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ Nạp Dự Án Mẫu ({project.id === 'fishbone_company_growth' ? 'SaaS AI' : 'F&B Tech'})</span>
          </button>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('levels')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'levels'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Xương Cá & Chi Tiết</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'compare'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>So Sánh Level</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'timeline'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Dòng Tiến Hóa</span>
            </button>
          </div>

          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-cyan-600/30 hover:scale-105 active:scale-95 transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span>AI Prompt / JSON Loop</span>
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            onClick={handleToggleFullscreen}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
              isFullscreen
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isFullscreen ? 'Thu nhỏ giao diện dự án (Esc)' : 'Mở to toàn màn hình dự án'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isFullscreen ? 'Thu nhỏ (Esc)' : 'Toàn màn hình'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'levels' && (
          <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-6">
            {/* 1. Horizontal Fishbone visualization */}
            <FishboneCanvas
              project={project}
              activeLevelId={activeLevelId}
              onSelectLevel={(id) => setActiveLevelId(id)}
              onOpenQualityGate={() => setIsQualityGateOpen(true)}
            />

            {/* 2. Level Details View */}
            <div className="flex-1 flex overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40">
              <LevelDetailView
                level={activeLevel}
                onOpenQualityGate={() => setIsQualityGateOpen(true)}
                onToggleRequirementStatus={handleToggleRequirement}
              />
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <LevelComparisonView project={project} />
        )}

        {activeTab === 'timeline' && (
          <EvolutionTimelineView project={project} />
        )}
      </main>

      {/* Quality Gate Modal */}
      <QualityGateModal
        isOpen={isQualityGateOpen}
        onClose={() => setIsQualityGateOpen(false)}
        level={activeLevel}
        onConfirmLevelUp={handleConfirmLevelUp}
      />

      {/* AI Prompt / JSON Modal */}
      <FishbonePromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        project={project}
        onImportProject={(imported) => {
          setProject(imported);
          storageService.saveFishboneProject(imported);
          setActiveLevelId(imported.levels[0]?.id || 'lvl_1');
        }}
      />
    </div>
  );
};
