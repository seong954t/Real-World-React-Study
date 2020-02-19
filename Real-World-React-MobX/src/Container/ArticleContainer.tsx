import React from "react";
import ArticleBody from "./ArticleBody";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router"
import ArticlesStore from "../Store/ArticlesStore";
import UserStore from "../Store/UserStore";
import ArticleBannerAdapter from "../Adapter/ArticleBannerAdapter";
import ArticleCommentAdapter from "../Adapter/ArticleCommentAdapter";
import CommentsStore from "../Store/CommentsStore";

interface Props extends RouteComponentProps<{ name: string }> {
    commentsStore: CommentsStore,
    articlesStore: ArticlesStore,
    userStore: UserStore
}

@inject("articlesStore", "userStore", "commentsStore")
@observer
class ArticleContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ ArticleContainer ]")
        const slug = this.props.match.params.name;
        this.props.articlesStore.loadArticle(slug);
    }

    render() {
        const article = this.props.articlesStore.article;

        console.log("Render [ ArticleContainer ]");

        if (article) {
            return (
                <div>
                    <ArticleBannerAdapter history={this.props.history}
                                          userStore={this.props.userStore}
                                          articlesStore={this.props.articlesStore}
                                          article={article}
                    />
                    <div className="container row m-auto">
                        <ArticleBody tagList={article.tagList} body={article.body}/>
                        <ArticleCommentAdapter commentsStore={this.props.commentsStore}
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

export default ArticleContainer;