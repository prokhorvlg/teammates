# teammates
teammates is a demo for a simple, React-based employee directory application.

This demo is not intended for serious use. The data set is randomly generated each time the Node server is re-run. So, feel free to mess around!

Created by [prokhorvlg (Valentin Sigalov)](https://github.com/prokhorvlg).

## Contents

This repository contains two projects (nested):
* **Node server**: A simple server script provided by [this repository](https://github.com/FirstbaseHQ/frontend-coding-challenge) can be found within the 'server' folder.
* **React app**: The full React-based front-end can be found within the 'app' folder.

## Technologies

* **React** (JavaScript framework, React hooks, functional components)
* **TypeScript** (interfaces, types)
* **GraphQL**, **Apollo** (API, queries)
* **Node** (server) (mostly provided by Firstbase)
* **Jest**, **React Testing Library** (user-experience-oriented unit testing)

## Features

* **Loads and displays data** from the node server using a GraphQL query and displays it as a list
* **Filter/search** through employees using a text input
* **Select an employee** and **edit their data**, which sends a GraphQL query to the server and refreshes the data
* **Responsive** and usable on mobile

## How to Run

The node server *must* be run before the React client app can function. Assuming you have already cloned the repository...

### Node Server

1. Open console in this folder.
2. Run `npm install`.
3. Run `npm start`.

### React App

#### Run the App

1. Open console on this folder.
2. Run `cd app` to open the client app folder.
3. Run `npm install`.
4. Run `npm start`.
5. Visit `localhost:5000` if the app does not automatically open in browser.

#### Run the Unit Tests

1. Open console on this folder.
2. Run `cd app` to open the client app folder.
3. Run `npm install`.
4. Run `npm test`.
5. The Jest test results should appear in your console after running.

## How to Deploy (heroku)

1. Commit and push changes to 'main'.
2. Heroku should automatically build when the push is complete.
3. Visit [https://teammates-demo.herokuapp.com/](https://teammates-demo.herokuapp.com/). (Heroku can be... shaky sometimes.)
