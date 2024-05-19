<div align="center">
<a href="https://refine.dev/">
    <img alt="dbsense ai logo" src="assets\comeettu.png">
</a>
</div>
<!-- <div style="font-family: 'Lucida Console', 'Courier New', monospace; font-size: 25px;  font-family: Arial, Helvetica, sans-serif;
			background: linear-gradient(to right, #f32170,
					#ff6b08, #cf23cf, #eedd44);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;;">DbSenseAi</div> -->

<!-- <br/> -->
<!-- <div align="center">
    <a href="" style="color: ;">Home Page</a> |
    <a href="">Discord</a> |
    <a href="">Blog</a> |
    <a href="">Documentation</a>
</div> -->
<!-- <br/>
<br/> -->
<!-- <div align="center"><strong>Add Here <a href="">Something</a> Add here.</strong><br>add here</div> -->

Next Generation AI Powered Terminal
<br />

<div>
<div align="center">

[![npm version](https://img.shields.io/npm/v/@refinedev/core.svg)](https://www.npmjs.com/package/@refinedev/core)
[![](https://img.shields.io/github/commit-activity/m/refinedev/refine)](https://github.com/refinedev/refine/commits/master)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)
<br/>
<br/>

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

## How Comet works ?

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

## ⚡ Try Comet

## Installation

`Link to install`
Screenshot of landing page

## Setting-up the `OpenAI API key`

## Contribution

### Prerequistes

- #### **Node Version**

```
v20.11.1
```

- #### **NVM Version**

```
0.39.1
```

- #### **Electron Version**

```
^29.1.4
```

<details close>
  <summary>Fork this repository</summary>

<img align="right" width="500" src="https://github.com/vedanti-u/readme-assets/blob/main/fork-the-repo.png" alt="fork this repository" />

Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.
</br>

## Clone the repository

<img align="right" width="500" src="https://github.com/vedanti-u/readme-assets/blob/main/clone-button.png" />
<img align="right" width="500" src="https://github.com/vedanti-u/readme-assets/blob/main/copy-cloning-url.png" alt="fork this repository" />
Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon, this is the COPIED_URL.

Open a terminal and run the following git command:

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

#### Create a `.env` File with format

### Create a pull request

  <details>
   <summary>How to create pull request</summary>
  </br>
  Once you have modified an existing file or added a new file to the project of your choice, you can stage it to your local repository, which we can do with the `git add` command. In our example, `filename.md`, we will type the following command.

<code>$ git add filename.md</code>

where filename is the file you have modified or created

If you are looking to add all the files you have modified in a particular directory, you can stage them all with the following command:
`git add .`

Or, alternatively, you can type `git add -all` for all new files to be staged.

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
