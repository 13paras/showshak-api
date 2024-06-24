"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const constants_1 = require("../constants");
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(`${config_1.config.MONGODB_URI}/${constants_1.DB_NAME}`);
        console.log(`\n Connected to MongoDB: ${connectionInstance.connection.host} \n`);
    }
    catch (error) {
        console.log("MONGODB CONNECTION FAILED !! ", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
