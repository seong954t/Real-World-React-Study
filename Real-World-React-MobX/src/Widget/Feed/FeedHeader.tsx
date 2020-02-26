import React from "react";
import "./FeedHeader.less"
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import FeedHeaderProps from "../Props/FeedHeaderProps";

export default class FeedHeader extends React.PureComponent<FeedHeaderProps, any> {

    handleFavorite = (e: any): void => {
        e.id = this.props.id;
        this.props.onClickFavorite(e);
    };

    render() {
        const {createdAt, image, username, favorited, favoritesCount, linkToUser} = this.props;

        console.log("Render [ FeedHeader ]");

        return (
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
        );
    }
}
