import {NextFunction, Request, Response} from "express";
import {HTTP_STATUS} from "../index";

const expectedAuthHeader = 'admin:qwerty'

export const authGuardMiddleware = (req: Request, res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Basic')){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }

    const splitHeader = authHeader.split('')[1]
    const enCodeHeader = atob(splitHeader)

    if (enCodeHeader !== expectedAuthHeader){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
    }
    return next()
}