export interface IeltsVocabItem {
  id: string;
  icon: string;
  word: string;
  meaning: string;
  visualSentence: string;
  category?: string;
}

export interface IeltsConnectorItem {
  icon: string;
  connector: string;
  function: string;
  vietnamese: string;
}

export interface IeltsSpeakingLesson {
  id: string;
  topic: string;
  question: string;
  part: 'Part 2' | 'Part 3';
  visualMasterMap: string[]; // ['💵⬆️', '👷', '🪙', '🔒💼', '🆘', '🌊', '🛒', '🚀', '📈', '💪', '🎯']
  fullSpeakingAnswer: string; // formatted with icons inline
  vocabList: IeltsVocabItem[];
  connectorTable: IeltsConnectorItem[];
  bilingualSummary: {
    english: string;
    vietnamese: string;
  };
  thirtySecondMemory: {
    iconChain: string;
    explanations: { icon: string; textEn: string; textVi: string }[];
  };
  vocabMemoryMap: {
    icon: string;
    vocabulary: string;
    coreIdea: string;
  }[];
  recallTest: {
    iconSequence: string[];
    targetConcepts: string[];
    hintWords: string[];
  };
  createdAt: number;
}

export interface IeltsRecallTestResult {
  lessonId: string;
  userAnswer: string;
  scoreEstimate: number; // e.g. 7.5
  vocabularyAccuracy: { score: number; feedback: string };
  grammar: { score: number; feedback: string };
  fluency: { score: number; feedback: string };
  naturalness: { score: number; feedback: string };
  sequenceFollowed: boolean;
  overallReview: string;
  suggestedImprovement: string;
  completedAt: number;
}
