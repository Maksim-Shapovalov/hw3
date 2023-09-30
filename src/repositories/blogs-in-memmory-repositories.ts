import {client} from "./DB";
import {BlogsDbModels, BlogsOutputModel} from "../model/blogs-db-models";
import {dbase} from "../db/localDB";

export const blogsRepositories = {

    async AllBlogs( ):Promise<BlogsOutputModel[]> {
            return dbase.blogs;
    },


    async BlogsNew(name: string, description: string, websiteUrl: string):Promise<BlogsOutputModel>{
        console.log('create blog')
        const newBlog = {
            id: (+new Date()).toString(),
            name: name,
            description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toString(),
            isMembership: false
        }

        dbase.blogs.push(newBlog)
        return newBlog
    },

    async findBlogById(id:string):Promise<BlogsOutputModel | undefined>{
        return  dbase.blogs.find(b => b.id === id)

    },

    async updateBlogById(id:string, name : string, description: string, websiteUrl: string):Promise<boolean>{

        const res = await client.db("hw2").collection("blogs").updateOne({id:id}, {$set: {name:name,description: description, websiteUrl: websiteUrl}})
        return res.matchedCount === 1

    },
    async delBlogsById(id: string):Promise<boolean> {
        const blogIndex = dbase.blogs.findIndex((b) => b.id === id)

        if(blogIndex === -1){
            return false
        }

        dbase.blogs.splice(blogIndex, 1)
        return true
    }

}
