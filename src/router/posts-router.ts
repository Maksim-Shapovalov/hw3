import {Request, Response, Router} from "express";
import { HTTP_STATUS} from "../index";
import {postsRepositories} from "../repositories/posts-repositories";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {ValidationPosts} from "../middlewares/posts-middleware/post-input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/admin-middleware";
import {ErrorMiddleware} from "../middlewares/error-middleware";



export const postsRouter = Router();

postsRouter.get('/',
    async (req: Request, res: Response) => {
        const posts = await postsRepositories.allPost   ()
        res.status(HTTP_STATUS.OK_200).send(posts);
    })

postsRouter.post('/',
    authGuardMiddleware,
    ValidationPosts(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        const newPosts = await postsRepositories.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId,)

        res.status(201).send(newPosts)
    })

postsRouter.get('/:id',
    async (req: Request, res: Response) => {
        const post = await postsRepositories.findPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    })
postsRouter.put('/:id',
    authGuardMiddleware,
    ValidationPosts(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        let post = await postsRepositories.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (!post) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.status(HTTP_STATUS.NO_CONTENT_204).send(post)
    })

postsRouter.delete('/:id',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        const deleted = await postsRepositories.delPostById(req.params.id)

        if (!deleted) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

