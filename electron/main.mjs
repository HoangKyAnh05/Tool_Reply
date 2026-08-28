import { app, BrowserWindow, ipcMain, shell, session, clipboard, nativeImage, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
let separateWindows = new Map();
let attachedWebviews = new Map();
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
    'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video',
    'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26',
    path.join(home, 'Pictures', 'Screenshots'),
    path.join(home, 'OneDrive', 'Pictures', 'Screenshots'),
    path.join(home, 'OneDrive', 'Pictures'),
    path.join(home, 'Pictures'),
    path.join(home, 'OneDrive', 'Desktop'),
    path.join(home, 'Desktop'),
    path.join(home, 'Downloads'),
    path.join(home, 'Pictures', 'Saved Pictures')
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
  const customCandidate = 'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video';
  if (fs.existsSync(customCandidate)) {
    return customCandidate;
  }

  const folders = getAllCommonImageFolders();
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
    attachedWebviews.set(webviewContents.id, webviewContents);
    webviewContents.setUserAgent(CHROME_UA);

    webviewContents.setWindowOpenHandler(({ url }) => {
      openAuthWindow(url);
      return { action: 'deny' };
    });

    webviewContents.on('destroyed', () => {
      attachedWebviews.delete(webviewContents.id);
    });
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('accounts.google.com') || url.includes('auth0.com') || url.includes('openai.com') || url.includes('facebook.com') || url.includes('instagram.com') || url.includes('zalo.me')) {
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
  const isGoogle = url.includes('accounts.google.com') || url.includes('myaccount.google.com');
  const winUA = isGoogle ? FIREFOX_UA : CHROME_UA;

  const authWin = new BrowserWindow({
    width: 650,
    height: 750,
    title: 'Đăng Nhập Tài Khoản',
    backgroundColor: '#1e293b',
    autoHideMenuBar: true,
    webPreferences: {
      partition: 'persist:ai_miniweb_session',
      nodeIntegration: false,
      contextIsolation: true,
      userAgent: winUA,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  authWin.webContents.setUserAgent(winUA);
  authWin.loadURL(url);

  authWin.webContents.on('did-navigate', (_, navUrl) => {
    if (
      navUrl.includes('myaccount.google.com') || 
      navUrl.includes('gemini.google.com') || 
      navUrl.includes('chatgpt.com') ||
      navUrl.includes('facebook.com/home') ||
      navUrl.includes('instagram.com') ||
      navUrl.includes('chat.zalo.me')
    ) {
      setTimeout(() => {
        if (!authWin.isDestroyed()) {
          authWin.close();
        }
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('auth:completed');
        }
      }, 1500);
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

// Start Native Drag operation
ipcMain.on('app:start-drag-image', (event, filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    const icon = nativeImage.createFromPath(filePath).resize({ width: 64, height: 64 });
    event.sender.startDrag({
      file: filePath,
      icon: icon.isEmpty() ? path.join(__dirname, '../assets/app-icon.png') : icon
    });
  }
});

// Select folder for screenshot watching without blocking window
ipcMain.handle('app:select-screenshot-folder', async () => {
  try {
    const defaultDir = 'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video';
    const result = await dialog.showOpenDialog({
      title: 'Chọn thư mục chứa ảnh chụp màn hình',
      defaultPath: fs.existsSync(defaultDir) ? defaultDir : undefined,
      properties: ['openDirectory', 'dontAddToRecent']
    });

    if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
      return null;
    }

    const selectedPath = result.filePaths[0];
    setupFolderWatcher(selectedPath);
    return selectedPath;
  } catch (e) {
    console.error('select folder error:', e);
    return null;
  }
});

ipcMain.handle('app:get-default-screenshot-folder', () => {
  return currentWatchedFolder || getDefaultScreenshotFolder();
});

// Scan folder for images
ipcMain.handle('app:scan-folder-images', async (_, targetFolder) => {
  let folder = targetFolder || currentWatchedFolder || getDefaultScreenshotFolder();
  const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp'];

  let foldersToScan = [folder];
  if (!targetFolder && !fs.existsSync(folder)) {
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

    allFoundFiles.sort((a, b) => b.mtime - a.mtime);
    const topFiles = allFoundFiles.slice(0, 50);

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

// Automated Native Drag & Drop Simulation + Clipboard Injection
ipcMain.handle('app:inject-image-to-webview', async (_, { webContentsId, filePath, dataUrl, promptText, autoSend = false }) => {
  try {
    // 1. Prepare authentic native image bitmap in system clipboard
    clipboard.clear();
    let img = null;
    let base64Str = dataUrl || '';
    let fileName = 'screenshot_' + Date.now() + '.png';

    if (filePath && fs.existsSync(filePath)) {
      img = nativeImage.createFromPath(filePath);
      fileName = path.basename(filePath);
      const buf = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase().replace('.', '') || 'png';
      const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
      base64Str = `data:${mime};base64,${buf.toString('base64')}`;
    } else if (dataUrl) {
      img = nativeImage.createFromDataURL(dataUrl);
    }

    if (img && !img.isEmpty()) {
      clipboard.writeImage(img);
    }

    // 2. Find target WebContents
    let targetWc = null;
    if (webContentsId && attachedWebviews.has(webContentsId)) {
      targetWc = attachedWebviews.get(webContentsId);
    } else {
      const all = Array.from(attachedWebviews.values());
      if (all.length > 0) targetWc = all[all.length - 1];
    }

    if (targetWc && !targetWc.isDestroyed()) {
      targetWc.focus();

      // Dispatch full automated Drag & Drop event sequence directly onto Gemini/ChatGPT drop target
      const escapedBase64 = JSON.stringify(base64Str);
      const escapedFileName = JSON.stringify(fileName);

      await targetWc.executeJavaScript(`
        (function() {
          const b64 = ${escapedBase64};
          const fname = ${escapedFileName};
          
          function b64toBlob(dataURI) {
            try {
              var byteString = atob(dataURI.split(',')[1]);
              var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
              var ab = new ArrayBuffer(byteString.length);
              var ia = new Uint8Array(ab);
              for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              return new Blob([ab], {type: mimeString});
            } catch(e) { return null; }
          }

          if (b64) {
            const blob = b64toBlob(b64);
            if (blob) {
              const file = new File([blob], fname, { type: blob.type, lastModified: Date.now() });
              const dt = new DataTransfer();
              dt.items.add(file);

              const dropTarget = document.querySelector('rich-textarea, rich-textarea p, #prompt-textarea, [contenteditable="true"], .input-area, div[role="textbox"]') || document.body;

              // 1. Dispatch DragEnter
              dropTarget.dispatchEvent(new DragEvent('dragenter', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dt
              }));

              // 2. Dispatch DragOver
              dropTarget.dispatchEvent(new DragEvent('dragover', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dt
              }));

              // 3. Dispatch Drop
              dropTarget.dispatchEvent(new DragEvent('drop', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dt
              }));

              // 4. Dispatch Paste as backup
              dropTarget.dispatchEvent(new ClipboardEvent('paste', {
                bubbles: true,
                cancelable: true,
                clipboardData: dt
              }));

              // 5. Feed File Inputs
              const fileInputs = document.querySelectorAll('input[type="file"]');
              fileInputs.forEach(fi => {
                try {
                  fi.files = dt.files;
                  fi.dispatchEvent(new Event('change', { bubbles: true }));
                  fi.dispatchEvent(new Event('input', { bubbles: true }));
                } catch(_) {}
              });
            }
          }

          // Focus the text area
          const input = document.querySelector('rich-textarea p, rich-textarea [contenteditable="true"], #prompt-textarea, [contenteditable="true"], textarea, div[role="textbox"]');
          if (input) input.focus();
        })();
      `);

      await new Promise((resolve) => setTimeout(resolve, 200));

      // Trigger OS level paste in guest webview
      targetWc.paste();
      targetWc.sendInputEvent({ type: 'keyDown', keyCode: 'v', modifiers: ['control'] });
      targetWc.sendInputEvent({ type: 'keyUp', keyCode: 'v', modifiers: ['control'] });

      // If prompt text is present, inject and send
      if (promptText && promptText.trim()) {
        setTimeout(async () => {
          if (!targetWc.isDestroyed()) {
            const escapedPrompt = JSON.stringify(promptText.trim());
            await targetWc.executeJavaScript(`
              (function() {
                const text = ${escapedPrompt};
                const input = document.querySelector('rich-textarea p, rich-textarea [contenteditable="true"], #prompt-textarea, [contenteditable="true"], textarea, div[role="textbox"]');
                if (input) {
                  input.focus();
                  document.execCommand('insertText', false, text);
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  ${autoSend ? `
                    setTimeout(() => {
                      const sendBtn = document.querySelector('button[aria-label*="Gửi"], button[aria-label*="Send"], button.send-button, [data-test-id="send-button"], button[data-testid="send-button"], button.mat-mdc-icon-button');
                      if (sendBtn && !sendBtn.disabled) sendBtn.click();
                    }, 400);
                  ` : ''}
                }
              })();
            `);
          }
        }, 800);
      }

      return true;
    }
    return false;
  } catch (e) {
    console.error('inject-image-to-webview error:', e);
    return false;
  }
});

// Select exact image file
ipcMain.handle('app:select-image-file', async () => {
  try {
    const defaultDir = 'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video';
    const result = await dialog.showOpenDialog({
      title: 'Chọn đúng ảnh chụp màn hình từ máy tính',
      defaultPath: fs.existsSync(defaultDir) ? defaultDir : undefined,
      properties: ['openFile', 'dontAddToRecent'],
      filters: [
        { name: 'Ảnh chụp (PNG, JPG, WebP)', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'] }
      ]
    });

    if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
      return null;
    }

    const filePath = result.filePaths[0];
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

  const isGoogle = targetUrl.includes('accounts.google.com');
  const winUA = isGoogle ? FIREFOX_UA : CHROME_UA;

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
      userAgent: winUA,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  subWin.webContents.setUserAgent(winUA);
  subWin.loadURL(targetUrl);

  separateWindows.set(targetUrl, subWin);

  subWin.on('closed', () => {
    separateWindows.delete(targetUrl);
  });

  return true;
});
