# Family Network

[Previous introduction remains the same...]

## Features

[Previous features remain and new ones added:]
- **Real-time Communication:**
    - Live notifications for friend and family requests
    - Family chat system with group conversations
    - Real-time updates for family tree changes
- **Event Management:**
    - Family event calendar with reminders
    - Birthday and anniversary notifications
    - Event photo sharing and collections
- **Media Management:**
    - Family photo galleries with sharing controls
    - Document storage for family records
    - Memory timeline features
- **Mobile & Accessibility:**
    - Responsive design for all devices
    - Progressive Web App (PWA) support
    - Accessibility compliance (WCAG 2.1)

## Tech Stack

### Frontend
- React.js 18+ with TypeScript
- Tailwind CSS for styling
- Redux Toolkit for state management
- React Router v6 for navigation
- Socket.io client for real-time features
- Jest & React Testing Library

### Backend
- Node.js (v18+) with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT & OAuth2 authentication
- Socket.io for real-time communication

### DevOps & Tools
- Docker & Docker Compose
- CI/CD with GitHub Actions
- ESLint & Prettier
- Husky for git hooks

## Project Structure
```
family-network/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   ├── pages/         # Route components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store configuration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles
│   ├── public/
│   └── tests/             # Frontend tests
├── server/                 # Backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Helper functions
│   └── tests/             # Backend tests
├── docker/                # Docker configuration
└── docs/                  # Documentation
```

## Prerequisites
- Node.js v18 or later
- npm v8 or later
- MongoDB v6 or later
- Docker (optional)

## Development

### Environment Setup
```bash
# Frontend (.env.local)
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# Backend (.env)
PORT=8000
MONGODB_URI=mongodb://localhost:27017/family-network
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Running for Development
```bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
```

## Testing
```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## API Documentation
- Authentication endpoints (/auth/*)
- User management (/users/*)
- Family tree operations (/family/*)
- Social networking features (/social/*)
- Media management (/media/*)

## Deployment

### Using Docker
```bash
docker-compose up -d
```

### Manual Deployment
[Steps for manual deployment to production]

## Performance Considerations
- Image optimization guidelines
- Caching strategies
- Database indexing
- API rate limiting

[Previous Contributing section remains the same...]

[Previous License section remains the same...]
