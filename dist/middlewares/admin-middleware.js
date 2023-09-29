"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const index_1 = require("../index");
const expectedAuthHeader = 'admin:qwerty';
// const expectedAuthHeaderCode =
const authGuardMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic')) {
        res.sendStatus(index_1.HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }
    const splitHeader = authHeader.split(' ')[1];
    console.log(splitHeader, 'splitHeader');
    let enCodeHeader = null;
    try {
        enCodeHeader = atob(splitHeader);
        console.log(enCodeHeader, 'encoded');
    }
    catch (e) {
        console.log('Error in encoding Basic auth');
        return res.sendStatus(index_1.HTTP_STATUS.UNAUTHORIZED_401);
    }
    if (enCodeHeader !== expectedAuthHeader) {
        return res.sendStatus(index_1.HTTP_STATUS.UNAUTHORIZED_401);
    }
    console.log('auth ok');
    next();
};
exports.authGuardMiddleware = authGuardMiddleware;
