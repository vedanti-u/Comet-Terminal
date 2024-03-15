const { ipcRenderer } = require('electron')
var ipc = ipcRenderer;
console.log(ipc.ipcRenderer)
var term = new Terminal();
term.open(document.getElementById('terminal'));

ipc.on("terminal.incomingData", (event, data) => {

    term.write(data);
});

term.onData(e => {
    console.log(e)
    ipc.send("terminal.keystroke", e);
});