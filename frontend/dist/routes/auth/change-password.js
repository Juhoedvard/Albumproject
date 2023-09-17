"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};
const router = (0, express_1.Router)();
exports.changePasswordRouter = router;
router.post('/api/users/change-password', async (req, res) => {
    const access = req.cookies['access'];
    const { password, email } = req.body;
    const body = JSON.stringify({
        password: password,
        email: email
    });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/change-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body
        });
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        (err);
        return res.status(500).json({
            error: 'Something went wrong when resetting password'
        });
    }
});
