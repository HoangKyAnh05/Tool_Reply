export type AiProvider = 'builtin' | 'gemini' | 'openai' | 'custom';

export interface AppSettings {
  aiProvider: AiProvider;
  geminiApiKey: string;
  geminiModel: string;
  openaiApiKey: string;
  openaiModel: string;
  customApiUrl: string;
  customApiKey: string;
  imageProvider: 'pollinations' | 'canvas_pro' | 'unsplash';
  language: 'vi' | 'en';
  soundEffects: boolean;
  theme: 'dark' | 'midnight' | 'cyber';
}
