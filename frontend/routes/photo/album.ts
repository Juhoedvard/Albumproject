import { Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}

const router = Router()

router.post('/api/album/create-album',  async (req: Request, res: Response) => {

    const access = req.cookies['access'];
    const {title, description, thumbnail} = req.body
    console.log(req.body)
    const body = JSON.stringify({title: title, description: description, thumbnail: thumbnail})
    console.log('secondbody,', body)
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
            console.log('error', err)
            return res.status(500).json({
                error: `something went wrong ${err}`
            });
        }

});

router.post('/api/album/add-photos',  async (req: Request, res: Response) => {
    console.log('Lisätään kuvia!')
    const access = req.cookies['access'];
    const body = req.body
    console.log(body, 'second body')
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
            console.log(data)
            return res.status(PhotoResponse.status).json(data);
        }catch(err) {
            console.log('error', err)
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
        for (const album of data) {
            console.log(`Album title: ${album.title}`);

            // Käydään läpi kunkin albumin valokuvat
            for (const photo of album.photos) {
              console.log(`Photo caption: ${photo.caption}`);
              console.log(photo.likedUsers)

            }

            console.log('=========================');
          }
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
    console.log(body)
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
        console.log(data)
        return res.status(PhotoResponse.status).json(data);
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        })
    }
})

router.get('/api/album/getPhotoLikes/:id', async (req: Request, res: Response) => {
    const id = req.params.id

    console.log(id, 'kuvia')
    try{
        const PhotoResponse = await fetch(`${process.env.API_URL}/api/album/getPhotoLikes/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        });
        const data = await PhotoResponse.json();
        console.log(data)
        return res.status(PhotoResponse.status).json(data);
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting  data, ${err}`
        })
    }
})


export {router as albumRouter}