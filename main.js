const {
  app,
  BrowserWindow,
  screen
} = require('electron');

let mainWindow;

const createWindow = () => {
  const ratio = 0.3;
  const primaryScreen = screen.getPrimaryDisplay();
  const windowProperties = {
    frame: false,
    resizable: false,
    width: primaryScreen.size.width * ratio,
    height: primaryScreen.size.height * ratio,
    webPreferences: {
      nodeIntegration: true,
    },
  };

  const getCurrentWidth = (screens) => {
    let currentWidth = 0;
    for (let i = 1; i < screens.length; i++) {
      currentWidth += screens[i].size.width * ratio;
    }
    return currentWidth;
  }

  const firstTimeWidth = getCurrentWidth(screen.getAllDisplays());

  const updatedProperties = { ...windowProperties, width: firstTimeWidth === 0 ? windowProperties.width : firstTimeWidth };
  mainWindow = new BrowserWindow(updatedProperties);


  // mainWindow.setAspectRatio(primaryScreen.size.width / primaryScreen.size.height);
  mainWindow.loadFile('index.html');

  screen.on('display-added', (e, newDisplay) => {
    const updatedWidth = getCurrentWidth(screen.getAllDisplays());
    mainWindow.setSize(updatedWidth === 0 ? windowProperties.width : updatedWidth, windowProperties.height);
    mainWindow.loadFile('index.html');
  });

  screen.on('display-removed', (e, oldDisplay) => {
    const updatedWidth = getCurrentWidth(screen.getAllDisplays());
    mainWindow.setSize(updatedWidth === 0 ? windowProperties.width : updatedWidth, windowProperties.height);
    mainWindow.loadFile('index.html');
  });

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