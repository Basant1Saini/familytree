import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { AppError } from '../middleware/errorMiddleware';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        throw new AppError(400, 'Please provide all required fields');
      }

      const { user, token } = await AuthService.registerUser(
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender
      );

      // Remove sensitive data before sending response
      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profilePicture: user.profilePicture,
        biography: user.biography,
        location: user.location
      };

      res.status(201).json({
        status: 'success',
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(400, error.message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError(400, 'Please provide email and password');
      }

      const { user, token } = await AuthService.loginUser(email, password);

      // Remove sensitive data before sending response
      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        profilePicture: user.profilePicture,
        biography: user.biography,
        location: user.location
      };

      res.json({
        status: 'success',
        data: {
          user: userResponse,
          token
        }
      });
    } catch (error) {
      throw new AppError(401, 'Invalid credentials');
    }
  }
}

