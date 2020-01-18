const {
  app,
  BrowserWindow,
  screen
} = require('electron');

let mainWindow;

const createWindow = () => {
  const primaryScreen = screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    resizable: false,
    width: primaryScreen.size.width * 0.35,
    height: primaryScreen.size.height * 0.35,
    webPreferences: {
      nodeIntegration: true,
    },

  });

  mainWindow.setAspectRatio(primaryScreen.size.width / primaryScreen.size.height);
  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});