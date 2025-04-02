#!/bin/bash

# Check if MongoDB is running
echo "Checking MongoDB connection..."
mongosh --eval "db.serverStatus()" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "MongoDB is running"
else
    echo "Error: MongoDB is not running. Please start MongoDB first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOL
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/family-network
JWT_SECRET=dev-jwt-secret-change-in-production
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:5173
EOL
fi

# Start the development server
echo "Starting development server..."
npm run dev

