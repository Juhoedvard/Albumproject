import express, { Express} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import  { registerRouter }  from './routes/auth/register';
import { loginRouter } from './routes/auth/login';
import { userRouter } from './routes/auth/user';
import { logoutRouter } from './routes/auth/logout';
import { verifyRouter } from './routes/auth/verify';
import { resetPasswordRouter } from './routes/auth/send-password';
import { forgottenPasswordRouter } from './routes/auth/forgotten-password';
import { changePasswordRouter } from './routes/auth/change-password';
import { albumRouter } from './routes/photo/album';
import { photoRouter } from './routes/photo/Photo_S3';
import path from 'path';





dotenv.config();
const PORT = process.env.PORT || 5000;

const app:Express = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:8000', 'http://localhost:8000', 'https://server-swdfx3v3pa-lz.a.run.app'],
  credentials: true,
};
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());


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


app.use(express.static(path.join(__dirname,'../', 'build')))
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'../',  'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});