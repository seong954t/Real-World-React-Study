import React, {HTMLAttributes} from "react";
import {WidgetTagItem} from "./WidgetTagItem";
import "./WidgetTagList.less"
import {computed} from "mobx";

interface Props extends HTMLAttributes<HTMLDivElement> {
    tagList: Array<string>,
    tagBackgroundColor?: string,
    tagColor?: string,
    tagBorder?: string,
}

export class WidgetTagList extends React.Component<Props> {

    style = {
        backgroundColor: this.props.tagBackgroundColor || '',
        color: this.props.tagColor || '',
        border: this.props.tagBorder || ''
    };

    @computed
    get tagItems() {
        return this.props.tagList.map((tagName) => {
            return (
                <WidgetTagItem style={this.style}>
                    {tagName}
                </WidgetTagItem>
            )
        })
    };

    render() {
        const {className, ...htmlAttrs} = this.props;
        return (
            <div {...htmlAttrs} className={`widget-tag-item-list ${className}`}>
                {this.tagItems}
            </div>
        );
    }
}