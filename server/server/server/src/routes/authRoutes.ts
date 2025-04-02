import express from 'express';
import { login, register } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/me', authenticate, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: {
        _id: req.user?._id,
        firstName: req.user?.firstName,
        lastName: req.user?.lastName,
        email: req.user?.email
      }
    }
  });
});

export default router;

