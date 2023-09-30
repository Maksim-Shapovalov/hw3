"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const blogExist = yield blogs_repositories_1.blogsRepositories.findBlogById(value);
        console.log('error valid id blogs', blogExist);
        if (!blogExist) {
            throw new Error('Blog not exist');
        }
        return true;
    }))
        .notEmpty()
        .isString()
        .withMessage('invalid blogId'),
]);
exports.ValidationPosts = ValidationPosts;
