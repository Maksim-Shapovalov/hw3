import {ValidationError, validationResult} from "express-validator";
import {NextFunction, Request, Response, } from "express";
import {HTTP_STATUS} from "../index";



const ErrorsFormatter = (error: ValidationError)=>{
    switch (error.type){
        case "field":
            return {
                message: error.msg,
                field: error.path
            }
    }
}






export const ErrorMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorsMessage = result.array({onlyFirstError: true}).map(error => ErrorsFormatter)
        res.status(HTTP_STATUS.BAD_REQUEST_400).send(errorsMessage);
    }

    next()
}