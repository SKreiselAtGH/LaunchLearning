// include the Node.js 'path' module at the top of your file
const path = require('path')
const { Menu, ipcMain, Notification, nativeTheme } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main")

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
setupTitlebar();
const isDev = !app.isPackaged;


const createWindow = () => {
    const win = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600,
        icon: '/icon.png',
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const menu = Menu.buildFromTemplate(exampleMenuTemplate());
    Menu.setApplicationMenu(menu);

    win.loadFile(path.join(__dirname, "./index.html"));

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })
    // attach fullscreen(f11 and not 'maximized') && focus listeners
    attachTitlebarToWindow(win);
}

// if (isDev) {
//     require('electron-reload')(__dirname, {
//       electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
//     })
//   }

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notify', body: message }).show();
})

app.setUserTasks([
    {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }
])

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


const exampleMenuTemplate = () => [
    {
        label: "Simple O&ptions",
        submenu: [
            {
                label: "Quit",
                click: () => app.quit()
            },
            {
                label: "Radio1",
                type: "radio",
                checked: true
            },
            {
                label: "Radio2",
                type: "radio",
            },
            {
                label: "Check&box1",
                type: "checkbox",
                checked: true,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            { type: "separator" },
            {
                label: "Che&ckbox2",
                type: "checkbox",
                checked: false,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            }
        ]
    },
    {
        label: "A&dvanced Options",
        submenu: [
            {
                label: "Quit",
                click: () => app.quit()
            },
            {
                label: "Radio1",
                type: "radio",
                checked: true
            },
            {
                label: "Radio2",
                type: "radio",
            },
            {
                label: "Checkbox1",
                type: "checkbox",
                checked: true,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            { type: "separator" },
            {
                label: "Checkbox2",
                type: "checkbox",
                checked: false,
                click: (item) => {
                    console.log("item is checked? " + item.checked);
                }
            },
            {
                label: "Radio Test",
                submenu: [
                    {
                        label: "S&ample Checkbox",
                        type: "checkbox",
                        checked: true
                    },
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    },
                    { type: "separator" },
                    {
                        label: "Radio1",
                        checked: true,
                        type: "radio"
                    },
                    {
                        label: "Radio2",
                        type: "radio"
                    },
                    {
                        label: "Radio3",
                        type: "radio"
                    }
                ]
            },
            {
                label: "zoomIn",
                role: "zoomIn"
            },
            {
                label: "zoomOut",
                role: "zoomOut"
            },
            {
                label: "Radio1",
                type: "radio"
            },
            {
                label: "Radio2",
                checked: true,
                type: "radio"
            },
        ]
    },
    {
        label: "&View",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { type: "separator" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { role: "resetZoom" },
            { role: "toggleDevTools" }
        ],
    }
];