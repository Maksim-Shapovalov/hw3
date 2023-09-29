"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = exports.db = void 0;
const express_1 = require("express");
const index_1 = require("../index");
exports.db = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string",
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string",
        }
    ]
};
// export const admin = 'YWRtaW46cXdlcnR5'
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/', (req, res) => {
    exports.db.blogs = [];
    exports.db.posts = [];
    res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
});
