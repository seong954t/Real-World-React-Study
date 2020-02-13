import React from "react";
import "./tags.css";
import {Link} from "react-router-dom";
import RealWorldApi from "../RealWordApi/RealWorldApi";

class Tags extends React.Component<{}, { tags: string[] }> {

    constructor(state: { tags: string[] }) {
        super(state);
        this.state = {
            tags: []
        }
        this.setTags();
    }

    setTags = () => {
        RealWorldApi.getTags(this.setStateTags);
    }

    setStateTags = (tags: string[]) => {
        this.setState({
            tags: tags
        })
    }

    tagList = (tags: string[]) => (
        tags.map((tag: string, index: number) => (
            <Link key={index} to={`/?tab=tag&tag=${tag}`} className="tag-default popular-tag">{tag}</Link>
        ))
    )

    render() {
        const {tags} = this.state;

        return (
            <div className="col-md-3">
                <div className="tag-box">
                    <p>Popular Tags</p>
                    <div className="tag-list">
                        {this.tagList(tags)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tags;