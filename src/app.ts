import express, { Request, Response } from "express";
import {HTTP_STATUS} from "./HTTP_STASUS";
import {postsRouter} from "./router/posts-router";
import bodyParser from "body-parser";
import {postsRepositories} from "./repositories/posts-repositories";
import * as string_decoder from "string_decoder";
import {blogsRouter} from "./router/blogs-router";
import {db} from "./repositories/blogs-repositories";

export const app = express();
const parserMiddleware = bodyParser;
export const port = process.env.PORT || 3000;
app.use("/posts",postsRouter);
app.use(parserMiddleware);
app.use("/blogs",blogsRouter);

postsRouter.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(postsRepositories.AllPostsReturn);
})

postsRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId



    if (!title || title.trim()) {

    }


})

postsRouter.get('/:id', () => {

})


app.delete('testing/all-data', (req: Request, res: Response)=>{
    db = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})