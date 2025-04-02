import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { User } from '../models/User';
import { FamilyService } from '../services/FamilyService';
import { RelationType } from '../models/FamilyMember';
import { AppError } from '../middleware/errorMiddleware';

const router = express.Router();

// Test registration route
router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Create test user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(new AppError(400, error.message));
  }
});

// Protected test route - requires authentication
router.get('/protected', authenticate, (req, res) => {
  res.json({
    status: 'success',
    data: {
      message: 'You have access to this protected route',
      user: req.user
    }
  });
});

// Test family connection
router.post('/family-connection', authenticate, async (req, res, next) => {
  try {
    const { relatedUserId, relationType } = req.body;
    const userId = req.user._id;

    const connection = await FamilyService.addFamilyConnection(
      userId.toString(),
      relatedUserId,
      relationType as RelationType
    );

    res.status(201).json({
      status: 'success',
      data: {
        connection
      }
    });
  } catch (error) {
    next(new AppError(400, error.message));
  }
});

export default router;

