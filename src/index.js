"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const app_1 = require("./infrastructure/config/app");
const database_1 = __importDefault(require("./infrastructure/config/database"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
app_1.app.use((0, morgan_1.default)("combined"));
app_1.app.use('/', (req, res) => {
    res.send('welcome');
});
app_1.app.listen(PORT, () => {
    logger_1.default.info(`server connected on http://localhost:${PORT}`);
    (0, database_1.default)();
});
