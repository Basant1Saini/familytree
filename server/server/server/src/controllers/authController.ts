import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../middleware/errorMiddleware';
import config from '../config';

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, 'Email already registered');
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(400, error.message));
    } else {
      next(new AppError(400, 'Registration failed'));
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError(401, 'Invalid email or password');
    }

    const token = generateToken(user._id);

    res.json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(401, error.message));
    } else {
      next(new AppError(401, 'Login failed'));
    }
  }
};

