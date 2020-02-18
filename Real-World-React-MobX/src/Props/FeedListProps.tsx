import ArticleDTO from "../DTO/ArticleDTO";

export default interface FeedListProps {
    articles: ArticleDTO[],
    tab?: string,
    tag?: string,
    name?: string
    loading: boolean,
    isDefault: boolean
}