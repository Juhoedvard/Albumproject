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
exports.resetPasswordRouter = void 0;
const crypto_1 = require("crypto");
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield importDynamic('node-fetch');
    return module.default(...args);
});
const router = (0, express_1.Router)();
exports.resetPasswordRouter = router;
router.post('/api/users/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, crypto_1.randomUUID)();
    const email = req.body.email;
    const body = JSON.stringify({
        email: email,
        token: token
    });
    try {
        const apiRes = yield fetch(`${process.env.API_URL}/api/users/reset-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });
        yield apiRes.json();
        return res.status(apiRes.status).json(token);
    }
    catch (err) {
        return res.status(500).json({
            error: 'Something went wrong when resetting password'
        });
    }
}));
