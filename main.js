const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const { OpenAI } = require("@langchain/openai");
const dotenv = require("dotenv").config();
let mainWindow;

process.chdir("/");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Note: For better security, use contextIsolation: true with a preload script
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
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

// Listen for the 'run-command' IPC message
ipcMain.on("run-command", (event, command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      event.sender.send("command-error", `Error: ${error.message}`);
      return;
    }
    // Send both stdout and stderr to the renderer
    event.sender.send("command-output", stdout + stderr);
  });
});

// Listen for the 'command-ai' IPC message
ipcMain.on("command-ai", async (event, text) => {
  console.log("Received AI command:", text);
  var command = await askLLMCommand(text);
  var explaination = await askLLMCommandExplanation(command);
  var output = {command : command, explaination : explaination}
  event.sender.send("command-ai", output);

});
ipcMain.on("dummy", async (event, text) => {
  console.log("Received error for ai command:", text);
  var data = await askLLMCommandExplanation(text);
  //event.sender.send("command-error-ai",data);
});

ipcMain.on("command-error-ai", async (event, text) => {
  console.log("Received error for ai command:", text);
  var data = await askLLMError(text);
  event.sender.send("command-error-ai", data);
});

async function askLLMCommand(prompt) {
  const model = new OpenAI({});
  var res = await model.invoke(
    "Create a Linux command to" +
      prompt +
      "then provide the command without any additional explanation, remove extra space and new line charcters only give command"
  );
  res = res.replace(/\\n|"/g, "");
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}
async function askLLMCommandExplanation(command) {
  const model = new OpenAI({});
  var res = await model.invoke(
    "give me the explanation of this linux command in detailed markdown format" + command + "give explanation nicely formatted in markdown, heading, bullet points code and syntax highlighting is must and return newline in break tag not \n"
  );
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}
async function askLLMError(error) {
  const model = new OpenAI({});
  const res = await model.invoke(
    "Create a Linux command to fix this error" +
      error +
      "then provide explanation"
  );
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}
