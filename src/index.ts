import 'dotenv/config'
import logger from "./infrastructure/config/winston"
import morgan from 'morgan';
import { app } from './infrastructure/config/app';
import { Req, Res } from './infrastructure/types/expressTypes';
import dbConnection from './infrastructure/config/database'

const PORT =process.env.PORT || 5000

app.use(morgan("combined"))

app.use('/',(req: Req, res: Res)=>{
    res.send('welcome')
})

app.listen(PORT,()=>{
    logger.info(`server connected on http://localhost:${PORT}`);
    dbConnection()
})

