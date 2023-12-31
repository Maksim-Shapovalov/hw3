import {body} from "express-validator";
import {blogsRepositories} from "../../repositories/blogs-repositories";
import {BlogsOutputModel} from "../../model/blogs-db-models";

export const ValidationPosts = () => ([
    body('title').trim().isString().notEmpty().isLength({min:1,max:30}),
    body('shortDescription')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min:1,max:100}),
    body('content')
        .trim()
        .notEmpty()
        .isLength({min:1 , max:1000})
        .isString()
        .withMessage('invalid content'),
    body('blogId')
        .trim()
        .custom(async (value) => {
            const blogExist = await blogsRepositories.findBlogById(value)
            console.log('error valid id blogs', blogExist)
            if (!blogExist) {
                throw new Error('Blog not exist')
            }
            return true
        })
        .notEmpty()
        .isString()
        .withMessage('invalid blogId'),
    ]
)