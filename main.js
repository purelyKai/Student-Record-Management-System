const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const userManagement = require('./Class Implementations/Users');
const courseManagement = require('./Class Implementations/Courses');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: './SL-logo',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('Sign In page/SignIn.html');
}

// Expose a function to read the user file
ipcMain.handle('read-users-file', () => {
  return userManagement.readUsersFile();
});

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
    // Save the current state before quitting
    userManagement.saveUsersToFile(userManagement.readUsersFile());
    courseManagement.saveCoursesToFile(courseManagement.readCoursesFile());
    app.quit();
  }
});

// Handle the app quitting on macOS
app.on('before-quit', () => {
  // Save the current state before quitting
  userManagement.saveUsersToFile(userManagement.readUsersFile());
  courseManagement.saveCoursesToFile(courseManagement.readCoursesFile());
});