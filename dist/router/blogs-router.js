"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const index_1 = require("../index");
const blog_input_validation_middleware_1 = require("../middlewares/blogs-middleware/blog-input-validation-middleware");
const admin_middleware_1 = require("../middlewares/admin-middleware");
const error_middleware_1 = require("../middlewares/error-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    const blogs = blogs_repositories_1.blogsRepositories.AllBlogs();
    res.status(index_1.HTTP_STATUS.OK_200).send(blogs);
});
exports.blogsRouter.post('/', admin_middleware_1.authGuardMiddleware, (0, blog_input_validation_middleware_1.ValidationBlog)(), error_middleware_1.ErrorMiddleware, (req, res) => {
    console.log('blog post');
    const newBlog = blogs_repositories_1.blogsRepositories.BlogsNew(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
});
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs_repositories_1.blogsRepositories.findBlogById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogsRouter.put('/:id', admin_middleware_1.authGuardMiddleware, (0, blog_input_validation_middleware_1.ValidationBlog)(), error_middleware_1.ErrorMiddleware, (req, res) => {
    let blog = blogs_repositories_1.blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!blog) {
        return res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
    }
    return res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.blogsRouter.delete('/:id', admin_middleware_1.authGuardMiddleware, (req, res) => {
    const deleted = blogs_repositories_1.blogsRepositories.delBlogsById(req.params.id);
    if (!deleted) {
        res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
});
