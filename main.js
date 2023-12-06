const { app, BrowserWindow, ipcMain } = require('electron');
const userManagement = require('./Class Implementations/Users');
const courseManagement = require('./Class Implementations/Courses');

let mainWindow;

// Global variables to hold signed in user and selected course for course-specific actions
global.signedInUser = null;
global.currentSelectedCourse = null;

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

/*
 IPC events
*/

// IPC event to update the signed-in user
ipcMain.on('update-signed-in-user', (event, aUser) => {
  global.signedInUser = aUser;
});

// IPC event to update the currently selected course
ipcMain.on('update-signed-in-user', (event, aCourse) => {
  global.currentSelectedCourse = aCourse;
});

// IPC event to read the users file
ipcMain.handle('read-users-file', () => {
  return userManagement.readUsersFile();
});

// IPC event to read the courses file
ipcMain.handle('read-courses-file', () => {
  return courseManagement.readCoursesFile();
});

// IPC event for user creation
ipcMain.on('create-user', (event, userData) => {
  const createdUser = userManagement.createUser(userData);

  // Send the created user back to the renderer process
  event.sender.send('user-created', createdUser);
});

// IPC event for course creation
ipcMain.on('create-course', (event, courseData) => {
  const createdCourse = courseManagement.createCourse(courseData);

  // Send the created course back to the renderer process
  event.sender.send('course-created', createdCourse);
});