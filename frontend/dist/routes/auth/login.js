"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};
const router = (0, express_1.Router)();
exports.loginRouter = router;
router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    const body = JSON.stringify({ email, password });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body
        });
        const data = await apiRes.json();
        if (apiRes.status === 200) {
            res.cookie('access', data.access, { httpOnly: true, maxAge: 1000 * 60 * 30, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' }),
                res.cookie('refresh', data.refresh, { httpOnly: true, maxAge: 1000 * 60 * 30 * 48, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
            return (res.status(200).json({ success: `Logged in successfully` }));
        }
        else {
            return res.status(apiRes.status).json(data);
        }
    }
    catch (err) {
        return res.status(500).json({
            error: 'Something went wrong when logging in'
        });
    }
});
