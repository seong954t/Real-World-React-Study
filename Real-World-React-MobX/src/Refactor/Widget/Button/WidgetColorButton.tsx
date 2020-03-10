import React, {HTMLAttributes} from "react";
import "./WigetColorButton.less";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    color: string,
    active?: boolean
}

export class WidgetColorButton extends React.Component<Props, any> {

    defaultStyle = {
        backgroundColor: "white",
        color: this.props.color,
        border: `1px solid ${this.props.color}`
    };

    activeStyle = {
        backgroundColor: this.props.color,
        color: "white",
        border: `1px solid ${this.props.color}`
    };

    changeColorAndBackground = (e: any) => {
        if (!this.props.active) {
            if(e.target.className === `widget-color-button ${this.props.className || ''}`) {
                if (e.type === "mouseenter") {
                    e.target.style.backgroundColor = this.activeStyle.backgroundColor;
                    e.target.style.color = this.activeStyle.color;
                    e.target.style.border = this.activeStyle.border;
                } else if (e.type === "mouseleave") {
                    e.target.style.backgroundColor = this.defaultStyle.backgroundColor;
                    e.target.style.color = this.defaultStyle.color;
                    e.target.style.border = this.defaultStyle.border;
                }
            }
        }
    };

    render() {
        const {color, children, className, ...htmlAttrs} = this.props;

        return (
            <button {...htmlAttrs} className={`widget-color-button ${className || ''}`}
                    style={this.props.active ? this.activeStyle : this.defaultStyle}
                    onMouseEnter={this.changeColorAndBackground}
                    onMouseLeave={this.changeColorAndBackground}
            >
                {children}
            </button>
        );
    }
}