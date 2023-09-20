import {infoToPost} from "../objectType/postsType";
import {create} from "node:domain";
import {db} from "./dataBase";




export const postsRepositories = {

    AllPostsReturn(title: string) {
        if (title){
            return db.filter(f => f.title.indexOf(title))
        }else{
            return db
        }
    },


    PostingNem(id: string, name: string, description: string, blogId: string){
        const newPost = {
            content:
        }
        db.push(newPost)
        return newPost
    }
}