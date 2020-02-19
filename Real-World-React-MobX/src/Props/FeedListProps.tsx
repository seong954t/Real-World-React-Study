import ArticleDTO from "../DTO/ArticleDTO";
import {MouseEventHandler} from "react";

export default interface FeedListProps {
    articles: ArticleDTO[],
    favoriteLoadings?: Map<string, boolean>,
    tab?: string,
    tag?: string,
    name?: string
    loading?: boolean,
    isDefault: boolean,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>
}