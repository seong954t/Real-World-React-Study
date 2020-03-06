import React, {HTMLAttributes} from "react";
import "./wiget-color-button.less";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    color: string
}

export class WidgetColorButton extends React.Component<Props, any> {


    changeColorAndBackground(e: any) {
        const background = e.target.style.backgroundColor;
        const color = e.target.style.color;
        e.target.style.background = color;
        e.target.style.color = background;
    }

    render() {
        const {color, children, className, ...htmlAttrs} = this.props;

        return (
            <button {...htmlAttrs} className={`widget-color-button ${className}`}
                    style={{backgroundColor: "white", color: color, border: `1px solid ${color}`}}
                    onMouseEnter={this.changeColorAndBackground}
                    onMouseLeave={this.changeColorAndBackground}
                    >
                {children}
            </button>
        );
    }
}