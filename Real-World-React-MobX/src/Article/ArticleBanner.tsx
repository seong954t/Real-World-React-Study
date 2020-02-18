import React from "react";
import "./article.css";
import {Link} from "react-router-dom";
import ArticleBannerProps from "../Props/ArticleBannerProps";

class ArticleBanner extends React.Component<ArticleBannerProps, any> {

    individualArticleButtons = (slug: string) => (
        <span>
            <Link className="btn btn-outline-secondary btn-sm"
               to={`/editor/${slug}`}>
                <i className="ion-edit"/>Edit Article</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={this.props.onClickDelete}>
                <i className="ion-edit"/>
                Delete Article
            </button>
        </span>
    );

    render() {
        const {title, createdAt, author, slug, isDisableEditAndDeleteButton} = this.props;

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
                            {isDisableEditAndDeleteButton ? '' : this.individualArticleButtons(slug)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleBanner;