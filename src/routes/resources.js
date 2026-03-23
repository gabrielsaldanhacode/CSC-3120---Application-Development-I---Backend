const validate = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware'); 
const requireRole = require('../middleware/roleMiddleware'); 
const express = require('express');
const router = express.Router();
const db = require('../db');

// Anyone can see the resources (Keep this public)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM resources');
  res.json(rows);
});

// ONLY Admins can create resources
router.post(
  '/', 
  auth,                      // Guard 1: Must be logged in
  requireRole('admin'),      // Guard 2: Must be an admin
  validate(['resource_name', 'resource_type']), 
  async (req, res) => {
    const { resource_name, resource_type, location } = req.body;

    const [result] = await db.query(
      'INSERT INTO resources (resource_name, resource_type, location) VALUES (?, ?, ?)',
      [resource_name, resource_type, location]
    );

    res.status(201).json({ resource_id: result.insertId });
  }
);

module.exports = router;