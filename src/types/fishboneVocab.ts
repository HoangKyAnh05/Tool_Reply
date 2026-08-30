export type VocabPartOfSpeech = 'noun' | 'verb' | 'adj' | 'adv';

export interface FishboneBoneTheme {
  id: string;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  description: string;
}

export interface FishboneVocabItem {
  id: number;
  word: string;
  phonetic: string;
  pos: VocabPartOfSpeech;
  meaning: string;
  icon: string;
  levelNumber: 1 | 2 | 3 | 4 | 5;
  boneId: string;
  boneName: string;
  collocation: string;
  example: string;
  band: '7.5' | '8.0' | '8.5' | '9.0';
}
