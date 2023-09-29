import {client} from "../repositories/DB";
import {PostsDbModel} from "../model/posts-model";
import {BlogsDbModels} from "../model/blogs-db-models";

export const dbBlogs = client.db("hw2").collection<BlogsDbModels>("blogs")


export const dbPosts = client.db("hw2").collection<PostsDbModel>("posts")