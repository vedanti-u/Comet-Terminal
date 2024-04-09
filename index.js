// const { ipcRenderer } = require('electron')
// var ipc = ipcRenderer;

// let term = new Terminal({

//   theme:{
//     "foreground": "#ebeef5",
//     "background": "#1d2935",
//     "cursor": "#e6a23c",
//     "black": "#000000",
//     "brightBlack": "#555555",
//     "red": "#ef4f4f",
//     "brightRed": "#ef4f4f",
//     "green": "#67c23a",
//     "brightGreen": "#67c23a",
//     "yellow": "#e6a23c",
//     "brightYellow": "#e6a23c",
//     "blue": "#409eff",
//     "brightBlue": "#409eff",
//     "magenta": "#ef4f4f",
//     "brightMagenta": "#ef4f4f",
//     "cyan": "#17c0ae",
//     "brightCyan": "#17c0ae",
//     "white": "#bbbbbb",
//     "brightWhite": "#ffffff"
//   }
// ,
//   fontSize: 14,
//   fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'

// });
// term.open(document.getElementById('terminal'));

// ipc.on("terminal.incomingData", (event, data) => {
//     console.log(data)
//     term.write(data);
// });

// ipc.on("terminal.reset", (event, data) => {
//     console.log(data)
//     term.clear();
// });
// term.onData(e => {
//     ipc.send("terminal.keystroke", e);
// });

// function clickError(){
//   ipc.send("error_ai");
// }

var spanHelp = document.getElementById("helpid");

function handleHelp() {
  console.log("Help clicked!");
}

spanHelp.addEventListener("click", handleHelp);

