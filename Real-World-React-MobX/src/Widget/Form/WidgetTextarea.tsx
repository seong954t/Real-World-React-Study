import React, {HTMLAttributes, TextareaHTMLAttributes} from "react";
import "./WidgetForm.less";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    rows?: number
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