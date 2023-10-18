const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'students_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ students: results });
  });
});

app.post('/students', (req, res) => {
  const { name, rollNumber } = req.body;
  const sql = 'INSERT INTO students (name, roll_number) VALUES (?, ?)';
  db.query(sql, [name, rollNumber], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student added successfully', studentId: result.insertId });
  });
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
