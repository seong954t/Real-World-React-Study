import React from "react";
import ArticleBanner from "./ArticleBanner";
import ArticleDescripter from "./ArticleDescripter";
import ArticleComment from "./ArticleComment";
import ArticleDTO from "../DTO/ArticleDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

class ArticleContainer extends React.Component<any, {article: ArticleDTO}>{

    constructor(props: any) {
        super(props);
        this.state = {
                article: {
                    slug: '',
                    title: '',
                    description: '',
                    body: '',
                    tagList: [],
                    createdAt: '',
                    updatedAt: '',
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: '',
                        bio: null,
                        image: '',
                        following: false
                    }
                }
        }
        this.setArticleDescription();
    }

    setArticleDescription = () => {
        const slug = this.props.match.params.name;
        RealWorldApi.getArticle(slug, this.setStateArticle);
    }

    setStateArticle = (article: ArticleDTO) => {
        this.setState({
            article: article
        })
    }

    render() {
        try {
            const {article} = this.state;

            return (
                <div>
                    <ArticleBanner article={article}/>
                    <div className="container row m-auto">
                        <ArticleDescripter tagList={article.tagList} body={article.body} />
                        {article.slug === '' ? '' : <ArticleComment slug={article.slug}/>}
                    </div>
                </div>
            );
        } catch (e) {
            return (
                <div>Can't load article</div>
            )
        }

    }
}

export default ArticleContainer;