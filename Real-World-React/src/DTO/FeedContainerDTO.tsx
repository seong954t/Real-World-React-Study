import ArticleDTO from "./ArticleDTO";

export default interface FeedContainerDTO {
    articles: ArticleDTO[],
    articlesCount: number,
    tab: string,
    tag: string,
    page: number
}