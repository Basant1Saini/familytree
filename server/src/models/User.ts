import mongoose, { Schema, Document } from 'mongoose';
import { Gender } from '../types/enums';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  dateOfBirth?: Date;
  gender?: string;
  profilePicture?: string;
  biography?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: Object.values(Gender)
  },
  profilePicture: {
    type: String
  },
  biography: {
    type: String,
    maxLength: 1000
  },
  location: {
    type: String
  }
}, {
  timestamps: true
});

// Add index for email
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);

