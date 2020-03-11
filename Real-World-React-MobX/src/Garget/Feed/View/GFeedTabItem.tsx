import React from "react";
import {GFeedTabItemVM} from "../ViewModel/GFeedTabItemVM";
import {Link} from "react-router-dom";
import "./GFeedTabItem.less";

interface Props {
    vm: GFeedTabItemVM
    active: boolean
}

export class GFeedTabItem extends React.Component<Props>{
    render() {
        const {title, linkToTab} = this.props.vm;
        return (
            <span className={`feed-tab ${this.props.vm.active ? "active" : ""}`}>
                <Link to={linkToTab}>
                    {title}
                </Link>
            </span>
        );
    }
}