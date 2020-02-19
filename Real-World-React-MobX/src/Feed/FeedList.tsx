import React from "react";
import Feed from "./Feed";
import ArticleDTO from "../DTO/ArticleDTO";
import FeedListProps from "../Props/FeedListProps";

class FeedList extends React.PureComponent<FeedListProps, any> {

    noArticleNotion = (
        <div className="no-article-notion p-4">No articles are here... yet.</div>
    );

    getFeedList = (articles: ArticleDTO[]) => (
        articles.map((article: ArticleDTO, _) => (
            <Feed key={article.slug}
                  article={article}
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

export default FeedList;