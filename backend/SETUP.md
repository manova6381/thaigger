# Thaigger Travel Backend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy the `.env.example` file to `.env` and update with your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your actual database credentials:

```
PORT=5000
NODE_ENV=development

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=thaigger_db

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/thaigger_travel

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

### 3. Setup MySQL Database

Run the database setup script to create all tables:

```bash
node setup-db.js
```

This will:
- Create the `thaigger_db` database
- Create the `users`, `bookings`, `payments`, and `reviews` tables

### 4. Setup MongoDB

Ensure MongoDB is running locally or update the connection string in `.env`.

### 5. Seed Sample Data (Optional)

Add sample travel packages to MongoDB:

```bash
node seed-mongodb.js
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user and get JWT token

### Travel Packages (`/api/packages`)

- **GET** `/api/packages` - Get all travel packages
- **GET** `/api/packages/:id` - Get package by ID

### Bookings (`/api/bookings`)

- **POST** `/api/bookings` - Create a new booking (requires auth)
- **GET** `/api/bookings` - Get user's bookings (requires auth)
- **GET** `/api/bookings/:id` - Get specific booking (requires auth)

### User Profile (`/api/users`)

- **GET** `/api/users/profile` - Get current user profile (requires auth)
- **PUT** `/api/users/profile` - Update user profile (requires auth)

### Admin Routes (`/api/admin`)

- **POST** `/api/admin/packages` - Create travel package (admin only)
- **PUT** `/api/admin/packages/:id` - Update travel package (admin only)
- **DELETE** `/api/admin/packages/:id` - Delete travel package (admin only)
- **GET** `/api/admin/bookings` - Get all bookings (admin only)
- **PUT** `/api/admin/bookings/:id` - Update booking status (admin only)

## Database Schema

### Users Table
- id (INT, Primary Key)
- email (VARCHAR, Unique)
- password (VARCHAR, hashed)
- firstName (VARCHAR)
- lastName (VARCHAR)
- phone (VARCHAR)
- role (ENUM: 'customer', 'admin', 'travel_agent')
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Bookings Table
- id (INT, Primary Key)
- userId (INT, Foreign Key)
- packageId (VARCHAR)
- numberOfPeople (INT)
- startDate (DATE)
- endDate (DATE)
- totalPrice (DECIMAL)
- status (ENUM: 'pending', 'confirmed', 'cancelled')
- specialRequests (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Payments Table
- id (INT, Primary Key)
- bookingId (INT, Foreign Key)
- userId (INT, Foreign Key)
- amount (DECIMAL)
- paymentMethod (VARCHAR)
- transactionId (VARCHAR)
- status (ENUM: 'pending', 'completed', 'failed')
- createdAt (TIMESTAMP)

### Reviews Table
- id (INT, Primary Key)
- userId (INT, Foreign Key)
- packageId (VARCHAR)
- rating (INT, 1-5)
- comment (TEXT)
- createdAt (TIMESTAMP)

### MongoDB: Packages Collection

```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "destination": String,
  "price": Number,
  "duration": String,
  "image": String,
  "highlights": [String],
  "accommodation": String,
  "meals": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from the login endpoint and expire based on `JWT_EXPIRE` setting.

## Troubleshooting

### MySQL Connection Issues

- Ensure MySQL server is running
- Check credentials in `.env` file
- Verify database exists after running `setup-db.js`

### MongoDB Connection Issues

- Ensure MongoDB server is running
- Check connection string in `.env`
- Try connecting with MongoDB Compass to verify

### Port Already in Use

Change the PORT in `.env` file to an available port

### CORS Issues

CORS is enabled for all origins. Update in `server.js` if needed.

## Next Steps

1. Build the React frontend
2. Connect frontend to these APIs
3. Implement payment integration (Stripe)
4. Add email notifications
5. Setup deployment pipeline
