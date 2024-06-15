const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit', (req, res) => {
  console.log('Received form data:', req.body); // Log the received form data

  const formData = req.body;
  const transactionsFile = path.join(__dirname, 'transactions.json');
  let transactions = [];

  if (fs.existsSync(transactionsFile)) {
    const data = fs.readFileSync(transactionsFile, 'utf8');
    console.log('File contents before parsing:', data); // Log file contents
    if (data) {
      try {
        transactions = JSON.parse(data);
      } catch (err) {
        console.error('Error parsing JSON data:', err);
        return res.status(500).send('Error reading transactions data');
      }
    }
  }

  transactions.push(formData);

  try {
    fs.writeFileSync(transactionsFile, JSON.stringify(transactions, null, 2));
  } catch (err) {
    console.error('Error writing to JSON file:', err);
    return res.status(500).send('Error saving transaction');
  }

  res.send('Transaction saved successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



