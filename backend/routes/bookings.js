const express = require('express');
const router = express.Router();
const { getMysqlPool } = require('../config/mysql');
const { authenticateToken } = require('../middleware/auth');

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { packageId, numberOfPeople, startDate, totalPrice, specialRequests } = req.body;

    if (!packageId || !numberOfPeople || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    const [result] = await connection.execute(
      'INSERT INTO bookings (userId, packageId, numberOfPeople, startDate, totalPrice, specialRequests, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [req.user.userId, packageId, numberOfPeople, startDate, totalPrice, specialRequests || '', 'pending']
    );

    connection.release();

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: result.insertId
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    const [bookings] = await connection.execute(
      'SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC',
      [req.user.userId]
    );

    connection.release();

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    const [bookings] = await connection.execute(
      'SELECT * FROM bookings WHERE id = ? AND userId = ?',
      [req.params.id, req.user.userId]
    );

    if (bookings.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Booking not found' });
    }

    connection.release();

    res.status(200).json(bookings[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

module.exports = router;
