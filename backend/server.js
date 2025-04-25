const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add your password if needed
  database: "earist"
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Fetch all registrations
app.get('/registrations', (req, res) => {
  const query = 'SELECT * FROM certificate_of_registration';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new registration
app.post('/registrations', (req, res) => {
  const data = req.body;

  const query = `INSERT INTO certificate_of_registration SET ?`;
  db.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Registration added successfully', id: results.insertId });
  });
});

// Get a registration by registration_no
app.get('/registrations/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM certificate_of_registration WHERE registration_no = ?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Not found' });
    res.json(results[0]);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
