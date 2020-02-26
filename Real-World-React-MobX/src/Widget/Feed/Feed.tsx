import React from "react";
import "./Feed.less"
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import FeedProps from "../Props/FeedProps";

export default class Feed extends React.PureComponent<FeedProps, any> {

    handleFavorite = (e: any): void => {
        e.id = this.props.id;
        this.props.onClickFavorite(e);
    };

    render() {
        const {createdAt, image, username, description, title, tagList, favorited, favoritesCount, linkToUser, linkToArticle} = this.props;
        const tagElementList = tagList?.map((tag: string, index: number) => (
            <li key={index} className="tag-feed">
                {tag}
            </li>
        ));

        console.log("Render [ Feed ]");

        return (
            <div className="feed-container">
                <div className="feed-header">
                    <Link to={linkToUser ? linkToUser : ''}>
                        <img src={image} alt="" className="author-image"/>
                    </Link>
                    <div className="info">
                        <Link to={linkToUser ? linkToUser : ''}>{username}</Link>
                        <p className="date">{new Date(createdAt).toDateString()}</p>
                    </div>
                    <button type="button"
                            onClick={this.handleFavorite}
                            className={`favorite-button ${favorited ? 'active' : ''}`}>
                        {
                            !this.props.loading ?
                                <span><i className="ion-heart"/>{favoritesCount}</span> :
                                <Loading className="sm-spinner-border"/>
                        }
                    </button>
                </div>
                <Link className="feed-contents" to={linkToArticle ? linkToArticle : ''}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <span>Read more...</span>
                </Link>
                <div className="feed-footer">
                    <ul className="tag-feed-list">
                        {tagElementList}
                    </ul>
                </div>
            </div>
        );
    }
}
