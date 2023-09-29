import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || "mongodb://localhost:27017";

export const client = new MongoClient(mongoUri);

export async function runDb () {
    try {
        await client.connect();
        await client.db("blogs").command({ping: 1})
        console.log("Connected succesfully to mongo server");
    } catch {
        await client.close()
    }
}

export const testingRouter = Router();

testingRouter.delete('/', (req: Request, res: Response)=>{
    client.db("hw2").collection("blogs").deleteMany({})
    client.db("hw2").collection("post").deleteMany({})
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})