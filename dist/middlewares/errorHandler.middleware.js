"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config/config");
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        status: err.statusCode,
        message: err.message,
        errorStack: config_1.config.NODE_ENV === 'development' ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
