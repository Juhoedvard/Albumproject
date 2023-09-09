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
exports.registerRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield importDynamic('node-fetch');
    return module.default(...args);
});
const router = (0, express_1.Router)();
exports.registerRouter = router;
router.post('/api/users/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password } = req.body;
    const body = JSON.stringify({ first_name, last_name, email, password });
    try {
        const registerResponse = yield fetch(`${process.env.API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body
        });
        const data = yield registerResponse.json();
        return res.status(registerResponse.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong, ${err}`
        });
    }
}));