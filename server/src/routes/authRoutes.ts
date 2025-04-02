import express from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Example protected route
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;

