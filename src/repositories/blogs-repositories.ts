import {HTTP_STATUS} from "../HTTP_STASUS";


export let db = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string",
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string",
        }
    ]
}




export const blogsRepositories = {

    AllBlogsReturn(name: string) {
        if (name){
            return db.blogs.filter(f => f.name.indexOf(name))
        }else{
            return db.blogs
        }
    },


    BlogsNew(id:string, name: string, description: string, websiteUrl: string){
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
        let blog = db.blogs.find(b => b.id === id)
        return blog
    },

    updateBlogById(id: string, name: string, description: string, websiteUrl: string){
        let blog = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return blog
        } else {
            return HTTP_STATUS.NOT_FOUND_404
        }

    },
    delBlogsById(id: string) {
        for (let i = 0; i < db.blogs.length; i++){
            if (db.blogs[i].id === id) {
                db.blogs.slice(i,1)
                return HTTP_STATUS.NO_CONTENT_204
            }
        }
        return HTTP_STATUS.NOT_FOUND_404
    }

}