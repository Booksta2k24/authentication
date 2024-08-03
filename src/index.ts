import express from 'express'
import 'dotenv/config'
import logger from "./infrastructure/config/winston"
import morgan from 'morgan';

const app = express()
const PORT =process.env.PORT || 5000

app.use(morgan("combined"))

app.use('/',(req,res)=>{
    res.send('welcome')
})

app.listen(PORT,()=>{
    logger.info(`server connected on http://localhost:${PORT}`);
    
})

