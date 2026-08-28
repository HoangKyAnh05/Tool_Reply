export type LevelStatus = 
  | 'locked'
  | 'not_started'
  | 'in_progress'
  | 'blocked'
  | 'ready_for_levelup'
  | 'completed';

export type RequirementPriority = 'low' | 'medium' | 'high' | 'critical';
export type RequirementStatus = 'todo' | 'in_progress' | 'blocked' | 'review' | 'done';

export interface EvolutionDimension {
  id: string;
  name: string;
  weight: number; // e.g. 20 (percent)
  score: number; // 0 - 100
  icon?: string;
  description?: string;
}

export interface EvolutionTask {
  id: string;
  requirementId: string;
  title: string;
  description?: string;
  owner?: string;
  priority: RequirementPriority;
  status: RequirementStatus;
  estimatedEffortDays: number;
  actualEffortDays?: number;
  dependsOnTaskId?: string; // Blocked if dependsOnTaskId not done
  isBlockingLevelUp?: boolean;
  completionPercent: number;
}

export interface UpgradeRequirement {
  id: string;
  levelId: string;
  dimensionId: string;
  dimensionName: string;
  title: string;
  description: string;
  priority: RequirementPriority;
  status: RequirementStatus;
  owner: string;
  deadline?: string;
  progress: number; // 0 - 100
  acceptanceCriteria: string[];
  tasks: EvolutionTask[];
  isMandatoryForLevelUp: boolean;
}

export interface LevelKpi {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  minThreshold: number;
  weight: number;
  status: 'on_track' | 'at_risk' | 'failed' | 'achieved';
}

export interface QualityGateCriteria {
  id: string;
  title: string;
  category: 'Process' | 'Quality' | 'Team' | 'KPI' | 'SOP' | 'Automation';
  targetRequirement: string;
  isSatisfied: boolean;
  failureReason?: string;
}

export interface LevelStateData {
  teamSize: number;
  tasksPerWeek: number;
  workflowType: string;
  sopCount: number;
  qualityScore: number;
  automationPercent: number;
  revenueMonthlyVnd: string;
  customMetrics?: Record<string, string | number>;
}

export interface EvolutionLevel {
  id: string;
  number: number;
  name: string;
  tagline: string;
  description: string;
  objective: string;
  status: LevelStatus;
  progress: number; // 0 - 100
  maturityScore: number; // 0 - 100
  currentState: LevelStateData;
  targetState: LevelStateData;
  dimensions: EvolutionDimension[];
  requirements: UpgradeRequirement[];
  kpis: LevelKpi[];
  exitCriteria: QualityGateCriteria[];
  blockers: { id: string; title: string; severity: 'high' | 'critical'; resolutionPlan: string }[];
  nextBestActions: { id: string; title: string; impact: 'High' | 'Very High'; effort: string; requirementId?: string }[];
  completedAt?: string;
}

export interface LevelSnapshot {
  snapshotId: string;
  levelNumber: number;
  levelName: string;
  savedAt: string;
  maturityScore: number;
  state: LevelStateData;
  dimensions: EvolutionDimension[];
  completedRequirementsCount: number;
}

export interface FishboneProject {
  schemaVersion: '1.0';
  projectVersion: number;
  id: string;
  name: string;
  industry: string;
  description: string;
  currentLevelNumber: number;
  targetLevelNumber: number;
  dimensions: EvolutionDimension[];
  levels: EvolutionLevel[];
  snapshots: LevelSnapshot[];
  updatedAt: string;
}
