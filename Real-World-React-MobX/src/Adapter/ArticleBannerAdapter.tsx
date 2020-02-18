import React from "react";
import ArticlesStore from "../Store/ArticlesStore";
import UserStore from "../Store/UserStore";
import PageRouter from "../PageRouter/PageRouter";
import {RouteComponentProps} from "react-router";
import ArticleBanner from "../Article/ArticleBanner";
import * as H from "history";
import ArticleDTO from "../DTO/ArticleDTO";
import Auth from "../Auth/Auth";

interface Props {
    articlesStore: ArticlesStore,
    userStore: UserStore,
    history: H.History,
    article: ArticleDTO
}

export default class ArticleBannerAdapter extends React.Component<Props, any> {

    handleDeleteArticle = (e: any) => {
        PageRouter.pageRouteAfterPromise(
            this.props.articlesStore.deleteArticle(this.props.article.slug),
            this.props.history,
            "/"
        )
    };

    render() {
        const {title, slug, author, createdAt} = this.props.article;

        return (
            <ArticleBanner title={title}
                           slug={slug}
                           author={author}
                           createdAt={createdAt}
                           onClickDelete={this.handleDeleteArticle}
                           isDisableEditAndDeleteButton={!Auth.isOwner(this.props.userStore.user.username, author.username)}
            />
        );
    }
}