const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs'); // Import the fs module
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data
const todos = [
    { id: 1, text: 'dominos', marker: "dominos.png", content: "dominos.obj" },
    { id: 2, text: 'ccd', marker: "ccd.png", content: "ccd.obj" },
    { id: 3, text: 'starbuks', marker: "starbuks.png", content: "starbuks.obj" },
    { id: 4, text: 'sodi', marker: "sodi.jpg", content: "sodi.obj" },
    { id: 5, text: 'juice', marker: "juice.jpg", content: "juice.obj" },
    { id: 6, text: 'giani', marker: "giani.jpg", content: "giani.obj" },
];

// Get all todos
app.get('/api/places', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/api/places/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Define a route to serve files from the data folder
app.get('/data/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'data', filename);
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
