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

const app:Express = express();
const corsOptions = {
    origin: ['http://localhost:3000','127.0.0.1:8000', 'https://photo-gallery-production.up.railway.app','https://albumbackend-production.up.railway.app', 'https://albumproject-production.up.railway.app'],
    credentials: true

  };
app.use(cors(corsOptions))
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

app.listen(PORT, () => {

    console.log(`App listening on port ${PORT}`);
});