import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {postsRepositories} from "../repositories/posts-repositories";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {ValidationPosts} from "../middlewares/posts-middleware/post-input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/admin-middleware";
import {ErrorMiddleware} from "../middlewares/error-middleware";








export const postsRouter = Router();

postsRouter.get('/',
    (req: Request, res: Response)=>{
    const posts = postsRepositories.AllPost()
        res.status(HTTP_STATUS.OK_200).send(posts);
})

postsRouter.post('/',
    authGuardMiddleware,
    ValidationPosts,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        const newBlog = postsRepositories.NewPost(req.body.title,req.body.shortDescription,req.body.content, req.body.blogId,)
        res.status(201).send(newBlog)
    })

postsRouter.get('/:id',
    (req: Request, res: Response) => {
        let blog = blogsRepositories.findBlogById(req.params.id)
        if (blog){
            res.status(200).send(blog)
        } else {
            res.sendStatus(404)
        }
    })
postsRouter.put('/:id',
    authGuardMiddleware,
    ValidationPosts,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        let post = postsRepositories.updatePostById(req.params.id, req.body.title, req.body.shortDescription,req.body.content, req.body.blogId)



        res.status(HTTP_STATUS.NO_CONTENT_204).send(post)
    })

postsRouter.delete('/:id',
    (req: Request, res: Response) => {
        const deleted = postsRepositories.delPostById(req.params.id)
        if (!deleted){
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

