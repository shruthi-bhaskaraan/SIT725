const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// MySQL connection config (adjust your username, password, and database)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'myDbRootPwd@123_456',
  database: 'wellness',
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client')); // Serve the frontend

// Helper function to get a MySQL connection
async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// Get all habits
app.get('/api/habits', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT id, habit, target FROM habits');
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

// Add a new habit
app.post('/api/habits', async (req, res) => {
  const { habit, target } = req.body;

  if (!habit || !target) {
    return res.status(400).json({ error: 'Habit and target are required' });
  }

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO habits (habit, target) VALUES (?, ?)',
      [habit, target]
    );
    await connection.end();

    // Return the new habit including its generated id
    res.json({ id: result.insertId, habit, target });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add habit' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});