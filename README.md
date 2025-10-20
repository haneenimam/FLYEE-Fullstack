# Booking Interface

A modern, full-stack booking interface built with Next.js (React) frontend and Node.js + Express backend. This application provides a clean, user-friendly interface for creating, viewing, and managing bookings.

## Features

### Frontend (Next.js)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Booking Form**: Intuitive form with validation and real-time availability checking
- **Booking Management**: View, edit, and delete bookings with status management
- **Real-time Updates**: Automatic refresh of booking lists
- **Mobile Responsive**: Works seamlessly on all device sizes

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints for all booking operations
- **Data Validation**: Comprehensive input validation using express-validator
- **Conflict Prevention**: Prevents double-booking of time slots
- **Error Handling**: Robust error handling with meaningful messages
- **CORS Support**: Configured for cross-origin requests

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **dotenv** - Environment variable management

## Project Structure

```
booking-interface/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages and layouts
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable React components
│   │   ├── BookingForm.tsx  # Booking creation form
│   │   └── BookingList.tsx  # Booking management list
│   ├── lib/                 # Utility functions and API client
│   │   └── api.ts          # API client with TypeScript interfaces
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── next.config.js      # Next.js configuration
├── backend/                 # Node.js backend application
│   ├── server.js           # Express server and API routes
│   ├── config.js           # Configuration settings
│   └── package.json        # Backend dependencies
├── package.json            # Root package.json with scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booking-interface
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers concurrently.

### Alternative Setup

If you prefer to run the servers separately:

1. **Start the backend server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start the frontend server** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Availability
- `GET /api/availability/:date` - Get available time slots for a date

### Health Check
- `GET /api/health` - API health status

## Usage

### Creating a Booking
1. Navigate to the home page
2. Fill out the booking form with:
   - Personal information (name, email, phone)
   - Date and time selection
   - Service type
   - Optional notes
3. Click "Create Booking" to submit

### Managing Bookings
1. Click "View Bookings" to see all bookings
2. Use the status dropdown to update booking status
3. Click the eye icon to view booking details
4. Click the trash icon to delete a booking

### Available Services
- Consultation
- Treatment
- Follow-up
- Emergency
- Other

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to connect to the backend API. The API URL can be customized in `frontend/next.config.js`:

```javascript
env: {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
}
```

## Development

### Available Scripts

**Root level:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install:all` - Install dependencies for all projects
- `npm run build` - Build the frontend for production
- `npm start` - Start the backend in production mode

**Frontend:**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

### Data Storage

Currently, the application uses in-memory storage for simplicity. In a production environment, you would want to:

1. Replace the in-memory array with a proper database (MongoDB, PostgreSQL, etc.)
2. Add authentication and authorization
3. Implement proper session management
4. Add data persistence and backup strategies

## Production Deployment

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `frontend/.next` folder to your hosting service
3. Configure environment variables for production API URL

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure database connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
