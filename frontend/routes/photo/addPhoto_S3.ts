import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Router,  Request, Response } from 'express';
import multer, { Multer } from 'multer'
import sharp from 'sharp'
///video 20:41
export const s3ClientData = () => {

    const accessKeyID = process.env.ACCESS_KEY
    const secretAccessKey = process.env.SECRET_KEY
    const bucketRegion = process.env.REGION
    if(accessKeyID && secretAccessKey && bucketRegion) {
        const s3 = new S3Client({
            apiVersion: '2006-03-01',
            region: bucketRegion,
            credentials: {
                accessKeyId: accessKeyID,
                secretAccessKey: secretAccessKey
            },
        })
        return s3
    }
    return
}
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})


const router = Router();



/// https://www.youtube.com/watch?v=eQAIojcArRY&t=258s&ab_channel=SamMeech-Ward 28:46. Keksi miten djangolla tallentaa kuva, josas tekijä on user
router.post('/api/album/add-thumbnail-s3', upload.single('thumbnail'),  async (req: Request, res: Response) => {


    const s3 = s3ClientData();
    const bucketname = process.env.AWS_BUCKET_NAME
    const buffer = await sharp(req.file?.buffer).resize({height: 1080, width: 1080, fit:'contain' }).toBuffer()
    const key = randomUUID().toString()
    const bucketRegion = process.env.REGION
    try {
        if (s3 && bucketname) {

            const params = {
                Bucket: bucketname,
                Key: key,
                Body: buffer,
                ContentType: req.file?.mimetype,

            };
            console.log(req.file)
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const  imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`
            return res.status(200).json(imageUrl)
        }


    }catch(err) {
        return res.status(500).json({error: `something went wrong ${err}`})
    }
})

router.post('/api/album/add-photos-s3', upload.array('photo', 10),  async (req: Request, res: Response) => {


    console.log(typeof req.files)
    const s3 = s3ClientData();
    console.log('täällä')
    const bucketname = process.env.AWS_BUCKET_NAME
    const bucketRegion = process.env.REGION

    try {
        if (s3 && bucketname && req.files) {
            const uploadedImageUrls: string[] = [];

            if(Array.isArray(req.files)) {
                console.log('on array')
                 for ( const file of req.files) {
                    const buffer = await sharp(file.buffer).resize({height: 1080, width: 1080, fit:'contain' }).toBuffer()
                    const key = randomUUID().toString()

                    const params = {
                                    Bucket: bucketname,
                                    Key: key,
                                    Body: buffer,
                                    ContentType: file?.mimetype,

                                };
                    const command = new PutObjectCommand(params);
                    await s3.send(command);
                    console.log('lisätty')
                    const  imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`
                    uploadedImageUrls.push(imageUrl)


            }
            }
            return res.status(200).json(uploadedImageUrls)

            }

    }catch(err) {
        return res.status(500).json({error: `something went wrong ${err}`})
    }



})



export {router as photoRouter}