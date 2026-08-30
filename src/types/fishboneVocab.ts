export type VocabPartOfSpeech = 'noun' | 'verb' | 'adj' | 'adv' | 'phrase' | 'structure' | 'grammar';

export interface FishboneBoneTheme {
  id: string;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  description: string;
  categoryType?: 'vocabulary' | 'grammar' | 'speaking' | 'writing';
  itemCount?: number;
}

export interface FishboneVocabItem {
  id: number | string;
  word: string;
  phonetic?: string;
  pos: VocabPartOfSpeech;
  meaning: string;
  icon: string;
  levelNumber: 1 | 2 | 3 | 4 | 5;
  boneId: string;
  boneName: string;
  collocation: string;
  example: string;
  band: '7.5' | '8.0' | '8.5' | '9.0';
  formula?: string;
  usageNotes?: string;
  isCustom?: boolean;
}
