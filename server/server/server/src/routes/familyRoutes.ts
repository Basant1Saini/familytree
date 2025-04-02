import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { FamilyService } from '../services/FamilyService';
import { AppError } from '../middleware/errorMiddleware';
import { RelationType } from '../models/FamilyMember';

const router = express.Router();

router.use(authenticate);

router.post('/members', async (req, res, next) => {
  try {
    const { relatedUserId, relationType } = req.body;
    
    if (!Object.values(RelationType).includes(relationType)) {
      throw new AppError(400, 'Invalid relation type');
    }

    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const connection = await FamilyService.addFamilyConnection(
      req.user._id.toString(),
      relatedUserId,
      relationType
    );

    res.status(201).json({
      status: 'success',
      data: { connection }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

router.get('/members', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const members = await FamilyService.getFamilyMembers(req.user._id.toString());
    res.json({
      status: 'success',
      data: { members }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

router.delete('/members/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    await FamilyService.removeFamilyConnection(req.params.id, req.user._id.toString());
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

export default router;

import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { FamilyService } from '../services/FamilyService';
import { AppError } from '../middleware/errorMiddleware';
import { RelationType } from '../models/FamilyMember';

const router = express.Router();

router.use(authenticate);

router.post('/members', async (req, res, next) => {
  try {
    const { relatedUserId, relationType } = req.body;
    
    if (!Object.values(RelationType).includes(relationType)) {
      throw new AppError(400, 'Invalid relation type');
    }

    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const connection = await FamilyService.addFamilyConnection(
      req.user._id.toString(),
      relatedUserId,
      relationType
    );

    res.status(201).json({
      status: 'success',
      data: { connection }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

router.get('/members', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const members = await FamilyService.getFamilyMembers(req.user._id.toString());
    res.json({
      status: 'success',
      data: { members }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

router.delete('/members/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    await FamilyService.removeFamilyConnection(req.params.id, req.user._id.toString());
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'An error occurred'));
    }
  }
});

export default router;

