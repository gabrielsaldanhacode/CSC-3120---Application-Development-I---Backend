const validate = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware'); 
const requireRole = require('../middleware/roleMiddleware'); 
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});


router.post(
  '/', 
  auth, 
  requireRole('admin'), 
  validate(['resource_name', 'resource_type']), 
  async (req, res, next) => {
    try {
      const { resource_name, resource_type, location } = req.body;

      
      if (!location || location.trim() === "") {
        return res.status(400).json({ error: 'Location is required for new resources.' });
      }

      const [result] = await db.query(
        'INSERT INTO resources (resource_name, resource_type, location) VALUES (?, ?, ?)',
        [resource_name, resource_type, location]
      );

      res.status(201).json({ resource_id: result.insertId });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;