import {MouseEventHandler} from "react";

export default interface FeedProps{
    slug: string,
    tagList?: string[],
    username: string,
    image?: string,
    createdAt: string,
    favorited: boolean,
    favoritesCount: number,
    title: string,
    description?: string,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>,
    loading?: boolean
}