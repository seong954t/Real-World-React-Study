import React from "react";
import "./article.css";
import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject("articlesStore", "userStore")
@observer
class ArticleBanner extends React.Component<any, any> {

    handleDeleteArticle = (slug: string) => {
        this.props.articlesStore.deleteArticle(slug)
            .then(() => {
                console.log(this.props);
                this.props.location.replace("/")
            })
    };

    individualArticleButtons = (slug: string) => (
        <span>
            <Link className="btn btn-outline-secondary btn-sm"
               to={`/editor/${slug}`}>
                <i className="ion-edit"/>Edit Article</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={() => this.handleDeleteArticle(slug)}>
                <i className="ion-edit"/>
                Delete Article
            </button>
        </span>
    );

    render() {
        const {title, createdAt, author, slug} = this.props.articlesStore.article;

        console.log("Render [ ArticleBanner ]");

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
                            {Auth.isOwner(this.props.userStore, author.username) ? this.individualArticleButtons(slug) : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleBanner;