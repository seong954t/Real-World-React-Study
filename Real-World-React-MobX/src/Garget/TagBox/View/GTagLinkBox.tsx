import React from "react";
import "./GTagLinkBox.less";
import {computed} from "mobx";
import {WidgetTagItem} from "../../../Widget/Tag/WidgetTagItem";

interface Props {
    taglist: Array<string>,
}

export class GTagLinkBox extends React.PureComponent<Props>{

    style = {
        backgroundColor: "#818A91",
        color: "#FFFFFF",
        border: "1px solid #818A91"
    };

    @computed
    get tagItems() {
        return this.props.taglist.map((tagName) => {
            return (
                <WidgetTagItem key={tagName} style={this.style} linktotag={`/?tab=tag&tag=${tagName}`}>
                    {tagName}
                </WidgetTagItem>
            )
        })
    };

    render() {
        return (
            <div className={"tag-box"}>
                <p className={"tag-box-title"}>Popular Tags</p>
                <div className={`tag-link-item-list`}>
                    {this.tagItems}
                </div>
            </div>
        );
    }
}