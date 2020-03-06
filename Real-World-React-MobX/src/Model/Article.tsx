import ArticleVo from "../Vo/ArticleVo";
import AuthorVo from "../Vo/AuthorVo";
import {Author} from "./Author";
import {observable} from "mobx";

export class Article implements ArticleVo {

    slug: string = "";
    title: string = "";
    description: string = "";
    body: string = "";
    tagList: string[] = [];
    createdAt: string = "";
    updatedAt: string = "";
    @observable favorited: boolean = false;
    @observable favoritesCount: number = 0;
    author: AuthorVo = new Author();

    constructor(article?: Readonly<ArticleVo>) {
        if (article) {
            this.slug = article.slug;
            this.title = article.title;
            this.description = article.description;
            this.body = article.body;
            this.tagList = article.tagList;
            this.createdAt = this.getFormatedDate(article.createdAt);
            this.updatedAt = this.getFormatedDate(article.updatedAt);
            this.favorited = article.favorited;
            this.favoritesCount = article.favoritesCount;
            this.author = article.author;
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