import { validationResult, Result, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../../usecase/handler/errorResponse';
import { ErrorType } from '../types/validatorType';

// Middleware to handle express-validator errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const errArr:ErrorType[]=[]
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        for(let err of errorArray){
           errArr.push(err?.msg)
        }
        console.log(errArr);
        
        throw ErrorResponse.badRequest(errArr.join(','));
    }
    next();
};
