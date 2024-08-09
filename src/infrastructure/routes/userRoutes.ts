import express,{NextFunction,Request,Response} from 'express'
import { userController } from './injections/userInjection'

const router = express.Router()

router.post('/signup',
    (req:Request,res:Response,next:NextFunction)=>{
        userController.createUser(req,res,next)
    })
router.post('/login',
    (req:Request,res:Response,next:NextFunction)=>{
        userController.loginUser(req,res,next)
    }) 
export default router       