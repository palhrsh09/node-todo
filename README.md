# Node.js To-Do Application

A simple Node.js application to manage tasks using a RESTful API. This application allows you to create, read, update, and delete tasks. It uses MongoDB for data storage and Express.js for routing.

## Features

- Create new tasks
- Retrieve all tasks
- Retrieve a single task by ID
- Update existing tasks
- Delete tasks
- MongoDB integration for data persistence
- TypeScript for improved code quality and developer experience

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/palhrsh09/node-todo.git
   cd node-todo

Install dependencies:
bashCopynpm install

Create a .env file in the root directory and add your MongoDB URI:
CopyMONGO_URI=your_mongodb_uri
Replace your_mongodb_uri with your actual MongoDB connection string.
Alternatively, you can use the provided connection string:
CopyMONGO_URI=mongodb+srv://theharshpal18:kX9TeOjWnKmTKFqK@cluster0.ec9sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

Build the TypeScript code:
bashCopynpm run build

Start the application:
bashCopynpm start


The server will start on http://localhost:5000 (or the port specified in your environment variables).
Development
To run the application in development mode with hot reloading:
bashCopynpm run dev
API Endpoints

GET /tasks: Retrieve all tasks
GET /tasks/:id: Retrieve a single task by ID
POST /tasks: Create a new task
PUT /tasks/:id: Update an existing task
DELETE /tasks/:id: Delete a task
