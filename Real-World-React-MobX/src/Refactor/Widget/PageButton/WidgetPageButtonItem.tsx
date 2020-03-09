import React, {HTMLAttributes, MouseEventHandler} from "react";
import "./WidgetPageButtonItem.less";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    active?: boolean,
    color?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    uid?: string | number
}

export class WidgetPageButtonItem extends React.Component<Props> {

    activeStyle = {
        backgroundColor: this.props.color || 'black',
        borderColor: this.props.color || 'black',
        color: "#FFFFFF"
    }

    defaultStyle = {
        backgroundColor: "#FFFFFF",
        borderColor: "#DEE2E5",
        color: this.props.color || 'black',
    }

    clickHandler = (e: any) => {
        const {uid, onClick} = this.props;
        if(uid && onClick){
            e.uid = this.props.uid;
            onClick(e);
        }
    }

    render() {
        const {children, className, ...htmlAttrs} = this.props;

        return (
            <span {...htmlAttrs}
                  className={`page-button-item ${className}`}
                  onClick={this.clickHandler}
                  style = {this.props.active ? this.activeStyle : this.defaultStyle}>
                {children}
            </span>
        );
    }
}