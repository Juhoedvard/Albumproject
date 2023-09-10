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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRouter = exports.s3ClientData = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const s3ClientData = () => {
    const accessKeyID = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_KEY;
    const bucketRegion = process.env.REGION;
    if (accessKeyID && secretAccessKey && bucketRegion) {
        const s3 = new client_s3_1.S3Client({
            apiVersion: '2006-03-01',
            region: bucketRegion,
            credentials: {
                accessKeyId: accessKeyID,
                secretAccessKey: secretAccessKey
            },
        });
        return s3;
    }
    return;
};
exports.s3ClientData = s3ClientData;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage
});
const router = (0, express_1.Router)();
exports.photoRouter = router;
/// https://www.youtube.com/watch?v=eQAIojcArRY&t=258s&ab_channel=SamMeech-Ward 28:46. Keksi miten djangolla tallentaa kuva, josas tekijä on user
router.post('/api/album/add-thumbnail-s3', upload.single('thumbnail'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const s3 = (0, exports.s3ClientData)();
    const bucketname = process.env.AWS_BUCKET_NAME;
    const buffer = yield (0, sharp_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer).resize({ height: 1080, width: 1080, fit: 'contain' }).toBuffer();
    const key = (0, crypto_1.randomUUID)().toString();
    const bucketRegion = process.env.REGION;
    try {
        if (s3 && bucketname) {
            const params = {
                Bucket: bucketname,
                Key: key,
                Body: buffer,
                ContentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            };
            (req.file);
            const command = new client_s3_1.PutObjectCommand(params);
            yield s3.send(command);
            const imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`;
            return res.status(200).json(imageUrl);
        }
    }
    catch (err) {
        return res.status(500).json({ error: `something went wrong ${err}` });
    }
}));
router.post('/api/album/add-photos-s3', upload.array('photo', 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = (0, exports.s3ClientData)();
    const bucketname = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.REGION;
    try {
        if (s3 && bucketname && req.files) {
            const uploadedImageUrls = [];
            if (Array.isArray(req.files)) {
                for (const file of req.files) {
                    const buffer = yield (0, sharp_1.default)(file.buffer).resize({ height: 1080, width: 1080, fit: 'contain' }).toBuffer();
                    const key = (0, crypto_1.randomUUID)().toString();
                    const params = {
                        Bucket: bucketname,
                        Key: key,
                        Body: buffer,
                        ContentType: file === null || file === void 0 ? void 0 : file.mimetype,
                    };
                    const command = new client_s3_1.PutObjectCommand(params);
                    yield s3.send(command);
                    const imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`;
                    uploadedImageUrls.push(imageUrl);
                }
            }
            return res.status(200).json(uploadedImageUrls);
        }
    }
    catch (err) {
        return res.status(500).json({ error: `something went wrong ${err}` });
    }
}));
