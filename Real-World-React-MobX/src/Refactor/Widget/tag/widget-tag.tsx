import React, {HTMLAttributes} from "react";
import "./widget-tag.less";

interface Props extends HTMLAttributes<HTMLSpanElement>{

}

export class WidgetTag extends React.Component<Props, any> {

    render() {
        const {children, ...htmlAttrs} = this.props;

        return (
            <span className={"widget-tag"} {...htmlAttrs}>
                {children}
            </span>
        );
    }
}