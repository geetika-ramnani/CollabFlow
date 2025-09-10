
# CollabFlow - pixel perfect, E2E clone of Trello (React + Node.js). 

Kanban-style task management board app inspired by trello.com


___

### Table of Contents
- [Trello Description](#trello-description)
- [Application Features](#application-features)
- [Technologies](#technologies)
- [Getting started](#getting-started)

## Trello Description
Trello is an app in which you can manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects in the project. Users can modify the board and change list and card locations using Drag and Drop.
Users can work together and watch live changes. 
There are many other features in Trello, such as labels, due date for tasks, members and more. 

## Application Features
- Create **Boards** and manage projects: Using **D&D**, create, remove, and update lists and tasks.
- Create, edit and delete **Tasks** to the deepest level: Labels, due date, members, cover images, checklists, copy, move and delete.
- **Side Menu:** Change the background of the board with the **Unsplash Photo API**.
- Login / signup authentication which is encrypted and safe.

## Technologies
The technology stack we used was **MERN - MongoDB, Express, React, Node.js**.
The app uses **webSockets** to update the board in real-time.
The API calls to the backend are done with the **REST API** method, and we used middlewares to authenticate and authorize actions.

The layout and pixel-perfect were made with **Sass**. 

## Getting started
Head to the repository on top and clone the project or download the files.

```
git clone https://github.com/BatelKat96/CollabFlow
```

Enter the backend folder and make sure you have node_modules installed, then initiate the server with 'npm start':

```
cd backend
npm i 
npm run dev
```

You shuold get a console ouput that the server is up and running at port 3030.
Enter the frontend folder and repeat the same process.

```
cd frontend
npm i 
npm start
```

You shuold get a console ouput that the server is up and running at localhost:3000.

That's it! The App should be opened automatically, enjoy!