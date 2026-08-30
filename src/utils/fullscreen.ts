/**
 * Fullscreen utility compatible with both Electron desktop app and web browsers
 */

export async function toggleNativeFullscreen(): Promise<boolean> {
  // If running in Electron
  if (window.electronAPI?.toggleFullScreen) {
    try {
      return await window.electronAPI.toggleFullScreen();
    } catch (err) {
      console.warn('Electron fullscreen error:', err);
    }
  }

  // If running in Web Browser
  try {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        return true;
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        return false;
      }
    }
  } catch (err) {
    console.warn('Web Fullscreen error:', err);
  }
  return false;
}

export function isCurrentlyNativeFullscreen(): boolean {
  return Boolean(document.fullscreenElement);
}
