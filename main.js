const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Note: For better security, use contextIsolation: true with a preload script
        },
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Listen for the 'run-command' IPC message
ipcMain.on('run-command', (event, command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            event.sender.send('command-output', `Error: ${error.message}`);
            return;
        }
        // Send both stdout and stderr to the renderer
        event.sender.send('command-output', stdout + stderr);
    });
});
