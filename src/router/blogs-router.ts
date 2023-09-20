import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {body, query} from "express-validator";
import {app, HTTP_STATUS} from "../index";
import {ValidationBlog} from "../middlewares/blogs-middleware/blog-input-validation-middleware";





export const blogsRouter = Router();
app.use('blogs', blogsRouter)

blogsRouter.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(blogsRepositories.AllBlogs);
})

blogsRouter.post('/',
    ValidationBlog,
    (req: Request, res: Response) => {
    const newBlog = blogsRepositories.BlogsNew(req.body.id, req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(newBlog)
})

blogsRouter.get('/:id',
    ValidationBlog,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.findBlogById(req.params.id)
    if (blog){
        res.status(200).send(blog)
    } else {
      res.sendStatus(404)
    }
})
blogsRouter.put('/:id',
    ValidationBlog,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description,req.body.websiteUrl)



    res.status(HTTP_STATUS.NO_CONTENT_204).send(blog)
})

blogsRouter.delete('/:id',
    ValidationBlog,
    (req: Request, res: Response) => {
    const deleted = blogsRepositories.delBlogsById(req.params.id)
    if (!deleted){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
})

