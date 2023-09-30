import {ObjectId, WithId} from "mongodb";
import {BlogsDbModels, BlogsOutputModel} from "../model/blogs-db-models";
import {dbBlogs} from "../db/mongo";
import {log} from "node:util";
import {rejects} from "node:assert";
export const blogsRepositories = {

    async AllBlogs( ):Promise<BlogsOutputModel[]> {
        const posts = await dbBlogs.find({}).toArray()

        return posts.map((p) => blogMapper(p))
        //

    },


    async BlogsNew(name: string, description: string, websiteUrl: string):Promise<BlogsOutputModel>{
        const newBlog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const res = await dbBlogs.insertOne({...newBlog})
        return blogMapper({...newBlog, _id: res.insertedId})
    },

    async findBlogById(id:string):Promise<BlogsOutputModel | undefined>{
        const res = await dbBlogs.findOne({_id: new ObjectId(id)})
        console.log('this blog find id')
        if (!res) {
            return undefined
        }
        return blogMapper(res)

    },

    async updateBlogById(id:string, name : string, description: string, websiteUrl: string):Promise<boolean>{
        const res = await dbBlogs
            .updateOne({_id:new ObjectId(id)}, {$set: {name:name,description: description, websiteUrl: websiteUrl}})
        return res.matchedCount === 1
    },

    async delBlogsById(id: string):Promise<boolean> {
        const res = await dbBlogs.deleteOne({_id:new ObjectId(id)})
        return res.deletedCount === 1
    }

}

const blogMapper = (blog: WithId<BlogsDbModels>): BlogsOutputModel => {
    return{
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}


