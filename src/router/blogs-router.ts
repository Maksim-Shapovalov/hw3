import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import { HTTP_STATUS} from "../index";
import {ValidationBlog} from "../middlewares/blogs-middleware/blog-input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/admin-middleware";
import {ErrorMiddleware} from "../middlewares/error-middleware";





export const blogsRouter = Router();


blogsRouter.get('/', async (req: Request, res: Response) => {
    console.log("get all blog")
    const blogs = await blogsRepositories.AllBlogs()
    res.status(HTTP_STATUS.OK_200).send(blogs);
})
blogsRouter.post('/',
    authGuardMiddleware,
    ValidationBlog(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        console.log('blog post')
        const newBlog = await blogsRepositories.BlogsNew(req.body.name, req.body.description, req.body.websiteUrl)

        res.status(201).send(newBlog)
    })

blogsRouter.get('/:id',
    async (req: Request, res: Response) => {

        // let blog = await blogsRepositories.findBlogById(req.params.id)
        const blog = await blogsRepositories.findBlogById(req.params.id)
        console.log("get id blog", blog)

        if (blog) {
            res.status(200).send(blog)
        } else {
            res.sendStatus(404)
        }
    })
blogsRouter.put('/:id',
    authGuardMiddleware,
    ValidationBlog(),
    ErrorMiddleware,
    async (req: Request, res: Response) => {
        console.log("update blog")
        let blog = await blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
        if (!blog) {
            return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        }
        return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

blogsRouter.delete('/:id',
    authGuardMiddleware,
    async (req: Request, res: Response) => {
        console.log("deleted blog")
        const [deleted] = await Promise.all([blogsRepositories.delBlogsById(req.params.id)])
        if (!deleted) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

