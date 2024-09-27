import express,{NextFunction,Request,Response} from 'express'
import { userController } from './injections/userInjection'
import { body} from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware';
import { FNAME_CONTAINS,FNAME_REQ,INVALID_MSG,LNAME_CONTAINS,LNAME_REQ,PD_MSG } from '../../utils/constants';

const router = express.Router()

router.post('/signup',[
    body('firstName')
        .notEmpty().withMessage(FNAME_REQ as string)
        .isAlpha().withMessage(FNAME_CONTAINS as string),
    body('lastName')
        .notEmpty().withMessage(LNAME_REQ as string)
        .isAlpha().withMessage(LNAME_CONTAINS as string),
    body('email')
        .isEmail().withMessage(INVALID_MSG as string)
        .normalizeEmail(),
    body('password')
        .matches(process.env.PD_KEY as string)
        .withMessage(PD_MSG as string),
        handleValidationErrors
],
    (req:Request,res:Response,next:NextFunction)=>{
        userController.createUser(req,res,next)
    })
    
router.post('/login',[
    body('email')
        .isEmail().withMessage(INVALID_MSG as string).normalizeEmail(),
    body('password').matches(process.env.PD_KEY as string)
        .withMessage(PD_MSG as string),
       handleValidationErrors
    ],
        (req:Request,res:Response,next:NextFunction)=>{
        userController.loginUser(req,res,next)
    }) 

export default router       