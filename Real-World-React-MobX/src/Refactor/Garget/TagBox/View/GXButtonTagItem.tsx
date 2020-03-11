import React, {HTMLAttributes, MouseEventHandler} from "react";
import {WidgetTagItem} from "../../../Widget/Tag/WidgetTagItem";
import "./GXButtonTagItem.less";

interface Props extends HTMLAttributes<HTMLSpanElement>{
    onClickXButton: MouseEventHandler<HTMLElement>,
    uid: string
}

export class GXButtonTagItem extends React.Component<Props>{

    onClickHandler = (e: any) => {
        e.uid = this.props.uid;
        this.props.onClickXButton(e);
    };

    render() {
        const {children, className, ...htmlAttrs} = this.props;

        return (
            <WidgetTagItem {...htmlAttrs} className={className}>
                <i className="ion-close-round x-button" onClick={this.onClickHandler}/> {children}
            </WidgetTagItem>
        );
    }
}