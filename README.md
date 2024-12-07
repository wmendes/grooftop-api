# Grooftop API

Internal API service for the Grooftop App - a platform for listing and booking unique rooftop spaces. This private repository contains the backend implementation built with NestJS, PostgreSQL, and Prisma.

## Features

- 🔐 **Authentication**: JWT-based authentication system
- 👤 **User Management**: Profile creation and updates
- 🏢 **Rooftop Listings**: Create, update, and search rooftop spaces
- 📅 **Booking System**: Manage rooftop space reservations
- ⭐ **Reviews**: Leave and manage reviews for rooftop experiences
- 📚 **API Documentation**: Swagger/OpenAPI documentation
- 🔒 **Security**: Request throttling and input validation
- ✨ **Clean Architecture**: Following NestJS best practices

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Set up environment variables:

```bash
cp .env.example .env
```

Required environment variables:

```bash
# Database connection URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/grooftop?schema=public"

# JWT configuration
JWT_SECRET="your-generated-secret-key"
JWT_EXPIRATION="24h"

# Application port
PORT=3000
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

## Running the Application

### Development

```bash
# Development mode
npm run start:dev

# Watch mode
npm run start:debug

# Production mode
npm run start:prod
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login to existing account

### Users
- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update current user profile

### Rooftops
- `POST /rooftops` - Create a new rooftop listing
- `GET /rooftops` - List all rooftops (with optional filters)
- `GET /rooftops/:id` - Get specific rooftop details
- `PATCH /rooftops/:id` - Update rooftop listing
- `DELETE /rooftops/:id` - Delete rooftop listing

### Bookings
- `POST /bookings` - Create a new booking
- `GET /bookings` - List user's bookings
- `GET /bookings/:id` - Get specific booking details
- `PATCH /bookings/:id` - Update booking status
- `DELETE /bookings/:id` - Cancel booking

### Reviews
- `POST /rooftops/:rooftopId/reviews` - Create a review
- `GET /rooftops/:rooftopId/reviews` - List rooftop reviews
- `PATCH /rooftops/:rooftopId/reviews/:id` - Update review
- `DELETE /rooftops/:rooftopId/reviews/:id` - Delete review

## Database Schema

The application uses PostgreSQL with Prisma as the ORM. Key models include:
- `User`: User accounts and profiles
- `Rooftop`: Rooftop space listings
- `Booking`: Reservation records
- `Review`: User reviews for rooftops

## Security Features

- JWT-based authentication
- Request rate limiting
- Input validation and sanitization
- Password hashing with bcrypt
- Protected routes with Guards

## Internal Development

This is a private repository for internal development of the Grooftop App. Please ensure you have the necessary permissions and credentials before setting up the development environment.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use of this code is strictly prohibited.
