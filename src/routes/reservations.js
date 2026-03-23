const validate = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware'); // <--- ADD THIS
const express = require('express');
const router = express.Router();
const db = require('../db');

// Anyone can see reservations
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM reservations');
  res.json(rows);
});

// ONLY logged-in users can make a reservation
router.post(
  '/', 
  auth, // <--- ADD THIS (The Guard)
  validate(['user_id', 'resource_id', 'start_time', 'end_time']), 
  async (req, res, next) => {
    try {
      const { user_id, resource_id, start_time, end_time } = req.body;

      if (new Date(start_time) >= new Date(end_time)) {
        return res.status(400).json({ error: "End time must be after the start time." });
      }

      const [resource] = await db.query('SELECT * FROM resources WHERE resource_id = ?', [resource_id]);
      
      if (resource.length === 0) {
        return res.status(404).json({ error: "That resource does not exist." });
      }

      const [result] = await db.query(
        `INSERT INTO reservations (user_id, resource_id, start_time, end_time) VALUES (?, ?, ?, ?)`,
        [user_id, resource_id, start_time, end_time]
      );

      res.status(201).json({ reservation_id: result.insertId });

    } catch (error) {
      next(error); 
    }
});

module.exports = router;