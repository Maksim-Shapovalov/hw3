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
exports.postsRepositories = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../db/mongo");
exports.postsRepositories = {
    allPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield mongo_1.dbPosts.find({}).toArray();
            return posts.map((p) => postMapper(p));
        });
    },
    createNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findBlog = yield mongo_1.dbBlogs.findOne({ _id: new mongodb_1.ObjectId(blogId) });
            const newPosts = {
                title,
                shortDescription,
                content,
                blogId,
                blogName: findBlog.name,
                isMembership: false
            };
            const res = yield mongo_1.dbPosts.insertOne(Object.assign({}, newPosts));
            return postMapper(Object.assign(Object.assign({}, newPosts), { _id: res.insertedId }));
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongo_1.dbPosts.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return null;
            }
            return postMapper(post);
        });
    },
    updatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_1.dbPosts.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { title, shortDescription, content, blogId } });
            return res.matchedCount === 1;
        });
    },
    delPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_1.dbPosts.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    }
};
const postMapper = (post) => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        isMembership: post.isMembership
    };
};
