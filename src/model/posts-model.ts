export type PostsOutputModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    isMembership: boolean
}

export type PostsDbModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}