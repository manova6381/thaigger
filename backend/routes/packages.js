const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB Schema for Travel Packages
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

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json(pkg);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ error: 'Failed to fetch package' });
  }
});

module.exports = router;
