"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.HTTP_STATUS = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./router/blogs-router");
const posts_router_1 = require("./router/posts-router");
const DB_1 = require("./repositories/DB");
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404
};
const app = (0, express_1.default)();
//const parserMiddleware = bodyParser;
exports.port = process.env.PORT || 3000;
//app.use(parserMiddleware);
app.use(express_1.default.json());
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
app.use('/testing/all-data', DB_1.testingRouter);
app.listen(exports.port, () => {
    console.log(`Example app listening on port ${exports.port}`);
});
