"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const http_errors_1 = __importDefault(require("http-errors"));
const config_1 = require("../config/config");
exports.verifyToken = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const error = (0, http_errors_1.default)(401, 'Unauthorized Request');
            return next(error);
        }
        const decodedTokenInfo = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET_KEY);
        const user = await user_model_1.User.findById(decodedTokenInfo?.userId);
        if (!user) {
            const error = (0, http_errors_1.default)(401, 'Invalid Token');
            return next(error);
        }
        req.user = user;
        next();
    }
    catch (error) {
        const err = (0, http_errors_1.default)(401, error?.message || 'Invalid Access Token');
        return next(err);
    }
});
