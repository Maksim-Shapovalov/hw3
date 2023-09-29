"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = exports.runDb = exports.client = void 0;
const express_1 = require("express");
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
exports.client = new mongodb_1.MongoClient(mongoUri);
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("admin").command({ ping: 1 });
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            console.log("connected fAiled");
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/', (req, res) => {
    exports.client.db("hw3").collection("blogs").deleteMany({});
    exports.client.db("hw3").collection("post").deleteMany({});
    console.log("testingRouter");
    res.sendStatus(index_1.HTTP_STATUS.NO_CONTENT_204);
});
