import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('app:version'),
  restartApp: () => ipcRenderer.invoke('app:restart'),
  reloadApp: () => ipcRenderer.invoke('app:reload'),
  toggleDevTools: () => ipcRenderer.invoke('app:toggle-devtools'),
  toggleFullScreen: () => ipcRenderer.invoke('app:toggle-fullscreen'),
  isFullScreen: () => ipcRenderer.invoke('app:is-fullscreen'),
  openExternal: (url) => ipcRenderer.invoke('app:open-external', url),
  openSeparateWindow: (options) => ipcRenderer.invoke('app:open-separate-window', options),
  openGoogleLogin: (url) => ipcRenderer.invoke('app:open-google-login', url),
  selectImageFile: () => ipcRenderer.invoke('app:select-image-file'),
  selectScreenshotFolder: () => ipcRenderer.invoke('app:select-screenshot-folder'),
  getDefaultScreenshotFolder: () => ipcRenderer.invoke('app:get-default-screenshot-folder'),
  scanFolderImages: (folder) => ipcRenderer.invoke('app:scan-folder-images', folder),
  injectImageToWebview: (params) => ipcRenderer.invoke('app:inject-image-to-webview', params),
  startDragImage: (filePath) => ipcRenderer.send('app:start-drag-image', filePath),
  copyImageToClipboard: (dataUrl) => ipcRenderer.invoke('app:copy-image-to-clipboard', dataUrl),
  onFolderUpdated: (callback) => {
    ipcRenderer.on('screenshot:folder-updated', (_, folder) => callback(folder));
  },
  onSocialNotification: (callback) => {
    ipcRenderer.on('social:new-notification', (_, notif) => callback(notif));
  },
  onAuthCompleted: (callback) => {
    ipcRenderer.on('auth:completed', () => callback());
  },
  isElectron: true,
});
