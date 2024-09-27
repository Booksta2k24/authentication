import 'dotenv/config'
import morgan from 'morgan';
import { app } from './infrastructure/config/app';
import { Req, Res } from './infrastructure/types/expressTypes';
import dbConnection from './infrastructure/config/database'
import logger from './utils/logger';

const PORT =process.env.PORT || 3000

app.use(morgan("combined"))

app.use('/',(req: Req, res: Res)=>{
    res.send('welcome')
})

app.listen(PORT,()=>{
    logger.info(`server connected on http://localhost:${PORT}`);
    dbConnection()
})

