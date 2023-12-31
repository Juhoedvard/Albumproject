import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Router,  Request, Response } from 'express';
import multer from 'multer'
import sharp from 'sharp'

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

    const s3 = s3ClientData();
    console.log('s3 upload started')
    const bucketname = process.env.AWS_BUCKET_NAME
    const bucketRegion = process.env.REGION
    const files = req.files as Express.Multer.File[]
   
    if(s3 && req.files && bucketname && bucketRegion){ 

    const uploadPromises = files.map(async (file) => {
        console.log(file)
        const buffer = await sharp(file.buffer).resize({ height: 1080, width: 1080, fit: 'contain' }).toBuffer();
        const key = randomUUID().toString();
        const params = {
          Bucket: bucketname,
          Key: key,
          Body: buffer,
          ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);
        return `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/${key}`;
      });   
      try {
        const uploadedImageUrls = await Promise.all(uploadPromises);
        console.log(uploadedImageUrls)
        return res.status(200).json(uploadedImageUrls);
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: `Something went wrong ${err}` });}
      }})
router.delete('/api/album/remove-photo-s3', async (req: Request, res: Response) =>{
    const s3 = s3ClientData();
    const bucketname = process.env.AWS_BUCKET_NAME
    const photoURLs = Array.isArray(req.body.photoURLs) ? req.body.photoURLs : [req.body.photoURLs]
    try {
            for (const photo of photoURLs){
            const key: string = photo.split('/').slice(3).join('/')
            if (s3 && bucketname) {
                const params = {
                    Bucket: bucketname,
                    Key: key
                }
            const command = new DeleteObjectCommand(params)
            s3.send(command)
            }}
            return res.status(200).json({'message': 'Succesfully deleted'})
    }
    catch(err) {
        return res.status(500).json({error: `something went wrong removing photo ${err} `})
    }
})



export {router as photoRouter}