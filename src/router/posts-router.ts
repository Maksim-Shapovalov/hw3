import {app} from "../app";
import {Request, Response, Router} from "express";
import {HTTP_STATUS} from "../HTTP_STASUS";
import {ValidationErrorsType} from "../objectType/errorsType";
import {postsRepositories} from "../repositories/posts-repositories";





export const postsRouter = Router();
const errorsMessages: ValidationErrorsType[] = []
app.get('/', (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK_200).send(postsRepositories.AllPostsReturn);
})

app.post('/', (req: Request, res: Response) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId



    if (!title || title.trim()) {

    }


})

app.get('/:id', () => {

})

