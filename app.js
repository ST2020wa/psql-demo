const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('usernames will be logged here - wip');
});

app.get('/new', (req, res) => {
    res.send(`
        <form action="/new" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/new', (req, res) => {
    res.send("username to be saved: " + req.body.username);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});