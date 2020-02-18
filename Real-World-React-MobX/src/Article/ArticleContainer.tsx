import React from "react";
import ArticleBanner from "./ArticleBanner";
import ArticleBody from "./ArticleBody";
import ArticleComment from "./ArticleComment";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router"
import ArticlesStore from "../Store/ArticlesStore";
import UserStore from "../Store/UserStore";
import ArticleBannerAdapter from "../Adapter/ArticleBannerAdapter";

interface Props extends RouteComponentProps<{ name: string }> {
    articlesStore: ArticlesStore,
    userStore: UserStore
}

@inject("articlesStore", "userStore")
@observer
class ArticleContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("constructor [ ArticleContainer ]")
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
                        <ArticleComment/>
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