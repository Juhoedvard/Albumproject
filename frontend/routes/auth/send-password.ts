import { randomUUID } from 'crypto';
import { Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}


const router = Router();


router.post('/api/users/send-password', async (req: Request, res: Response) => {

    const token = randomUUID()
    const email = req.body.email;
    const body = JSON.stringify({
        email: email,
        token: token
        });
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/send-password`, {
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


export {router as resetPasswordRouter}