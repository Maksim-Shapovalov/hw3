"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const posts_repositories_1 = require("../repositories/posts-repositories");
const post_input_validation_middleware_1 = require("../middlewares/posts-middleware/post-input-validation-middleware");
const admin_middleware_1 = require("../middlewares/admin-middleware");
const error_middleware_1 = require("../middlewares/error-middleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => {
    const posts = posts_repositories_1.postsRepositories.AllPost();
    res.status(index_1.HTTP_STATUS.OK_200).send(posts);
});
exports.postsRouter.post('/', admin_middleware_1.authGuardMiddleware, (0, post_input_validation_middleware_1.ValidationPosts)(), error_middleware_1.ErrorMiddleware, (req, res) => {
    const newBlog = posts_repositories_1.postsRepositories.NewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).send(newBlog);
});
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repositories_1.postsRepositories.findPostById(req.params.id);
    if (post) {
        res.status(200).send(post);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.put('/:id', admin_middleware_1.authGuardMiddleware, (0, post_input_validation_middleware_1.ValidationPosts)(), error_middleware_1.ErrorMiddleware, (req, res) => {
    let post = posts_repositories_1.postsRepositories.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!post) {
        res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
    }
    res.status(index_1.HTTP_STATUS.NO_CONTENT_204).send(post);
});
exports.postsRouter.delete('/:id', admin_middleware_1.authGuardMiddleware, (req, res) => {
    const deleted = posts_repositories_1.postsRepositories.delPostById(req.params.id);
    if (!deleted) {
        res.sendStatus(index_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
});
