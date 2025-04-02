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

    const connection = await FamilyService.addFamilyConnection(
      req.user!._id.toString(),
      relatedUserId,
      relationType
    );

    res.status(201).json({
      status: 'success',
      data: { connection }
    });
  } catch (error: any) {
    next(new AppError(400, error.message));
  }
});

router.get('/members', async (req, res, next) => {
  try {
    const members = await FamilyService.getFamilyMembers(req.user!._id.toString());
    res.json({
      status: 'success',
      data: { members }
    });
  } catch (error: any) {
    next(new AppError(400, error.message));
  }
});

router.delete('/members/:id', async (req, res, next) => {
  try {
    await FamilyService.removeFamilyConnection(req.params.id, req.user!._id.toString());
    res.status(204).send();
  } catch (error: any) {
    next(new AppError(400, error.message));
  }
});

export default router;

