import {PostsDbModel, PostsOutputModel} from "../model/posts-model";
import {ObjectId, WithId} from "mongodb";
import {dbBlogs, dbPosts} from "../db/mongo";

export const postsRepositories = {
    async allPost(): Promise<PostsOutputModel[]> {
        const posts = await dbPosts.find({}).toArray()

        return posts.map((p) => postMapper(p))
    },

    async createNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsOutputModel>{
        const findBlog = await dbBlogs.findOne({_id: new ObjectId(blogId)})

        const newPosts = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: findBlog!.name,
            isMembership: false,
            createdAt: new Date().toISOString(),
        }

        const res = await dbPosts.insertOne({...newPosts})

        return postMapper({...newPosts, _id: res.insertedId})
    },

    async findPostById(id: string): Promise<PostsOutputModel | null> {
        const post = await dbPosts.findOne({_id: new ObjectId(id)})

        if(!post){
            return null;
        }

        return postMapper(post);
    },

    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const res = await dbPosts.updateOne({_id: new ObjectId(id)}, {$set: {title,shortDescription, content, blogId}})
        return res.matchedCount === 1
    },

    async delPostById(id: string): Promise<boolean> {
        const res = await dbPosts.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount === 1
    }

}

const postMapper = (post: WithId<PostsDbModel>): PostsOutputModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        isMembership: post.isMembership

    }
}
