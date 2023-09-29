"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../index");
const ErrorsFormatter = (e) => {
    return {
        message: e.msg,
        // @ts-ignore
        field: e.path
    };
};
const ErrorMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req).formatWith(ErrorsFormatter);
    if (!result.isEmpty()) {
        const errorsMessage = { errorsMessages: result.array({ onlyFirstError: true }) };
        return res.status(index_1.HTTP_STATUS.BAD_REQUEST_400).send(errorsMessage);
    }
    next();
};
exports.ErrorMiddleware = ErrorMiddleware;
