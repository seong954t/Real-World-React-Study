import React from "react";
import ArticleBanner from "./ArticleBanner";
import ArticleDescripter from "./ArticleDescripter";
import ArticleComment from "./ArticleComment";
import {inject, observer} from "mobx-react";

@inject("articlesStore")
@observer
class ArticleContainer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("constructor [ ArticleContainer ]")
        const slug = this.props.match.params.name;
        this.props.articlesStore.loadArticle(slug);
    }

    render() {
        const {article} = this.props.articlesStore;

        console.log("Render [ ArticleContainer ]");

        if (article) {
            return (
                <div>
                    <ArticleBanner history={this.props.history} article={article}/>
                    <div className="container row m-auto">
                        <ArticleDescripter tagList={article.tagList} body={article.body}/>
                        {article.slug === '' ? '' : <ArticleComment/>}
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