"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBody = exports.signinBody = exports.signupBody = void 0;
const zod_1 = require("zod");
const signupBody = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    date: zod_1.z.string().date(),
});
exports.signupBody = signupBody;
const signinBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
exports.signinBody = signinBody;
const updateBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .optional(),
});
exports.updateBody = updateBody;
