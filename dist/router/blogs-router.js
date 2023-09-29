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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const index_1 = require("../index");
const blog_input_validation_middleware_1 = require("../middlewares/blogs-middleware/blog-input-validation-middleware");
const admin_middleware_1 = require("../middlewares/admin-middleware");
const error_middleware_1 = require("../middlewares/error-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get all blog");
    const blogs = yield blogs_repositories_1.blogsRepositories.AllBlogs();
    res.status(index_1.HTTP_STATUS.OK_200).send(blogs);
}));
exports.blogsRouter.post('/', admin_middleware_1.authGuardMiddleware, (0, blog_input_validation_middleware_1.ValidationBlog)(), error_middleware_1.ErrorMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('blog post');
    const newBlog = yield blogs_repositories_1.blogsRepositories.BlogsNew(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let blog = await blogsRepositories.findBlogById(req.params.id)
    const blog = yield blogs_repositories_1.blogsRepositories.findBlogById(req.params.id);
    console.log("get id blog", blog);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.put('/:id', admin_middleware_1.authGuardMiddleware, (0, blog_input_validation_middleware_1.ValidationBlog)(), error_middleware_1.ErrorMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update blog");
    let blog = yield blogs_repositories_1.blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!blog) {
        return res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
    }
    return res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
}));
exports.blogsRouter.delete('/:id', admin_middleware_1.authGuardMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleted blog");
    const [deleted] = yield Promise.all([blogs_repositories_1.blogsRepositories.delBlogsById(req.params.id)]);
    if (!deleted) {
        res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
}));
