import React, {HTMLAttributes} from "react";
import "./WidgetForm.less";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {

}

export class WidgetTextarea extends React.Component<Props, any> {


    render() {
        const {color, children, className, ...htmlAttrs} = this.props;

        return (
            <textarea {...htmlAttrs} className={`widget-textarea ${className}`}>
                {children}
            </textarea>
        );
    }
}