const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

async function createMainWindow(){
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    await mainWindow.loadFile('src/pages/index.html')
    server = require('./gemini.js')
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin'){
        if (server){
            server.close(() => {
                console.log("Servidor encerrado.")
                app.quit()
            })

        } else {
            app.quit()
        }
    }
})