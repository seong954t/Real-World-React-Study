import React, {MouseEventHandler} from "react";
import ArticleDTO from "../DTO/ArticleDTO";
import Feed from "../Widget/Feed/Feed";

export default interface Props {
    articles: ArticleDTO[],
    favoriteLoadings?: Map<string, boolean>,
    onClickFavorite: MouseEventHandler<HTMLButtonElement>
}

export default class FeedList extends React.PureComponent<Props, any> {

    noArticleNotion = (
        <div className="no-article-notion p-4">No articles are here... yet.</div>
    );

    getFeedList = (articles: ArticleDTO[]) => (
        articles.map((article: ArticleDTO, _) => (
            <Feed key={article.slug}
                  createdAt={article.createdAt}
                  username={article.author.username}
                  slug={article.slug}
                  title={article.title}
                  favoritesCount={article.favoritesCount}
                  favorited={article.favorited}
                  image={article.author.image}
                  tagList={article.tagList}
                  description={article.description}
                  onClickFavorite={this.props.onClickFavorite}
                  loading={this.props.favoriteLoadings?.get(article.slug)}
            />
        ))
    );

    render() {
        const {articles} = this.props;
        const feedList = (articles === undefined) || (articles.length === 0) ? this.noArticleNotion : this.getFeedList(articles);

        console.log("Render [ FeedList ]");

        return (
            feedList
        );
    }
}