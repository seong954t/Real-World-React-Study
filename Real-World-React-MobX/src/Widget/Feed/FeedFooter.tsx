import React from "react";
import "./FeedFooter.less"
import FeedFooterProps from "../Props/FeedFooterProps";

export default class FeedFooter extends React.PureComponent<FeedFooterProps, any> {

    render() {
        const {tagList} = this.props;
        const tagElementList = tagList?.map((tag: string, index: number) => (
            <li key={index} className="tag-feed">
                {tag}
            </li>
        ));

        console.log("Render [ Feed ]");

        return (
            <div className="feed-footer">
                <ul className="tag-feed-list">
                    {tagElementList}
                </ul>
            </div>
        );
    }
}
