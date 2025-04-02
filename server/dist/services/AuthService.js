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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class AuthService {
    static registerUser(firstName, lastName, email, password, dateOfBirth, gender) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user already exists
            const existingUser = yield User_1.User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hash password
            const passwordHash = yield bcryptjs_1.default.hash(password, this.SALT_ROUNDS);
            // Create new user
            const user = new User_1.User({
                firstName,
                lastName,
                email,
                passwordHash,
                dateOfBirth,
                gender
            });
            yield user.save();
            // Generate JWT token
            const token = this.generateToken(user);
            return { user, token };
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user by email
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // Verify password
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }
            // Generate JWT token
            const token = this.generateToken(user);
            return { user, token };
        });
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ userId: user._id }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
    }
}
exports.AuthService = AuthService;
AuthService.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
AuthService.JWT_EXPIRES_IN = '24h';
AuthService.SALT_ROUNDS = 10;
