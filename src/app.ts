import express, { Request, Response } from "express";
import {HTTP_STATUS} from "./HTTP_STASUS";
import {postsRouter} from "./router/posts-router";
import bodyParser from "body-parser";
import {postsRepositories} from "./repositories/posts-repositories";
import * as string_decoder from "string_decoder";
import {blogsRouter} from "./router/blogs-router";
import {blogsRepositories, db} from "./repositories/blogs-repositories";

export const app = express();
const parserMiddleware = bodyParser;
export const port = process.env.PORT || 3000;
app.use("/posts",postsRouter);
app.use(parserMiddleware);
app.use("/blogs",blogsRouter);

blogsRouter.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(postsRepositories.AllPostsReturn);
})

blogsRouter.post('/', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK_200).send(blogsRepositories.BlogsNew)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK_200).send(blogsRepositories.findBlogById(req.params.id));
})


app.delete('testing/all-data', (req: Request, res: Response)=>{
    db = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})