import { Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}


const router = Router();

router.get('/api/users/me', async (req: Request, res: Response) => {

    const access = req.cookies['access'];

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            },
        });
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)
    }
    catch(err) {
        return res.status(500).json({
            error: `Something went wrong when getting user data, ${err}`
        })

    }
})

router.get('/api/users/get-profile', async (req : Request, res: Response) => {
    const {id} =req.query
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/get-profile?id=${id}`, {
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
            error: `Something went wrong when getting user data, ${err}`
        })

    }
})














export {router as userRouter};