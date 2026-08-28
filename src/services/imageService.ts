// Image Service supporting Context-Aware AI Generation (Pollinations AI), Unsplash Semantic curation, and SVG Canvas generation

export interface ImageGenerationOptions {
  prompt: string;
  seed?: number;
  width?: number;
  height?: number;
  visualStyle?: string;
  subject?: string;
  state?: string;
}

// Curated high quality semantic images for guaranteed immediate visual context
const SEMANTIC_STOCK_MAP: Record<string, string[]> = {
  // Business / Restaurant / Startup
  'closed_storefront': [
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb18015f6?w=1000&auto=format&fit=crop&q=80'
  ],
  'empty_restaurant_worried': [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80'
  ],
  'busy_restaurant_customers': [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&auto=format&fit=crop&q=80'
  ],
  'opening_store_renovation': [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&auto=format&fit=crop&q=80'
  ],
  'competitor_crowd': [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80'
  ],
  'debt_stress_calculator': [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&auto=format&fit=crop&q=80'
  ],
  'success_thriving_business': [
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80'
  ],
  'online_delivery_packaging': [
    'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1000&auto=format&fit=crop&q=80'
  ],
  // General Life / Decision
  'stressed_person': [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=80'
  ],
  'decision_crossroad': [
    'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1000&auto=format&fit=crop&q=80'
  ]
};

export const imageService = {
  /**
   * Generates Pollinations AI Image URL based on a detailed prompt
   */
  getPollinationsUrl(prompt: string, width = 1024, height = 640, seed?: number): string {
    const s = seed || Math.floor(Math.random() * 100000);
    const cleanPrompt = prompt
      .replace(/[\n\r]+/g, ' ')
      .trim()
      .slice(0, 400);
    const encoded = encodeURIComponent(cleanPrompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${s}&nologo=true&model=flux`;
  },

  /**
   * Builds an exact Context-Aware prompt incorporating Subject, Action, State, Emotion, and Style
   */
  buildContextAwarePrompt(params: {
    event: string;
    state: string;
    location?: string;
    emotion?: string;
    characters?: string[];
    visualStyle?: string;
  }): string {
    const style = params.visualStyle || 'Cinematic documentary photography, natural dramatic 35mm lighting, hyper-realistic, 8k resolution, authentic atmosphere';
    const parts = [
      `A detailed cinematic scene depicting ${params.event}.`,
      params.state ? `Current state: ${params.state}.` : '',
      params.location ? `Setting/Environment: ${params.location}.` : '',
      params.emotion ? `Atmosphere and facial expression: ${params.emotion}.` : '',
      params.characters?.length ? `People involved: ${params.characters.join(', ')}.` : '',
      `Visual style: ${style}. Photorealistic, no cartoonish artifacts, authentic realistic props.`
    ].filter(Boolean);

    return parts.join(' ');
  },

  /**
   * Returns a matching fallback or generated image URL
   */
  getImageForScene(queryKey: string, promptFallback: string): string {
    const matched = SEMANTIC_STOCK_MAP[queryKey];
    if (matched && matched.length > 0) {
      return matched[Math.floor(Math.random() * matched.length)];
    }
    // Return Pollinations dynamic URL
    return this.getPollinationsUrl(promptFallback);
  },

  /**
   * Generates an SVG Data URI fallback representation in case internet is offline
   */
  getSvgPlaceholder(title: string, subtitle: string, color = '#3b82f6'): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g)" />
      <circle cx="400" cy="200" r="80" fill="${color}" opacity="0.15" />
      <path d="M370 200 L430 200 M400 170 L400 230" stroke="${color}" stroke-width="4" stroke-linecap="round" />
      <text x="400" y="320" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#f8fafc" text-anchor="middle">${title}</text>
      <text x="400" y="360" font-family="system-ui, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">${subtitle}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
};
