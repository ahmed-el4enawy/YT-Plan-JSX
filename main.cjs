const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const CHATS_FILE = path.join(__dirname, 'chat_history.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'public/Ninety-Football-Logo.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    title: 'Ninety Football Dashboard'
  });

  win.removeMenu(); // Remove the top file menu for a cleaner app feel
  
  // Load the Vite dev server
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  // IPC Handlers
  ipcMain.on('save-chats', (event, chats) => {
    try {
      fs.writeFileSync(CHATS_FILE, JSON.stringify(chats));
    } catch (err) {
      console.error("Failed to save chats:", err);
    }
  });

  ipcMain.handle('load-chats', () => {
    try {
      if (fs.existsSync(CHATS_FILE)) {
        const data = fs.readFileSync(CHATS_FILE, 'utf8');
        return JSON.parse(data);
      }
    } catch (err) {
      console.error("Failed to load chats:", err);
    }
    return null;
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
