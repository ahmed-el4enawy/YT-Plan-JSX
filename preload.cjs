const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveChats: (chats) => ipcRenderer.send('save-chats', chats),
  loadChats: () => ipcRenderer.invoke('load-chats')
});
