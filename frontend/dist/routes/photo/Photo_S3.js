"use strict";
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
router.post('/api/album/add-thumbnail-s3', upload.single('thumbnail'), async (req, res) => {
    const s3 = (0, exports.s3ClientData)();
    const bucketname = process.env.AWS_BUCKET_NAME;
    const buffer = await (0, sharp_1.default)(req.file?.buffer).resize({ height: 1080, width: 1080, fit: 'contain' }).toBuffer();
    const key = (0, crypto_1.randomUUID)().toString();
    const bucketRegion = process.env.REGION;
    try {
        if (s3 && bucketname) {
            const params = {
                Bucket: bucketname,
                Key: key,
                Body: buffer,
                ContentType: req.file?.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            await s3.send(command);
            const imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`;
            return res.status(200).json(imageUrl);
        }
    }
    catch (err) {
        return res.status(500).json({ error: `something went wrong ${err}` });
    }
});
router.post('/api/album/add-photos-s3', upload.array('photo', 10), async (req, res) => {
    const s3 = (0, exports.s3ClientData)();
    console.log('s3 upload started');
    const bucketname = process.env.AWS_BUCKET_NAME;
    const bucketRegion = process.env.REGION;
    const files = req.files;
    if (s3 && req.files) {
        const uploadPromises = files.map(async (file) => {
            const buffer = await (0, sharp_1.default)(file.buffer).resize({ height: 1080, width: 1080, fit: 'contain' }).toBuffer();
            const key = (0, crypto_1.randomUUID)().toString();
            const params = {
                Bucket: bucketname,
                Key: key,
                Body: buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            console.log('Sending to s3');
            await s3.send(command);
            console.log('Send to s3:', key);
            return `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`;
        });
        try {
            const uploadedImageUrls = await Promise.all(uploadPromises);
            console.log(uploadedImageUrls);
            return res.status(200).json(uploadedImageUrls);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: `Something went wrong ${err}` });
        }
    }
});
router.delete('/api/album/remove-photo-s3', async (req, res) => {
    const s3 = (0, exports.s3ClientData)();
    const bucketname = process.env.AWS_BUCKET_NAME;
    const photoURLs = Array.isArray(req.body.photoURLs) ? req.body.photoURLs : [req.body.photoURLs];
    try {
        for (const photo of photoURLs) {
            const key = photo.split('/').slice(3).join('/');
            if (s3 && bucketname) {
                const params = {
                    Bucket: bucketname,
                    Key: key
                };
                const command = new client_s3_1.DeleteObjectCommand(params);
                s3.send(command);
            }
        }
        return res.status(200).json({ 'message': 'Succesfully deleted' });
    }
    catch (err) {
        return res.status(500).json({ error: `something went wrong removing photo ${err} ` });
    }
});
