import React from "react";
import "./Feed.css"
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import FeedProps from "../Props/FeedProps";

export default class Feed extends React.PureComponent<FeedProps, any> {

    handleFavorite = (e: any): void => {
        e.slug = this.props.slug;
        this.props.onClickFavorite(e);
    };

    render() {
        const {slug, createdAt, image, username, description, title, tagList, favorited, favoritesCount} = this.props;
        const tagElementList = tagList?.map((tag: string, index: number) => (
            <li key={index} className="tag-default preview-tag mr-1">
                {tag}
            </li>
        ));

        console.log("Render [ Feed ]");

        return (
            <div className="feed-preview pb-4 pt-4">
                <div className="feed mb-4">
                    <Link to={`/@${username}`}>
                        <img src={image} alt="" className="author-image"/>
                    </Link>
                    <div className="info">
                        <Link to={`/@${username}`}>{username}</Link>
                        <p className="date m-0">{new Date(createdAt).toDateString()}</p>
                    </div>
                    <button type="button"
                            onClick={this.handleFavorite}
                            className={`btn btn-sm btn-outline-success float-right ${favorited ? 'active' : ''}`}>
                        {
                            !this.props.loading ?
                                <span><i className="ion-heart"/>{favoritesCount}</span> :
                                <Loading className="sm-spinner-border text-white"/>
                        }
                    </button>
                </div>
                <Link className="preview-link" to={`/article/${slug}`}>
                    <h1>{title}</h1>
                    <p className="preview-desc">{description}</p>
                    <span>Read more...</span>
                </Link>
                <div className="text-right">
                    <ul className="tag-list col-md-6 mb-0">
                        {tagElementList}
                    </ul>
                </div>
            </div>
        );
    }
}
