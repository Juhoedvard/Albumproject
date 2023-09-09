import {Router,  Request, Response } from 'express';

const router = Router();


router.get('/api/users/logout',  (req: Request, res: Response) => {
    res.cookie('access', '', {httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: process.env.NODE_ENV === 'production'}),
    res.cookie('refresh', '', {httpOnly: true, expires: new Date(0), sameSite: 'strict', secure: process.env.NODE_ENV === 'production'})

    return res.status(200).json({success: 'Logout succesfull'})
})


export {router as logoutRouter};