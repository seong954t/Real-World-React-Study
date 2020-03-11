import ArticleVo from "../../../Vo/ArticleVo";
import {MouseEventHandler} from "react";

export abstract class GFeedItemVM {
    abstract article: ArticleVo;
    abstract linkToUser: string;
    abstract linkToArticle: string;
    abstract onClickFavorite: MouseEventHandler<HTMLButtonElement>;
}