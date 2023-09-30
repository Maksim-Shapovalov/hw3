import {BlogsDbModels, BlogsOutputModel} from "../model/blogs-db-models";

export let dbase = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "string",
            isMembership: true,
            createdAt: "string"
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string",
        }
    ]
}