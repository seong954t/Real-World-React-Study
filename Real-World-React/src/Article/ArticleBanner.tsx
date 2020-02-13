import React from "react";
import "./article.css";
import Auth from "../Auth/Auth";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import ArticleDTO from "../DTO/ArticleDTO";
import {Link} from "react-router-dom";

class ArticleBanner extends React.Component<{article: ArticleDTO}, {}> {

    handleDeleteArticle = (slug: string) => {
        RealWorldApi.deleteArticle(slug);
    }

    individualArticleButtons = (slug: string) => (
        <span>
            <Link className="btn btn-outline-secondary btn-sm"
               to={`/editor/${slug}`}>
                <i className="ion-edit"></i>Edit Article</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={(e) => this.handleDeleteArticle(slug)}>
                <i className="ion-edit"></i>
                Delete Article
            </button>
        </span>
    )

    render() {
        const {title, createdAt, author, slug} = this.props.article;

        return (
            <div className="article-info-banner text-left">
                <div className="container">
                    <div className="col-md-10 m-auto d-inline-block ">
                        <h1>{title}</h1>
                        <div className="feed mt-4">
                            <Link to={`/@${author.username}`}>
                                <img src={author.image}
                                     alt="" className="author-image"/>
                            </Link>
                            <div className="info">
                                <Link to={`/@${author.username}`}>{author.username}</Link>
                                <p className="date m-0">{new Date(createdAt).toDateString()}</p>
                            </div>
                            {Auth.isOwner(author.username) ? this.individualArticleButtons(slug) : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleBanner;