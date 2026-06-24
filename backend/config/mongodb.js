const mongoose = require('mongoose');

async function initializeMongodb() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/thaigger_travel';
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Don't exit process - MongoDB is optional for initial setup
    console.warn('Continuing without MongoDB - ensure it is running for full functionality');
  }
}

function getDb() {
  return mongoose.connection.db;
}

module.exports = { initializeMongodb, getDb };
