const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let habits = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client')); // Serve the frontend

// Get all habits
app.get('/api/habits', (req, res) => {
  res.json(habits);
});

// Add a new habit
app.post('/api/habits', (req, res) => {
  const { habit, target } = req.body;
  const newHabit = { habit, target };
  habits.push(newHabit);
  res.json(newHabit);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});