import {ObjectId, WithId} from "mongodb";
import {BlogsDbModels, BlogsOutputModel} from "../model/blogs-db-models";
import {dbBlogs} from "../db/mongo";
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
            createdAt: new Date().toString(),
            isMembership: true
        }
        const res = await dbBlogs.insertOne({...newBlog})
        return blogMapper({...newBlog, _id: res.insertedId})
    },

    async findBlogById(id:string):Promise<BlogsOutputModel | null>{
        const res = await dbBlogs.findOne({id: new ObjectId(id)})
        if (!res) {
            return null
        }
        return blogMapper(res)

    },

    async updateBlogById(id:string, name : string, description: string, websiteUrl: string):Promise<boolean>{
        const res = await dbBlogs
            .updateOne({id:new ObjectId(id)}, {$set: {name:name,description: description, websiteUrl: websiteUrl}})
        return res.matchedCount === 1
    },

    async delBlogsById(id: string):Promise<boolean> {
        const res = await dbBlogs.deleteOne({id:new ObjectId(id)})
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


