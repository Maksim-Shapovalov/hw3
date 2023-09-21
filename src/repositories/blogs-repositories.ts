import {db} from "./DB";
import {HTTP_STATUS} from "../index";
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
            id: new Date().toISOString(),
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

    updateBlogById(id: string, name: string, description: string, websiteUrl: string){
        let blog = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }


    },
    delBlogsById(id: string) {
        for (let i = 0; i < db.blogs.length; i++){
            if (db.blogs[i].id === id) {
                db.blogs.slice(i,1)
                return true
            }
        }
        return false
    }

}
