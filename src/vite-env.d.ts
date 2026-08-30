/// <reference types="vite/client" />

export interface ScannedImageFile {
  name: string;
  fullPath: string;
  mtime: number;
  size: number;
  base64: string;
}

export interface RawSocialNotification {
  platform: 'facebook' | 'instagram' | 'zalo';
  type?: string;
  title: string;
  message: string;
  avatarUrl?: string;
  link?: string;
  timestamp: number;
}

declare global {
  interface Window {
    electronAPI?: {
      getVersion: () => Promise<string>;
      restartApp: () => Promise<boolean>;
      reloadApp: () => Promise<boolean>;
      toggleDevTools: () => Promise<boolean>;
      toggleFullScreen: () => Promise<boolean>;
      isFullScreen: () => Promise<boolean>;
      openExternal: (url: string) => Promise<boolean>;
      openSeparateWindow: (options: { url: string; title?: string; width?: number; height?: number }) => Promise<boolean>;
      openGoogleLogin: (url?: string) => Promise<boolean>;
      selectImageFile: () => Promise<{ filePath: string; fileName: string; base64: string } | null>;
      selectScreenshotFolder: () => Promise<string | null>;
      getDefaultScreenshotFolder: () => Promise<string>;
      scanFolderImages: (folder?: string) => Promise<{ folder: string; files: ScannedImageFile[] }>;
      injectImageToWebview: (params: {
        webContentsId?: number;
        filePath?: string;
        dataUrl?: string;
        promptText?: string;
        autoSend?: boolean;
      }) => Promise<boolean>;
      startDragImage: (filePath: string) => void;
      copyImageToClipboard: (dataUrl: string) => Promise<boolean>;
      onFolderUpdated: (callback: (folder: string) => void) => void;
      onSocialNotification: (callback: (notif: RawSocialNotification) => void) => void;
      onAuthCompleted: (callback: () => void) => void;
      isElectron: boolean;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      webview: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        partition?: string;
        allowpopups?: string | boolean;
        useragent?: string;
        autosize?: string | boolean;
        nodeintegration?: string | boolean;
        webpreferences?: string;
      };
    }
  }
}
