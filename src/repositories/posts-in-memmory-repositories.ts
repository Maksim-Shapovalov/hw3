import {db} from "../db/localDB";
import {PostsOutputModel} from "../model/posts-model";

export const postsRepositories = {

    async AllPost():Promise<PostsOutputModel[]> {

            return db.posts;

    },


    async  NewPost(title: string, shortDescription:string, content: string, blogId: string):Promise<PostsOutputModel>{
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

    async findPostById(id: string):Promise<PostsOutputModel | undefined>{
        return db.posts.find(b => b.id === id)

    },

    async updatePostById(id: string, title: string, shortDescription:string, content: string, blogId: string):Promise<boolean>{
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
    async delPostById(id: string):Promise<boolean> {
        const postIndex = db.posts.findIndex(p => p.id === id)

        if(postIndex === -1){
            return false
        }

        db.posts.splice(postIndex, 1)
        return true
    }

}
