import React, {MouseEventHandler} from "react";
import ArticleDTO from "../DTO/ArticleDTO";
import Feed from "../Widget/Feed/Feed";
import FeedTab from "../Widget/Feed/FeedTab";
import Auth from "../Auth/Auth";
import Loading from "../Widget/Loading/Loading";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";
import {observer} from "mobx-react";
import Config from "../Configuration/Config";

interface Props {
    articlesStore: ArticlesStore,
    feedTabStore: FeedTabStore,
}

@observer
export default class FeedListContainer extends React.PureComponent<Props, any> {

    noArticleNotion = (
        <div className="no-article-notion p-4">No articles are here... yet.</div>
    );

    handleFavorite = (e: any): void => {
        e.preventDefault();
        this.props.articlesStore.favoriteArticle(e.id);
    };

    getFeedList = () => {
        const {articles} = this.props.articlesStore
        return articles.map((article: ArticleDTO, _) => (
            <Feed key={article.slug}
                  createdAt={article.createdAt}
                  username={article.author.username}
                  id={article.slug}
                  title={article.title}
                  favoritesCount={article.favoritesCount}
                  favorited={article.favorited}
                  image={article.author.image}
                  tagList={article.tagList}
                  description={article.description}
                  onClickFavorite={this.handleFavorite}
                  loading={this.props.articlesStore.favoriteLoadings?.get(article.slug)}
                  linkToArticle={Config.LINK.ARTICLE(article.slug)}
                  linkToUser={Config.LINK.USER(article.author.username)}
            />
        ))
    };

    render() {
        const {feedTabStore, articlesStore} = this.props;
        const {articles} = articlesStore;
        const feedList = (articles === undefined) || (articles.length === 0) ? this.noArticleNotion : this.getFeedList();

        console.log("Render [ FeedList ]");

        return (
            <div className="container col-md-12">
                <FeedTab tab={feedTabStore.tab}
                         tag={feedTabStore.tag}
                         name={feedTabStore.name}
                         isDefault={!Auth.isSigned()}
                />
                {
                    articlesStore.isArticlesLoading ?
                        <div className="text-center m-4">
                            <Loading className="text-success"/>
                        </div> :
                        feedList
                }
            </div>
        );
    }
}