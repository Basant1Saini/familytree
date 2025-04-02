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

// Index for faster queries
familyMemberSchema.index({ user: 1, relatedUser: 1, relationType: 1 }, { unique: true });

export const FamilyMember = mongoose.model<IFamilyMember>('FamilyMember', familyMemberSchema);

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
  relationStartDate?: Date;
  relationEndDate?: Date;
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
  relationStartDate: {
    type: Date
  },
  relationEndDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add compound index for unique relationships
familyMemberSchema.index({ user: 1, relatedUser: 1, relationType: 1 }, { unique: true });

// Add indexes for efficient querying
familyMemberSchema.index({ user: 1, isActive: 1 });
familyMemberSchema.index({ relatedUser: 1, isActive: 1 });

export const FamilyMember = mongoose.model<IFamilyMember>('FamilyMember', familyMemberSchema);

