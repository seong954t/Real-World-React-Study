import React from "react";
import "./FeedContent.less"
import {Link} from "react-router-dom";
import FeedContentProps from "../Props/FeedContentProps";

export default class FeedContent extends React.PureComponent<FeedContentProps, any> {

    render() {
        const { description, title, linkToArticle} = this.props;

        console.log("Render [ FeedContent ]");

        return (
            <Link className="feed-content" to={linkToArticle ? linkToArticle : ''}>
                <h1>{title}</h1>
                <p>{description}</p>
                <span>Read more...</span>
            </Link>
        );
    }
}
