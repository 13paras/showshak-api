"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUserProfile = exports.logoutUser = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../models/user.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const generateToken_1 = require("../utils/generateToken");
const getUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            const error = (0, http_errors_1.default)(401, 'Invalid Id');
            return next(error);
        }
        const user = await user_model_1.User.findById(id);
        if (!user) {
            const error = (0, http_errors_1.default)(401, 'User not found');
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
// 'api/v1/user/register' => POST
const registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const body = req.body;
        if (!body) {
            const error = (0, http_errors_1.default)(400, 'Invalid user data');
            return next(error);
        }
        const existedUser = await user_model_1.User.findOne({ email: body.email });
        if (existedUser) {
            const error = (0, http_errors_1.default)(400, 'User already existed');
            return next(error);
        }
        const user = await user_model_1.User.create(body);
        if (user) {
            const token = (0, generateToken_1.generateToken)(res, user._id);
            res.status(200).json({
                message: 'User Created Successfully',
                id: user._id,
                token: token,
            });
        }
        else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
// 'api/v1/user/login' => POST
const loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const body = req.body;
        if (!body) {
            const error = (0, http_errors_1.default)(400, 'Invalid user data');
            return next(error);
        }
        const user = await user_model_1.User.findOne({ email: body.email });
        if (user && (await user.matchPassword(body.password))) {
            const jwtToken = (0, generateToken_1.generateToken)(res, user._id);
            // console.log(jwtToken);
            return res.status(200).json({
                message: 'User Logged In Successfully',
                id: user._id,
                token: jwtToken,
            });
        }
        else {
            const error = (0, http_errors_1.default)(400, 'Invalid email or password');
            return next(error);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
// 'api/v1/user/profile' => PUT
//  ! Update this for password
//  Here in this we're getting "req.user" from auth middleware (verifyToken).
/* const updateUser = asyncHandler(async (req: CustomRequest, res, next) => {
  try {
    const body = req.body;
    const validatedResult = updateBody.safeParse(body);

    if (!validatedResult.success) {
      const error = createHttpError(401, validatedResult.error);
      return next(error);
    }

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      {
        $set: {
          name: body.name,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: 'User updated successfully',
      data: {
        // _id: user?.id,
      },
    });

    // Check if updateUser exists before sending response
  } catch (error) {
    console.log(error);
  }
}); */
// 'api/v1/user/profile' => GET
const getUserProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await user_model_1.User.findById(req.user?.id);
    res.status(200).json({
        message: 'User fetched successfully',
        data: {
            _id: user?.id,
            email: user?.email,
        },
    });
});
exports.getUserProfile = getUserProfile;
const logoutUser = (0, asyncHandler_1.asyncHandler)(async (_, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
    });
    res.status(200).json({
        message: 'User logged out',
    });
});
exports.logoutUser = logoutUser;
const updateUser = '';
exports.updateUser = updateUser;
