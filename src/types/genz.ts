export type GenzTone = 
  | 'cool' 
  | 'hai' 
  | 'cakhia' 
  | 'drama' 
  | 'deadpan' 
  | 'ngong' 
  | 'thathinh' 
  | 'meme' 
  | 'lanhlung';

export interface GenzToneOption {
  id: GenzTone;
  label: string;
  icon: string;
  desc: string;
}

export interface GenzVisualIdea {
  title: string;
  explanation: string;
  imagePrompt: string;
  suggestedCaption: string;
  visualStyle: string;
  generatedImageUrl?: string;
}

export interface GenzResultVersion {
  id: string;
  text: string;
  tone: GenzTone;
  styleTag: string; // e.g. "Natural", "Funny / Chuồng gà", "Savage / Cà khịa"
}

export interface GenzGenerationResult {
  id: string;
  originalText: string;
  conversationContext?: string;
  versions: GenzResultVersion[];
  visualIdea: GenzVisualIdea;
  createdAt: number;
}

export interface GenzSavedPhrase {
  id: string;
  originalText: string;
  generatedText: string;
  tone: GenzTone;
  styleTag?: string;
  imageIdea?: GenzVisualIdea;
  imagePrompt?: string;
  generatedImageUrl?: string;
  createdAt: number;
}
