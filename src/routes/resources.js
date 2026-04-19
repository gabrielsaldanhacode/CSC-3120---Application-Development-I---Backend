const validate = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware'); 
const requireRole = require('../middleware/roleMiddleware'); 
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    // PART D OPTIMIZATION: Updated to use your exact database column names
    const [rows] = await db.query('SELECT resource_id, resource_name, resource_type, is_active FROM resources');
    
    // PART B OPTIMIZATION: Safely handle if the database table is completely empty
    if (rows.length === 0) {
      return res.status(404).json({ message: "No resources currently available." });
    }

    res.json(rows);
  } catch (err) {
    // PART A/C: Centralized error handling
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
      // PART A/C: Centralized error handling
      next(err);
    }
  }
);

// This must only appear ONCE at the very bottom of the file
module.exports = router;