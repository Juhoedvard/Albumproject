"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.logoutRouter = router;
router.get('/api/users/logout', (req, res) => {
    res.cookie('access', '', { httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: process.env.NODE_ENV === 'production' }),
        res.cookie('refresh', '', { httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    return res.status(200).json({ success: 'Logout succesfull' });
});
