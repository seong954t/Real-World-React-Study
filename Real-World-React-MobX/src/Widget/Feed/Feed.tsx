import React from "react";
import "./Feed.less"
import FeedProps from "../Props/FeedProps";
import FeedHeader from "./FeedHeader";
import FeedContent from "./FeedContent";
import FeedFooter from "./FeedFooter";

export default class Feed extends React.PureComponent<FeedProps, any> {

    render() {
        const {createdAt, image, username, description, title, tagList, favorited, favoritesCount, linkToUser, linkToArticle} = this.props;

        console.log("Render [ Feed ]");

        return (
            <div className="feed-container">
                <FeedHeader id={this.props.id} 
                            username={username}
                            createdAt={createdAt} 
                            favorited={favorited}
                            image={image}
                            linkToUser={linkToUser}
                            favoritesCount={favoritesCount}
                            onClickFavorite={this.props.onClickFavorite}
                />
                <FeedContent title={title} description={description} linkToArticle={linkToArticle}/>
                <FeedFooter tagList={tagList}/>
            </div>
        );
    }
}
