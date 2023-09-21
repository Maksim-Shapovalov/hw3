import {Request, Response, Router} from "express";
import {app, HTTP_STATUS} from "../index";
import {postsRepositories} from "../repositories/posts-repositories";
import {ValidationBlog} from "../middlewares/blogs-middleware/blog-input-validation-middleware";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {blogsRouter} from "./blogs-router";
import {ValidationPosts} from "../middlewares/posts-middleware/post-input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/admin-middleware";








export const postsRouter = Router();
app.use('posts',postsRouter)
postsRouter.get('/',
    ValidationPosts,
    (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(postsRepositories.AllPost);
})

postsRouter.post('/',
    ValidationPosts,
    authGuardMiddleware,
    (req: Request, res: Response) => {
        const newBlog = postsRepositories.NewPost(req.body.id, req.body.name,req.body.description,req.body.websiteUrl)
        res.status(201).send(newBlog)
    })

postsRouter.get('/:id',
    ValidationPosts,
    (req: Request, res: Response) => {
        let blog = blogsRepositories.findBlogById(req.params.id)
        if (blog){
            res.status(200).send(blog)
        } else {
            res.sendStatus(404)
        }
    })
postsRouter.put('/:id',
    ValidationPosts,
    authGuardMiddleware,
    (req: Request, res: Response) => {
        let blog = blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description,req.body.websiteUrl)



        res.status(HTTP_STATUS.NO_CONTENT_204).send(blog)
    })

postsRouter.delete('/:id',
    authGuardMiddleware,
    ValidationPosts,
    (req: Request, res: Response) => {
        const deleted = postsRepositories.delPostById(req.params.id)
    })

