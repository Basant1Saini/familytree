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
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = require("../models/User");
const FamilyService_1 = require("../services/FamilyService");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const router = express_1.default.Router();
// Test registration route
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Create test user
        const user = new User_1.User({
            firstName,
            lastName,
            email,
            password
        });
        yield user.save();
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });
    }
    catch (error) {
        next(new errorMiddleware_1.AppError(400, error.message));
    }
}));
// Protected test route - requires authentication
router.get('/protected', authMiddleware_1.authenticate, (req, res) => {
    res.json({
        status: 'success',
        data: {
            message: 'You have access to this protected route',
            user: req.user
        }
    });
});
// Test family connection
router.post('/family-connection', authMiddleware_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { relatedUserId, relationType } = req.body;
        const userId = req.user._id;
        const connection = yield FamilyService_1.FamilyService.addFamilyConnection(userId.toString(), relatedUserId, relationType);
        res.status(201).json({
            status: 'success',
            data: {
                connection
            }
        });
    }
    catch (error) {
        next(new errorMiddleware_1.AppError(400, error.message));
    }
}));
exports.default = router;
