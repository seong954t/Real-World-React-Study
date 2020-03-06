import AuthorVo from "../Vo/AuthorVo";
import {observable} from "mobx";

export class Author implements AuthorVo {
    username: string = "";
    bio: string = "";
    image: string = "";
    @observable following: boolean = false;

    constructor(author?: Readonly<AuthorVo>) {
        if (author) {
            this.username = author.username;
            this.bio = author.bio;
            this.image = author.image;
            this.following = author.following;
        }
    }
}