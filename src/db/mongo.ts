
import {PostsDbModel} from "../model/posts-model";
import {BlogsDbModels} from "../model/blogs-db-models";
import {MongoClient} from "mongodb";
import {Request, Response} from "express";
import {HTTP_STATUS} from "../index";
import {testingRouter} from "../repositories/DB";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017"
export const client = new MongoClient(mongoUri);


const db = client.db("hw3")
export const dbBlogs = db.collection<BlogsDbModels>("blogs")
export const dbPosts = db.collection<PostsDbModel>("posts")

export async function runDb () {
    try {
        await client.connect();
        await client.db("hw3").command({ping: 1})
        console.log("Connected successfully to mongo server");
    } catch {
        console.log("connected fAiled")
        await client.close()
    }
}

testingRouter.delete('/', (req: Request, res: Response)=>{
    client.db("hw3").collection("blogs").deleteMany({})
    client.db("hw3").collection("posts").deleteMany({})
    console.log("testingRouter")
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})