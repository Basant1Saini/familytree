"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;
                // Validate required fields
                if (!firstName || !lastName || !email || !password) {
                    throw new errorMiddleware_1.AppError(400, 'Please provide all required fields');
                }
                const { user, token } = yield AuthService_1.AuthService.registerUser(firstName, lastName, email, password, dateOfBirth, gender);
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
            }
            catch (error) {
                if (error instanceof errorMiddleware_1.AppError) {
                    throw error;
                }
                throw new errorMiddleware_1.AppError(400, error.message);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new errorMiddleware_1.AppError(400, 'Please provide email and password');
                }
                const { user, token } = yield AuthService_1.AuthService.loginUser(email, password);
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
            }
            catch (error) {
                throw new errorMiddleware_1.AppError(401, 'Invalid credentials');
            }
        });
    }
}
exports.AuthController = AuthController;
