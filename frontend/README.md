# Thaigger Travel Frontend

A modern React-based frontend for the Thaigger travel booking application built with Vite, Tailwind CSS, and React Router.

## Technology Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer)
│   ├── pages/           # Page components
│   ├── context/         # React Context (Auth)
│   ├── utils/           # Utility functions (API calls)
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env.local` file (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

Start the development server:

```bash
npm run dev
```

The app will run on `http://localhost:3000` with hot module replacement (HMR).

## Build

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Pages

### Public Pages

- **Home** (`/`) - Landing page with features and destinations
- **Packages** (`/packages`) - Browse all travel packages
- **Package Detail** (`/packages/:id`) - View package details and book
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration

### Protected Pages

- **Dashboard** (`/dashboard`) - User dashboard showing bookings
- **Admin Dashboard** (`/admin`) - Admin panel for managing packages and bookings

## Components

### Navbar

Navigation bar with:
- Logo and branding
- Navigation links
- User authentication controls
- Mobile responsive menu

### Footer

Footer with:
- Company info
- Quick links
- Social media links
- Legal links

## Features

### Authentication

- User registration and login
- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Role-based access control

### Packages

- Browse all travel packages
- View package details
- Search and filter capabilities (ready to implement)
- Real-time pricing

### Bookings

- Create new bookings
- View booking history
- Track booking status
- Special requests

### Admin Panel

- View all bookings
- Update booking status
- Create travel packages
- Edit/Delete packages
- Manage package pricing

## API Integration

The frontend integrates with the backend API. Update the `API_BASE_URL` in `src/utils/api.js` if needed.

### Available API Methods

```javascript
// Auth
authAPI.register(data)
authAPI.login(data)

// Packages
packagesAPI.getAll()
packagesAPI.getById(id)

// Bookings
bookingsAPI.create(data)
bookingsAPI.getAll()
bookingsAPI.getById(id)

// Users
usersAPI.getProfile()
usersAPI.updateProfile(data)

// Admin
adminAPI.createPackage(data)
adminAPI.updatePackage(id, data)
adminAPI.deletePackage(id)
adminAPI.getAllBookings()
adminAPI.updateBookingStatus(id, data)
```

## Authentication Context

The app uses React Context for authentication state management:

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, token, login, logout } = useAuth();
  // ...
}
```

## Styling

### Tailwind Configuration

Color scheme:
- Primary: Blue (#3b82f6)
- Accent: Amber (#f59e0b)
- Dark: Gray (#1f2937)
- Light: Off-white (#f9fafb)

### Custom CSS

Global styles are defined in `src/index.css` including:
- Base element styles
- Animations
- Custom scrollbar styling

## Environment Variables

Optional environment variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

By default, it connects to `http://localhost:5000/api`

## Deployment

### Building for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms

Build the app and deploy the `dist/` directory to:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Any static hosting service

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:
1. Backend is running on `http://localhost:5000`
2. Backend has CORS enabled
3. `REACT_APP_API_URL` is correctly set

### Authentication Issues

- Clear localStorage if having login issues
- Check browser console for error messages
- Verify backend is running and accessible

### Hot Reload Not Working

- Restart the dev server
- Clear node_modules and reinstall
- Check Vite configuration

## Next Steps

1. Add search and filtering for packages
2. Implement payment integration (Stripe)
3. Add review and rating system
4. Implement user notifications
5. Add advanced admin analytics
6. Setup automated testing
7. Optimize images and performance
8. Add PWA capabilities

## Support

For issues or questions, please contact the development team or create an issue in the repository.
