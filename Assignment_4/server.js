// server.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route for the /about URL
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
