import {db} from "./DB";
export const postsRepositories = {

    AllPost() {

            return db.posts;

    },


    NewPost(id:string, title: string, shortDescription:string, content: string, blogId: string, blogName: string){
        const newPosts = {
            id: new Date().toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        db.posts.push(newPosts)
        return newPosts
    },

    findPostById(id: string){
        return db.posts.find(b => b.id === id)

    },

    updatePostById(id: string, title: string, shortDescription:string, content: string, blogId: string, blogName: string){
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
            if (db.posts[i].id === id) {
                db.posts.slice(i,1)
                return true
            }
        }
        return false
    }

}
