import {MouseEventHandler} from "react";

export default interface FeedHeaderProps{
    id: string,
    username: string,
    image?: string,
    createdAt: string,
    favorited: boolean,
    favoritesCount: number,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>,
    loading?: boolean,
    linkToUser?: string,
    linkToArticle?: string
}