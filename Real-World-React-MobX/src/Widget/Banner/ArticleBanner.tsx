import React from "react";
import "./ArticleBanner.less";
import {Link} from "react-router-dom";
import ArticleBannerProps from "../Props/ArticleBannerProps";

export default class ArticleBanner extends React.Component<ArticleBannerProps, any> {

    individualArticleButtons = () => (
        <span>
            <Link className="btn btn-outline-secondary btn-sm"
               to={this.props.linkToEditor || ''}>
                <i className="ion-edit"/>Edit Article</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={this.props.onClickDelete}>
                <i className="ion-edit"/>
                Delete Article
            </button>
        </span>
    );

    render() {
        const {title, createdAt, username, image, linkToUser, isDisableEditAndDeleteButton} = this.props;

        console.log("Render [ ArticleBanner ]");

        return (
            <div className="article-info-banner">
                <div className="container">
                    <div className="col-12">
                        <h1>{title}</h1>
                        <div>
                            <Link to={linkToUser || ''}>
                                <img src={image}
                                     alt="" className="author-image"/>
                            </Link>
                            <div className="info">
                                <Link to={linkToUser || ''}>{username}</Link>
                                <p className="date">{new Date(createdAt).toDateString()}</p>
                            </div>
                            {
                                isDisableEditAndDeleteButton ?
                                '' :
                                this.individualArticleButtons()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}