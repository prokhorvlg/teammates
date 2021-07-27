# teammates
teammates is a demo for a simple, React-based employee directory application. It is probably hosted at [https://teammates-demo.herokuapp.com/](https://teammates-demo.herokuapp.com/).

Created by [prokhorvlg (Valentin Sigalov)](https://github.com/prokhorvlg).

Note that everyone is a Front-End Developer because the API that generates randomized people does not provide a job position, but I still wanted that field for the appearance :)

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

## How to Set Up and Run

Before starting, clone the repository using `git clone https://github.com/prokhorvlg/teammates.git`.

### Node Server

The node server *must* be run before the React client app can function.

1. Open terminal in the base folder of the repository.
2. Run `npm install`.
3. Run `npm start`.
4. The terminal should say "Server is fully operational." This means the server is online.

### React App

#### Run the App

1. Open terminal on this folder (different from the server terminal).
2. Run `cd app` to open the client app folder.
3. Run `npm install`.
4. Run `npm start`.
5. Visit `localhost:3000` if the app does not automatically open in browser.

#### Run the Unit Tests

1. Open terminal on this folder.
2. Run `cd app` to open the client app folder.
3. Run `npm install`.
4. Run `npm test`.
5. The Jest test results should appear in your console after running.

## How to Deploy (heroku)

1. Commit and push changes to 'main'.
2. Heroku should automatically build when the push is complete.
3. Visit [https://teammates-demo.herokuapp.com/](https://teammates-demo.herokuapp.com/). (Heroku can be shaky sometimes, so it may not always be online!)

## Future ideas
* Add randomized job titles to the node server.
* Add the ability to add and remove employees from the data set.
* More extensive sorting functionality would be nice (alphabetical order, etc).
* Incorporate useContext for some of the more deeply nested props.

## Failures
* I was unable to find a way to simulate Apollo's refetch functionality in my unit test suite, as none of the online solutions work with modern versions of Apollo, and Apollo's documentation did not provide any answers. This is something I would want to consult an expert with to fix and learn!

