import {Router,  Request, Response } from 'express';

const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: any[]) =>{
    const module = await importDynamic('node-fetch');
    return module.default(...args);}

const router = Router();

    router.post('/api/users/register', async (req: Request, res: Response) => {
        const {first_name, last_name, email, password} = req.body
        const body = JSON.stringify({first_name, last_name, email, password});
        try {
            const registerResponse = await fetch(`${process.env.API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            });

            const data = await registerResponse.json();

            return res.status(registerResponse.status).json(data);

        }catch(err) {
            return res.status(500).json({
                error: `Something went wrong, ${err}`
            });
        }
    });



export {router as registerRouter};




