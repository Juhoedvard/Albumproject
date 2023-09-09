
import { Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}


const router = Router();

router.post('/api/users/forgotten-password', async (req: Request, res: Response) => {

    const {token, password} = req.body
    const body = JSON.stringify({
        token: token,
        password: password
        });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/forgotten-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });
        const data = await apiRes.json()
        return res.status(apiRes.status).json(data)

        }catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when resetting password'
            })
        }

})

export {router as forgottenPasswordRouter}