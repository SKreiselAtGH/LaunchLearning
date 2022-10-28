const { contextBridge, ipcRenderer } = require('electron')
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');

let titlebar;

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
});

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    }
  }
})
window.addEventListener('DOMContentLoaded', () => {

    // Title bar implemenation
    titlebar = new Titlebar({
        backgroundColor: Color.fromHex("#8fb4f1"),
        //itemBackgroundColor: Color.fromHex("#ffffff"),
        svgColor: Color.WHITE,
        icon: path.join(__dirname, '../src/icons/png/512x512.png'),
        //menuPosition: 'bottom',
        //menu: null // = do not automatically use Menu.applicationMenu
        menuTransparent: 80,
      })

    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
  })
  
  contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
  })
  