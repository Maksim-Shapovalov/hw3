import {db} from "./DB";
import {HTTP_STATUS} from "../index";
import {throws} from "node:assert";
export const blogsRepositories = {

    AllBlogs( ) {
        // if (name){
        //     return db.blogs.filter(f => f.name.indexOf(name))
        // }else{
            return db.blogs
        // }
    },


    BlogsNew(name: string, description: string, websiteUrl: string){
        console.log('create blog')
        const newBlog = {
            id: (+new Date()).toString(),
            name,
            description,
            websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    findBlogById(id: string){
        return db.blogs.find(b => b.id === id)

    },

    updateBlogById(id: string, name : string, description: string, websiteUrl: string){
        let blog = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return
        } else {
            return false
        }
        if (blog!.name !== "string"){
            return false
        }
        if (blog!.description !== "string"){
            return false
        }
        if (blog!.websiteUrl !== "string"){
            return false
        }
        return true


    },
    delBlogsById(id: string) {
        const blogIndex = db.blogs.findIndex((b) => b.id === id)

        if(blogIndex === -1){
            return false
        }

        db.blogs.splice(blogIndex, 1)
        return true
    }

}
