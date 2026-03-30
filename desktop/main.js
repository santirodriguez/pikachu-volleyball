const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const APP_NAME = 'Pikachu Volleyball';
const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'es-ar'];

/** @type {BrowserWindow | null} */
let mainWindow = null;

function getLocaleFromURL(urlString) {
  try {
    const url = new URL(urlString);
    const locale = url.pathname.split('/').filter(Boolean).at(-2);
    return SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
  } catch {
    return 'en';
  }
}

function loadLocale(locale) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
  mainWindow.loadFile(path.join(__dirname, '..', 'dist', safeLocale, 'index.html'), {
    query: { desktop: '1' },
  });
}

function openAboutOverlay() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }
  mainWindow.webContents.executeJavaScript(
    "window.dispatchEvent(new CustomEvent('pv-desktop-open-about'));",
    true
  );
}

function buildAppMenu() {
  const locale = mainWindow ? getLocaleFromURL(mainWindow.webContents.getURL()) : 'en';

  const template = [
    ...(process.platform === 'darwin'
      ? [
          {
            label: APP_NAME,
            submenu: [
              { role: 'about', label: `About ${APP_NAME}` },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'Game',
      submenu: [
        {
          label: 'Restart Match',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (!mainWindow || mainWindow.isDestroyed()) {
              return;
            }
            mainWindow.webContents.executeJavaScript(
              "document.getElementById('restart-btn')?.click();",
              true
            );
          },
        },
        {
          label: 'Pause / Resume',
          accelerator: 'Space',
          click: () => {
            if (!mainWindow || mainWindow.isDestroyed()) {
              return;
            }
            mainWindow.webContents.executeJavaScript(
              "document.getElementById('pause-btn')?.click();",
              true
            );
          },
        },
        { type: 'separator' },
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'Language',
      submenu: [
        {
          label: 'English',
          type: 'radio',
          checked: locale === 'en',
          click: () => loadLocale('en'),
        },
        {
          label: '한국어',
          type: 'radio',
          checked: locale === 'ko',
          click: () => loadLocale('ko'),
        },
        {
          label: '中文',
          type: 'radio',
          checked: locale === 'zh',
          click: () => loadLocale('zh'),
        },
        {
          label: 'Español',
          type: 'radio',
          checked: locale === 'es-ar',
          click: () => loadLocale('es-ar'),
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: `About ${APP_NAME}`,
          click: () => openAboutOverlay(),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  loadLocale('en');

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }
    mainWindow.setTitle(APP_NAME);
    buildAppMenu();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
