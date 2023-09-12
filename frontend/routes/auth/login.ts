import {Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}



const router = Router();


router.post('/api/users/login', async (req: Request, res: Response) => {

    const { email, password} = req.body
    const body = JSON.stringify({ email, password});
    console.log(process.env.API_URL)
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body
            });
        const data = await apiRes.json()
        console.log(data.access)
        console.log(apiRes.status)
        if(apiRes.status === 200) {
            res.cookie('access', data.access, {httpOnly: true, maxAge: 1000*60*30, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'}),
            res.cookie('refresh', data.refresh, {httpOnly: true, maxAge: 1000*60*30*48, sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})
            return(res.status(200).json({success: `Logged in successfully`}));
        }

        else {
            return res.status(apiRes.status).json(data)
        }
    }catch(err) {
        console.log(err)
        return res.status(500).json({

            error: 'Something went wrong when logging in'
        })
    }


})



export {router as loginRouter};