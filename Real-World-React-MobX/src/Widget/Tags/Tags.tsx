import React from "react";
import "./tags.less";
import {Link} from "react-router-dom";

export default class Tags extends React.PureComponent<{tags: string[]}, any>{

    tagList = () => (
        this.props.tags.map((tag: string, index: number) => (
            <Link key={index} to={`/?tab=tag&tag=${tag}`} className="tag-default popular-tag">{tag}</Link>
        ))
    );

    render() {
        console.log("Render [ Tags ]");
        return (
            <div className="col-md-3">
                <div className="tag-box">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {this.tagList()}
                    </div>
                </div>
            </div>
        );
    }
}