import React, {HTMLAttributes} from "react";
import "./WidgetTagItem.less";

interface Props extends HTMLAttributes<HTMLSpanElement>{

}

export class WidgetTagItem extends React.Component<Props, any> {

    render() {
        const {children, className,...htmlAttrs} = this.props;

        return (
            <span className={`widget-tag-item ${className}`} {...htmlAttrs}>
                {children}
            </span>
        );
    }
}