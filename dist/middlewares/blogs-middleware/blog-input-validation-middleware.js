"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationBlog = void 0;
const express_validator_1 = require("express-validator");
const ValidationBlog = () => ([(0, express_validator_1.body)('name')
        .trim()
        .isString()
        .isLength({ min: 1, max: 15 })
        .notEmpty()
        .withMessage('Invalid name'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .trim()
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('Invalid description'),
    (0, express_validator_1.body)('websiteUrl')
        .trim()
        .isString()
        .isLength({ min: 1, max: 100 })
        .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
        .withMessage('Invalid websiteUrl')]);
exports.ValidationBlog = ValidationBlog;
