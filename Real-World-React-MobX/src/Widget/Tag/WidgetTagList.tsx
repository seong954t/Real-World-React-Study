import React, {HTMLAttributes} from "react";
import {WidgetTagItem} from "./WidgetTagItem";
import "./WidgetTagList.less"

interface Props extends HTMLAttributes<HTMLDivElement> {
    taglist: Array<string>,
    tagbackgroundcolor?: string,
    tagcolor?: string,
    tagborder?: string,
}

export class WidgetTagList extends React.Component<Props> {

    style = {
        backgroundColor: this.props.tagbackgroundcolor || '',
        color: this.props.tagcolor || '',
        border: this.props.tagborder || ''
    };

    tagItems = () => {
        return this.props.taglist.map((tagName) => {
            return (
                <WidgetTagItem key={tagName} style={this.style}>
                    {tagName}
                </WidgetTagItem>
            )
        })
    };

    render() {
        const {className, ...htmlAttrs} = this.props;
        return (
            <div {...htmlAttrs} className={`widget-tag-item-list ${className}`}>
                {this.tagItems()}
            </div>
        );
    }
}