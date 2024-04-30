# Task Manager Application

This Vue.js application is a task management app that allows users to register, log in, manage tasks; running on Vue 3 with Composition API.

## Features

### User Registration and Authentication:

Users can register, log in, and manage their account.

### Email Verification:

After registration, users are prompted to verify their email address. The application checks the verification status during login attempts.

### Task Management:

Users can add, edit, delete, and toggle the completion status of tasks. Tasks are persisted in a database managed by Supabase.

### Dynamic Task Filtering:

Users can filter their tasks based on completion status, displaying either all tasks, completed tasks, or uncompleted tasks.

### Real-time Updates:

The application uses real-time updates from Supabase to reflect changes in tasks immediately.

## Technical Specifications

Frontend:
Vue 3 with the Composition API,
Pinia for state management,
Vue Router for navigation

Backend:
Supabase for user authentication, email verification, and database management.

Styling:
Tailwind CSS for styling some components.

## Configuration

Recommended IDE Setup
VSCode + Volar (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Functionalities

### User Registration and Authentication

Users can register by providing an email and password.

After registration, users are prompted to verify their email address.

Users can log in using their email and password. The application checks if the email is verified during login.

### Email Verification

After registration, users receive an email with a verification link.

Users are informed if their email is not verified and are prompted to check their mailbox.

The application displays appropriate messages and handles errors gracefully during the registration and login processes.

### Task Management

Users can add new tasks with a title.

Tasks can be edited, deleted, and toggled between completed and uncompleted states.

The application provides real-time updates for tasks, ensuring the UI is always in sync with the backend.

### 404 Not Found error page

## License

This project is licensed under the MIT License.
See the LICENSE file for details.
