const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'public/Ninety-Football-Logo.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'Ninety Football Dashboard'
  });

  win.removeMenu(); // Remove the top file menu for a cleaner app feel
  
  // Load the Vite dev server
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
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
