import React from "react";
import "./banner.less";
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
            <div className="article-info-banner text-left">
                <div className="container">
                    <div className="col-md-10 m-auto d-inline-block ">
                        <h1>{title}</h1>
                        <div className="feed mt-4">
                            <Link to={linkToUser || ''}>
                                <img src={image}
                                     alt="" className="author-image"/>
                            </Link>
                            <div className="info">
                                <Link to={linkToUser || ''}>{username}</Link>
                                <p className="date m-0">{new Date(createdAt).toDateString()}</p>
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