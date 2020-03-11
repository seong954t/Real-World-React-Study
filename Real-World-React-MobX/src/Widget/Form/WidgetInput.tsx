import React, {InputHTMLAttributes} from "react";
import "./WidgetForm.less";

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

export class WidgetInput extends React.Component<Props> {


    render() {
        const {color, children, className, ...htmlAttrs} = this.props;

        return (
            <input {...htmlAttrs} className={`widget-input ${className}`}>
                {children}
            </input>
        );
    }
}