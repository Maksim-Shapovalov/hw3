import {app} from "../app";
import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../HTTP_STASUS";
import {ValidationErrorsType} from "../objectType/errorsType";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {body, query} from "express-validator";





export const blogsRouter = Router();

const chekId = body('id').trim().isString()
const chekName = body('name').trim().isLength({min: 2, max: 15}).isString()
const chekDesc = body('description').trim().isLength({min: 0, max: 500}).isString()
const chekWebUrl = body('blogId').trim().isLength({min: 1, max: 100}).isString().isURL({
        protocols: ['^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'],
        require_valid_protocol: true
    })



app.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(blogsRepositories.AllBlogsReturn);
})

app.post('/',
    chekId,chekName,chekDesc,chekWebUrl,
    (req: Request, res: Response) => {
    const newBlog = blogsRepositories.BlogsNew(req.body.id, req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(newBlog)
})

app.get('/:id',
    chekId,chekName,chekDesc,chekWebUrl,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.findBlogById(req.params.id)
    if (blog){
        res.status(200).send(blog)
    } else {
      res.sendStatus(404)
    }
})
app.put('/:id',
    chekId,chekName,chekDesc,chekWebUrl,
    (req: Request, res: Response) => {
    let blog = blogsRepositories.updateBlogById(req.params.id, req.body.name, req.body.description,req.body.websiteUrl)
    if (blog === 404 ){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    }
    if (blog === 400) {
        //TODO Write error
    }


    res.status(HTTP_STATUS.NO_CONTENT_204).send(blog)
})

app.delete('/:id',
    chekId,
    (req: Request, res: Response) => {
    const delBlog = blogsRepositories.delBlogsById(req.params.id)
})

