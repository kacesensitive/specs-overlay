const { app, BrowserWindow, Menu, Tray } = require("electron");
const trayWindow = require("electron-tray-window");
const path = require("path");
require("electron-reload")(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 200,
    height: 100,
    maxHeight: 500,
    minHeight: 500,
    minWidth: 500,
    maxWidth: 500,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.resolve(path.join(__dirname, "preload.js")),
    },
    transparent: true,
    alwaysOnTop: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// let appIcon = null
// app.whenReady().then(() => {
//   appIcon = new Tray('./src/icon.ico');
//   const otherWindow = new BrowserWindow({
//     width: 200,
//     height: 200,
//     frame: false,
//     autoHideMenuBar: true,
//     webPreferences: {
//       preload: path.resolve(path.join(__dirname, "preload.js"))
//     },
//     transparent: true,
//     alwaysOnTop: true
//   });

//   // and load the index.html of the app.
//   otherWindow.loadFile(path.join(__dirname, 'tray.html'));

//   trayWindow.setOptions({tray: appIcon,window: otherWindow});
// });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
