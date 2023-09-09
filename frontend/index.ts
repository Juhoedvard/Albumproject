import express, { Express,  Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import  { registerRouter }  from './routes/auth/register';
import { loginRouter } from './routes/auth/login';
import { userRouter } from './routes/auth/user';
import { logoutRouter } from './routes/auth/logout';
import { verifyRouter } from './routes/auth/verify';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { resetPasswordRouter } from './routes/auth/send-password';
import { forgottenPasswordRouter } from './routes/auth/forgotten-password';
import { changePasswordRouter } from './routes/auth/change-password';
import { albumRouter } from './routes/photo/album';
import { photoRouter } from './routes/photo/addPhoto_S3';


dotenv.config();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const app:Express = express();
app.use(cors(options));
app.use(cookieParser());
app.use(express.json());


app.use(registerRouter);
app.use(loginRouter);
app.use(userRouter);
app.use(logoutRouter);
app.use(verifyRouter);
app.use(resetPasswordRouter)
app.use(forgottenPasswordRouter)
app.use(changePasswordRouter)
app.use(albumRouter)
app.use(photoRouter)


app.get("*", (req: Request, res: Response): void => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(PORT, () => {

    console.log(`App listening on port ${PORT}`);
});