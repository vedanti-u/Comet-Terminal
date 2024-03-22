const { ipcRenderer } = require('electron');
const Terminal = require('xterm').Terminal;

var term = new Terminal();
term.open(document.getElementById('terminal'));

term.onData(e => {
    console.log("Key pressed:", e); // Check if keypress events are being captured
    ipcRenderer.send("terminal.keystroke", e);
});

ipcRenderer.on("terminal.incomingData", (event, data) => {
    if (term) {
        term.write(data); // Write incoming data to the terminal
    }
});

// Resize the terminal based on the container size
function resizeTerminal() {
    const container = document.getElementById('terminal');
    const rect = container.getBoundingClientRect();
    const cols = Math.floor(rect.width / term._core._renderService.dimensions.actualCellWidth);
    const rows = Math.floor(rect.height / term._core._renderService.dimensions.actualCellHeight);
    term.resize(cols, rows);
    term.fit(); // Fit the terminal to the container size
}

// Call resizeTerminal when window is resized
window.addEventListener('resize', resizeTerminal);

// Initial resize on load
resizeTerminal();
