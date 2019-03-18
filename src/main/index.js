import { app, Menu, BrowserWindow } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


const templateMenu = [
  {
    label: 'Edit',
    submenu: [
      { role: 'hide', },
      { type: 'separator', },
      { role: 'quit', },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo', },
      { role: 'redo', },
      { role: 'cut', },
      { role: 'copy', },
      { role: 'paste', },
      { role: 'selectall', },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        },
      },
      { type: 'separator', },
      { role: 'resetzoom', },
      { role: 'zoomin', },
      { role: 'zoomout', },
      { type: 'separator', },
      { role: 'togglefullscreen', }
    ]
  }
];



function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1200,
    frame: false
  })

  mainWindow.loadURL(winURL)

  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
