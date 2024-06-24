"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// "_" this is to tell  that it is a private variable
const _config = {
    PORT: process.env.PORT || 7000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
exports.config = Object.freeze(_config); // it means it is read only and with freeze we can't do anything with this
