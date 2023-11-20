const { app, BrowserWindow/*, ipcMain*/ } = require('electron')
//const nodemailer = require("nodemailer") // USED WITH nodemailer
//const { spawn } = require('child_process'); // USED WITH send_email.py

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: './SL-logo',
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('Sign In page/SignIn.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/* USED WITH nodemailer, if don't use, then "uninstall nodemailer"
ipcMain.on("sendEmail", (event, userData) => {
  sendEmail(userData);
});

function sendEmail(userData) {
  // Set up email transporter
  const transporter = nodemailer.createTransport({ // Recheck transporter
    service: 'Yahoo',
    auth: {
      user: 'scrumlords@yahoo.com',
      pass: 'cs361OSU'
    }
  });

  // Email content
  const mailOptions = {
    from: 'scrumlords@yahoo.com',
    //to: userData.email,
    to: 'kaibblack03@gmail.com',
    subject: 'Student Record Management System - Account Information',
    text: `Dear ${userData.firstName},\n\n\nYour account has been created!\n\nUsername: ${userData.username}\nPassword: ${userData.password}\n\nRegards,\nStudent Record Management System`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
    } else {
      console.log(info)
    }
  });
}
*/

/* USED WITH send_email.py
ipcMain.on('sendEmail', (event, emailData) => {
  const pythonProcess = spawn('python', ['send_email.py', JSON.stringify(emailData)]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
    event.sender.send('emailSent', true);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
    event.sender.send('emailSent', false);
  });
});
*/