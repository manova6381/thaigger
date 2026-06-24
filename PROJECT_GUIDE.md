# Thaigger Travel - Full-Stack Project Guide

Complete guide to setting up, running, and deploying the Thaigger travel booking full-stack application.

## Project Overview

Thaigger is a comprehensive travel booking platform with:

- **Frontend**: Modern React UI with responsive design
- **Backend**: Node.js Express API with JWT authentication
- **Databases**: MySQL for relational data, MongoDB for flexible content
- **Features**: User authentication, package management, booking system, admin panel

## Directory Structure

```
thaigger/
├── backend/                    # Node.js/Express server
│   ├── config/                # Database configurations
│   ├── routes/                # API endpoints
│   ├── middleware/            # Authentication middleware
│   ├── models/                # Data models
│   ├── server.js              # Express server entry point
│   ├── setup-db.js            # Database schema setup
│   ├── seed-mongodb.js        # MongoDB sample data
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   ├── SETUP.md               # Backend setup guide
│   └── README.md              # Backend documentation
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (Auth)
│   │   ├── utils/             # API utilities and helpers
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── vite.config.js         # Vite build configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── package.json           # Frontend dependencies
│   └── README.md              # Frontend documentation
│
└── PROJECT_GUIDE.md           # This file
```

## Quick Start

### Prerequisites

- Node.js v14+
- npm or yarn
- MySQL Server (running locally or remote)
- MongoDB (running locally or remote)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
nano .env  # or use your preferred editor

# Setup MySQL database and tables
node setup-db.js

# Seed MongoDB with sample packages (optional)
node seed-mongodb.js

# Start the server
npm run dev  # Development with auto-reload
# or
npm start   # Production mode
```

The backend server will start on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user and get JWT token

### Packages (`/api/packages`)
- `GET /` - Get all packages
- `GET /:id` - Get package by ID

### Bookings (`/api/bookings`)
- `POST /` - Create booking (requires auth)
- `GET /` - Get user's bookings (requires auth)
- `GET /:id` - Get booking details (requires auth)

### Users (`/api/users`)
- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)

### Admin (`/api/admin`)
- `POST /packages` - Create package (admin only)
- `PUT /packages/:id` - Update package (admin only)
- `DELETE /packages/:id` - Delete package (admin only)
- `GET /bookings` - Get all bookings (admin only)
- `PUT /bookings/:id` - Update booking status (admin only)

## Database Schema

### MySQL Tables

**users**
- id, email, password, firstName, lastName, phone, role, createdAt, updatedAt

**bookings**
- id, userId, packageId, numberOfPeople, startDate, endDate, totalPrice, status, specialRequests, createdAt, updatedAt

**payments**
- id, bookingId, userId, amount, paymentMethod, transactionId, status, createdAt

**reviews**
- id, userId, packageId, rating, comment, createdAt

### MongoDB Collections

**packages**
- _id, name, description, destination, price, duration, image, highlights, accommodation, meals, createdAt, updatedAt

## Environment Configuration

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=thaigger_db

# MongoDB
MONGODB_URI=mongodb://localhost:27017/thaigger_travel

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Frontend (.env.local) - Optional

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Workflow

### Making Backend Changes

1. Edit files in `backend/` directory
2. With `npm run dev`, changes auto-reload
3. Test API endpoints using Postman or curl
4. Commit changes to git

### Making Frontend Changes

1. Edit files in `frontend/src/` directory
2. Changes hot-reload automatically
3. Test in browser at `http://localhost:3000`
4. Commit changes to git

### Database Changes

For schema changes:
1. Edit `backend/setup-db.js`
2. Run `node setup-db.js` to apply changes
3. Update relevant model files

For seed data:
1. Edit `backend/seed-mongodb.js`
2. Run `node seed-mongodb.js` to seed

## Authentication Flow

1. User registers with email and password
2. Password hashed with bcryptjs
3. User logs in and receives JWT token
4. Token stored in localStorage
5. Token sent in Authorization header for protected routes
6. Backend validates token signature and expiration
7. User data available in `useAuth()` context

## Testing the Application

### Test Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Packages

```bash
# Get all packages
curl http://localhost:5000/api/packages

# Get package by ID
curl http://localhost:5000/api/packages/{id}
```

### Test Protected Routes

```bash
# Get user profile (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/users/profile
```

## Deployment

### Backend Deployment (Heroku Example)

1. Create Heroku app
2. Set environment variables
3. Deploy from GitHub
4. MySQL and MongoDB must be accessible from Heroku

### Frontend Deployment (Vercel Example)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

### Alternative: Docker

Create Dockerfile for containerized deployment:

```dockerfile
# Backend Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

## Troubleshooting

### MySQL Connection Errors

- Ensure MySQL server is running
- Check credentials in .env
- Verify database user has proper permissions
- Test connection: `mysql -h localhost -u root -p`

### MongoDB Connection Errors

- Ensure MongoDB daemon is running
- Check connection string format
- Verify MongoDB user credentials if auth enabled
- Test: `mongosh` command line

### CORS Errors

- Backend CORS is enabled for all origins
- If needed, restrict in server.js middleware

### Token Expiration

- Tokens expire based on JWT_EXPIRE setting
- User must login again for new token
- Consider refresh token implementation

### Port Already in Use

- Change PORT in .env file
- Or kill process using the port

## Performance Optimization

### Backend

- Add database connection pooling
- Implement caching with Redis
- Add pagination for large datasets
- Add database indexes

### Frontend

- Code splitting with React.lazy()
- Image optimization
- Implement infinite scroll
- Add service workers for PWA

## Security Considerations

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ CORS configuration
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: Input validation
- ⚠️ TODO: SQL injection prevention
- ⚠️ TODO: XSS protection
- ⚠️ TODO: HTTPS enforcement

## Future Enhancements

### Phase 2
- Payment integration (Stripe/PayPal)
- Email notifications
- SMS alerts
- Advanced search and filtering

### Phase 3
- Real-time booking updates (WebSockets)
- Video support for packages
- Customer reviews and ratings
- Tour guide management

### Phase 4
- Mobile app (React Native)
- Multi-language support
- Analytics and reporting
- Machine learning recommendations

## Team Guidelines

### Code Style

- Use ES6+ syntax
- Functional components with hooks
- Meaningful variable names
- Add comments for complex logic

### Git Workflow

1. Create feature branch from main
2. Make changes and test locally
3. Commit with clear messages
4. Create pull request
5. Code review and merge

### Documentation

- Update README for major changes
- Add JSDoc comments for functions
- Keep API documentation updated
- Document environment variables

## Support & Resources

### Documentation
- Backend: `/backend/SETUP.md`
- Frontend: `/frontend/README.md`
- API Documentation: Use Postman for testing

### Development Resources
- Express.js: https://expressjs.com
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- MongoDB: https://docs.mongodb.com
- MySQL: https://dev.mysql.com/doc

## Contact

For questions or issues, please contact the development team or create an issue in the repository.

---

Last Updated: June 2024
