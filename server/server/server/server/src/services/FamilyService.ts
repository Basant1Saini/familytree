import { FamilyMember, RelationType, IFamilyMember } from '../models/FamilyMember';
import { AppError } from '../middleware/errorMiddleware';
import mongoose from 'mongoose';

export class FamilyService {
  static async addFamilyConnection(
    userId: string,
    relatedUserId: string,
    relationType: RelationType
  ): Promise<IFamilyMember> {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(relatedUserId)) {
        throw new AppError(400, 'Invalid user ID format');
      }

      const connection = await FamilyMember.create({
        user: userId,
        relatedUser: relatedUserId,
        relationType
      });

      return connection;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, 'Failed to create family connection');
    }
  }

  static async getFamilyMembers(userId: string): Promise<IFamilyMember[]> {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(400, 'Invalid user ID format');
      }

      return await FamilyMember.find({ user: userId, isActive: true })
        .populate('relatedUser', 'firstName lastName email');
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, 'Failed to fetch family members');
    }
  }

  static async removeFamilyConnection(connectionId: string, userId: string): Promise<void> {
    try {
      if (!mongoose.Types.ObjectId.isValid(connectionId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(400, 'Invalid ID format');
      }

      const connection = await FamilyMember.findOneAndUpdate(
        { _id: connectionId, user: userId },
        { isActive: false },
        { new: true }
      );

      if (!connection) {
        throw new AppError(404, 'Family connection not found');
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, 'Failed to remove family connection');
    }
  }
}

