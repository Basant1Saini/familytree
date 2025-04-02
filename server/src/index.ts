import express, { Express } from 'express';
import type { Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import familyRoutes from './routes/familyRoutes';
import testRoutes from './routes/testRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import config from './config';

// Load environment variables
dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.client.url,
    methods: ['GET', 'POST']
  }
});

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);

// Test routes (only for development)
if (config.server.nodeEnv === 'development') {
  app.use('/api/test', testRoutes);
  console.log('Test routes enabled in development mode');
}
// Basic route
app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ message: 'Family Network API is running' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(config.database.uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = config.server.port;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

