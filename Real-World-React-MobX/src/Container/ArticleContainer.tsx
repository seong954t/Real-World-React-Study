import React from "react";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router"
import ArticlesStore from "../Store/ArticlesStore";
import UserStore from "../Store/UserStore";
import CommentsStore from "../Store/CommentsStore";
import ArticleBody from "../Widget/Article/ArticleBody";
import PageRouter from "../PageRouter/PageRouter";
import ArticleBanner from "../Widget/Banner/ArticleBanner";
import Auth from "../Auth/Auth";
import ArticleCommentContainer from "./ArticleCommentContainer";

interface Props extends RouteComponentProps<{ name: string }> {
    commentsStore: CommentsStore,
    articlesStore: ArticlesStore,
    userStore: UserStore
}

@inject("articlesStore", "userStore", "commentsStore")
@observer
export default class ArticleContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ ArticleContainer ]")
        const slug = this.props.match.params.name;
        this.props.articlesStore.loadArticle(slug);
    }

    handleDeleteArticle = () => {
        const {article} = this.props.articlesStore;
        if (article) {
            PageRouter.pageRouteAfterPromise(
                this.props.articlesStore.deleteArticle(article.slug),
                this.props.history,
                "/"
            )
        }
    };

    render() {
        const {article} = this.props.articlesStore;
        console.log("Render [ ArticleContainer ]");

        if (article) {
            const {title, slug, author, createdAt} = article;

            return (
                <div>
                    <ArticleBanner title={title}
                                   createdAt={createdAt}
                                   username={author.username}
                                   image={author.image}
                                   slug={slug}
                                   onClickDelete={this.handleDeleteArticle}
                                   isDisableEditAndDeleteButton={!Auth.isOwner(this.props.userStore.user.username, author.username)}
                    />
                    <div className="container row m-auto">
                        <ArticleBody tagList={article.tagList} body={article.body}/>
                        <ArticleCommentContainer commentsStore={this.props.commentsStore}
                                               userStore={this.props.userStore}
                                               articlesStore={this.props.articlesStore}
                                               article={article}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div>Can't load article</div>
            )
        }
    }
}