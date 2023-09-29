import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {MongoClient} from "mongodb";
import {config} from "dotenv"
config()


const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017"

export const client = new MongoClient(mongoUri);

export async function runDb () {
    try {
        await client.connect();
        await client.db("admin").command({ping: 1})
        console.log("Connected successfully to mongo server");
    } catch {
        console.log("connected fAiled")
        await client.close()
    }
}

export const testingRouter = Router();

testingRouter.delete('/', (req: Request, res: Response)=>{
    client.db("hw3").collection("blogs").deleteMany({})
    client.db("hw3").collection("post").deleteMany({})
    console.log("testingRouter")
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})