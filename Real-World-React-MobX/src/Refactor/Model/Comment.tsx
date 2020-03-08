import CommentVo from "../../Vo/CommentVo";
import AuthorVo from "../../Vo/AuthorVo";
import {Author} from "./Author";

export class Comment implements CommentVo {
    id: number = 0;
    createdAt: string = "";
    updatedAt: string = "";
    body: string = "";
    author: AuthorVo = new Author();

    constructor(comment?: Readonly<CommentVo>) {
        if (comment) {
            this.id = comment.id;
            this.createdAt = comment.createdAt;
            this.updatedAt = comment.updatedAt;
            this.body = comment.body;
            this.author = comment.author;
        }
    }
}