const { app, BrowserWindow } = require('electron')

if (require('electron-squirrel-startup')) { app.quit() }

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: './SL-logo',
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