import ArticleDTO from "../DTO/ArticleDTO";
import {MouseEventHandler} from "react";

export default interface FeedListProps {
    articles: ArticleDTO[],
    favoriteLoadings?: Map<string, boolean>,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>
}