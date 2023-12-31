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
exports.blogsRepositories = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../db/mongo");
exports.blogsRepositories = {
    AllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield mongo_1.dbBlogs.find({}).toArray();
            return posts.map((p) => blogMapper(p));
            //
        });
    },
    BlogsNew(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const res = yield mongo_1.dbBlogs.insertOne(Object.assign({}, newBlog));
            return blogMapper(Object.assign(Object.assign({}, newBlog), { _id: res.insertedId }));
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_1.dbBlogs.findOne({ _id: new mongodb_1.ObjectId(id) });
            console.log('this blog find id');
            if (!res) {
                return undefined;
            }
            return blogMapper(res);
        });
    },
    updateBlogById(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_1.dbBlogs
                .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return res.matchedCount === 1;
        });
    },
    delBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mongo_1.dbBlogs.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    }
};
const blogMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
