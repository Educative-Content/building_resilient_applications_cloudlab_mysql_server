const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12.4ED78@bd',
  database: 'students_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ patients: results });
  });
});

app.post('/patients', (req, res) => {
  const { name, rollNumber } = req.body;
  const sql = 'INSERT INTO patients (name, patient_number) VALUES (?, ?)';
  db.query(sql, [name, rollNumber], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Patient added successfully', studentId: result.insertId });
  });
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
