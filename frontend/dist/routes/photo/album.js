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
exports.albumRouter = void 0;
const express_1 = require("express");
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield importDynamic('node-fetch');
    return module.default(...args);
});
const router = (0, express_1.Router)();
exports.albumRouter = router;
router.post('/api/album/create-album', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const access = req.cookies['access'];
    const { title, description, image } = req.body;
    const body = JSON.stringify({ title: title, description: description, thumbnail: image });
    console.log(body, 'second body');
    try {
        const AlbumResponse = yield fetch(`${process.env.API_URL}/api/album/create-album`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body: body,
        });
        const data = yield AlbumResponse.json();
        return res.status(AlbumResponse.status).json(data);
    }
    catch (err) {
        console.log('error', err);
        return res.status(500).json({
            error: `something went wrong ${err}`
        });
    }
}));
router.get('/api/album/albums', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiRes = yield fetch(`${process.env.API_URL}/api/album/albums`, {
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
            error: `Something went wrong when getting  data, ${err}`
        });
    }
}));
