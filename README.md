<div align="center">
<a href="">
    <img alt="comet" src="assets/comet-logo.png" height=160 width=550>
</a>
</div>

<br/>
<div>
<div align="center">

![Linux](https://img.shields.io/badge/Linux-FCC624?style-plastic-green&logo=linux&logoColor=black)
![Electron.js](https://img.shields.io/badge/Electron-191970?style-plastic-green&logo=Electron&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style-plastic-green&logo=node.js&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style-plastic-green&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style-plastic-green&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style-plastic-green&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style-plastic-green&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991.svg?style-plastic-green&logo=OpenAI&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style-plastic-green&logo=chart.js&logoColor=white)
![LangChain](https://img.shields.io/badge/langchain-purple)
<br/>
<br/>

<!-- ![ElectronJS](https://img.shields.io/badge/Electron-2B2E3A?style-plastic-green&logo=electron&logoColor=9FEAF9)
![Electron.js](https://img.shields.io/badge/Electron-47848F.svg?style-plastic-green&logo=Electron&logoColor=white) -->
<!--
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style-plastic-green&logo=JavaScript&logoColor=black) -->

</div>

</div align="left" >

## About Comet Terminal

**Comet** is a next-generation terminal emulator, a transformative tool designed to elevate developer productivity through cutting-edge AI features and robust cross-platform compatibility. Our terminal emulator ensures streamlined workflows, enhanced efficiency, and empowers developers to achieve excellence.
</br>

### Features

- **Natural Language Queries**: _Write queries in natural language and receive commands tailored to your needs using AI._
- **AI-Powered Autocomplete and Command Suggestions**: _Benefit from advanced AI capabilities that provide intelligent code completion, context-aware suggestions, and personalized workflow assistance._
- **Instant Error Detection and Quick Fixes**: _Get real-time error identification and immediate, context-aware solutions to streamline coding workflows._
- **Advanced Search Capabilities**: _Utilize our advanced search feature to access comprehensive details on any command._
- **Cross-Platform Compatibility**: _Enjoy a unified coding experience across Windows, macOS, and Linux._

Experience a new-age terminal with AI-driven features designed to streamline coding workflows and reduce development time, setting a new standard in developer productivity.

<h1><img src="assets/comet-logo-short.png" alt="Comet Logo" width="25" height="25"> Try Comet</h1>

`Link to install`
Screenshot of landing page

## Setting-up the `OpenAI API key`

<h4>Just enter your OpenAI Key in the input box, generate a new one if you don't have one.        <a href="https://platform.openai.com/api-keys" alt="see here"><img src="https://img.shields.io/badge/API_key-create_new-green?style=plastic&logo=OpenAI&logoColor=white" alt="OpenAI Key"></a></h4>

<img align="center" width="400" src="https://github.com/vedanti-u/comet-terminal/blob/main/screenshots/comet-keypopup.png" />

## 🚀 Features

|  Buttons | Description |
| ------------- | ------------- |
| <img align="center" src="https://github.com/vedanti-u/comet-terminal/blob/main/assets/icon-ai.png" width="50" height="50"/>  | Write Query in Natural language and get command generated  |
| <img align="center" src="https://github.com/vedanti-u/comet-terminal/blob/main/assets/icon-search.png" width="45" height="45"/>   | Get Instant error detection and quick fixes |
| <img align="center" src="https://github.com/vedanti-u/comet-terminal/blob/main/assets/ai-summary-64px.png" width="50" height="50"/>  | Generate the detailed description of command  |
</br>

<h3> 1️⃣ AI Command Generation</h3>
<img align="center"  src="https://github.com/vedanti-u/comet-terminal/blob/readme-update/screenshots/comet-ai-command.png" />
<h3> 2️⃣ Error Quick Fixes</h3>
<img align="center"  src="https://github.com/vedanti-u/comet-terminal/blob/readme-update/screenshots/comet-ai-error.png" />
<h3> 3️⃣ Command Summary</h3>
<img align="center"  src="https://github.com/vedanti-u/comet-terminal/blob/readme-update/screenshots/comet-ai-summary-1.png" />
<h3> 4️⃣ Autocomplete suggestion</h3>
<img align="center"  src="https://github.com/vedanti-u/comet-terminal/blob/readme-update/screenshots/comet-autosuggestion.png" />

</br>

## 💡 How Comet works ?

```mermaid
sequenceDiagram
    participant User
    participant HTML_UI
    participant Electron_Backend
    participant OS_Shell
    participant OpenApiLLM

    User->>HTML_UI: Writes Shell commands
    HTML_UI->>Electron_Backend: Transfers command (command event)
    Electron_Backend->>OS_Shell: Runs OS command
    OS_Shell->>+Electron_Backend: Success/Error
    alt Success
        Electron_Backend->>HTML_UI: Sends success response
    else Error
        Electron_Backend->>OpenApiLLM: Send error stack
    end
    User->>HTML_UI: Requests AI to send command
    HTML_UI->>Electron_Backend: Asks OpenApiLLM for command
    Electron_Backend->>OpenApiLLM: Requests command
    OpenApiLLM->>Electron_Backend: Returns command
    Electron_Backend->>OS_Shell: Runs OS command
    OS_Shell->>+Electron_Backend: Success/Error
    alt Success
        Electron_Backend->>HTML_UI: Sends success response
    else Error
        Electron_Backend->>OpenApiLLM: Send error stack
    end

```

The sequence diagram illustrates the interaction between various components of our terminal emulator. When the user writes shell commands, the HTML UI transfers the command event to the Electron Backend, which executes the OS command. Upon success or error, the Electron Backend communicates the response accordingly. In case of success, a success response is sent to the HTML UI. However, if an error occurs, the Electron Backend sends the error stack to the OpenApiLLM. Additionally, users can request AI to send commands. In this scenario, the HTML UI asks the Electron Backend to fetch a command from the OpenApiLLM. The OpenApiLLM responds with the requested command, which is then executed by the Electron Backend using OS Shell. Again, success or error responses are handled similarly as in the previous scenario. This sequence ensures smooth interaction and efficient execution of commands within our terminal emulator.

## 🤝 Contributing

### Dependencies

![Node Version](https://img.shields.io/badge/node-v20.11.1-blue?style=For-the-badge) ![NVM Version](https://img.shields.io/badge/nvm-v0.39.1-green?style=For-the-badge) ![NVM Version](https://img.shields.io/badge/Electron-v^29.1.4-red?style-plastic&logo=Electron&logoColor=white&style=)

<details close>
  <summary>Contributing Guidelines</summary>

### Fork this repository
<img align="right" width="400" src="https://github.com/vedanti-u/readme-assets/blob/main/fork-the-repo.png" alt="fork this repository" />
<h4>Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.
</h4>

</br>
</br>
</br>
</br>

### Clone the repository

<img align="right" width="300" src="https://github.com/vedanti-u/readme-assets/blob/main/copy-cloning-url.png" alt="fork this repository" />
<img align="right" width="300" src="https://github.com/vedanti-u/readme-assets/blob/main/clone-button.png" />


<h4>Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon, this is the COPIED_URL.</h4>
</br>
</br>
</br>
</br>
</br>

_Open a terminal and run the following git command:_

```git
git clone "COPIED_URL"
```

e.g : `git clone https://github.com/vedanti-u/db.ai.git`
</br>

---

### Install dependencies

```bash
npm install
```

---

### Create a branch

Change to the repository directory on your computer (if you are not already there):

```bash
$ cd comet-terminal
```

Now create a branch using the `git checkout` command:

```bash
$ git checkout -b new-branch-name
```

e.g : `git checkout -b feature/ai-autocomplete`

**Name your branch according to the feature you are working on :**

e.g : you want to work on creating autocomplete feature, name your branch like `feature/ai-autocomplete`

_(follow this naming convention i.e using "-" in between)_

### _Contribute to Code_

#### :closed_lock_with_key: Create a `.env` File with format

### Create a pull request

  <details>
   <summary>How to create pull request</summary>
  </br>
  Once you have modified an existing file or added a new file to the project of your choice, you can stage it to your local repository, which we can do with the `git add` command. In our example, `filename.md`, we will type the following command.

<code>$ git add filename.md</code>

where filename is the file you have modified or created

If you are looking to add all the files you have modified in a particular directory, you can stage them all with the following command:
`git add .` Or, alternatively, you can type `git add -all` for all new files to be staged.

<h3>Commiting the changes</h3>
<code>git commit -m "Added autocomplete feature"</code>

<h3>To PUSH your branch to your remote main</h3>
<code>$ git push --set-upstream origin your-branch-name</code>
</br>

e.g : `$ git push --set-upstream origin feature/ai-autocomplete`

<h4>Open Github</h4>
<img align="right" width="300" src="https://github.com/vedanti-u/readme-assets/blob/main/compare-and-pulll-request.png" alt="compare and pull request" />
click on compare & pull request
</br>
<img align="right" width="300" src="https://github.com/vedanti-u/readme-assets/blob/main/create-pull-request.png" alt="create pull request" />
write a description for your pull request specifing the changes you have made, title it and then, Click on create pull request

_your branch will be merged on code review_

  </details>
</details>


### Statistics
![stars](https://img.shields.io/github/stars/{vedanti-u}/{comet-terminal}.svg)
![fork](https://img.shields.io/github/forks/{vedanti-u}/{comet-terminal}.svg)
![watchers](https://img.shields.io/github/watchers/{vedanti-u}/{comet-terminal}.svg)
![releases](https://img.shields.io/github/release/{vedanti-u}/{comet-terminal}.svg)
[![PyPI status](https://img.shields.io/pypi/status/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/)
[![GitHub contributors](https://badgen.net/github/contributors/vedanti-u/comet-terminal.js)](https://GitHub.com/vedanti-u/comet-terminal/graphs/contributors/)
</br>
-----------
![MadeWithLove](http://ForTheBadge.com/images/badges/built-with-love.svg) [![forthebadge](https://forthebadge.com/images/badges/license-mit.svg)](https://forthebadge.com)
