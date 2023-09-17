"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get('/api/users/me', async (req, res) => {
    const access = req.cookies['access'];
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            },
        });
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting user data, ${err}`
        });
    }
});
router.get('/api/users/get-profile', async (req, res) => {
    const { id } = req.query;
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/get-profile?id=${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting user data, ${err}`
        });
    }
});
