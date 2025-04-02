#!/bin/bash

# Remove duplicate server directory
rm -rf server/server

# Create proper directory structure
mkdir -p server/src/{models,services,middleware,routes,controllers}

# Install required dependencies
cd server && npm install dotenv @types/dotenv mongoose @types/mongoose express @types/express cors @types/cors helmet express-rate-limit socket.io @types/socket.io bcryptjs @types/bcryptjs jsonwebtoken @types/jsonwebtoken

