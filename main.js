const {
  app,
  BrowserWindow,
  Menu,
  nativeImage,
  ipcMain,
  nativeTheme,
  screen,
} = require("electron");
const { exec } = require("child_process");
const { OpenAI } = require("@langchain/openai");
const dotenv = require("dotenv").config();
const {
  setupTitlebar,
  attachTitlebarToWindow,
} = require("custom-electron-titlebar/main");

const AsciiBar = require("ascii-bar").default;
const { simpleSpinner } = require("ascii-bar");

let bar;

// Setup the titlebar
setupTitlebar();
const path = require("path");
const fs = require("fs");

let mainWindow;
let isFirstTime = true;
const model = new OpenAI({});
process.chdir("/");

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Parent",
    width: 1300,
    height: 900,
    minHeight: 600,
    maxHeight: 900,
    minWidth: 900,
    maxWidth: 1200,
    frame: true,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  Menu.setApplicationMenu(null);
  // const menu = Menu.buildFromTemplate(exampleMenuTemplate);
  // Menu.setApplicationMenu(menu);
  mainWindow.setFullScreen(true);
  mainWindow.loadFile("index.html");
  attachTitlebarToWindow(mainWindow);
  attachTitlebarToWindow(mainWindow);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.center();

  const keyEnvPath = path.join(__dirname, "/.key-env");
  if (isFirstTime && !fs.existsSync(keyEnvPath)) {
    isFirstTime = false;
    showPopup();
  }
}

function showPopup() {
  let keyWindow = new BrowserWindow({
    title: "child",
    parent: mainWindow,
    modal: true,
    width: 1400,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  keyWindow.loadFile("key-popup.html");
  mainWindow.setEnabled(true);
  keyWindow.on("focus", () => {
    const parentPosition = mainWindow.getPosition();
    const parentSize = mainWindow.getSize();
    const childSize = keyWindow.getSize();
    const x = parentPosition[0] + (parentSize[0] - childSize[0]) / 2;
    const y = parentPosition[1] + (parentSize[1] - childSize[1]) / 2;
    keyWindow.setPosition(x, y);
  });
  keyWindow.on("closed", function () {
    keyWindow = null;
    mainWindow.focus(); // Focus on main window after closing the child window
  });

  ipcMain.once("key-submitted", (event, key) => {
    console.log("thisis dir", __dirname);
    fs.writeFileSync(
      path.join(__dirname, "/.key-env"),
      `OPENAI_API_KEY=${key}`
    );
    // mainWindow.webContents.send("set-openai-key", key);
    keyWindow.close();
  });
}
// app.disableHardwareAcceleration(); // T
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

const exampleMenuTemplate = [
  {
    label: "Simple O&ptions",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
      },
      {
        label: "Radio1",
        type: "radio",
        checked: true,
      },
      {
        label: "Radio2",
        type: "radio",
      },
      {
        label: "Check&box1",
        type: "checkbox",
        checked: true,
        click: (item) => {
          console.log("item is checked? " + item.checked);
        },
      },
      { type: "separator" },
      {
        label: "Che&ckbox2",
        type: "checkbox",
        checked: false,
        click: (item) => {
          console.log("item is checked? " + item.checked);
        },
      },
    ],
  },
  {
    label: "With &Icons",
    submenu: [
      {
        icon: nativeImage.createFromPath(
          path.join(__dirname, "assets", "home.png")
        ),
        label: "Go to &Home using Native Image",
      },
      {
        icon: path.join(__dirname, "/assets", "run.png"),
        label: "Run using string",
        submenu: [
          {
            label: "Submenu of run",
          },
          {
            label: "Print",
            accelerator: "CmdOrCtrl+P",
          },
          {
            type: "separator",
          },
          {
            label: "Item 2 of submenu of run",
          },
        ],
      },
    ],
  },
  {
    label: "A&dvanced Options",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
      },
      {
        label: "Radio1",
        type: "radio",
        checked: true,
      },
      {
        label: "Radio2",
        type: "radio",
      },
      {
        label: "Checkbox1",
        type: "checkbox",
        checked: true,
        click: (item) => {
          console.log("item is checked? " + item.checked);
        },
      },
      { type: "separator" },
      {
        label: "Checkbox2",
        type: "checkbox",
        checked: false,
        click: (item) => {
          console.log("item is checked? " + item.checked);
        },
      },
      {
        label: "Radio Test",
        submenu: [
          {
            label: "S&ample Checkbox",
            type: "checkbox",
            checked: true,
          },
          {
            label: "Radio1",
            checked: true,
            type: "radio",
          },
          {
            label: "Radio2",
            type: "radio",
          },
          {
            label: "Radio3",
            type: "radio",
          },
          { type: "separator" },
          {
            label: "Radio1",
            checked: true,
            type: "radio",
          },
          {
            label: "Radio2",
            type: "radio",
          },
          {
            label: "Radio3",
            type: "radio",
          },
        ],
      },
      {
        label: "zoomIn",
        role: "zoomIn",
      },
      {
        label: "zoomOut",
        role: "zoomOut",
      },
      {
        label: "Radio1",
        type: "radio",
      },
      {
        label: "Radio2",
        checked: true,
        type: "radio",
      },
    ],
  },
];

// Handle saving input history in the main process
ipcMain.on("save-input-history", (event, inputHistory) => {
  fs.writeFileSync(
    __dirname + "/inputHistory.json",
    JSON.stringify(inputHistory)
  );
});

// Handle loading input history in the main process
ipcMain.on("load-input-history", (event) => {
  if (fs.existsSync(__dirname + "/inputHistory.json")) {
    const data = fs.readFileSync(__dirname + "/inputHistory.json");
    event.sender.send("input-history-loaded", JSON.parse(data));
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

  var output = { command: command, explaination: explaination };
  event.sender.send("progress-complete");
  event.sender.send("command-ai", output);
});

ipcMain.on("dummy", async (event, text) => {
  // console.log("Received dummy", text);
  // try {
  //   const result = await runSpeedTest();
  //   console.log("speedtest-result", result);
  // } catch (error) {
  //   console.log("speedtest-error", error.message);
  // }
  //event.sender.send("command-error-ai",data);
});

ipcMain.on("command-error-ai", async (event, text) => {
  var command = text.input;
  var commandError = text.output;
  console.log(
    "Received error for ai command:" + command + "error is :" + commandError
  );

  var data = await askLLMError(command, commandError);
  event.sender.send("progress-complete");
  event.sender.send("command-error-ai", data);
});
ipcMain.on("command-help", async (event, text) => {
  console.log("Received command for help:", text);
  var helpOutput = await askLLMHelp(text);
  event.sender.send("progress-complete");
  event.sender.send("command-help", helpOutput);
});

async function askLLMCommand(prompt) {
  var res = await model.invoke(
    "Create a Linux command to " +
      prompt +
      " Then provide the command without any additional explanation, remove extra space and new line characters and only give the command."
  );
  res = res.replace(/\\n|"/g, "");
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}
async function askLLMCommandExplanation(command) {
  var res = await model.invoke(
    `your response should be in this format :
      <ul>
          <li>What it is used for</li>
          <li>what does it do</li>
          <li>How does it work</li>
          <li>Syntax and Options</li>
          <li>Commonly used with options like <code></code> </li>
      </ul>

      <h3>Example:</h3><pre><code>$</code></pre> ` +
      "give me the explanation of this linux command in bullet points as given in format and example in code format" +
      command +
      "Please provide the Explanation in short and Example explanation in 20 words and ensure it's nicely formatted in html tags with bullet points and syntax highlighting of code for the command and it's options. Justify the content and also remove any extra space or \n in the beginning and return newline in break tag only"
  );
  res = res.replace(/\\n|"/g, "").trim();
  // console.log(JSON.stringify(res));
  // return JSON.stringify(res);
  return res;
}

// "give me the explanation of this linux command in three bullet points: 1. what does it do 2. How does it work 3. Syntax and Options in markdown format" +
// command +
// "Please provide the Explanation within 200 words and ensure it's nicely formatted in Markdown with bullet points and syntax highlighting for the command. Justify the content and also remove any <code>\\n</code> in the beginning and return newline in break tag not \n."
// );
async function askLLMError(command, commandError) {
  var res = await model.invoke(
    "This is the command I entered: " +
      command +
      " And this is the error I got: " +
      commandError +
      `your response should be in this format :
    <h3>Error : error overview under 15 words</h3>
    <ul>
        <li>why error occured in 20 words</li>
        <li>what is wrong with inputted command under 15 words</li>
        <li>Give solution to fix this error fix this error under 35 words</li>
        <li>correct command if the provided command is wrong : <code></code> </li>
    </ul>
    <h3>Example(of correct command):</h3><pre><code>$</code></pre> ` +
      "Please provide the solution in short and Example explanation in 20 words and ensure it's nicely formatted in html tags with bullet points and syntax highlighting of code for the command and it's options. Justify the content and also remove any \n in the beginning and return newline in single break tag only"
  );
  res = res.replace(/\\n|"/g, "").trim();
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}
async function askLLMHelp(command) {
  var res = await model.invoke(
    `your response should be in this format :
    <ul>
        <li>What it is used for</li>
        <li>what does it do</li>
        <li>How does it work</li>
        <li>Syntax and Options</li>
        <li>Commonly used with options like <code></code> </li>
    </ul>

    <h3>Example:</h3><pre><code>$</code></pre> ` +
      "give me the direct summarized explanation of this linux command in bullet points as given in format and example in code format" +
      command +
      "Please provide the summary in short and Example in 20 words and ensure it's nicely formatted in html tags with bullet points and syntax highlighting for the command and it's options. Justify the content and also remove any \n in the beginning and return newline in single break tag only"
  );
  res = res.replace(/\\n|"/g, "").trim();
  console.log(JSON.stringify(res));
  return JSON.stringify(res);
}

ipcMain.on("start-progress", (event, total) => {
  bar = new AsciiBar({
    formatString:
      "#spinner ##red #count #percent ##default#bar |##bright##blue Time to finish: #ttf",
    total: 50,
    enableSpinner: true,
  });

  simulateProgress(1, event);
});

// ipcMain.on("stop-progress", (event) => {
//   // Stop the progress bar
//   if (bar) {
//     bar.stop(false);
//     event.sender.send("progress-stopped");
//   }
// });

function simulateProgress(current, event) {
  if (current > 12) {
    bar.spinner = simpleSpinner;
    bar.formatString =
      "#spinner ##yellow #count #percent ##default#bar |##bright##blue Time to finish: #ttf";
  }
  if (current > 27) {
    bar.spinner = simpleSpinner;
    bar.formatString =
      "#spinner ##green #count #percent ##default#bar |##bright##blue Time to finish: #ttf";
  }

  if (current >= bar.total) {
    bar.stop(false);
    event.sender.send("progress-complete");
    return;
  }

  if (current <= bar.total) {
    bar.update(current, "Currently at " + current);
    //console.log("bar render line :", bar.renderLine());
    const progressLine = bar.renderLine().replace(/\x1b\[[0-9;]*m/g, ""); // Remove ANSI escape codes
    event.sender.send("update-progress", progressLine); // Send current progress state to renderer
    setTimeout(() => simulateProgress(current + 1, event), 200);
  }
}
// ipcMain.on("calculate-internet-speed", async (event) => {
//   try {
//     const test = speedTest({ acceptLicense: true, acceptGdpr: true });
//     const result = await test;
//     const downloadSpeed = (result.download.bandwidth * 8) / (1024 * 1024); // Convert from bytes per second to Mbps
//     const uploadSpeed = (result.upload.bandwidth * 8) / (1024 * 1024); // Convert from bytes per second to Mbps
//     event.sender.send("internet-speed-result", { downloadSpeed, uploadSpeed });
//   } catch (error) {
//     console.error("Speed test failed:", error);
//     event.sender.send("internet-speed-error", "Failed to perform speed test.");
//   }
// });
