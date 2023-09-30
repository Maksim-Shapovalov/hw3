"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPosts = void 0;
const express_validator_1 = require("express-validator");
const blogs_repositories_1 = require("../../repositories/blogs-repositories");
const ValidationPosts = () => ([
    (0, express_validator_1.body)('title').trim().isString().notEmpty().isLength({ min: 1, max: 30 }),
    (0, express_validator_1.body)('shortDescription')
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 100 }),
    (0, express_validator_1.body)('content')
        .trim()
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .isString()
        .withMessage('invalid content'),
    (0, express_validator_1.body)('blogId')
        .trim()
        .custom((value) => {
        const blogExist = blogs_repositories_1.blogsRepositories.findBlogById(value);
        if (!blogExist) {
            throw new Error('Blog not exist');
        }
        return true;
    })
        .notEmpty()
        .isString()
        .withMessage('invalid blogId'),
]);
exports.ValidationPosts = ValidationPosts;
