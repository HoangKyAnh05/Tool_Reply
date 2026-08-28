import fs from 'fs';
import path from 'path';

// Let's create a valid ICO file with multiple resolutions (32x32, 48x48, 64x64)
// An ICO file starts with 6 bytes header (reserved: 0, type: 1, count: n)
// followed by directory entries (16 bytes each), followed by bitmap/PNG data.

// Let's create an SVG with an AI Futuristic glowing icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#312e81" />
      <stop offset="70%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <linearGradient id="orbit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="core" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Rounded Base -->
  <rect width="256" height="256" rx="56" fill="url(#bg)" stroke="#4338ca" stroke-width="4" />
  
  <!-- Ambient Orbit Glow -->
  <circle cx="128" cy="128" r="75" fill="none" stroke="url(#orbit)" stroke-width="6" opacity="0.8" filter="url(#glow)" />
  <ellipse cx="128" cy="128" rx="85" ry="38" fill="none" stroke="url(#orbit)" stroke-width="4" transform="rotate(-30 128 128)" opacity="0.7" />
  <ellipse cx="128" cy="128" rx="85" ry="38" fill="none" stroke="url(#orbit)" stroke-width="4" transform="rotate(30 128 128)" opacity="0.7" />
  
  <!-- AI Core Brain Node -->
  <circle cx="128" cy="128" r="36" fill="url(#core)" filter="url(#glow)" />
  <circle cx="128" cy="128" r="28" fill="#0f172a" />
  
  <!-- AI Sparks & Constellation Nodes -->
  <circle cx="128" cy="128" r="14" fill="url(#orbit)" />
  <circle cx="68" cy="98" r="7" fill="#38bdf8" filter="url(#glow)" />
  <circle cx="188" cy="158" r="7" fill="#ec4899" filter="url(#glow)" />
  <circle cx="128" cy="48" r="6" fill="#818cf8" />
  <circle cx="128" cy="208" r="6" fill="#06b6d4" />
  
  <!-- Sparkle stars -->
  <path d="M128 78 Q128 98 108 98 Q128 98 128 118 Q128 98 148 98 Q128 98 128 78 Z" fill="#ffffff" opacity="0.9" />
</svg>`;

const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

fs.writeFileSync(path.join(assetsDir, 'icon.svg'), svgContent);
console.log('SVG Icon saved to assets/icon.svg');
