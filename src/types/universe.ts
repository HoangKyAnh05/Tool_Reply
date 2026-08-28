export type StatementType = 'FACT' | 'PLAN' | 'ASSUMPTION' | 'UNKNOWN' | 'SIMULATION' | 'EXTERNAL_FACTOR';

export type VariableImpact = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type DecisionImpact = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type UniverseType = 'BEST_CASE' | 'REALISTIC' | 'WORST_CASE' | 'ALTERNATIVE' | 'UNEXPECTED' | 'CUSTOM';

export interface ScenarioStatement {
  id: string;
  type: StatementType;
  text: string;
  category?: string;
  certainty?: number; // 0-100%
}

export interface SimulationVariable {
  id: string;
  name: string;
  category: 'Money' | 'Time' | 'Skills' | 'People' | 'Market' | 'Psychology' | 'External';
  currentValue: string;
  possibleValues: string[];
  impact: VariableImpact;
  uncertainty: 'LOW' | 'MEDIUM' | 'HIGH';
  priorityScore: number; // impact * uncertainty
  dependencies: string[];
  unit?: string;
}

export type QuestionType = 
  | 'text' 
  | 'single_choice' 
  | 'multiple_choice' 
  | 'yes_no' 
  | 'number' 
  | 'slider' 
  | 'ranking' 
  | 'date';

export interface AdaptiveQuestion {
  id: string;
  questionNumber: number;
  totalEstimated: number; // e.g. 15 or 50 or 100
  type: QuestionType;
  prompt: string;
  rationale: string; // why this question is high leverage
  targetVariableId?: string;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  defaultValue?: string | number;
}

export interface QuestionAnswer {
  questionId: string;
  questionText: string;
  answer: string | number | string[];
  variableUpdates?: { variableId: string; newValue: string }[];
}

export interface EntityState {
  entityId: string;
  entityName: string; // e.g. "Business", "Cash Reserves", "Relationship", "Mental State"
  currentState: string;
  previousState?: string;
  stateHistory: { state: string; timestamp: string; cause: string; consequence: string }[];
}

export interface CausalLink {
  id: string;
  trigger: string;
  immediateEffect: string;
  secondaryEffect: string;
  longTermConsequence: string;
  isButterflyEffect?: boolean;
}

export interface VisualBibleItem {
  id: string;
  name: string;
  description: string;
  visualKeywords: string[];
  referenceImageUrl?: string;
}

export interface VisualBibles {
  characterBible: VisualBibleItem[];
  locationBible: VisualBibleItem[];
  objectBible: VisualBibleItem[];
  globalStyle: string; // e.g. "Cinematic documentary photography, natural dramatic lighting, ultra-realistic 35mm lens"
}

export interface SceneImage {
  id: string;
  type: 'WIDE_CONTEXT' | 'HUMAN_DETAIL' | 'CONSEQUENCE';
  label: string; // "Image A: Wide Context" | "Image B: Human Consequence"
  caption: string;
  prompt: string;
  semanticSearchQuery: string;
  url: string;
  isGenerating?: boolean;
}

export interface TimelineScene {
  id: string;
  universeId: string;
  sceneNumber: number;
  dayOrTime: string; // e.g. "Day 1", "Month 3", "Year 2"
  title: string;
  location: string;
  characters: string[];
  whatHappened: string;
  whyItHappened: string;
  consequence: string;
  emotionalState: string;
  stateChanges: { entity: string; from: string; to: string }[];
  images: SceneImage[];
  decisionPoint?: CriticalDecision;
  nextPossibleEvents: string[];
}

export interface CriticalDecisionOption {
  id: string;
  label: string;
  description: string;
  shortTermEffect: string;
  longTermPossibility: string;
  risk: string;
  opportunity: string;
  targetUniverseId?: string; // which universe or branch this leads to
}

export interface CriticalDecision {
  id: string;
  sceneId: string;
  time: string;
  title: string;
  situation: string;
  whyItMatters: string;
  impact: DecisionImpact;
  options: CriticalDecisionOption[];
  chosenOptionId?: string;
  aiRecommendation: {
    recommendedOptionId: string;
    rationale: string;
    actionableStep: string;
  };
}

export interface UniverseMetrics {
  successPotential: number; // 0-100
  riskLevel: number; // 0-100
  difficulty: number; // 0-100
  stressLevel: number; // 0-100
  rewardPotential: number; // 0-100
  stability: number; // 0-100
}

export interface ParallelUniverse {
  id: string;
  simulationId: string;
  name: string;
  type: UniverseType;
  tagline: string;
  divergencePoint?: {
    sceneId: string;
    time: string;
    decision: string;
    originalChoice: string;
    branchChoice: string;
  };
  parentUniverseId?: string;
  metrics: UniverseMetrics;
  scenes: TimelineScene[];
  keyDecisions: CriticalDecision[];
  currentSceneIndex: number;
  status: 'ACTIVE' | 'ARCHIVED' | 'FORKED';
  isAiImproved?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ScenarioModel {
  title: string;
  currentSituation: string;
  goal: string;
  motivation: string;
  facts: ScenarioStatement[];
  plans: ScenarioStatement[];
  assumptions: ScenarioStatement[];
  unknowns: ScenarioStatement[];
  constraints: string[];
  resources: string[];
  riskTolerance: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE';
  completenessScore: number; // e.g. 85%
  isReadyForSimulation: boolean;
}

export interface AiImprovementReport {
  whatDoneWell: string[];
  biggestRisks: { risk: string; cause: string; mitigation: string }[];
  missedOpportunities: string[];
  biggestLever: {
    variableName: string;
    explanation: string;
    comparison: { originalValue: string; suggestedValue: string; impactDelta: string };
  };
  bestNextAction: string;
  conditionsForSuccess: string[];
  butterflyEffects: CausalLink[];
  originalTimelineSummary: string;
  improvedTimelineSummary: string;
}

export interface SimulationSavepoint {
  id: string;
  name: string;
  universeId: string;
  sceneId: string;
  timestamp: number;
  note: string;
}

export interface ParallelUniverseSimulation {
  schema_version: '1.0';
  simulation_id: string;
  simulation_version: number;
  title: string;
  created_at: string;
  updated_at: string;
  scenario: ScenarioModel;
  variables: SimulationVariable[];
  entities: EntityState[];
  visualBibles: VisualBibles;
  universes: ParallelUniverse[];
  activeUniverseId: string;
  savepoints: SimulationSavepoint[];
  aiImprovementReport?: AiImprovementReport;
  interviewHistory: QuestionAnswer[];
}
