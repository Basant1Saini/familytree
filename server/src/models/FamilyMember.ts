import mongoose, { Schema, Document } from 'mongoose';

export enum RelationType {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  SPOUSE = 'SPOUSE',
  SIBLING = 'SIBLING'
}

export interface IFamilyMember extends Document {
  user: mongoose.Types.ObjectId;
  relatedUser: mongoose.Types.ObjectId;
  relationType: RelationType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const familyMemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relationType: {
    type: String,
    enum: Object.values(RelationType),
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

familyMemberSchema.index({ user: 1, relatedUser: 1, relationType: 1 }, { unique: true });

export const FamilyMember = mongoose.model<IFamilyMember>('FamilyMember', familyMemberSchema);
