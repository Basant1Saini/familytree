"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const familyRoutes_1 = __importDefault(require("./routes/familyRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const config_1 = __importDefault(require("./config"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: config_1.default.client.url,
        methods: ['GET', 'POST']
    }
});
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/family', familyRoutes_1.default);
// Test routes (only for development)
if (config_1.default.server.nodeEnv === 'development') {
    app.use('/api/test', testRoutes_1.default);
    console.log('Test routes enabled in development mode');
}
// Basic route
app.get('/', (_req, res) => {
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
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
// MongoDB connection
mongoose_1.default.connect(config_1.default.database.uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Start server
const PORT = config_1.default.server.port;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
