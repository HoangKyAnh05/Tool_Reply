import { app, BrowserWindow, ipcMain, shell, session, clipboard, nativeImage, dialog, Notification } from 'electron';
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
const recentNotificationsCache = new Map();

function dispatchSocialNotification(data) {
  if (!data || (!data.title && !data.message)) return;
  const key = `${data.platform}:${data.title}:${data.message}`;
  const now = Date.now();
  if (recentNotificationsCache.has(key)) {
    const lastSent = recentNotificationsCache.get(key);
    if (now - lastSent < 20000) {
      return; // Deduplicate within 20s
    }
  }
  recentNotificationsCache.set(key, now);

  // 1. Send to renderer
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('social:new-notification', data);
  }

  // 2. Show Native Windows Toast Notification
  try {
    if (Notification.isSupported()) {
      const toast = new Notification({
        title: data.title || 'Thông Báo Mới',
        body: data.message || '',
        icon: path.join(__dirname, '../assets/app-icon.png'),
        silent: false,
      });
      toast.show();
      toast.on('click', () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.show();
          mainWindow.focus();
        }
      });
    }
  } catch (err) {
    console.error('Show native notification error:', err);
  }
}

const isDev = process.env.NODE_ENV === 'development' || process.env.WAIT_ON_DEV === 'true' || !app.isPackaged;

const FIREFOX_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0';

const CHROME_UA = 
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

app.commandLine.appendSwitch('disable-blink-features', 'AutomationControlled');
app.commandLine.appendSwitch('disable-features', 'UserAgentClientHint,OutOfBlinkCors');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-accelerated-video-decode');
app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
app.commandLine.appendSwitch('disable-background-timer-throttling', 'false');
app.commandLine.appendSwitch('disable-renderer-backgrounding', 'false');
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

// Script to inject inside Facebook, Instagram, and Zalo webviews to intercept notifications
function getSocialObserverScript(platform) {
  return `
    (function() {
      if (window.__socialObserverInjected) return;
      window.__socialObserverInjected = true;

      function dispatchSocialEvent(type, title, message, avatarUrl, link) {
        if (!title && !message) return;
        try {
          const payload = {
            platform: '${platform}',
            type: type || 'message',
            title: title || '${platform.toUpperCase()}',
            message: message || '',
            avatarUrl: avatarUrl || '',
            link: link || window.location.href,
            timestamp: Date.now()
          };
          console.log('__IMAGINE_NOTIF__' + JSON.stringify(payload));
        } catch(_) {}
      }

      // 1. Intercept window.Notification
      const OrigNotification = window.Notification;
      window.Notification = function(title, options = {}) {
        dispatchSocialEvent(
          'message',
          title,
          options.body || '',
          options.icon || '',
          options.data?.url || window.location.href
        );
        return {
          close: () => {},
          addEventListener: () => {},
          removeEventListener: () => {}
        };
      };
      window.Notification.permission = 'granted';
      window.Notification.requestPermission = () => Promise.resolve('granted');

      // 2. Monitor title changes
      let lastTitle = document.title;
      setInterval(() => {
        if (document.title !== lastTitle) {
          lastTitle = document.title;
          const match = lastTitle.match(/\\((\\d+)\\)/);
          if (match && parseInt(match[1]) > 0) {
            dispatchSocialEvent(
              'message',
              '${platform.toUpperCase()}',
              'Bạn có ' + match[1] + ' tin nhắn/thông báo mới',
              '',
              window.location.href
            );
          }
        }
      }, 2500);

      // 3. Monitor DOM mutations for unread items
      let lastNotifText = '';
      const observer = new MutationObserver(() => {
        try {
          if ('${platform}' === 'zalo') {
            const unreadItems = document.querySelectorAll('.conv-item.unread, .chat-message-unread, .nav-sub-item .badge, [data-id*="conv-item"].unread');
            if (unreadItems.length > 0) {
              const nameEl = document.querySelector('.conv-item.unread .conv-item-title__name, .conv-item.unread .truncate');
              const msgEl = document.querySelector('.conv-item.unread .conv-message, .conv-item.unread .preview-message');
              const sender = nameEl ? nameEl.innerText.trim() : 'Bạn bè Zalo';
              const text = msgEl ? msgEl.innerText.trim() : 'Có tin nhắn mới';
              const key = sender + ':' + text;
              if (key !== lastNotifText && text) {
                lastNotifText = key;
                dispatchSocialEvent('message', 'Zalo: ' + sender, text, '', window.location.href);
              }
            }
          } else if ('${platform}' === 'facebook') {
            const fbBadge = document.querySelector('[aria-label*="Messenger"] span, [aria-label*="Thông báo"] span, [aria-label*="Notifications"] span');
            if (fbBadge && fbBadge.innerText) {
              const count = fbBadge.innerText.trim();
              if (count && count !== '0' && count !== lastNotifText) {
                lastNotifText = count;
                dispatchSocialEvent('other', 'Facebook', 'Có ' + count + ' tương tác/tin nhắn mới', '', window.location.href);
              }
            }
          } else if ('${platform}' === 'instagram') {
            const instaBadge = document.querySelector('svg[aria-label*="Direct"] + div, svg[aria-label*="Tin nhắn"] + div, a[href*="/direct/"] span');
            if (instaBadge && instaBadge.innerText) {
              const count = instaBadge.innerText.trim();
              if (count && count !== lastNotifText) {
                lastNotifText = count;
                dispatchSocialEvent('message', 'Instagram Direct', 'Có ' + count + ' tin nhắn mới', '', window.location.href);
              }
            }
          }
        } catch(_) {}
      });

      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    })();
  `;
}

function createWindow() {
  configureSession();

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 700,
    frame: true,
    show: true,
    title: 'Imagine AI Studio - IELTS & Writing Master',
    titleBarStyle: 'default',
    backgroundColor: '#020617',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      webviewTag: true,
    },
    icon: path.join(__dirname, '../assets/app-icon.png'),
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  const distHtml = path.join(__dirname, '../dist/index.html');
  if (process.env.WAIT_ON_DEV === 'true') {
    mainWindow.loadURL('http://localhost:5173').catch(() => {
      if (fs.existsSync(distHtml)) mainWindow.loadFile(distHtml);
    });
  } else if (fs.existsSync(distHtml)) {
    mainWindow.loadFile(distHtml);
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }

  mainWindow.webContents.on('did-attach-webview', (_, webviewContents) => {
    attachedWebviews.set(webviewContents.id, webviewContents);
    webviewContents.setUserAgent(CHROME_UA);

    webviewContents.setWindowOpenHandler(({ url }) => {
      openAuthWindow(url);
      return { action: 'deny' };
    });

    webviewContents.on('did-finish-load', () => {
      const currentUrl = webviewContents.getURL() || '';
      let platform = null;
      if (currentUrl.includes('zalo.me')) platform = 'zalo';
      else if (currentUrl.includes('facebook.com')) platform = 'facebook';
      else if (currentUrl.includes('instagram.com')) platform = 'instagram';

      if (platform) {
        webviewContents.executeJavaScript(getSocialObserverScript(platform)).catch(() => {});
      }
    });

    // Listen for bridged console notifications
    webviewContents.on('console-message', (_, level, message) => {
      if (typeof message === 'string' && message.startsWith('__IMAGINE_NOTIF__')) {
        try {
          const jsonStr = message.substring('__IMAGINE_NOTIF__'.length);
          const data = JSON.parse(jsonStr);
          dispatchSocialNotification(data);
        } catch (e) {
          console.error('Parse social notification error:', e);
        }
      }
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

  // Active recurring social notification polling timer (throttled to 10s to prevent UI lag)
  const socialPollTimer = setInterval(async () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;

    for (const [_, wc] of attachedWebviews.entries()) {
      if (!wc || wc.isDestroyed() || (typeof wc.isLoading === 'function' && wc.isLoading())) continue;
      try {
        const url = wc.getURL() || '';
        let plat = null;
        if (url.includes('zalo.me')) plat = 'zalo';
        else if (url.includes('facebook.com')) plat = 'facebook';
        else if (url.includes('instagram.com')) plat = 'instagram';

        if (plat) {
          const script = `
            (() => {
              const title = document.title || '';
              const match = title.match(/\\((\\d+)\\)/);
              const unreadNum = match ? parseInt(match[1]) : 0;
              let items = [];

              if (window.location.host.includes('zalo.me')) {
                const unreads = document.querySelectorAll('.conv-item.unread, .chat-message-unread, [data-id*="conv-item"].unread');
                unreads.forEach(el => {
                  const name = el.querySelector('.conv-item-title__name, .truncate')?.innerText?.trim() || 'Bạn bè Zalo';
                  const text = el.querySelector('.conv-message, .preview-message')?.innerText?.trim() || 'Có tin nhắn mới';
                  items.push({ sender: name, text });
                });
              } else if (window.location.host.includes('facebook.com')) {
                const fbBadge = document.querySelector('[aria-label*="Messenger"] span, [aria-label*="Thông báo"] span, [aria-label*="Notifications"] span');
                if (fbBadge && fbBadge.innerText && fbBadge.innerText.trim() !== '0') {
                  items.push({ sender: 'Facebook', text: 'Có ' + fbBadge.innerText.trim() + ' thông báo/tin nhắn mới' });
                }
              } else if (window.location.host.includes('instagram.com')) {
                const directBadge = document.querySelector('svg[aria-label*="Direct"] + div, a[href*="/direct/"] span');
                if (directBadge && directBadge.innerText) {
                  items.push({ sender: 'Instagram', text: 'Có ' + directBadge.innerText.trim() + ' tin nhắn Direct mới' });
                }
              }

              return { title, unreadNum, items };
            })()
          `;

          const res = await wc.executeJavaScript(script);
          if (res) {
            if (res.items && res.items.length > 0) {
              res.items.forEach((item) => {
                dispatchSocialNotification({
                  platform: plat,
                  title: (plat === 'zalo' ? 'Zalo: ' : plat === 'facebook' ? 'Facebook: ' : 'Instagram: ') + item.sender,
                  message: item.text,
                  link: url,
                  type: 'message',
                  timestamp: Date.now()
                });
              });
            } else if (res.unreadNum > 0) {
              dispatchSocialNotification({
                platform: plat,
                title: plat.toUpperCase() + ' Thông Báo Mới',
                message: 'Bạn có ' + res.unreadNum + ' tin nhắn/thông báo mới',
                link: url,
                type: 'message',
                timestamp: Date.now()
              });
            }
          }
        }
      } catch (_) {}
    }
  }, 3500);

  setupFolderWatcher(getDefaultScreenshotFolder());

  mainWindow.on('closed', () => {
    clearInterval(socialPollTimer);
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

ipcMain.handle('app:toggle-fullscreen', () => {
  if (mainWindow) {
    const isFull = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFull);
    return !isFull;
  }
  return false;
});

ipcMain.handle('app:is-fullscreen', () => {
  return mainWindow ? mainWindow.isFullScreen() : false;
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

// Select folder for screenshot watching as a true modal dialog on mainWindow
ipcMain.handle('app:select-screenshot-folder', async () => {
  try {
    const defaultDir = 'D:\\Work_Code_22_26\\Work_ImageScreenshot_24_26\\Work_Video';
    const win = mainWindow && !mainWindow.isDestroyed() ? mainWindow : undefined;
    const result = await dialog.showOpenDialog(win, {
      title: 'Chọn thư mục chứa ảnh chụp màn hình',
      defaultPath: fs.existsSync(defaultDir) ? defaultDir : undefined,
      properties: ['openDirectory', 'dontAddToRecent', 'createDirectory']
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

// Scan folder for images (Ultra-fast, non-blocking scan with thumbnail generation)
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
    const topFiles = allFoundFiles.slice(0, 30);

    const result = topFiles.map((f, idx) => {
      let base64 = '';
      // Generate lightweight thumbnail only for top preview items (prevents multi-megabyte IPC lag)
      try {
        if (idx < 15) {
          const nativeImg = nativeImage.createFromPath(f.fullPath);
          if (!nativeImg.isEmpty()) {
            const resized = nativeImg.resize({ width: 260, quality: 'good' });
            base64 = resized.toDataURL();
          }
        }
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

// Automated Super-Fast Image & Prompt Injection
ipcMain.handle('app:inject-image-to-webview', async (_, { webContentsId, filePath, dataUrl, promptText, autoSend = false }) => {
  try {
    clipboard.clear();
    let img = null;

    if (filePath && fs.existsSync(filePath)) {
      img = nativeImage.createFromPath(filePath);
    } else if (dataUrl) {
      img = nativeImage.createFromDataURL(dataUrl);
    }

    if (img && !img.isEmpty()) {
      clipboard.writeImage(img);
    }

    let targetWc = null;
    if (webContentsId && attachedWebviews.has(webContentsId)) {
      targetWc = attachedWebviews.get(webContentsId);
    } else {
      const all = Array.from(attachedWebviews.values());
      if (all.length > 0) targetWc = all[all.length - 1];
    }

    if (targetWc && !targetWc.isDestroyed()) {
      targetWc.focus();

      // Instantly focus active input area in the webview
      await targetWc.executeJavaScript(`
        (function() {
          const input = document.querySelector('rich-textarea p, rich-textarea [contenteditable="true"], #prompt-textarea, [contenteditable="true"], textarea, div[role="textbox"]') || document.body;
          if (input) {
            input.focus();
            try {
              document.execCommand('paste');
            } catch (_) {}
          }
        })();
      `).catch(() => {});

      // Native IPC paste command & synthetic Ctrl+V keystroke
      targetWc.paste();
      targetWc.sendInputEvent({ type: 'keyDown', keyCode: 'v', modifiers: ['control'] });
      targetWc.sendInputEvent({ type: 'keyUp', keyCode: 'v', modifiers: ['control'] });

      // Handle prompt injection if specified
      if (promptText && promptText.trim()) {
        setTimeout(async () => {
          if (!targetWc.isDestroyed()) {
            const escapedPrompt = JSON.stringify(promptText.trim());
            await targetWc.executeJavaScript(`
              (function() {
                const text = ${escapedPrompt};
                const input = document.querySelector('rich-textarea p, rich-textarea [contenteditable="true"], div.ql-editor, #prompt-textarea, [contenteditable="true"], textarea, div[role="textbox"]') || document.activeElement;
                if (input) {
                  input.focus();
                  document.execCommand('insertText', false, text);
                  input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
                  input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

                  ${autoSend ? `
                    function simulateClick(el) {
                      if (!el) return;
                      el.focus();
                      ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(evt => {
                        el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window, buttons: 1 }));
                      });
                      if (typeof el.click === 'function') el.click();
                    }

                    function findSendButton() {
                      const allButtons = Array.from(document.querySelectorAll('button, div[role="button"]'));
                      return allButtons.find(b => {
                        const aria = (b.getAttribute('aria-label') || '').toLowerCase();
                        const title = (b.getAttribute('title') || '').toLowerCase();
                        const testId = (b.getAttribute('data-test-id') || b.getAttribute('data-testid') || '').toLowerCase();
                        const cls = (b.className || '').toString().toLowerCase();

                        // Exclude voice/mic, add/upload buttons
                        if (aria.includes('mic') || aria.includes('âm thanh') || aria.includes('giọng nói') || 
                            aria.includes('đính kèm') || aria.includes('thêm') || aria.includes('upload') ||
                            title.includes('mic') || title.includes('upload')) {
                          return false;
                        }

                        const isSend = aria.includes('gửi') || aria.includes('send') || 
                                       title.includes('gửi') || title.includes('send') || 
                                       testId.includes('send') || cls.includes('send-button') ||
                                       b.closest('.send-button-container') ||
                                       (cls.includes('mat-mdc-icon-button') && (aria.includes('gửi') || aria.includes('send')));

                        return isSend && !b.disabled && b.getAttribute('aria-disabled') !== 'true';
                      });
                    }

                    let attempts = 0;
                    const triggerSend = () => {
                      attempts++;
                      const sendBtn = findSendButton();
                      if (sendBtn) {
                        simulateClick(sendBtn);
                        return true;
                      } else {
                        // Fallback: Trigger Enter key event on input
                        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true, composed: true }));
                        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true, composed: true }));
                      }
                      return false;
                    };

                    setTimeout(() => {
                      if (!triggerSend() && attempts < 10) {
                        const iv = setInterval(() => {
                          if (triggerSend() || attempts >= 10) {
                            clearInterval(iv);
                          }
                        }, 120);
                      }
                    }, 150);
                  ` : ''}
                }
              })();
            `).catch(() => {});

            if (autoSend) {
              setTimeout(() => {
                if (!targetWc.isDestroyed()) {
                  targetWc.sendInputEvent({ type: 'keyDown', keyCode: 'Return' });
                  targetWc.sendInputEvent({ type: 'char', keyCode: 'Return' });
                  targetWc.sendInputEvent({ type: 'keyUp', keyCode: 'Return' });
                }
              }, 400);
            }
          }
        }, 100);
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
