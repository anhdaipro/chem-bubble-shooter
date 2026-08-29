const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 520, // Exact W = 520 (9 columns)
    height: 780, // Exact H = 780
    useContentSize: true, // Ensure the web viewport matches exactly, removing borders
    resizable: false, // Prevent resizing to avoid layout break
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // In dev mode, load the Vite dev server
    mainWindow.loadURL('http://localhost:5200');
    // mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built static files
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
