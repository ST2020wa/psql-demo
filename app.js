const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRoutes = require("./routes/users");
const pool = require('./db/pool'); // Import the pool

// Middleware to parse URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRoutes);

app.get('/', async (req, res) => {
    const searchTerm = req.query.search || ''; // Get the search term from query parameters
    try {
        const result = await pool.query('SELECT * FROM users WHERE username ILIKE $1', [`%${searchTerm}%`]);
        const usernames = result.rows.map(row => row.username).join(', ');
        res.send(`Usernames matching "${searchTerm}": ${usernames}`);
    } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).send('Error fetching usernames');
    }
});

// New route to delete all usernames
app.get('/delete', async (req, res) => {
    try {
        await pool.query('DELETE FROM users');
        res.send('All usernames have been deleted.');
    } catch (error) {
        console.error('Error deleting usernames:', error);
        res.status(500).send('Error deleting usernames');
    }
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

app.post('/new', async (req, res) => {
    const { username } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [username]);
        res.send(`Username saved: ${result.rows[0].username}`);
    } catch (error) {
        console.error('Error saving username:', error);
        res.status(500).send('Error saving username');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});