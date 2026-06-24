const express = require('express');
const router = express.Router();
const { getMysqlPool } = require('../config/mysql');
const mongoose = require('mongoose');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// MongoDB Schema for Travel Packages (shared with packages route)
const packageSchema = new mongoose.Schema({
  name: String,
  description: String,
  destination: String,
  price: Number,
  duration: String,
  image: String,
  highlights: [String],
  accommodation: String,
  meals: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);

// Create travel package
router.post('/packages', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, destination, price, duration, highlights, accommodation, meals } = req.body;

    const newPackage = new Package({
      name,
      description,
      destination,
      price,
      duration,
      highlights,
      accommodation,
      meals
    });

    await newPackage.save();

    res.status(201).json({
      message: 'Package created successfully',
      package: newPackage
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ error: 'Failed to create package' });
  }
});

// Update travel package
router.put('/packages/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, destination, price, duration, highlights, accommodation, meals } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        destination,
        price,
        duration,
        highlights,
        accommodation,
        meals,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json({
      message: 'Package updated successfully',
      package: updatedPackage
    });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Failed to update package' });
  }
});

// Delete travel package
router.delete('/packages/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Failed to delete package' });
  }
});

// Get all bookings (admin only)
router.get('/bookings', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    const [bookings] = await connection.execute(
      'SELECT b.*, u.email, u.firstName, u.lastName FROM bookings b JOIN users u ON b.userId = u.id ORDER BY b.createdAt DESC'
    );

    connection.release();

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status (admin only)
router.put('/bookings/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const pool = getMysqlPool();
    const connection = await pool.getConnection();

    await connection.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    connection.release();

    res.status(200).json({ message: 'Booking status updated' });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

module.exports = router;
