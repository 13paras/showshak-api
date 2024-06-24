"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
/* app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true,
  })
); */
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
// Router
const user_routes_1 = require("./routes/user.routes");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
app.get('/', (req, res) => {
    res.send("Hey it's working!!");
});
app.use('/api/v1/user', user_routes_1.router);
// Error Handlers
app.use(errorHandler_middleware_1.globalErrorHandler);
