import {db} from "./DB";
export const postsRepositories = {

    AllPost(name: string ) {
        if (name){
            return db.blogs.filter(f => f.name.indexOf(name))
        }else{
            return db.blogs
        }
    },


    NewPost(id:string, name: string, description: string, websiteUrl: string){
        const newBlog = {
            id: new Date().toISOString(),
            name,
            description,
            websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    findPostById(id: string){
        return db.blogs.find(b => b.id === id)

    },

    updatePostById(id: string, title: string, shortDescription:string, content: string, blogId: string, blogName: string,){
        let post = db.posts.find(b => b.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            post.blogName = blogName
            return true
        } else {
            return false
        }


    },
    delPostById(id: string) {
        for (let i = 0; i < db.blogs.length; i++){
            if (db.blogs[i].id === id) {
                db.blogs.slice(i,1)
                return true
            }
        }
        return false
    }

}
