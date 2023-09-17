import { Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}

const router = Router()

router.post('/api/album/create-album',  async (req: Request, res: Response) => {

    const access = req.cookies['access'];
    const {title, description, thumbnail} = req.body
    const body = JSON.stringify({title: title, description: description, thumbnail: thumbnail})
        try{
            const AlbumResponse = await fetch(`${process.env.API_URL}/api/album/create-album`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                },
                body: body,
            });
            const data = await AlbumResponse.json();
            return res.status(AlbumResponse.status).json(data);
        }catch(err) {
            return res.status(500).json({
                error: `something went wrong ${err}`
            });
        }

});

router.post('/api/album/add-photos',  async (req: Request, res: Response) => {
    const access = req.cookies['access'];
    const body = req.body
        try{
            const PhotoResponse = await fetch(`${process.env.API_URL}/api/album/add-photos`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                },
                body: JSON.stringify(body),

            });
            const data = await PhotoResponse.json();
            return res.status(PhotoResponse.status).json(data);
        }catch(err) {
            return res.status(500).json({
                error: `something went wrong ${err}`
            });
        }

});

router.get('/api/album/albums', async (req: Request, res: Response) => {
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/album/albums`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        })

    }
})

router.post('/api/album/likephoto', async (req: Request, res: Response) => {
    const access = req.cookies['access'];
    const body = req.body
    try{
        const PhotoResponse = await fetch(`${process.env.API_URL}/api/album/likephoto`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify(body),
        });
        const data = await PhotoResponse.json();
        return res.status(PhotoResponse.status).json(data);
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        })
    }
})

router.get('/api/album/getPhotoLikes', async (req: Request, res: Response) => {
    const {id} = req.query
    try{
        const PhotoResponse = await fetch(`${process.env.API_URL}/api/album/getPhotoLikes?id=${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        });
        const data = await PhotoResponse.json();
        return res.status(PhotoResponse.status).json(data);
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting data, ${err}`
        })
    }
})
router.delete('/api/album/remove-photo-album', async  (req:Request, res:Response) => {
    const {id} = req.query
    const access = req.cookies['access']
    try{
        const apiRes = await fetch(`${process.env.API_URL}/api/album/remove-photo-album?id=${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            },

        })
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)
    }
    catch{
        return res.status(500).json({
            error: 'Something went wrong when trying to remove photo from album'
        })
    }
})
router.put('/api/album/editPhoto',async (req:Request, res:Response) => {
    const access = req.cookies['access']
    try{
        const apiRes = await fetch(`${process.env.API_URL}/api/album/editPhoto`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify(req.body)
        })
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)
    }
    catch(err){
        return res.status(500).json({
            err: 'Something went wrong when trying to remove album'
        })
    }
})
router.delete('/api/album/removealbum', async (req:Request, res:Response) => {
    const {albumID} =req.query
    const access = req.cookies['access']
    try{
        const apiRes = await fetch(`${process.env.API_URL}/api/album/removealbum?albumID=${albumID}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            },

        })
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)
    }
    catch(err){
        return res.status(500).json({
            err: 'Something went wrong when trying to remove album'
        })
    }
})


export {router as albumRouter}