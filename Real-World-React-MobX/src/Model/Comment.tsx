import CommentVo from "../Vo/CommentVo";
import AuthorVo from "../Vo/AuthorVo";
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
            this.createdAt = this.getFormatedDate(comment.createdAt);
            this.updatedAt = this.getFormatedDate(comment.updatedAt);
            this.body = comment.body;
            this.author = comment.author;
        }
    }

    /*
    * from  yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
    * to    [date] [month] MM yyyy
    * */
    getFormatedDate(date: string): string {
        return new Date(date).toDateString();
    }
}