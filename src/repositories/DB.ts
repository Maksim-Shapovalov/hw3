import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";

export let db = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string",
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string",
        }
    ]
}

export const admin = 'YWRtaW46cXdlcnR5'

export const testingRouter = Router();
testingRouter.delete('/', (req: Request, res: Response)=>{
    db.blogs = []
    db.posts = []
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})