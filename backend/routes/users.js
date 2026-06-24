const express = require('express');
const router = express.Router();
const { getMysqlPool } = require('../config/mysql');
const { authenticateToken } = require('../middleware/auth');

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    const [users] = await connection.execute(
      'SELECT id, email, firstName, lastName, phone, role, createdAt FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    connection.release();

    res.status(200).json(users[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    await connection.execute(
      'UPDATE users SET firstName = ?, lastName = ?, phone = ? WHERE id = ?',
      [firstName, lastName, phone, req.user.userId]
    );

    connection.release();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
