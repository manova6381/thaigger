const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function setupDatabase() {
  let connection;

  try {
    // Connect to MySQL server
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      port: process.env.MYSQL_PORT || 3306
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    const database = process.env.MYSQL_DATABASE || 'thaigger_db';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${database}`);
    console.log(`Database ${database} ready`);

    // Select database
    await connection.execute(`USE ${database}`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        phone VARCHAR(20),
        role ENUM('customer', 'admin', 'travel_agent') DEFAULT 'customer',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      )
    `);
    console.log('Users table created');

    // Create bookings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        packageId VARCHAR(255) NOT NULL,
        numberOfPeople INT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE,
        totalPrice DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        specialRequests TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_userId (userId),
        INDEX idx_status (status)
      )
    `);
    console.log('Bookings table created');

    // Create payments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bookingId INT NOT NULL,
        userId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        paymentMethod VARCHAR(50),
        transactionId VARCHAR(255),
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (bookingId) REFERENCES bookings(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_status (status)
      )
    `);
    console.log('Payments table created');

    // Create reviews table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        packageId VARCHAR(255) NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_packageId (packageId)
      )
    `);
    console.log('Reviews table created');

    console.log('\nDatabase setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Ensure MongoDB is running on: ' + (process.env.MONGODB_URI || 'mongodb://localhost:27017/thaigger_travel'));
    console.log('2. Install dependencies: npm install in the backend directory');
    console.log('3. Set up .env file with your credentials');
    console.log('4. Start the server: npm start or npm run dev');

  } catch (error) {
    console.error('Database setup error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
