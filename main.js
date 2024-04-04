const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const { OpenAI } = require("@langchain/openai");
const dotenv = require("dotenv").config();
const pty = require("node-pty");
const os = require("os");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

let mainWindow;
let commandBuffer = [];
let options = ["Execute Query", "Edit Query", "Regenerate Response"];
let selectedOptionIndex = 0;

async function askLLM(prompt) {
  const model = new OpenAI({});
  const res = await model.invoke(
    "Create a Linux command to " +
      prompt +
      " then provide the command without any additional explanation or unnecessary characters, output only code"
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
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

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
    if (key === "?") ptyProcess.write("# Xterm AI ");
    console.log(commandBuffer);
    if (key === "\r") {
      console.log("I got Enter");

      if (commandBuffer[0] === "?") {
        console.log("Sending this to ChatGPT API");
        console.log(commandBuffer);

        console.log(commandBuffer.toString());

        const commandStr = commandBuffer
          .filter((cmd) => cmd !== "?" && cmd !== "\r")
          .join("");

        console.log(commandStr);
        (async () => {
          let response = await askLLM(commandStr);
          response = response.replace(/\\n|"/g, "");
          mainWindow.webContents.send("terminal.incomingData", "\nOptions:\n");
          options.forEach((option, index) => {
            mainWindow.webContents.send(
              "terminal.incomingData",
              `  ${index + 1}. ${option}\n`
            );
          });
          mainWindow.webContents.send("terminal.incomingData", "\n");
          console.log("Options sent");
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

  ipcMain.on("terminal.keystroke.confirm", () => {
    const selectedOption = options[selectedOptionIndex];
    mainWindow.webContents.send(
      "terminal.incomingData",
      `\nSelected option: ${selectedOption}\n`
    );
    if (selectedOption === "Execute Query") {
      executeQuery();
    } else if (selectedOption === "Edit Query") {
      editQuery();
    } else if (selectedOption === "Regenerate Response") {
      regenerateResponse();
    }
  });
}

function executeQuery() {
  // Logic for executing query
}

function editQuery() {
  // Logic for editing query
}

function regenerateResponse() {
  // Logic for regenerating response
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
