import { FamilyMember, RelationType, IFamilyMember } from '../models/FamilyMember';
import { AppError } from '../middleware/errorMiddleware';

export class FamilyService {
  static async addFamilyConnection(
    userId: string,
    relatedUserId: string,
    relationType: RelationType
  ): Promise<IFamilyMember> {
    try {
      const connection = await FamilyMember.create({
        user: userId,
        relatedUser: relatedUserId,
        relationType
      });

      return connection;
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, 'Failed to create family connection');
    }
  }

  static async getFamilyMembers(userId: string): Promise<IFamilyMember[]> {
    return FamilyMember.find({ user: userId, isActive: true })
      .populate('relatedUser', 'firstName lastName email');
  }

  static async removeFamilyConnection(connectionId: string, userId: string): Promise<void> {
    const connection = await FamilyMember.findOneAndUpdate(
      { _id: connectionId, user: userId },
      { isActive: false },
      { new: true }
    );

    if (!connection) {
      throw new AppError(404, 'Family connection not found');
    }
  }
}

