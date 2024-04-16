const { app, BrowserWindow, screen: electronScreen, Menu } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    autoHideMenuBar: true,
    acceptFirstMouse: true,
    // fullscreen: true,
    show: false,
    icon: path.join(__dirname, "build", "favicon.ico"),
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev,
    },
  });

  const startURL = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);
  Menu.setApplicationMenu(null);
  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
