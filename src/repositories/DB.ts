import {Request, Response} from "express";
import {app, HTTP_STATUS} from "../index";

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


app.delete('testing/all-data', (req: Request, res: Response)=>{
    db.blogs = []
    db.posts = []
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})