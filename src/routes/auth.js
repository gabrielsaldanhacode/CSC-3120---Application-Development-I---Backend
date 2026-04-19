const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Only need this once!

// --- REGISTER ROUTE ---
router.post('/register', async (req, res, next) => {
  const { full_name, email, password } = req.body;

  try {
    // 1. Scramble the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Save the user
    const sql = 'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, "user")';
    
    // Using [result] logic to match your other files
    const [result] = await db.query(sql, [full_name, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
  } catch (err) {
    next(err);
  }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user
    const sql = 'SELECT user_id, password, role FROM users WHERE email = ?';
    const [results] = await db.query(sql, [email]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 3. Create the Token
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      'your_secret_key', 
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;