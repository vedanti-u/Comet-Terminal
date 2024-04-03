const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const { OpenAI } = require("@langchain/openai");
const dotenv = require("dotenv").config();

const pty = require("node-pty");
const os = require("os");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

let mainWindow;
let commandBuffer = [];

async function askLLM(prompt) {
  const model = new OpenAI({});
  const res = await model.invoke(
    "Create a Linux command t o" +
      prompt +
      " then provide the command without any additional explanation or unnecessary characters,output only code"
  );
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}

function createWindow() {
  nativeTheme.themeSource = "dark";

  mainWindow = new BrowserWindow({
    height: 500,
    width: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    //autoHideMenuBar: true,
    //titleBarStyle: "hiddenInset",
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  //ipcing

  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", function (data) {
    mainWindow.webContents.send("terminal.incomingData", data);
    console.log("Data sent");
  });

  ipcMain.on("terminal.keystroke", (event, key) => {
    commandBuffer.push(key);
    if (key == "?") ptyProcess.write("# Xterm AI ");
    console.log(commandBuffer);
    if (key == `\r`) {
      console.log(" I got Enter ");

      if (commandBuffer[0] == "?") {
        console.log("Sending this to ChATGPT API");
        console.log(commandBuffer);

        console.log(commandBuffer.toString());

        // Filter out unwanted characters and concatenate the remaining elements
        const commandStr = commandBuffer
          .filter((cmd) => cmd !== "?" && cmd !== "\r")
          .join("");

        console.log(commandStr);
        (async () => {
          let response = await askLLM(commandStr);
          response = response.replace(/\\n|"/g, "");
          // ipcMain.send("response mila bhai :)");
          ptyProcess.write("\r");
          // ptyProcess.clear()
          // mainWindow.webContents.send("terminal.reset",null);
          ptyProcess.write(response);
          console.log("Askecd LLM");
        })();
      } else {
        console.log("Running this on Shell");
        ptyProcess.write(key);
      }
      commandBuffer = [];
    } else {
      ptyProcess.write(key);
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
