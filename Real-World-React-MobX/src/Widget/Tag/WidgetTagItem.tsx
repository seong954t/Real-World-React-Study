import React, {HTMLAttributes} from "react";
import "./WidgetTagItem.less";
import {Link} from "react-router-dom";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    linkToTag?: string;
}

export class WidgetTagItem extends React.Component<Props> {

    getTagElement = (element: any) => {
        if (this.props.linkToTag) {
            return (
                <Link to={this.props.linkToTag}>
                    {element}
                </Link>
            )
        }
        return element;
    };

    render() {
        const {children, className, ...htmlAttrs} = this.props;

        return (
            this.getTagElement(
                <span {...htmlAttrs} className={`widget-tag-item ${className}`}>
                    {children}
                </span>
            )
        );
    }
}