"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const register_1 = require("./routes/auth/register");
const login_1 = require("./routes/auth/login");
const user_1 = require("./routes/auth/user");
const logout_1 = require("./routes/auth/logout");
const verify_1 = require("./routes/auth/verify");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const send_password_1 = require("./routes/auth/send-password");
const forgotten_password_1 = require("./routes/auth/forgotten-password");
const change_password_1 = require("./routes/auth/change-password");
const album_1 = require("./routes/photo/album");
const addPhoto_1 = require("./routes/photo/addPhoto");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins,
    credentials: true,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(options));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(register_1.registerRouter);
app.use(login_1.loginRouter);
app.use(user_1.userRouter);
app.use(logout_1.logoutRouter);
app.use(verify_1.verifyRouter);
app.use(send_password_1.resetPasswordRouter);
app.use(forgotten_password_1.forgottenPasswordRouter);
app.use(change_password_1.changePasswordRouter);
app.use(album_1.albumRouter);
app.use(addPhoto_1.photoRouter);
app.get("*", (req, res) => {
    return res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
