"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRouter = void 0;
const crypto_1 = require("crypto");
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};
const router = (0, express_1.Router)();
exports.resetPasswordRouter = router;
router.post('/api/users/send-password', async (req, res) => {
    const token = (0, crypto_1.randomUUID)();
    const email = req.body.email;
    const body = JSON.stringify({
        email: email,
        token: token
    });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/send-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: 'Something went wrong when resetting password'
        });
    }
});
