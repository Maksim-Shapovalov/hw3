import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {MongoClient} from "mongodb";

//"mongodb://localhost:27017"

const mongoUri = process.env.mongoURI || "mongodb+srv://maksimshapovalov01:Qwerty2469polo@cluster0.5v1tm6m.mongodb.net/hw3?retryWrites=true&w=majority"

export const client = new MongoClient(mongoUri);

export async function runDb () {
    try {
        await client.connect();
        await client.db("blogs").command({ping: 1})
        console.log("Connected successfully to mongo server");
    } catch {
        await client.close()
    }
}

export const testingRouter = Router();

testingRouter.delete('/', (req: Request, res: Response)=>{
    client.db("hw3").collection("blogs").deleteMany({})
    client.db("hw3").collection("post").deleteMany({})
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})