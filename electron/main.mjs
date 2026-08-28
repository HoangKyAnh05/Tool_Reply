import { app, BrowserWindow, ipcMain, shell, session, clipboard, nativeImage, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
let separateWindows = new Map();
let currentWatchedFolder = null;
let folderWatcher = null;

const isDev = process.env.NODE_ENV === 'development' || process.env.WAIT_ON_DEV === 'true' || !app.isPackaged;

const FIREFOX_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0';

const CHROME_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

app.commandLine.appendSwitch('disable-blink-features', 'AutomationControlled');
app.commandLine.appendSwitch('disable-features', 'UserAgentClientHint,OutOfBlinkCors');
app.userAgentFallback = FIREFOX_UA;

function configureSession() {
  const customSession = session.fromPartition('persist:ai_miniweb_session');

  customSession.webRequest.onBeforeSendHeaders((details, callback) => {
    const headers = { ...details.requestHeaders };
    const url = details.url || '';

    if (url.includes('accounts.google.com') || url.includes('myaccount.google.com')) {
      headers['User-Agent'] = FIREFOX_UA;
    } else {
      headers['User-Agent'] = CHROME_UA;
    }

    delete headers['X-DevTools-Emulate-Network-Conditions-Client-Id'];
    callback({ cancel: false, requestHeaders: headers });
  });

  customSession.setPermissionRequestHandler((_, __, callback) => {
    callback(true);
  });
}

function getAllCommonImageFolders() {
  const home = os.homedir();
  const candidates = [
    path.join(home, 'Pictures', 'Screenshots'),
    path.join(home, 'OneDrive', 'Pictures', 'Screenshots'),
    path.join(home, 'OneDrive', 'Pictures'),
    path.join(home, 'Pictures'),
    path.join(home, 'OneDrive', 'Desktop'),
    path.join(home, 'Desktop'),
    path.join(home, 'Downloads'),
    path.join(home, 'Pictures', 'Saved Pictures'),
    path.join(home, 'Pictures', 'Camera Roll')
  ];

  return candidates.filter((p) => {
    try {
      return fs.existsSync(p) && fs.statSync(p).isDirectory();
    } catch (_) {
      return false;
    }
  });
}

function getDefaultScreenshotFolder() {
  const folders = getAllCommonImageFolders();
  // Find first folder that actually contains images
  const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp'];
  for (const f of folders) {
    try {
      const files = fs.readdirSync(f);
      const hasImages = files.some((file) => validExtensions.includes(path.extname(file).toLowerCase()));
      if (hasImages) return f;
    } catch (_) {}
  }

  return folders[0] || path.join(os.homedir(), 'Pictures');
}

function setupFolderWatcher(folderPath) {
  if (folderWatcher) {
    try {
      folderWatcher.close();
    } catch (_) {}
    folderWatcher = null;
  }

  if (folderPath && fs.existsSync(folderPath)) {
    currentWatchedFolder = folderPath;
    try {
      folderWatcher = fs.watch(folderPath, (eventType) => {
        if (eventType === 'rename' || eventType === 'change') {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('screenshot:folder-updated', folderPath);
          }
        }
      });
    } catch (e) {
      console.error('Folder watch error:', e);
    }
  }
}

function createWindow() {
  configureSession();

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 700,
    frame: true,
    titleBarStyle: 'default',
    backgroundColor: '#020617',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      webviewTag: true,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.on('did-attach-webview', (_, webviewContents) => {
    webviewContents.setUserAgent(FIREFOX_UA);

    webviewContents.setWindowOpenHandler(({ url }) => {
      openAuthWindow(url);
      return { action: 'deny' };
    });
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('accounts.google.com') || url.includes('auth0.com') || url.includes('openai.com')) {
      openAuthWindow(url);
      return { action: 'deny' };
    }

    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  setupFolderWatcher(getDefaultScreenshotFolder());

  mainWindow.on('closed', () => {
    if (folderWatcher) {
      folderWatcher.close();
      folderWatcher = null;
    }
    mainWindow = null;
  });
}

function openAuthWindow(url = 'https://accounts.google.com') {
  const authWin = new BrowserWindow({
    width: 600,
    height: 750,
    title: 'Đăng Nhập Google / OpenAI',
    backgroundColor: '#1e293b',
    autoHideMenuBar: true,
    webPreferences: {
      partition: 'persist:ai_miniweb_session',
      nodeIntegration: false,
      contextIsolation: true,
      userAgent: FIREFOX_UA,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  authWin.webContents.setUserAgent(FIREFOX_UA);
  authWin.loadURL(url);

  authWin.webContents.on('did-navigate', (_, navUrl) => {
    if (navUrl.includes('myaccount.google.com') || navUrl.includes('gemini.google.com') || navUrl.includes('chatgpt.com')) {
      setTimeout(() => {
        if (!authWin.isDestroyed()) {
          authWin.close();
        }
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('auth:completed');
        }
      }, 1200);
    }
  });

  return authWin;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('app:version', () => app.getVersion());

ipcMain.handle('app:restart', () => {
  if (isDev && mainWindow) {
    mainWindow.reload();
  } else {
    app.relaunch();
    app.exit(0);
  }
  return true;
});

ipcMain.handle('app:reload', () => {
  if (mainWindow) {
    mainWindow.webContents.reloadIgnoringCache();
  }
  return true;
});

ipcMain.handle('app:toggle-devtools', () => {
  if (mainWindow) {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  }
  return true;
});

ipcMain.handle('app:open-external', (_, url) => {
  if (url) {
    shell.openExternal(url);
  }
  return true;
});

ipcMain.handle('app:open-google-login', (_, url) => {
  openAuthWindow(url || 'https://accounts.google.com');
  return true;
});

// Select folder for screenshot watching
ipcMain.handle('app:select-screenshot-folder', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Chọn thư mục chứa ảnh chụp màn hình',
    properties: ['openDirectory']
  });

  if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
    return null;
  }

  const selectedPath = result.filePaths[0];
  setupFolderWatcher(selectedPath);
  return selectedPath;
});

ipcMain.handle('app:get-default-screenshot-folder', () => {
  return currentWatchedFolder || getDefaultScreenshotFolder();
});

// Scan folder for images (or auto-aggregate across common folders if target is empty)
ipcMain.handle('app:scan-folder-images', async (_, targetFolder) => {
  let folder = targetFolder || currentWatchedFolder || getDefaultScreenshotFolder();
  const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp'];

  let foldersToScan = [folder];
  // If specific folder not requested and current folder has no images, search all common image folders
  if (!targetFolder) {
    foldersToScan = getAllCommonImageFolders();
  }

  try {
    let allFoundFiles = [];

    for (const f of foldersToScan) {
      if (!fs.existsSync(f)) continue;
      try {
        const entries = fs.readdirSync(f);
        for (const name of entries) {
          const fullPath = path.join(f, name);
          try {
            const stat = fs.statSync(fullPath);
            if (stat.isFile()) {
              const ext = path.extname(name).toLowerCase();
              if (validExtensions.includes(ext)) {
                allFoundFiles.push({
                  name,
                  fullPath,
                  folder: f,
                  mtime: stat.mtimeMs,
                  size: stat.size,
                  ext
                });
              }
            }
          } catch (_) {}
        }
      } catch (_) {}
    }

    // Sort newest first, take latest 40 images
    allFoundFiles.sort((a, b) => b.mtime - a.mtime);
    const topFiles = allFoundFiles.slice(0, 40);

    // Read base64 for thumbnails
    const result = topFiles.map((f) => {
      let base64 = '';
      try {
        const buf = fs.readFileSync(f.fullPath);
        const mime = f.ext === '.jpg' || f.ext === '.jpeg' ? 'image/jpeg' : `image/${f.ext.replace('.', '')}`;
        base64 = `data:${mime};base64,${buf.toString('base64')}`;
      } catch (_) {}

      return {
        name: f.name,
        fullPath: f.fullPath,
        mtime: f.mtime,
        size: f.size,
        base64
      };
    });

    if (topFiles.length > 0 && !targetFolder) {
      folder = topFiles[0].fullPath.substring(0, topFiles[0].fullPath.lastIndexOf(path.sep));
    }

    return {
      folder,
      files: result
    };
  } catch (err) {
    console.error('Scan folder error:', err);
    return { folder, files: [] };
  }
});

// Select exact image file
ipcMain.handle('app:select-image-file', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Chọn đúng ảnh chụp màn hình từ máy tính',
    properties: ['openFile'],
    filters: [
      { name: 'Ảnh chụp (PNG, JPG, WebP)', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'] }
    ]
  });

  if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase().replace('.', '') || 'png';
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
    const base64 = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    const fileName = path.basename(filePath);

    try {
      clipboard.clear();
      const img = nativeImage.createFromPath(filePath);
      clipboard.writeImage(img);
    } catch (_) {}

    return {
      filePath,
      fileName,
      mimeType,
      base64
    };
  } catch (err) {
    console.error('Error reading selected image from disk:', err);
    return null;
  }
});

ipcMain.handle('app:copy-image-to-clipboard', (_, dataUrl) => {
  if (dataUrl) {
    try {
      clipboard.clear();
      const img = nativeImage.createFromDataURL(dataUrl);
      clipboard.writeImage(img);
      return true;
    } catch (e) {
      console.error('Error copying image to clipboard:', e);
      return false;
    }
  }
  return false;
});

ipcMain.handle('app:open-separate-window', (_, { url, title = 'AI Mini Web', width = 1200, height = 800 }) => {
  const targetUrl = url || 'https://gemini.google.com';
  
  if (separateWindows.has(targetUrl)) {
    const existing = separateWindows.get(targetUrl);
    if (existing && !existing.isDestroyed()) {
      existing.focus();
      return true;
    }
  }

  const subWin = new BrowserWindow({
    width,
    height,
    title,
    backgroundColor: '#0f172a',
    autoHideMenuBar: true,
    webPreferences: {
      partition: 'persist:ai_miniweb_session',
      nodeIntegration: false,
      contextIsolation: true,
      userAgent: FIREFOX_UA,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  subWin.webContents.setUserAgent(FIREFOX_UA);
  subWin.loadURL(targetUrl);

  separateWindows.set(targetUrl, subWin);

  subWin.on('closed', () => {
    separateWindows.delete(targetUrl);
  });

  return true;
});
