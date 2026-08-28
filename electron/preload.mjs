import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('app:version'),
  restartApp: () => ipcRenderer.invoke('app:restart'),
  reloadApp: () => ipcRenderer.invoke('app:reload'),
  toggleDevTools: () => ipcRenderer.invoke('app:toggle-devtools'),
  openExternal: (url) => ipcRenderer.invoke('app:open-external', url),
  openSeparateWindow: (options) => ipcRenderer.invoke('app:open-separate-window', options),
  openGoogleLogin: (url) => ipcRenderer.invoke('app:open-google-login', url),
  selectImageFile: () => ipcRenderer.invoke('app:select-image-file'),
  selectScreenshotFolder: () => ipcRenderer.invoke('app:select-screenshot-folder'),
  getDefaultScreenshotFolder: () => ipcRenderer.invoke('app:get-default-screenshot-folder'),
  scanFolderImages: (folder) => ipcRenderer.invoke('app:scan-folder-images', folder),
  writeImageBitmapToClipboard: (filePathOrBase64) => ipcRenderer.invoke('app:write-image-bitmap-to-clipboard', filePathOrBase64),
  copyImageToClipboard: (dataUrl) => ipcRenderer.invoke('app:copy-image-to-clipboard', dataUrl),
  onFolderUpdated: (callback) => {
    ipcRenderer.on('screenshot:folder-updated', (_, folder) => callback(folder));
  },
  onAuthCompleted: (callback) => {
    ipcRenderer.on('auth:completed', () => callback());
  },
  isElectron: true,
});
