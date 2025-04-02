# Family Network Backend

Backend service for the Family Network application, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User Authentication (Register/Login)
- Family Relationship Management
- Real-time Updates with Socket.IO
- JWT-based Authorization
- Rate Limiting
- Security Middleware

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)

### Family

- POST `/api/family/members` - Add a family connection (Protected)
- GET `/api/family/members` - Get all family members (Protected)
- DELETE `/api/family/members/:id` - Remove a family connection (Protected)

### Test Routes (Development Only)

- POST `/api/test/register` - Test user registration
- GET `/api/test/protected` - Test protected route
- POST `/api/test/family-connection` - Test family connection

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create .env file in the root directory:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/family-network
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:5173
```

3. Run development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/family-network |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | JWT expiration time | 24h |
| CLIENT_URL | Frontend application URL | http://localhost:5173 |

