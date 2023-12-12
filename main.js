const { app, BrowserWindow, ipcMain } = require('electron');
const userManagement = require('./Class Implementations/Users');
const courseManagement = require('./Class Implementations/Courses');
const { Student, Professor, SchoolAdministrator } = require('./Class Implementations/User');
const { Course } = require('./Class Implementations/Course');

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
ipcMain.on('update-current-selected-course', (event, aCourse) => {
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

// IPC event to save the users file
ipcMain.on('save-users-file', (event, users) => {
  userManagement.saveUsersToFile(users);
});

// IPC event to save the courses file
ipcMain.on('save-courses-file', (event, courses) => {
  courseManagement.saveCoursesToFile(courses);
});

// IPC event for user creation
ipcMain.on('add-user', (event, role, firstName, lastName, email, dateOfBirth) => {
  var user;

  switch (role.toLowerCase()) {
    case "student":
      user = new Student(role, firstName, lastName, email, dateOfBirth);
      break;
    case "professor":
      user = new Professor(role, firstName, lastName, email, dateOfBirth);
      break;
    case "administrator":
      user = new SchoolAdministrator(role, firstName, lastName, email, dateOfBirth);
      break;
    default:
      console.error("Invalid role entered");
      return;
  }

  userManagement.addUser(user);
});

// IPC event for course creation
ipcMain.on('create-course', (event, courseName, startDate, endDate, daysOfWeek, startTime, endTime, optionalMeetingDate, optionalMeetingTime) => {
  var course;

  course = new Course(courseName, startDate, endDate, daysOfWeek, startTime, endTime, optionalMeetingDate, optionalMeetingTime, global.signedInUser.id);

  courseManagement.addCourse(course);
});

// IPC event for updating grade 
ipcMain.on('update-grade', (event, courseId, studentId, newGrade) => {
  const courses = courseManagement.readCoursesFile(); // Assuming you have a function to read courses
  const courseToUpdate = courses.find(course => course.id === courseId);

  if (courseToUpdate) {
      courseToUpdate.grades[studentId] = newGrade;

      courseManagement.saveCoursesToFile(courses);
  }
});

// IPC event for updating attendance
ipcMain.on('update-attendance', (event, courseId, studentId, newAttendance) => {
  const courses = courseManagement.readCoursesFile(); // Assuming you have a function to read courses
  const courseToUpdate = courses.find(course => course.id === courseId);

  if (courseToUpdate) {
      courseToUpdate.attendanceRecords[studentId] = newAttendance;

      courseManagement.saveCoursesToFile(courses);
  }
});
