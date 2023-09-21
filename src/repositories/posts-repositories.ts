import {db} from "./DB";
export const postsRepositories = {

    AllPost() {

            return db.posts;

    },


    NewPost(title: string, shortDescription:string, content: string, blogId: string){
        const blog = db.blogs.find(b => b.id === blogId)

        const newPosts = {
            id: (+new Date()).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog!.name
        }

        db.posts.push(newPosts)
        return newPosts
    },

    findPostById(id: string){
        return db.posts.find(b => b.id === id)

    },

    updatePostById(id: string, title: string, shortDescription:string, content: string, blogId: string){
        let post = db.posts.find(b => b.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        } else {
            return false
        }


    },
    delPostById(id: string) {
        const postIndex = db.posts.findIndex(p => p.id === id)

        if(postIndex === -1){
            return false
        }

        db.posts.splice(postIndex, 1)
        return true
    }

}
