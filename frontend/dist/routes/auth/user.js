"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield importDynamic('node-fetch');
    return module.default(...args);
});
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get('/api/users/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const access = req.cookies['access'];
    try {
        const apiRes = yield fetch(`${process.env.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            },
        });
        const data = yield apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting user data, ${err}`
        });
    }
}));
router.get('/api/users/get-profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const apiRes = yield fetch(`${process.env.API_URL}/api/users/get-profile?id=${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const data = yield apiRes.json();
        return res.status(apiRes.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting user data, ${err}`
        });
    }
}));
