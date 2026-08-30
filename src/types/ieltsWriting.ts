export type IeltsTask1ChartType = 'line' | 'bar' | 'pie' | 'table' | 'map' | 'process' | 'mixed';

export type IeltsTask2EssayType = 
  | 'opinion' 
  | 'discussion' 
  | 'advantages_disadvantages' 
  | 'problem_solution' 
  | 'two_part_question';

export interface ChartDataSeries {
  label: string;
  color?: string;
  data: { name: string; value: number }[];
}

export interface ChartMapLocation {
  name: string;
  pastStatus: string;
  presentStatus: string;
  type: 'residential' | 'commercial' | 'nature' | 'transport';
}

export interface ChartProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ChartVisualData {
  chartType: IeltsTask1ChartType;
  xAxisTitle?: string;
  yAxisTitle?: string;
  unit?: string;
  categories?: string[];
  series?: ChartDataSeries[];
  // For Map
  mapLocations?: ChartMapLocation[];
  // For Process
  processSteps?: ChartProcessStep[];
  // For Table
  tableHeaders?: string[];
  tableRows?: (string | number)[][];
}

export interface IeltsTask1Item {
  id: number;
  title: string;
  chartType: IeltsTask1ChartType;
  category: string;
  prompt: string;
  chartData: ChartVisualData;
  overview: string;
  sampleAnswerBand8: string;
  keyVocabulary: { word: string; meaning: string }[];
  wordCount: number;
  bandScore: '7.5' | '8.0' | '8.5' | '9.0';
}

export interface IeltsTask2Item {
  id: number;
  topic: string;
  essayType: IeltsTask2EssayType;
  category: string;
  prompt: string;
  outline: {
    introduction: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    conclusion: string;
  };
  sampleAnswerBand8: string;
  lexicalResource: { term: string; explanation: string; example: string }[];
  wordCount: number;
  bandScore: '7.5' | '8.0' | '8.5' | '9.0';
}
