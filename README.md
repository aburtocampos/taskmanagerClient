# Task Manager Client API

This is a [React] project using [Vite] for fast builds and [Tailwind CSS] for styling. It provides a task management interface with features such as adding, editing, and viewing tasks. User authentication is implemented to restrict access to private routes.

## **DEMO**
The Swagger Docmumentation of the endpoints are live on: 
https://taskmanager-1-2y65.onrender.com/api-docs/

App on React can be find on:
https://ramontaskmanager.netlify.app/

- The user to test: ramon
- The password: 1234

## Features

- **Authentication**: Login and registration pages for user access.
- **Task Management**:
  - Add, edit, delete, and view detailed tasks.
  - Search functionality for tasks.
  - Filter between the completed status of the tasks.
- **Private Routes**: Ensures certain pages are accessible only to authenticated users.
- **Custom Hooks**:
  - `useAuth`: Manages user authentication state.
  - `useTasks`: Handles task-related data and operations.
- **Context API**: Centralized state management for tasks.

## Core React Components:

- `App.jsx:` The main application component.

### Components:
- `EditTaskForm.jsx:` A form for editing tasks.
- `LogoutButton.jsx:` Button for user logout functionality.
- `NewTaskForm.jsx:` A form for adding new tasks.
- `PrivateRoute.jsx:` Handles route guarding based on authentication.
- `SearchInput.jsx:` Input for searching tasks.
- `TaskDetail.jsx:` Displays detailed task information.
- `TaskItem.jsx:` Represents a single task in the task list.
- `TaskList.jsx:` Renders the list of tasks.

### Context:
- `TaskContext.jsx:` Context for managing tasks globally.

### Hooks:
- `useAuth.js:` Custom hook for authentication logic.
- `useTasks.js:` Custom hook for managing tasks.

### Pages:

- `Home.jsx:` The home page of the application.
- `Login.jsx:` Login page for authentication.
- `Register.jsx:` Registration page for new users.

### Services:

- `api.js:` Handles API interactions.

### Styles:

- `index.css:` Centralized styling for the app.

### Public Assets:

- `vite.svg:` Example asset for branding or visuals.
- `_redirects:` For deployment with routing support.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ````
   
## Testing
Basic tests will be conducted to ensure the functionality of the main components, including:

- Task addition, deletion, and editing in TaskList and TaskDetail.
- Authentication logic in useAuth and PrivateRoute.
- API interactions via api.js.

````bash
npm run test
````






