import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import routes from './routes';
import { localsMiddleware } from './localsMiddlewares';

const app = express();

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware)
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;