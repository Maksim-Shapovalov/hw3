import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {body, query} from "express-validator";
import { HTTP_STATUS} from "../index";
import {ValidationBlog} from "../middlewares/blogs-middleware/blog-input-validation-middleware";
import {authGuardMiddleware} from "../middlewares/admin-middleware";
import {ErrorMiddleware} from "../middlewares/error-middleware";





export const blogsRouter = Router();


blogsRouter.get('/', (req: Request, res: Response) => {
 const blogs = blogsRepositories.AllBlogs()
   return res.status(HTTP_STATUS.OK_200).send(blogs);
})

blogsRouter.post('/',
    ValidationBlog,
    authGuardMiddleware,
    ErrorMiddleware,
    (req: Request, res: Response) => {
    const newBlog = blogsRepositories.BlogsNew(req.body.id, req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(newBlog)
})

blogsRouter.get('/:id',
    ValidationBlog,
    ErrorMiddleware,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.findBlogById(req.params.id)
    if (blog){
        return res.status(200).send(blog)
    } else {
      return res.sendStatus(404)
    }
})
blogsRouter.put('/:id',
    ValidationBlog,
    authGuardMiddleware,
    ErrorMiddleware,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description,req.body.websiteUrl)



    return res.status(HTTP_STATUS.NO_CONTENT_204).send(blog)
})

blogsRouter.delete('/:id',
    ValidationBlog,
    authGuardMiddleware,
    ErrorMiddleware,
    (req: Request, res: Response) => {
    const deleted = blogsRepositories.delBlogsById(req.params.id)
    if (!deleted){
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})

