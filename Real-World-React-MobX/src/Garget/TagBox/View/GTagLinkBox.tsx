import React from "react";
import "./GTagLinkBox.less";
import {computed} from "mobx";
import {WidgetTagItem} from "../../../Widget/Tag/WidgetTagItem";

interface Props {
    tagList: Array<string>,
}

export class GTagLinkBox extends React.PureComponent<Props>{

    style = {
        backgroundColor: "#818A91",
        color: "#FFFFFF",
        border: "1px solid #818A91"
    };

    @computed
    get tagItems() {
        return this.props.tagList.map((tagName) => {
            return (
                <WidgetTagItem style={this.style} linkToTag={`/?tab=tag&tag=${tagName}`}>
                    {tagName}
                </WidgetTagItem>
            )
        })
    };

    render() {
        return (
            <div className={"tag-box"}>
                <p>Popular Tags</p>
                <div className={`tag-link-item-list`}>
                    {this.tagItems}
                </div>
            </div>
        );
    }
}