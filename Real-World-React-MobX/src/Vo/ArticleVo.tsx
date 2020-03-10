import AuthorVo from "./AuthorVo";

export default interface ArticleVo {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: Array<string>,
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: AuthorVo
}