import React from "react";
import "./tags.less";
import {Link} from "react-router-dom";


interface Props {
    title: string,
    tags: string[],
    className?: string,
    linkToTagFn: (tag: string) => string
}

export default class Tags extends React.PureComponent<Props, any>{

    tagList = () => (
        this.props.tags.map((tag: string, index: number) => (
            <Link key={index} to={this.props.linkToTagFn(tag)} className="tag-popular">{tag}</Link>
        ))
    );

    render() {
        console.log("Render [ Tags ]");
        return (
            <div className={`container ${this.props.className || ""}`}>
                <div className="tag-box">
                    <p>{this.props.title}</p>
                    <div className="tag-popular-list">
                        {this.tagList()}
                    </div>
                </div>
            </div>
        );
    }
}