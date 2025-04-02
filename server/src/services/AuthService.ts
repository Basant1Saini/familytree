import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly JWT_EXPIRES_IN = '24h';
  private static readonly SALT_ROUNDS = 10;

  static async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dateOfBirth?: Date,
    gender?: string
  ): Promise<{ user: IUser; token: string }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      dateOfBirth,
      gender
    });

    await user.save();

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  static async loginUser(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  private static generateToken(user: IUser): string {
    return jwt.sign(
      { userId: user._id },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }
}

