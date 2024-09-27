import express from 'express'
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoutes'
import errorHandler from '../../usecase/handler/errorHandler';
// import rateLimiterMiddleware from './rateLimit';

export const app = express()

// app.use(rateLimiterMiddleware)

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/api/user',userRoute)


app.use(errorHandler);