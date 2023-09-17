const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'finance_tracker',
  password: 'your_mysql_password_here',
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(201).send({ id: results.insertId });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send(results);
  });
});

app.post('/transactions', (req, res) => {
  const { user_id, amount, category, date } = req.body;
  db.query('INSERT INTO transactions (user_id, amount, category, date) VALUES (?, ?, ?, ?)', [user_id, amount, category, date], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(201).send({ id: results.insertId });
  });
});

app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM transactions', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
