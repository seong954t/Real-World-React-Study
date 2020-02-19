import ArticleDTO from "../DTO/ArticleDTO";
import {MouseEventHandler} from "react";

export default interface FeedProps{
    article: ArticleDTO,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>,
    loading?: boolean
}