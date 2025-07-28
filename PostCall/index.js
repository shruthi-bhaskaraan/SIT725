const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Please enter valid numbers as num1 and num2 in query parameters.' });
  }

  const sum = num1 + num2;
  res.json({ result: sum });
});

// POST
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Please send valid numbers in the request body.' });
  }

  const sum = num1 + num2;
  res.json({ result: sum });
});

app.listen(port, () => {
  console.log(`Addition service running at http://localhost:${port}`);
});
