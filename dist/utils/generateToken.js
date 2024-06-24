"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, config_1.config.JWT_SECRET_KEY, {
        expiresIn: '1D',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: config_1.config.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return token;
};
exports.generateToken = generateToken;
