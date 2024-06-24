"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
exports.router = router;
// POST - create user
// POST - get user
// PUT - update user
// GET - get user
// POST - logout user
router.get('/:id', user_controller_1.getUser);
router.post('/register', user_controller_1.registerUser);
router.post('/login', user_controller_1.loginUser);
router.post('/logout', user_controller_1.logoutUser);
router
    .route('/profile')
    // .put(verifyToken, updateUser)
    .get(auth_middleware_1.verifyToken, user_controller_1.getUserProfile);
