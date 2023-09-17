"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgottenPasswordRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};
const router = (0, express_1.Router)();
exports.forgottenPasswordRouter = router;
router.post('/api/users/forgotten-password', async (req, res) => {
    const { token, password } = req.body;
    const body = JSON.stringify({
        token: token,
        password: password
    });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/forgotten-password`, {
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
