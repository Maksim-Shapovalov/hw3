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
    return res.status(HTTP_STATUS.OK_200).send(posts);
})

postsRouter.post('/',
    ValidationPosts,
    authGuardMiddleware,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        const newBlog = postsRepositories.NewPost(req.body.id, req.body.name,req.body.description,req.body.websiteUrl)
       return  res.status(201).send(newBlog)
    })

postsRouter.get('/:id',
    ValidationPosts,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        let blog = blogsRepositories.findBlogById(req.params.id)
        if (blog){
            return res.status(200).send(blog)
        } else {
            return res.sendStatus(404)
        }
    })
postsRouter.put('/:id',
    ValidationPosts,
    authGuardMiddleware,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        let post = postsRepositories.updatePostById(req.params.id, req.body.title, req.body.shortDescription,req.body.content, req.body.blogId,req.body.blogName)



        return res.status(HTTP_STATUS.NO_CONTENT_204).send(post)
    })

postsRouter.delete('/:id',
    authGuardMiddleware,
    ValidationPosts,
    ErrorMiddleware,
    (req: Request, res: Response) => {
        const deleted = postsRepositories.delPostById(req.params.id)
        if (!deleted){
           return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
        return res.status(HTTP_STATUS.NO_CONTENT_204)
    })

