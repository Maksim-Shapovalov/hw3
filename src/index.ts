import express, { Request, Response } from "express";
import * as string_decoder from "string_decoder";
import bodyParser from "body-parser";

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404
}


export const app = express();
const parserMiddleware = bodyParser;


export const port = process.env.PORT || 3000;
app.use(parserMiddleware);


app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})