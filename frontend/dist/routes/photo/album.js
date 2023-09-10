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
    const { title, description, thumbnail } = req.body;
    const body = JSON.stringify({ title: title, description: description, thumbnail: thumbnail });
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
        return res.status(500).json({
            error: `something went wrong ${err}`
        });
    }
}));
router.post('/api/album/add-photos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ('Lisätään kuvia!');
    const access = req.cookies['access'];
    const body = req.body;
    try {
        const PhotoResponse = yield fetch(`${process.env.API_URL}/api/album/add-photos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify(body),
        });
        const data = yield PhotoResponse.json();
        (data);
        return res.status(PhotoResponse.status).json(data);
    }
    catch (err) {
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
        (err);
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        });
    }
}));
router.post('/api/album/likephoto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const access = req.cookies['access'];
    const body = req.body;
    try {
        const PhotoResponse = yield fetch(`${process.env.API_URL}/api/album/likephoto`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify(body),
        });
        const data = yield PhotoResponse.json();
        return res.status(PhotoResponse.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        });
    }
}));
router.get('/api/album/getPhotoLikes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const PhotoResponse = yield fetch(`${process.env.API_URL}/api/album/getPhotoLikes/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = yield PhotoResponse.json();
        return res.status(PhotoResponse.status).json(data);
    }
    catch (err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        });
    }
}));
