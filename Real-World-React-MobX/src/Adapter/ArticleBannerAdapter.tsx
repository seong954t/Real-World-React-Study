import React from "react";
import ArticlesStore from "../Store/ArticlesStore";
import UserStore from "../Store/UserStore";
import PageRouter from "../PageRouter/PageRouter";
import * as H from "history";
import ArticleDTO from "../DTO/ArticleDTO";
import Auth from "../Auth/Auth";
import ArticleBanner from "../Widget/Banner/ArticleBanner";

interface Props {
    articlesStore: ArticlesStore,
    userStore: UserStore,
    history: H.History,
    article: ArticleDTO
}

export default class ArticleBannerAdapter extends React.Component<Props, any> {

    handleDeleteArticle = () => {
        PageRouter.pageRouteAfterPromise(
            this.props.articlesStore.deleteArticle(this.props.article.slug),
            this.props.history,
            "/"
        )
    };

    render() {
        const {title, slug, author, createdAt} = this.props.article;
        console.log("Render [ ArticleBannerAdapter ]");
        return (
            <ArticleBanner title={title}
                           slug={slug}
                           username={author.username}
                           image={author.image}
                           createdAt={createdAt}
                           onClickDelete={this.handleDeleteArticle}
                           isDisableEditAndDeleteButton={!Auth.isOwner(this.props.userStore.user.username, author.username)}
            />
        );
    };
}