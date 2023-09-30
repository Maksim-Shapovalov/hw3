import {dbase} from "../db/localDB";
import {PostsOutputModel} from "../model/posts-model";

export const postsRepositories = {

    async allPost():Promise<PostsOutputModel[]> {
            return dbase.posts;
    },


    async  createNewPost(title: string, shortDescription:string, content: string, blogId: string):Promise<PostsOutputModel | undefined>{
        const blog = dbase.blogs.find(b => b.id === blogId)

        const newPosts = {
            id: (+new Date()).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog!.name,
            isMembership: false
        }

        dbase.posts.push(newPosts)
        return newPosts
    },

    async findPostById(id: string):Promise<{
        blogName: string;
        id: string;
        shortDescription: string;
        title: string;
        blogId: string;
        content: string
    } | undefined>{
        const post =  dbase.posts.find(b => b.id === id)
        return post

    },

    async updatePostById(id: string, title: string, shortDescription:string, content: string, blogId: string):Promise<boolean>{
        let post = dbase.posts.find(b => b.id === id)
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
        const postIndex = dbase.posts.findIndex(p => p.id === id)

        if(postIndex === -1){
            return false
        }

        dbase.posts.splice(postIndex, 1)
        return true
    }

}
