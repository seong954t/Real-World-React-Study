import ArticleDTO from "../DTO/ArticleDTO";
import {MouseEventHandler} from "react";

export default interface FeedProps{
    article: ArticleDTO,
    onClick: MouseEventHandler<HTMLButtonElement>,
    loading?: boolean
}