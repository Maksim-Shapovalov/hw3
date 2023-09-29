"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepositories = void 0;
const DB_1 = require("./DB");
exports.postsRepositories = {
    AllPost() {
        return DB_1.db.posts;
    },
    NewPost(title, shortDescription, content, blogId) {
        const blog = DB_1.db.blogs.find(b => b.id === blogId);
        const newPosts = {
            id: (+new Date()).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name
        };
        DB_1.db.posts.push(newPosts);
        return newPosts;
    },
    findPostById(id) {
        return DB_1.db.posts.find(b => b.id === id);
    },
    updatePostById(id, title, shortDescription, content, blogId) {
        let post = DB_1.db.posts.find(b => b.id === id);
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            return true;
        }
        else {
            return false;
        }
    },
    delPostById(id) {
        const postIndex = DB_1.db.posts.findIndex(p => p.id === id);
        if (postIndex === -1) {
            return false;
        }
        DB_1.db.posts.splice(postIndex, 1);
        return true;
    }
};
