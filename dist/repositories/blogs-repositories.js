"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepositories = void 0;
const DB_1 = require("./DB");
exports.blogsRepositories = {
    AllBlogs() {
        // if (name){
        //     return db.blogs.filter(f => f.name.indexOf(name))
        // }else{
        return DB_1.db.blogs;
        // }
    },
    BlogsNew(name, description, websiteUrl) {
        if (!name) {
        }
        console.log('create blog');
        const newBlog = {
            id: (+new Date()).toString(),
            name: name,
            description,
            websiteUrl: websiteUrl
        };
        DB_1.db.blogs.push(newBlog);
        return newBlog;
    },
    findBlogById(id) {
        return DB_1.db.blogs.find(b => b.id === id);
    },
    updateBlogById(id, name, description, websiteUrl) {
        let blog = DB_1.db.blogs.find(b => b.id === id);
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        return false;
    },
    delBlogsById(id) {
        const blogIndex = DB_1.db.blogs.findIndex((b) => b.id === id);
        if (blogIndex === -1) {
            return false;
        }
        DB_1.db.blogs.splice(blogIndex, 1);
        return true;
    }
};
